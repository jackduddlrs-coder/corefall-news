import { useState } from "react";
import { pastStandings, trophyData, getTeamClass } from "@/data/corefallData";
import { playerTournamentResults, tournamentNames } from "@/data/tournamentResults";
import { ChevronDown, ChevronRight } from "lucide-react";

interface PlayerModalProps {
  playerName: string;
  onClose: () => void;
}

export function PlayerModal({ playerName, onClose }: PlayerModalProps) {
  const [expandedSeasons, setExpandedSeasons] = useState<Set<number>>(new Set());

  let careerPoints = 0;
  let careerKOs = 0;
  let yearsActive = 0;
  let apexAppearances = 0;
  const seasonHistory: { year: number; team: string; rank: number; points: number; ko: number }[] = [];

  // Gather History from Archives (700-707)
  Object.keys(pastStandings).forEach(year => {
    const pData = pastStandings[year].find(p => p.Name === playerName);
    if (pData) {
      seasonHistory.push({
        year: parseInt(year),
        team: pData.Team,
        rank: pData.Rank,
        points: pData.Points,
        ko: pData.KOs
      });
      careerPoints += pData.Points;
      careerKOs += pData.KOs;
      yearsActive++;
      if (pData.Rank <= 16) {
        apexAppearances++;
      }
    }
  });

  seasonHistory.sort((a, b) => b.year - a.year);

  const isActive = seasonHistory.some(s => s.year === 707);
  const trophies = trophyData.find(t => t.name === playerName);

  const toggleSeason = (year: number) => {
    const newExpanded = new Set(expandedSeasons);
    if (newExpanded.has(year)) {
      newExpanded.delete(year);
    } else {
      newExpanded.add(year);
    }
    setExpandedSeasons(newExpanded);
  };

  const getPlayerTournamentData = (year: number) => {
    const yearStr = year.toString();
    const seasonData = playerTournamentResults[yearStr];
    if (!seasonData) return null;
    const playerData = seasonData[playerName];
    if (!playerData) return null;
    return { tournaments: tournamentNames[yearStr] || [], results: playerData };
  };

  return (
    <div 
      className="fixed inset-0 bg-black/85 z-[1000] flex justify-center items-center backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-panel w-[90%] max-w-[700px] rounded-xl border border-border shadow-[0_0_30px_rgba(0,212,255,0.2)] max-h-[90vh] overflow-y-auto animate-cardPop"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-gradient-to-br from-[#111] to-[#222] p-8 border-b-2 border-primary flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-wider text-white m-0">{playerName}</h2>
            <span className={isActive ? "text-primary font-bold" : "text-muted-foreground font-bold"}>
              {isActive ? "Active (Season 707)" : "Inactive / Retired"}
            </span>
          </div>
          <button 
            className="bg-transparent border-none text-white text-3xl cursor-pointer transition-transform hover:text-secondary hover:rotate-90"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        
        <div className="p-8">
          <div className="text-primary border-b border-border pb-2 mb-4 text-sm uppercase font-bold tracking-wider">
            Career Honors
          </div>
          <div className="mb-8">
            {trophies ? (
              <>
                {Array(trophies.apex).fill(0).map((_, i) => (
                  <span key={`apex-${i}`} className="award-badge award-apex">🏆 Apex Champion</span>
                ))}
                {Array(trophies.ctt).fill(0).map((_, i) => (
                  <span key={`ctt-${i}`} className="award-badge award-ctt">🛡️ CTT Winner</span>
                ))}
                {trophies.major > 0 && (
                  <span className="award-badge award-major">⚔️ {trophies.major} Major Titles</span>
                )}
                {trophies.list && (
                  <div className="mt-2 text-sm text-muted-foreground">{trophies.list}</div>
                )}
              </>
            ) : (
              <span className="text-muted-foreground">No recorded major titles since 700.</span>
            )}
          </div>

          <div className="text-primary border-b border-border pb-2 mb-4 text-sm uppercase font-bold tracking-wider">
            Career Totals (700-707)
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-background p-4 rounded-lg border border-border text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Total Points</div>
              <div className="text-2xl text-white font-bold mt-1">{careerPoints.toLocaleString()}</div>
            </div>
            <div className="bg-background p-4 rounded-lg border border-border text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Career KOs</div>
              <div className="text-2xl text-white font-bold mt-1">{careerKOs}</div>
            </div>
            <div className="bg-background p-4 rounded-lg border border-border text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Apex Apps</div>
              <div className="text-2xl text-white font-bold mt-1">{apexAppearances}</div>
            </div>
            <div className="bg-background p-4 rounded-lg border border-border text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Years Active</div>
              <div className="text-2xl text-white font-bold mt-1">{yearsActive}</div>
            </div>
          </div>

          <div className="text-primary border-b border-border pb-2 mb-4 text-sm uppercase font-bold tracking-wider">
            Season History & Tournament Results
          </div>
          <div className="overflow-x-auto bg-panel rounded-lg shadow-lg max-h-[400px] overflow-y-auto">
            <table className="w-full border-collapse text-sm min-w-[500px]">
              <thead>
                <tr>
                  <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">Year</th>
                  <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">Team</th>
                  <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">Rank</th>
                  <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">Points</th>
                  <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">KOs</th>
                </tr>
              </thead>
              <tbody>
                {seasonHistory.length > 0 ? seasonHistory.map(h => {
                  const tournamentData = getPlayerTournamentData(h.year);
                  const isExpanded = expandedSeasons.has(h.year);
                  const hasTournamentData = tournamentData !== null;
                  
                  return (
                    <>
                      <tr 
                        key={h.year} 
                        className={`border-b border-border hover:bg-muted/50 ${hasTournamentData ? 'cursor-pointer' : ''}`}
                        onClick={() => hasTournamentData && toggleSeason(h.year)}
                      >
                        <td className="p-3 text-primary font-bold">
                          <div className="flex items-center gap-2">
                            {hasTournamentData && (
                              isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                            )}
                            {h.year}
                          </div>
                        </td>
                        <td className="p-3"><span className={`team-tag ${getTeamClass(h.team)}`}>{h.team}</span></td>
                        <td className="p-3">#{h.rank}</td>
                        <td className="p-3">{h.points}</td>
                        <td className="p-3">{h.ko}</td>
                      </tr>
                      {isExpanded && tournamentData && (
                        <tr key={`${h.year}-tournaments`}>
                          <td colSpan={5} className="p-0 bg-background/50">
                            <div className="p-4">
                              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-bold">
                                Tournament Results - Season {h.year}
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                {tournamentData.tournaments.map(tournament => {
                                  const result = tournamentData.results[tournament];
                                  if (!result) return null;
                                  
                                  const isWin = result.finish === "1st";
                                  const isTop3 = result.finish === "2nd" || result.finish === "3rd";
                                  
                                  return (
                                    <div 
                                      key={tournament}
                                      className={`p-2 rounded border text-center ${
                                        isWin ? 'bg-primary/20 border-primary' : 
                                        isTop3 ? 'bg-secondary/20 border-secondary' : 
                                        'bg-muted/20 border-border'
                                      }`}
                                    >
                                      <div className="text-xs font-bold text-foreground truncate">{tournament}</div>
                                      <div className={`text-sm font-bold ${isWin ? 'text-primary' : isTop3 ? 'text-secondary' : 'text-muted-foreground'}`}>
                                        {result.finish}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        {result.points}pts / {result.kos}KO
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                }) : (
                  <tr>
                    <td colSpan={5} className="p-3 text-muted-foreground">No detailed season records found (Pre-700 or Inactive).</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
