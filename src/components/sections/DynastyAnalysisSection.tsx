import { useMemo } from "react";
import { pastTeamStandings, pastStandings, seasons, getTeamClass, apexDetailed } from "@/data/corefallData";
import { Crown, TrendingUp, Star, Trophy } from "lucide-react";

interface DynastyAnalysisSectionProps {
  onPlayerClick: (name: string) => void;
  onTeamClick: (name: string) => void;
}

interface EraData {
  name: string;
  years: string[];
  dominantTeam: string;
  dominantTeamPoints: number;
  dominantTeamTitles: number;
  keyPlayer: string;
  keyPlayerPoints: number;
  teamRankings: { team: string; points: number; titles: number; avgRank: number }[];
}

export const DynastyAnalysisSection = ({ onPlayerClick, onTeamClick }: DynastyAnalysisSectionProps) => {
  // Define eras
  const eras: { name: string; years: string[]; description: string }[] = [
    { name: "The Jonkan Era", years: ["679", "680", "681", "682"], description: "Prince Jonkan's dominance" },
    { name: "The Golden Age", years: ["683", "684", "685", "686"], description: "Spade Faxzin & Vibrant Yaul rise" },
    { name: "The Snow Dynasty", years: ["687", "688", "689", "690", "691", "692"], description: "Snow Masogoto & Soler Varo rivalry" },
    { name: "The Transition", years: ["693", "694", "695", "696", "697"], description: "Multiple champions emerge" },
    { name: "The Phoenix Era", years: ["698", "699", "700", "701"], description: "Pheonix Oliv's reign" },
    { name: "The Modern Era", years: ["702", "703", "704", "705"], description: "Gastro & Rain Lieryon ascend" },
    { name: "The New Order", years: ["706", "707", "708"], description: "Cascade Juner's championship run" },
  ];

  // Calculate era statistics
  const eraStats = useMemo(() => {
    return eras.map(era => {
      const teamPoints: Record<string, number> = {};
      const teamTitles: Record<string, number> = {};
      const teamRanks: Record<string, number[]> = {};
      const playerPoints: Record<string, { points: number; team: string }> = {};

      era.years.forEach(year => {
        // Team standings
        const standings = pastTeamStandings[year];
        if (standings) {
          standings.forEach((t, idx) => {
            teamPoints[t.team] = (teamPoints[t.team] || 0) + t.points;
            if (!teamRanks[t.team]) teamRanks[t.team] = [];
            teamRanks[t.team].push(idx + 1);
          });
        }

        // Apex titles
        const seasonInfo = seasons.find(s => s.year.toString() === year);
        if (seasonInfo) {
          teamTitles[seasonInfo.team] = (teamTitles[seasonInfo.team] || 0) + 1;
        }

        // Player points
        const players = pastStandings[year];
        if (players) {
          players.forEach(p => {
            if (!playerPoints[p.Name]) {
              playerPoints[p.Name] = { points: 0, team: p.Team };
            }
            playerPoints[p.Name].points += p.Points;
            playerPoints[p.Name].team = p.Team; // Use most recent team
          });
        }
      });

      // Calculate team rankings
      const teamRankings = Object.entries(teamPoints)
        .map(([team, points]) => ({
          team,
          points,
          titles: teamTitles[team] || 0,
          avgRank: teamRanks[team] ? teamRanks[team].reduce((a, b) => a + b, 0) / teamRanks[team].length : 99
        }))
        .sort((a, b) => b.points - a.points)
        .slice(0, 5);

      // Find dominant team (most titles, then most points)
      const dominantTeam = teamRankings.reduce((best, curr) => {
        if (curr.titles > best.titles) return curr;
        if (curr.titles === best.titles && curr.points > best.points) return curr;
        return best;
      }, teamRankings[0]);

      // Find key player
      const sortedPlayers = Object.entries(playerPoints)
        .sort((a, b) => b[1].points - a[1].points);
      const keyPlayer = sortedPlayers[0];

      return {
        ...era,
        dominantTeam: dominantTeam?.team || "Unknown",
        dominantTeamPoints: dominantTeam?.points || 0,
        dominantTeamTitles: dominantTeam?.titles || 0,
        keyPlayer: keyPlayer?.[0] || "Unknown",
        keyPlayerPoints: keyPlayer?.[1].points || 0,
        teamRankings
      };
    });
  }, []);

  // Calculate team dynasties (consecutive Apex championships from seasons 679-708)
  const dynasties = useMemo(() => {
    const sortedSeasons = [...seasons].sort((a, b) => a.year - b.year);
    const dynastyList: { team: string; startYear: number; endYear: number; years: number; titles: number; players: string[] }[] = [];
    
    let currentTeam = "";
    let startYear = 0;
    let consecutiveTitles = 0;
    let dynastyPlayers: Set<string> = new Set();

    sortedSeasons.forEach((season, idx) => {
      const champTeam = season.team;

      if (champTeam === currentTeam) {
        consecutiveTitles++;
        dynastyPlayers.add(season.apex);
      } else {
        if (consecutiveTitles >= 2) {
          dynastyList.push({
            team: currentTeam,
            startYear,
            endYear: sortedSeasons[idx - 1].year,
            years: consecutiveTitles,
            titles: consecutiveTitles,
            players: Array.from(dynastyPlayers)
          });
        }
        currentTeam = champTeam;
        startYear = season.year;
        consecutiveTitles = 1;
        dynastyPlayers = new Set([season.apex]);
      }
    });

    // Don't forget the last streak
    if (consecutiveTitles >= 2) {
      dynastyList.push({
        team: currentTeam,
        startYear,
        endYear: sortedSeasons[sortedSeasons.length - 1].year,
        years: consecutiveTitles,
        titles: consecutiveTitles,
        players: Array.from(dynastyPlayers)
      });
    }

    return dynastyList.sort((a, b) => b.titles - a.titles);
  }, []);

  // Apex champions by team
  const apexByTeam = useMemo(() => {
    const teamChamps: Record<string, { player: string; year: number }[]> = {};
    
    apexDetailed.forEach(match => {
      if (!teamChamps[match.wTeam]) {
        teamChamps[match.wTeam] = [];
      }
      teamChamps[match.wTeam].push({ player: match.win, year: match.year });
    });

    return Object.entries(teamChamps)
      .map(([team, champs]) => ({ team, champs: champs.sort((a, b) => b.year - a.year), count: champs.length }))
      .sort((a, b) => b.count - a.count);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">Dynasty Analysis</h2>
        <p className="text-muted-foreground text-xs md:text-base">Explore the golden eras and dominant teams throughout Corefall history.</p>
      </div>

      {/* Dynasty Streaks */}
      <div className="bg-card rounded-lg border border-border p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Crown className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-semibold text-foreground">Dynasty Runs</h3>
          <span className="text-xs text-muted-foreground">(Consecutive Apex Championships, 679-708)</span>
        </div>
        
        {dynasties.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {dynasties.map((dynasty, idx) => (
              <div 
                key={idx}
                className="bg-muted/30 rounded-lg p-4 border border-border/50 hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => onTeamClick(dynasty.team)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`team-tag ${getTeamClass(dynasty.team)}`}>{dynasty.team}</span>
                  <span className="text-xs text-muted-foreground">{dynasty.startYear}-{dynasty.endYear}</span>
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-500">{dynasty.titles}</div>
                    <div className="text-[10px] text-muted-foreground">Consecutive Titles</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {dynasty.players.map((player, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={(e) => { e.stopPropagation(); onPlayerClick(player); }}
                      className="text-[10px] bg-background/50 border border-border/50 px-1.5 py-0.5 rounded hover:bg-primary/20 hover:border-primary/50 transition-colors"
                    >
                      {player.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No dynasty runs (2+ consecutive titles) found.</p>
        )}
      </div>

      {/* Era Timeline */}
      <div className="bg-card rounded-lg border border-border p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Historical Eras</h3>
        </div>

        <div className="space-y-4">
          {eraStats.map((era, idx) => (
            <div key={idx} className="relative">
              {/* Era Header */}
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{era.name}</h4>
                    <p className="text-xs text-muted-foreground">{era.years[0]}-{era.years[era.years.length - 1]} • {era.description}</p>
                  </div>
                </div>
              </div>

              {/* Era Stats */}
              <div className="ml-10 grid gap-3 md:grid-cols-2">
                {/* Dominant Team */}
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="text-xs text-muted-foreground mb-1">Dominant Team</div>
                  <div className="flex items-center justify-between">
                    <span 
                      onClick={() => onTeamClick(era.dominantTeam)}
                      className={`team-tag cursor-pointer ${getTeamClass(era.dominantTeam)}`}
                    >
                      {era.dominantTeam}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{era.dominantTeamPoints.toLocaleString()} pts</span>
                      {era.dominantTeamTitles > 0 && (
                        <span className="flex items-center gap-1 text-yellow-500 text-xs">
                          <Trophy className="w-3 h-3" />
                          {era.dominantTeamTitles}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Key Player */}
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="text-xs text-muted-foreground mb-1">Top Scorer</div>
                  <div className="flex items-center justify-between">
                    <span 
                      onClick={() => onPlayerClick(era.keyPlayer)}
                      className="text-primary hover:underline cursor-pointer font-medium"
                    >
                      {era.keyPlayer}
                    </span>
                    <span className="text-xs text-muted-foreground">{era.keyPlayerPoints.toLocaleString()} pts</span>
                  </div>
                </div>
              </div>

              {/* Team Rankings */}
              <div className="ml-10 mt-2">
                <div className="flex flex-wrap gap-1">
                  {era.teamRankings.slice(0, 5).map((t, tIdx) => (
                    <button
                      key={t.team}
                      onClick={() => onTeamClick(t.team)}
                      className={`text-[10px] px-2 py-0.5 rounded transition-opacity ${
                        tIdx === 0 ? 'opacity-100' : tIdx === 1 ? 'opacity-80' : 'opacity-60'
                      } ${getTeamClass(t.team)}`}
                    >
                      #{tIdx + 1} {t.team}
                    </button>
                  ))}
                </div>
              </div>

              {/* Connector line */}
              {idx < eraStats.length - 1 && (
                <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-border -mb-4" style={{ height: 'calc(100% - 20px)' }}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Championship Dynasties by Team */}
      <div className="bg-card rounded-lg border border-border p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-semibold text-foreground">Apex Championships by Team</h3>
        </div>

        <div className="space-y-3">
          {apexByTeam.slice(0, 10).map((teamData, idx) => (
            <div key={teamData.team} className="bg-muted/30 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-muted-foreground w-6">{idx + 1}</span>
                  <span 
                    onClick={() => onTeamClick(teamData.team)}
                    className={`team-tag cursor-pointer ${getTeamClass(teamData.team)}`}
                  >
                    {teamData.team}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Trophy className="w-4 h-4" />
                  <span className="font-bold">{teamData.count}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1.5 ml-8">
                {teamData.champs.map((champ, cIdx) => (
                  <button
                    key={cIdx}
                    onClick={() => onPlayerClick(champ.player)}
                    className="text-[10px] bg-background/50 border border-border/50 px-2 py-0.5 rounded hover:bg-primary/20 hover:border-primary/50 transition-colors"
                  >
                    {champ.player.split(' ')[0]} <span className="text-muted-foreground">'{String(champ.year).slice(-2)}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Timeline Bar */}
      <div className="bg-card rounded-lg border border-border p-4 md:p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Era Timeline</h3>
        <div className="relative h-12 bg-muted/30 rounded-lg overflow-hidden">
          {eraStats.map((era, idx) => {
            const totalYears = 30; // 679-708
            const startOffset = (parseInt(era.years[0]) - 679) / totalYears * 100;
            const width = era.years.length / totalYears * 100;
            const colors = [
              'bg-purple-500/70',
              'bg-blue-500/70',
              'bg-cyan-500/70',
              'bg-green-500/70',
              'bg-yellow-500/70',
              'bg-orange-500/70',
              'bg-red-500/70'
            ];
            
            return (
              <div
                key={idx}
                className={`absolute h-full ${colors[idx]} flex items-center justify-center text-[10px] font-medium text-white transition-all hover:brightness-110 cursor-pointer`}
                style={{ left: `${startOffset}%`, width: `${width}%` }}
                title={`${era.name} (${era.years[0]}-${era.years[era.years.length - 1]})`}
              >
                <span className="truncate px-1">{era.name.split(' ').slice(-1)}</span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>679</span>
          <span>708</span>
        </div>
      </div>
    </div>
  );
};
