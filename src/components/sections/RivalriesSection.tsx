import { useMemo } from "react";
import { h2hRecords } from "@/data/h2hData";
import { fullMatches, pastStandings, getTeamClass } from "@/data/corefallData";
import { Swords, Trophy, Flame } from "lucide-react";

interface RivalriesSectionProps {
  onPlayerClick: (name: string) => void;
  onTeamClick: (name: string) => void;
}

interface Rivalry {
  player1: string;
  player2: string;
  player1Wins: number;
  player2Wins: number;
  totalMatches: number;
  matchHistory: { year: string; round: string; winner: string; score: string }[];
}

export const RivalriesSection = ({ onPlayerClick, onTeamClick }: RivalriesSectionProps) => {
  // Get team where player scored the most points
  const getPlayerTeam = (playerName: string): string => {
    const teamPoints: Record<string, number> = {};
    Object.values(pastStandings).forEach(players => {
      const player = players.find(p => p.Name === playerName);
      if (player) {
        teamPoints[player.Team] = (teamPoints[player.Team] || 0) + player.Points;
      }
    });
    const sorted = Object.entries(teamPoints).sort((a, b) => b[1] - a[1]);
    return sorted[0]?.[0] || "Unknown";
  };

  // Aggregate H2H records into rivalries
  const rivalries = useMemo(() => {
    const rivalryMap: Record<string, { p1Wins: number; p2Wins: number }> = {};

    h2hRecords.forEach(record => {
      // Create a consistent key (alphabetically sorted)
      const [first, second] = [record.fighter, record.opponent].sort();
      const key = `${first}|${second}`;

      if (!rivalryMap[key]) {
        rivalryMap[key] = { p1Wins: 0, p2Wins: 0 };
      }

      // Add wins to the correct player
      if (record.fighter === first) {
        rivalryMap[key].p1Wins += record.wins;
      } else {
        rivalryMap[key].p2Wins += record.wins;
      }
    });

    // Convert to array and add match history
    const rivalryList: Rivalry[] = Object.entries(rivalryMap)
      .map(([key, data]) => {
        const [player1, player2] = key.split("|");
        
        // Get match history from fullMatches
        const matchHistory: { year: string; round: string; winner: string; score: string }[] = [];
        
        Object.entries(fullMatches).forEach(([year, matches]) => {
          matches.forEach(m => {
            const matchStr = m.match.replace(/\s*\(Group [AB]\)$/, '');
            const vsIndex = matchStr.indexOf(' vs ');
            if (vsIndex === -1) return;

            const leftPart = matchStr.substring(0, vsIndex);
            const loser = matchStr.substring(vsIndex + 4).trim();

            const scoreMatch = leftPart.match(/^(.+?)\s*\(([^)]+)\)$/);
            if (!scoreMatch) return;

            const winner = scoreMatch[1].trim();
            const score = scoreMatch[2];

            if ((winner === player1 && loser === player2) || (winner === player2 && loser === player1)) {
              matchHistory.push({ year, round: m.round, winner, score });
            }
          });
        });

        // Sort by year desc
        matchHistory.sort((a, b) => parseInt(b.year) - parseInt(a.year));

        return {
          player1,
          player2,
          player1Wins: data.p1Wins,
          player2Wins: data.p2Wins,
          totalMatches: data.p1Wins + data.p2Wins,
          matchHistory
        };
      })
      .filter(r => r.totalMatches >= 3) // Only show rivalries with 3+ matches
      .sort((a, b) => b.totalMatches - a.totalMatches);

    return rivalryList;
  }, []);

  // Get round display name
  const getRoundName = (round: string) => {
    const names: Record<string, string> = {
      'Finals': 'Finals',
      'SF': 'Semis',
      'QF': 'Quarters',
      'R16': 'R16',
      'UBR1': 'UB R1',
      'LBR1': 'LB R1',
      'UBSF': 'UB SF',
      'LBSF': 'LB SF',
      'UBQF': 'UB QF',
      'LBQF': 'LB QF',
      'UBF': 'UB Final',
      'LBF': 'LB Final'
    };
    return names[round] || round;
  };

  // Identify rivalry intensity
  const getRivalryIntensity = (totalMatches: number): { label: string; color: string } => {
    if (totalMatches >= 6) return { label: "Legendary", color: "text-yellow-500" };
    if (totalMatches >= 5) return { label: "Intense", color: "text-orange-500" };
    if (totalMatches >= 4) return { label: "Heated", color: "text-red-500" };
    return { label: "Notable", color: "text-primary" };
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">Historical Rivalries</h2>
        <p className="text-muted-foreground text-xs md:text-sm">Players who have faced each other multiple times in tournaments (Apex + Majors).</p>
      </div>

      {/* Top Rivalries */}
      <div className="space-y-4">
        {rivalries.slice(0, 15).map((rivalry, idx) => {
          const intensity = getRivalryIntensity(rivalry.totalMatches);
          const team1 = getPlayerTeam(rivalry.player1);
          const team2 = getPlayerTeam(rivalry.player2);
          const p1Dominant = rivalry.player1Wins > rivalry.player2Wins;
          const p2Dominant = rivalry.player2Wins > rivalry.player1Wins;
          const tied = rivalry.player1Wins === rivalry.player2Wins;

          return (
            <div key={idx} className="bg-card rounded-lg border border-border overflow-hidden">
              {/* Rivalry Header */}
              <div className="p-4 bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Flame className={`w-4 h-4 ${intensity.color}`} />
                    <span className={`text-xs font-semibold ${intensity.color}`}>{intensity.label} Rivalry</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{rivalry.totalMatches} Tournament Meetings</span>
                </div>

                {/* Players & Score */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 text-right">
                    <button
                      onClick={() => onPlayerClick(rivalry.player1)}
                      className={`font-bold hover:text-primary transition-colors ${p1Dominant ? 'text-green-500' : tied ? 'text-foreground' : 'text-foreground'}`}
                    >
                      {rivalry.player1}
                    </button>
                    <div className="mt-1">
                      <span 
                        onClick={() => onTeamClick(team1)}
                        className={`text-[10px] px-1.5 py-0.5 rounded cursor-pointer ${getTeamClass(team1)}`}
                      >
                        {team1}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-4">
                    <span className={`text-2xl font-bold ${p1Dominant ? 'text-green-500' : 'text-foreground'}`}>
                      {rivalry.player1Wins}
                    </span>
                    <Swords className="w-5 h-5 text-muted-foreground" />
                    <span className={`text-2xl font-bold ${p2Dominant ? 'text-green-500' : 'text-foreground'}`}>
                      {rivalry.player2Wins}
                    </span>
                  </div>

                  <div className="flex-1 text-left">
                    <button
                      onClick={() => onPlayerClick(rivalry.player2)}
                      className={`font-bold hover:text-primary transition-colors ${p2Dominant ? 'text-green-500' : tied ? 'text-foreground' : 'text-foreground'}`}
                    >
                      {rivalry.player2}
                    </button>
                    <div className="mt-1">
                      <span 
                        onClick={() => onTeamClick(team2)}
                        className={`text-[10px] px-1.5 py-0.5 rounded cursor-pointer ${getTeamClass(team2)}`}
                      >
                        {team2}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Match History */}
              <div className="p-3 border-t border-border/50">
                <div className="flex flex-wrap gap-1.5">
                  {rivalry.matchHistory.map((match, mIdx) => {
                    const p1Won = match.winner === rivalry.player1;
                    return (
                      <div
                        key={mIdx}
                        className={`text-[10px] px-2 py-1 rounded border ${
                          p1Won 
                            ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                            : 'bg-red-500/10 border-red-500/30 text-red-400'
                        }`}
                        title={`${match.winner} won (${match.score})`}
                      >
                        <span className="font-semibold">{match.year}</span>
                        <span className="text-muted-foreground ml-1">{getRoundName(match.round)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Notable Finals Matchups */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <h3 className="font-semibold text-foreground">Repeat Finals Matchups</h3>
        </div>

        <div className="space-y-2">
          {rivalries
            .filter(r => r.matchHistory.some(m => m.round === 'Finals'))
            .filter(r => r.matchHistory.filter(m => m.round === 'Finals').length >= 2)
            .map((rivalry, idx) => {
              const finalsMatches = rivalry.matchHistory.filter(m => m.round === 'Finals');
              const team1 = getPlayerTeam(rivalry.player1);
              const team2 = getPlayerTeam(rivalry.player2);

              return (
                <div key={idx} className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onPlayerClick(rivalry.player1)}
                      className="text-sm font-medium hover:text-primary"
                    >
                      {rivalry.player1}
                    </button>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${getTeamClass(team1)}`}>{team1}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-green-500 font-bold">
                      {finalsMatches.filter(m => m.winner === rivalry.player1).length}
                    </span>
                    <span className="text-muted-foreground">Finals</span>
                    <span className="text-green-500 font-bold">
                      {finalsMatches.filter(m => m.winner === rivalry.player2).length}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${getTeamClass(team2)}`}>{team2}</span>
                    <button
                      onClick={() => onPlayerClick(rivalry.player2)}
                      className="text-sm font-medium hover:text-primary"
                    >
                      {rivalry.player2}
                    </button>
                  </div>
                </div>
              );
            })}
          
          {rivalries.filter(r => r.matchHistory.filter(m => m.round === 'Finals').length >= 2).length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-2">No repeat Finals matchups found.</p>
          )}
        </div>
      </div>
    </div>
  );
};
