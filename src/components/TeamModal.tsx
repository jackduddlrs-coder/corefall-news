import { useState, useMemo } from "react";
import { pastTeamStandings, pastStandings, seasons, getTeamClass } from "@/data/corefallData";
import { ChevronDown, ChevronUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface TeamModalProps {
  teamName: string;
  onClose: () => void;
  onPlayerClick?: (name: string) => void;
}

export function TeamModal({ teamName, onClose, onPlayerClick }: TeamModalProps) {
  const [expandedYear, setExpandedYear] = useState<number | null>(null);
  
  let totalPoints = 0;
  let seasonCount = 0;
  let rankSum = 0;
  let bestRank = 99;
  let bestYear = "";

  const history: { year: number; rank: number; points: number; note: string; players: { name: string; rank: number; points: number }[] }[] = [];

  // Compile History with players
  Object.keys(pastTeamStandings).sort((a, b) => Number(b) - Number(a)).forEach(year => {
    const seasonData = pastTeamStandings[year];
    const idx = seasonData.findIndex(t => t.team === teamName);
    if (idx !== -1) {
      const rank = idx + 1;
      const points = seasonData[idx].points;
      
      const seasonRecord = seasons.find(s => s.year === parseInt(year));
      const notes: string[] = [];
      
      // Special notes for 709 season
      if (year === "709" && teamName === "Damage") {
        notes.push("🏆 Team Trials Winner");
      }
      
      if (seasonRecord) {
        if (seasonRecord.ctt === teamName) notes.push("🏆 CTT Champion");
        if (seasonRecord.team === teamName) notes.push("👑 Apex Winner");
        if (seasonRecord.starTeam === teamName) notes.push("⭐ Season Star");
      }

      // Get players for this team in this season
      const seasonStandings = pastStandings[year] || [];
      const teamPlayers = seasonStandings
        .filter(p => p.Team === teamName)
        .map(p => ({ name: p.Name, rank: p.Rank, points: p.Points }))
        .sort((a, b) => a.rank - b.rank);

      history.push({
        year: parseInt(year),
        rank,
        points,
        note: notes.join(" • "),
        players: teamPlayers
      });
    }
  });

  // Process Statistics
  history.forEach(h => {
    totalPoints += h.points;
    seasonCount++;
    rankSum += h.rank;
    if (h.rank < bestRank) {
      bestRank = h.rank;
      bestYear = h.year.toString();
    }
  });

  // All-Time Awards with details
  const apexWins: { year: number; player: string }[] = [];
  const cttWins: { year: number }[] = [];
  const starWins: { year: number; player: string }[] = [];

  seasons.forEach(s => {
    if (s.team === teamName) {
      apexWins.push({ year: s.year, player: s.apex });
    }
    if (s.ctt === teamName) {
      cttWins.push({ year: s.year });
    }
    if (s.starTeam === teamName) {
      starWins.push({ year: s.year, player: s.star });
    }
  });

  const allTimeApex = apexWins.length;
  const allTimeCTT = cttWins.length;
  const allTimeStar = starWins.length;

  // Get all-time top players for this team
  const allTimePlayers: Record<string, { totalPoints: number; totalKOs: number; seasons: number }> = {};
  Object.values(pastStandings).forEach(seasonStandings => {
    seasonStandings.forEach(p => {
      if (p.Team === teamName) {
        if (!allTimePlayers[p.Name]) {
          allTimePlayers[p.Name] = { totalPoints: 0, totalKOs: 0, seasons: 0 };
        }
        allTimePlayers[p.Name].totalPoints += p.Points;
        allTimePlayers[p.Name].totalKOs += p.KOs;
        allTimePlayers[p.Name].seasons += 1;
      }
    });
  });

  const topPlayers = Object.entries(allTimePlayers)
    .map(([name, stats]) => ({ name, ...stats }))
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .slice(0, 10);

  return (
    <div 
      className="fixed inset-0 bg-black/85 z-[1000] flex justify-center items-center backdrop-blur-sm p-2 md:p-4"
      onClick={onClose}
    >
      <div 
        className="bg-panel w-full md:w-[90%] max-w-[700px] rounded-xl border border-border shadow-[0_0_30px_rgba(0,212,255,0.2)] max-h-[95vh] md:max-h-[90vh] overflow-y-auto animate-cardPop"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-gradient-to-br from-[#111] to-[#222] p-4 md:p-8 border-b-2 border-primary flex justify-between items-center sticky top-0 z-20">
          <div>
            <h2 className="text-lg md:text-2xl font-bold uppercase tracking-wider text-white m-0">{teamName}</h2>
            <span className="text-xs md:text-sm text-muted-foreground font-bold">Active Franchise</span>
          </div>
          <button 
            className="bg-transparent border-none text-white text-2xl md:text-3xl cursor-pointer transition-transform hover:text-secondary hover:rotate-90"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        
        <div className="p-4 md:p-8">
          <div className="text-primary border-b border-border pb-2 mb-3 text-xs md:text-sm uppercase font-bold tracking-wider">
            Trophy Case
          </div>
          <div className="mb-6 space-y-2 md:space-y-4">
            {allTimeApex > 0 && (
              <div className="bg-background/50 p-2 md:p-4 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-1 md:mb-2">
                  <span className="award-badge award-apex text-xs">👑 {allTimeApex}x Apex</span>
                </div>
                <div className="text-xs text-muted-foreground pl-1 md:pl-2">
                  {apexWins.map((w, i) => (
                    <span key={w.year}>
                      {w.player} ({w.year}){i < apexWins.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {allTimeCTT > 0 && (
              <div className="bg-background/50 p-2 md:p-4 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-1 md:mb-2">
                  <span className="award-badge award-ctt text-xs">🛡️ {allTimeCTT}x CTT</span>
                </div>
                <div className="text-xs text-muted-foreground pl-1 md:pl-2">
                  Years: {cttWins.map(w => w.year).join(", ")}
                </div>
              </div>
            )}
            {allTimeStar > 0 && (
              <div className="bg-background/50 p-2 md:p-4 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-1 md:mb-2">
                  <span className="award-badge award-major text-xs">⭐ {allTimeStar}x Stars</span>
                </div>
                <div className="text-xs text-muted-foreground pl-1 md:pl-2">
                  {starWins.map((w, i) => (
                    <span key={w.year}>
                      {w.player} ({w.year}){i < starWins.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {allTimeApex === 0 && allTimeCTT === 0 && allTimeStar === 0 && (
              <span className="text-muted-foreground text-xs">No major titles recorded.</span>
            )}
          </div>

          {topPlayers.length > 0 && (
            <>
              <div className="text-primary border-b border-border pb-2 mb-3 text-xs md:text-sm uppercase font-bold tracking-wider">
                Top Players
              </div>
              <div className="mb-6 grid grid-cols-1 gap-1.5">
                {topPlayers.slice(0, 5).map((p, idx) => (
                  <div 
                    key={p.name}
                    className={`flex items-center justify-between p-2 rounded border border-border/50 bg-background/30 ${onPlayerClick ? 'cursor-pointer hover:bg-background/60' : ''}`}
                    onClick={() => onPlayerClick?.(p.name)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground w-4">#{idx + 1}</span>
                      <span className="text-xs md:text-sm font-medium text-foreground">{p.name}</span>
                    </div>
                    <div className="text-[10px] md:text-xs text-muted-foreground">
                      {p.totalPoints.toLocaleString()} pts
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="text-primary border-b border-border pb-2 mb-3 text-xs md:text-sm uppercase font-bold tracking-wider">
            Era Stats (Since 700)
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-6">
            <div className="bg-background p-2 md:p-4 rounded-lg border border-border text-center">
              <div className="text-[9px] md:text-xs text-muted-foreground uppercase tracking-wider">Points</div>
              <div className="text-sm md:text-2xl text-white font-bold mt-0.5">{totalPoints.toLocaleString()}</div>
            </div>
            <div className="bg-background p-2 md:p-4 rounded-lg border border-border text-center">
              <div className="text-[9px] md:text-xs text-muted-foreground uppercase tracking-wider">Avg Finish</div>
              <div className="text-sm md:text-2xl text-white font-bold mt-0.5">{seasonCount > 0 ? (rankSum / seasonCount).toFixed(1) : "-"}</div>
            </div>
            <div className="bg-background p-2 md:p-4 rounded-lg border border-border text-center">
              <div className="text-[9px] md:text-xs text-muted-foreground uppercase tracking-wider">Best</div>
              <div className="text-sm md:text-2xl text-white font-bold mt-0.5">{bestRank < 99 ? `#${bestRank}` : "-"}</div>
            </div>
            <div className="bg-background p-2 md:p-4 rounded-lg border border-border text-center">
              <div className="text-[9px] md:text-xs text-muted-foreground uppercase tracking-wider">CTT</div>
              <div className="text-sm md:text-2xl text-white font-bold mt-0.5">{allTimeCTT}</div>
            </div>
          </div>

          {/* Team Trajectory Chart */}
          {history.length > 1 && (
            <>
              <div className="text-primary border-b border-border pb-2 mb-3 text-xs md:text-sm uppercase font-bold tracking-wider">
                Trajectory
              </div>
              <div className="mb-6 bg-background/50 p-2 md:p-4 rounded-lg border border-border">
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart data={[...history].sort((a, b) => a.year - b.year)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="year" stroke="#888" fontSize={10} />
                    <YAxis yAxisId="left" stroke="#00d4ff" fontSize={10} width={40} />
                    <YAxis yAxisId="right" orientation="right" stroke="#ff6b6b" fontSize={10} reversed domain={[1, 20]} width={25} />
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
            Season Record
          </div>
          <div className="overflow-x-auto bg-panel rounded-lg shadow-lg max-h-[250px] md:max-h-[400px] overflow-y-auto">
            <table className="w-full border-collapse text-xs md:text-sm min-w-[300px]">
              <thead>
                <tr>
                  <th className="bg-black text-primary uppercase text-[10px] md:text-xs tracking-wider p-2 md:p-3 text-left sticky top-0 z-10">Szn</th>
                  <th className="bg-black text-primary uppercase text-[10px] md:text-xs tracking-wider p-2 md:p-3 text-left sticky top-0 z-10">Rank</th>
                  <th className="bg-black text-primary uppercase text-[10px] md:text-xs tracking-wider p-2 md:p-3 text-left sticky top-0 z-10">Pts</th>
                  <th className="bg-black text-primary uppercase text-[10px] md:text-xs tracking-wider p-2 md:p-3 text-left sticky top-0 z-10 hidden sm:table-cell">Notes</th>
                  <th className="bg-black text-primary uppercase text-[10px] md:text-xs tracking-wider p-2 md:p-3 text-center sticky top-0 z-10 w-8"></th>
                </tr>
              </thead>
              <tbody>
                {history.map(h => {
                  const isExpanded = expandedYear === h.year;
                  return (
                    <>
                      <tr 
                        key={h.year} 
                        className={`border-b border-border hover:bg-muted/50 cursor-pointer ${isExpanded ? 'bg-muted/50' : ''}`}
                        onClick={() => setExpandedYear(isExpanded ? null : h.year)}
                      >
                        <td className="p-2 md:p-3 text-primary font-bold">{h.year}</td>
                        <td className={`p-2 md:p-3 ${h.rank === 1 ? "text-[hsl(var(--gold))] font-bold" : ""}`}>#{h.rank}</td>
                        <td className="p-2 md:p-3">{h.points.toLocaleString()}</td>
                        <td className="p-2 md:p-3 text-xs text-muted-foreground hidden sm:table-cell">{h.note}</td>
                        <td className="p-2 md:p-3 text-center">
                          {h.players.length > 0 && (
                            isExpanded ? 
                              <ChevronUp className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground inline" /> : 
                              <ChevronDown className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground inline" />
                          )}
                        </td>
                      </tr>
                      {isExpanded && h.players.length > 0 && (
                        <tr key={`${h.year}-players`}>
                          <td colSpan={5} className="p-0 bg-[#1a1f25]">
                            <div className="p-2 md:p-3 space-y-1">
                              <div className="text-[10px] text-muted-foreground mb-1">Top 40 ({h.players.length})</div>
                              {h.players.map(p => (
                                <div 
                                  key={p.name} 
                                  className={`flex justify-between items-center text-[10px] md:text-xs py-1 px-2 hover:bg-[#2c323d] rounded ${onPlayerClick ? 'cursor-pointer' : ''}`}
                                  onClick={(e) => { e.stopPropagation(); onPlayerClick?.(p.name); }}
                                >
                                  <span className="text-muted-foreground">#{p.rank}</span>
                                  <span className="clickable-name flex-1 mx-2 truncate">{p.name}</span>
                                  <span className="font-semibold text-foreground">{p.points}p</span>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
