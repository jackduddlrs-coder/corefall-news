import { useState, useMemo } from "react";
import { ArrowRight, TrendingUp, Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { rosterMoves, getSeasons, getMovesBySeason, RosterMove } from "@/data/rosterMoves";
import { getTeamClass } from "@/data/corefallData";

interface RosterMovesSectionProps {
  onPlayerClick: (name: string) => void;
  onTeamClick: (name: string) => void;
}

const TeamBadge = ({ team }: { team: string }) => {
  const teamClass = getTeamClass(team);
  return (
    <span 
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${teamClass} cursor-pointer hover:opacity-80 transition-opacity`}
    >
      {team}
    </span>
  );
};

const MoveCard = ({ 
  move, 
  onPlayerClick, 
  onTeamClick 
}: { 
  move: RosterMove; 
  onPlayerClick: (name: string) => void;
  onTeamClick: (name: string) => void;
}) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-border/50 hover:border-border transition-colors">
      <button
        onClick={() => onPlayerClick(move.player)}
        className="font-medium text-foreground hover:text-primary transition-colors text-left min-w-[140px] md:min-w-[180px]"
      >
        {move.player}
      </button>
      
      <div className="flex items-center gap-2 flex-1">
        <button onClick={() => onTeamClick(move.oldTeam)}>
          <TeamBadge team={move.oldTeam} />
        </button>
        <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
        <button onClick={() => onTeamClick(move.newTeam)}>
          <TeamBadge team={move.newTeam} />
        </button>
      </div>
    </div>
  );
};

const SeasonMoves = ({ 
  season, 
  moves, 
  onPlayerClick, 
  onTeamClick,
  isUpcoming = false
}: { 
  season: string; 
  moves: RosterMove[];
  onPlayerClick: (name: string) => void;
  onTeamClick: (name: string) => void;
  isUpcoming?: boolean;
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            Season {season}
          </h3>
        </div>
        {isUpcoming && (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            Upcoming
          </Badge>
        )}
        <Badge variant="secondary" className="ml-auto">
          {moves.length} move{moves.length !== 1 ? 's' : ''}
        </Badge>
      </div>
      
      <div className="grid gap-2">
        {moves.map((move, idx) => (
          <MoveCard 
            key={`${move.player}-${move.season}-${idx}`} 
            move={move} 
            onPlayerClick={onPlayerClick}
            onTeamClick={onTeamClick}
          />
        ))}
      </div>
    </div>
  );
};

export const RosterMovesSection = ({ onPlayerClick, onTeamClick }: RosterMovesSectionProps) => {
  const seasons = useMemo(() => getSeasons(), []);
  const [activeTab, setActiveTab] = useState<string>("all");

  const stats = useMemo(() => {
    const teamCounts: Record<string, { incoming: number; outgoing: number }> = {};
    
    rosterMoves.forEach(move => {
      if (!teamCounts[move.oldTeam]) {
        teamCounts[move.oldTeam] = { incoming: 0, outgoing: 0 };
      }
      if (!teamCounts[move.newTeam]) {
        teamCounts[move.newTeam] = { incoming: 0, outgoing: 0 };
      }
      teamCounts[move.oldTeam].outgoing++;
      teamCounts[move.newTeam].incoming++;
    });

    const mostActive = Object.entries(teamCounts)
      .map(([team, counts]) => ({ team, total: counts.incoming + counts.outgoing, ...counts }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    return {
      totalMoves: rosterMoves.length,
      totalSeasons: seasons.length,
      mostActive,
    };
  }, [seasons]);

  const filteredMoves = useMemo(() => {
    if (activeTab === "all") {
      return seasons.map(season => ({
        season,
        moves: getMovesBySeason(season),
        isUpcoming: season === "708"
      }));
    }
    return [{
      season: activeTab,
      moves: getMovesBySeason(activeTab),
      isUpcoming: activeTab === "708"
    }];
  }, [activeTab, seasons]);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card/50 border border-border/50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs">Total Moves</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.totalMoves}</p>
        </div>
        
        <div className="bg-card/50 border border-border/50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Calendar className="h-4 w-4" />
            <span className="text-xs">Seasons Tracked</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.totalSeasons}</p>
        </div>
        
        <div className="bg-card/50 border border-border/50 rounded-lg p-4 col-span-2">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Users className="h-4 w-4" />
            <span className="text-xs">Most Active Teams</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {stats.mostActive.slice(0, 3).map(({ team, total }) => (
              <button key={team} onClick={() => onTeamClick(team)}>
                <Badge variant="secondary" className="gap-1">
                  <TeamBadge team={team} />
                  <span className="text-muted-foreground">({total})</span>
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Season Filter Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
          <TabsTrigger value="all" className="text-xs md:text-sm">
            All Seasons
          </TabsTrigger>
          {seasons.map(season => (
            <TabsTrigger 
              key={season} 
              value={season} 
              className="text-xs md:text-sm"
            >
              {season}
              {season === "708" && (
                <span className="ml-1 text-[10px] text-primary">★</span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-8">
            {filteredMoves.map(({ season, moves, isUpcoming }) => (
              <SeasonMoves
                key={season}
                season={season}
                moves={moves}
                onPlayerClick={onPlayerClick}
                onTeamClick={onTeamClick}
                isUpcoming={isUpcoming}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
