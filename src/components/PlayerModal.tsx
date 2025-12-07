import React, { useState, useMemo } from "react";
import { pastStandings, trophyData, getTeamClass, seasons } from "@/data/corefallData";
import { playerTournamentResults, tournamentNames } from "@/data/tournamentResults";
import { ChevronDown, ChevronRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface PlayerModalProps {
  playerName: string;
  onClose: () => void;
}

export function PlayerModal({ playerName, onClose }: PlayerModalProps) {
  const [expandedSeasons, setExpandedSeasons] = useState<Set<number>>(new Set());

  // Gather all season history first
  const seasonHistory = useMemo(() => {
    const history: { year: number; team: string; rank: number; points: number; ko: number }[] = [];
    Object.keys(pastStandings).forEach(year => {
      const pData = pastStandings[year].find(p => p.Name === playerName);
      if (pData) {
        history.push({
          year: parseInt(year),
          team: pData.Team,
          rank: pData.Rank,
          points: pData.Points,
          ko: pData.KOs
        });
      }
    });
    return history.sort((a, b) => b.year - a.year);
  }, [playerName]);

  // Initialize selected years with all years the player was active
  const [selectedYears, setSelectedYears] = useState<Set<number>>(() => 
    new Set(seasonHistory.map(s => s.year))
  );

  // Calculate career totals based on selected years
  const careerTotals = useMemo(() => {
    let points = 0;
    let kos = 0;
    let totalRanks = 0;
    let apexApps = 0;
    let count = 0;

    seasonHistory.forEach(s => {
      if (selectedYears.has(s.year)) {
        points += s.points;
        kos += s.ko;
        totalRanks += s.rank;
        count++;
        // Exclude 708 from Apex appearances until season is complete
        if (s.rank <= 16 && s.year !== 708) apexApps++;
      }
    });

    return {
      points,
      kos,
      avgFinish: count > 0 ? (totalRanks / count).toFixed(1) : '-',
      apexApps,
      yearsActive: count
    };
  }, [seasonHistory, selectedYears]);

  const isActive = seasonHistory.some(s => s.year === 707);
  const trophies = trophyData.find(t => t.name === playerName);
  
  // Get Season Star awards
  const seasonStars = useMemo(() => {
    return seasons.filter(s => s.star === playerName).map(s => s.year);
  }, [playerName]);

  const toggleYear = (year: number) => {
    const newSelected = new Set(selectedYears);
    if (newSelected.has(year)) {
      if (newSelected.size > 1) { // Keep at least one year selected
        newSelected.delete(year);
      }
    } else {
      newSelected.add(year);
    }
    setSelectedYears(newSelected);
  };

  const selectAllYears = () => {
    setSelectedYears(new Set(seasonHistory.map(s => s.year)));
  };

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

  const getYearRangeLabel = () => {
    if (selectedYears.size === seasonHistory.length) {
      return `(700-707)`;
    }
    const years = Array.from(selectedYears).sort();
    if (years.length === 1) return `(${years[0]})`;
    return `(${years.length} seasons)`;
  };

  return (
    <div 
      className="fixed inset-0 bg-black/85 z-[1000] flex justify-center items-center md:items-center backdrop-blur-sm p-2 md:p-4"
      onClick={onClose}
    >
      <div 
        className="bg-panel w-full md:w-[90%] max-w-[700px] rounded-xl border border-border shadow-[0_0_30px_rgba(0,212,255,0.2)] max-h-[95vh] md:max-h-[90vh] overflow-y-auto animate-cardPop"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-gradient-to-br from-[#111] to-[#222] p-4 md:p-8 border-b-2 border-primary flex justify-between items-center sticky top-0 z-20">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg md:text-2xl font-bold uppercase tracking-wider text-white m-0 truncate">{playerName}</h2>
            <span className={`text-xs md:text-sm ${isActive ? "text-primary font-bold" : "text-muted-foreground font-bold"}`}>
              {isActive ? "Active (707)" : "Inactive"}
            </span>
          </div>
          <button 
            className="bg-transparent border-none text-white text-2xl md:text-3xl cursor-pointer transition-transform hover:text-secondary hover:rotate-90 ml-2 shrink-0"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        
        <div className="p-4 md:p-8">
          <div className="text-primary border-b border-border pb-2 mb-3 text-xs md:text-sm uppercase font-bold tracking-wider">
            Career Honors
          </div>
          <div className="mb-6 md:mb-8 flex flex-wrap gap-1">
            {(trophies || seasonStars.length > 0) ? (
              <>
                {trophies && Array(trophies.apex).fill(0).map((_, i) => (
                  <span key={`apex-${i}`} className="award-badge award-apex text-xs">🏆 Apex</span>
                ))}
                {trophies && Array(trophies.ctt).fill(0).map((_, i) => (
                  <span key={`ctt-${i}`} className="award-badge award-ctt text-xs">🛡️ CTT</span>
                ))}
                {seasonStars.length > 0 && (
                  <span className="award-badge award-star text-xs">⭐ {seasonStars.length}x Star</span>
                )}
                {trophies && trophies.major > 0 && (
                  <span className="award-badge award-major text-xs">⚔️ {trophies.major} Majors</span>
                )}
                {seasonStars.length > 0 && (
                  <div className="w-full mt-2 text-xs text-muted-foreground">
                    Star: {seasonStars.join(", ")}
                  </div>
                )}
                {trophies?.list && (
                  <div className="w-full mt-1 text-xs text-muted-foreground">{trophies.list}</div>
                )}
              </>
            ) : (
              <span className="text-muted-foreground text-xs md:text-sm">No recorded major titles since 700.</span>
            )}
          </div>

          <div className="flex items-center justify-between border-b border-border pb-2 mb-3">
            <div className="text-primary text-xs md:text-sm uppercase font-bold tracking-wider">
              Career Totals {getYearRangeLabel()}
            </div>
            {selectedYears.size < seasonHistory.length && (
              <button 
                onClick={selectAllYears}
                className="text-xs text-primary hover:text-secondary transition-colors"
              >
                Reset
              </button>
            )}
          </div>
          
          {/* Year Filter */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {seasonHistory.map(s => (
              <button
                key={s.year}
                onClick={() => toggleYear(s.year)}
                className={`px-2 md:px-3 py-1 text-[10px] md:text-xs font-bold rounded border transition-all ${
                  selectedYears.has(s.year)
                    ? 'bg-primary/20 border-primary text-primary'
                    : 'bg-muted/20 border-border text-muted-foreground hover:border-muted-foreground'
                }`}
              >
                {s.year}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4 mb-6 md:mb-8">
            <div className="bg-background p-2 md:p-4 rounded-lg border border-border text-center">
              <div className="text-[9px] md:text-xs text-muted-foreground uppercase tracking-wider">Points</div>
              <div className="text-sm md:text-2xl text-white font-bold mt-0.5 md:mt-1">{careerTotals.points.toLocaleString()}</div>
            </div>
            <div className="bg-background p-2 md:p-4 rounded-lg border border-border text-center">
              <div className="text-[9px] md:text-xs text-muted-foreground uppercase tracking-wider">KOs</div>
              <div className="text-sm md:text-2xl text-white font-bold mt-0.5 md:mt-1">{careerTotals.kos}</div>
            </div>
            <div className="bg-background p-2 md:p-4 rounded-lg border border-border text-center">
              <div className="text-[9px] md:text-xs text-muted-foreground uppercase tracking-wider">Avg Finish</div>
              <div className="text-sm md:text-2xl text-white font-bold mt-0.5 md:mt-1">#{careerTotals.avgFinish}</div>
            </div>
            <div className="bg-background p-2 md:p-4 rounded-lg border border-border text-center">
              <div className="text-[9px] md:text-xs text-muted-foreground uppercase tracking-wider">Apex</div>
              <div className="text-sm md:text-2xl text-white font-bold mt-0.5 md:mt-1">{careerTotals.apexApps}</div>
            </div>
            <div className="bg-background p-2 md:p-4 rounded-lg border border-border text-center">
              <div className="text-[9px] md:text-xs text-muted-foreground uppercase tracking-wider">Years</div>
              <div className="text-sm md:text-2xl text-white font-bold mt-0.5 md:mt-1">{careerTotals.yearsActive}</div>
            </div>
          </div>

          {/* Career Trajectory Chart */}
          {seasonHistory.length > 1 && (
            <>
              <div className="text-primary border-b border-border pb-2 mb-3 text-xs md:text-sm uppercase font-bold tracking-wider">
                Career Trajectory
              </div>
              <div className="mb-6 md:mb-8 bg-background/50 p-2 md:p-4 rounded-lg border border-border">
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart data={[...seasonHistory].sort((a, b) => a.year - b.year)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="year" stroke="#888" fontSize={10} />
                    <YAxis yAxisId="left" stroke="#00d4ff" fontSize={10} width={35} />
                    <YAxis yAxisId="right" orientation="right" stroke="#ff6b6b" fontSize={10} reversed domain={[1, 40]} width={25} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1f25', border: '1px solid #333', borderRadius: '8px', fontSize: '11px' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Line yAxisId="left" type="monotone" dataKey="points" stroke="#00d4ff" strokeWidth={2} dot={{ fill: '#00d4ff', r: 3 }} name="Points" />
                    <Line yAxisId="right" type="monotone" dataKey="rank" stroke="#ff6b6b" strokeWidth={2} dot={{ fill: '#ff6b6b', r: 3 }} name="Rank" />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-2 text-[10px] md:text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-[#00d4ff] inline-block"></span> Points</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-[#ff6b6b] inline-block"></span> Rank</span>
                </div>
              </div>
            </>
          )}

          <div className="text-primary border-b border-border pb-2 mb-3 text-xs md:text-sm uppercase font-bold tracking-wider">
            Season History
          </div>
          <div className="overflow-x-auto bg-panel rounded-lg shadow-lg max-h-[300px] md:max-h-[400px] overflow-y-auto">
            <table className="w-full border-collapse text-xs md:text-sm min-w-[320px]">
              <thead>
                <tr>
                  <th className="bg-black text-primary uppercase text-[10px] md:text-xs tracking-wider p-2 md:p-3 text-left sticky top-0 z-10">Year</th>
                  <th className="bg-black text-primary uppercase text-[10px] md:text-xs tracking-wider p-2 md:p-3 text-left sticky top-0 z-10">Team</th>
                  <th className="bg-black text-primary uppercase text-[10px] md:text-xs tracking-wider p-2 md:p-3 text-left sticky top-0 z-10">Rank</th>
                  <th className="bg-black text-primary uppercase text-[10px] md:text-xs tracking-wider p-2 md:p-3 text-left sticky top-0 z-10">Pts</th>
                  <th className="bg-black text-primary uppercase text-[10px] md:text-xs tracking-wider p-2 md:p-3 text-left sticky top-0 z-10 hidden sm:table-cell">KOs</th>
                </tr>
              </thead>
              <tbody>
                {seasonHistory.length > 0 ? seasonHistory.map(h => {
                  const tournamentData = getPlayerTournamentData(h.year);
                  const isExpanded = expandedSeasons.has(h.year);
                  const hasTournamentData = tournamentData !== null;
                  const isIncluded = selectedYears.has(h.year);
                  
                  return (
                    <React.Fragment key={h.year}>
                      <tr 
                        className={`border-b border-border hover:bg-muted/50 ${hasTournamentData ? 'cursor-pointer' : ''} ${!isIncluded ? 'opacity-40' : ''}`}
                        onClick={() => hasTournamentData && toggleSeason(h.year)}
                      >
                        <td className="p-2 md:p-3 text-primary font-bold">
                          <div className="flex items-center gap-1">
                            {hasTournamentData && (
                              isExpanded ? <ChevronDown className="w-3 h-3 md:w-4 md:h-4" /> : <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                            )}
                            {h.year}
                          </div>
                        </td>
                        <td className="p-2 md:p-3"><span className={`team-tag text-[10px] md:text-xs ${getTeamClass(h.team)}`}>{h.team}</span></td>
                        <td className="p-2 md:p-3">#{h.rank}</td>
                        <td className="p-2 md:p-3">{h.points}</td>
                        <td className="p-2 md:p-3 hidden sm:table-cell">{h.ko}</td>
                      </tr>
                      {isExpanded && tournamentData && (
                        <tr>
                          <td colSpan={5} className="p-0 bg-background/50">
                            <div className="p-2 md:p-4">
                              <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mb-2 font-bold">
                                Tournaments - {h.year}
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5 md:gap-2">
                                {tournamentData.tournaments.map(tournament => {
                                  const result = tournamentData.results[tournament];
                                  if (!result) return null;
                                  
                                  const isWin = result.finish === "1st";
                                  const isTop3 = result.finish === "2nd" || result.finish === "3rd";
                                  
                                  return (
                                    <div 
                                      key={tournament}
                                      className={`p-1.5 md:p-2 rounded border text-center ${
                                        isWin ? 'bg-primary/20 border-primary' : 
                                        isTop3 ? 'bg-secondary/20 border-secondary' : 
                                        'bg-muted/20 border-border'
                                      }`}
                                    >
                                      <div className="text-[9px] md:text-xs font-bold text-foreground truncate">{tournament}</div>
                                      <div className={`text-xs md:text-sm font-bold ${isWin ? 'text-primary' : isTop3 ? 'text-secondary' : 'text-muted-foreground'}`}>
                                        {result.finish}
                                      </div>
                                      <div className="text-[9px] md:text-xs text-muted-foreground">
                                        {result.points}p/{result.kos}k
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
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
