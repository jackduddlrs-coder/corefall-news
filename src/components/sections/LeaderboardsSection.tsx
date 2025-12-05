import { useState, useMemo } from "react";
import { pastStandings, getTeamClass } from "@/data/corefallData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronUp, ChevronDown } from "lucide-react";

interface LeaderboardsSectionProps {
  onPlayerClick: (name: string) => void;
  onTeamClick: (name: string) => void;
}

type LeaderboardType = "single-points" | "all-time-points" | "single-kos" | "all-time-kos";

interface PlayerStats {
  name: string;
  team: string;
  value: number;
  season?: string;
}

export const LeaderboardsSection = ({ onPlayerClick, onTeamClick }: LeaderboardsSectionProps) => {
  const [activeTab, setActiveTab] = useState<LeaderboardType>("single-points");

  // Calculate all leaderboards from pastStandings data
  const leaderboards = useMemo(() => {
    const allPlayers: { name: string; team: string; points: number; kos: number; season: string }[] = [];
    
    Object.entries(pastStandings).forEach(([season, players]) => {
      players.forEach(player => {
        allPlayers.push({
          name: player.Name,
          team: player.Team,
          points: player.Points,
          kos: player.KOs,
          season
        });
      });
    });

    // Single season points (best individual season)
    const singleSeasonPoints: PlayerStats[] = [...allPlayers]
      .sort((a, b) => b.points - a.points)
      .slice(0, 50)
      .map(p => ({ name: p.name, team: p.team, value: p.points, season: p.season }));

    // All-time points (sum across all seasons)
    const playerTotalPoints: Record<string, { team: string; total: number }> = {};
    allPlayers.forEach(p => {
      if (!playerTotalPoints[p.name]) {
        playerTotalPoints[p.name] = { team: p.team, total: 0 };
      }
      playerTotalPoints[p.name].total += p.points;
      playerTotalPoints[p.name].team = p.team; // Use most recent team
    });
    const allTimePoints: PlayerStats[] = Object.entries(playerTotalPoints)
      .map(([name, data]) => ({ name, team: data.team, value: data.total }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 50);

    // Single season KOs (best individual season)
    const singleSeasonKOs: PlayerStats[] = [...allPlayers]
      .sort((a, b) => b.kos - a.kos)
      .slice(0, 50)
      .map(p => ({ name: p.name, team: p.team, value: p.kos, season: p.season }));

    // All-time KOs (sum across all seasons)
    const playerTotalKOs: Record<string, { team: string; total: number }> = {};
    allPlayers.forEach(p => {
      if (!playerTotalKOs[p.name]) {
        playerTotalKOs[p.name] = { team: p.team, total: 0 };
      }
      playerTotalKOs[p.name].total += p.kos;
      playerTotalKOs[p.name].team = p.team;
    });
    const allTimeKOs: PlayerStats[] = Object.entries(playerTotalKOs)
      .map(([name, data]) => ({ name, team: data.team, value: data.total }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 50);

    return {
      "single-points": singleSeasonPoints,
      "all-time-points": allTimePoints,
      "single-kos": singleSeasonKOs,
      "all-time-kos": allTimeKOs
    };
  }, []);

  const getTitle = (type: LeaderboardType) => {
    switch (type) {
      case "single-points": return "Most Single Season Points";
      case "all-time-points": return "All-Time Career Points";
      case "single-kos": return "Most Single Season KOs";
      case "all-time-kos": return "All-Time Career KOs";
    }
  };

  const getValueLabel = (type: LeaderboardType) => {
    return type.includes("points") ? "Points" : "KOs";
  };

  const renderLeaderboard = (type: LeaderboardType) => {
    const data = leaderboards[type];
    const showSeason = type === "single-points" || type === "single-kos";

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold w-12">#</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold">Player</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold hidden sm:table-cell">Team</th>
              {showSeason && (
                <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold hidden md:table-cell">Season</th>
              )}
              <th className="text-right p-2 md:p-3 text-muted-foreground font-semibold">{getValueLabel(type)}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((player, index) => (
              <tr key={`${player.name}-${player.season || index}`} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="p-2 md:p-3 text-muted-foreground font-mono">{index + 1}</td>
                <td className="p-2 md:p-3">
                  <span
                    onClick={() => onPlayerClick(player.name)}
                    className="text-primary hover:underline cursor-pointer font-medium"
                  >
                    {player.name}
                  </span>
                  <span 
                    onClick={() => onTeamClick(player.team)}
                    className={`ml-2 text-xs px-1.5 py-0.5 rounded cursor-pointer sm:hidden ${getTeamClass(player.team)}`}
                  >
                    {player.team}
                  </span>
                </td>
                <td className="p-2 md:p-3 hidden sm:table-cell">
                  <span 
                    onClick={() => onTeamClick(player.team)}
                    className={`text-xs px-2 py-1 rounded cursor-pointer hover:opacity-80 transition-opacity ${getTeamClass(player.team)}`}
                  >
                    {player.team}
                  </span>
                </td>
                {showSeason && (
                  <td className="p-2 md:p-3 text-muted-foreground hidden md:table-cell">{player.season}</td>
                )}
                <td className="p-2 md:p-3 text-right font-bold text-foreground">{player.value.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Leaderboards</h2>
        <p className="text-muted-foreground text-sm md:text-base">All-time records and single season bests from seasons 700-707.</p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as LeaderboardType)} className="w-full">
        <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
          <TabsTrigger value="single-points" className="flex-1 min-w-[120px] text-xs md:text-sm py-2">
            Season Points
          </TabsTrigger>
          <TabsTrigger value="all-time-points" className="flex-1 min-w-[120px] text-xs md:text-sm py-2">
            Career Points
          </TabsTrigger>
          <TabsTrigger value="single-kos" className="flex-1 min-w-[120px] text-xs md:text-sm py-2">
            Season KOs
          </TabsTrigger>
          <TabsTrigger value="all-time-kos" className="flex-1 min-w-[120px] text-xs md:text-sm py-2">
            Career KOs
          </TabsTrigger>
        </TabsList>

        <div className="mt-4 bg-card rounded-lg border border-border p-2 md:p-4">
          <h3 className="text-lg md:text-xl font-semibold mb-4 text-foreground">{getTitle(activeTab)}</h3>
          
          <TabsContent value="single-points" className="mt-0">
            {renderLeaderboard("single-points")}
          </TabsContent>
          <TabsContent value="all-time-points" className="mt-0">
            {renderLeaderboard("all-time-points")}
          </TabsContent>
          <TabsContent value="single-kos" className="mt-0">
            {renderLeaderboard("single-kos")}
          </TabsContent>
          <TabsContent value="all-time-kos" className="mt-0">
            {renderLeaderboard("all-time-kos")}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
