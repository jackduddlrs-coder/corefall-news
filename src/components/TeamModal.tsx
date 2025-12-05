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
      className="fixed inset-0 bg-black/85 z-[1000] flex justify-center items-center backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-panel w-[90%] max-w-[700px] rounded-xl border border-border shadow-[0_0_30px_rgba(0,212,255,0.2)] max-h-[90vh] overflow-y-auto animate-cardPop"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-gradient-to-br from-[#111] to-[#222] p-8 border-b-2 border-primary flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-wider text-white m-0">{teamName}</h2>
            <span className="text-muted-foreground font-bold">Active Franchise</span>
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
            Franchise Trophy Case (All-Time)
          </div>
          <div className="mb-8 space-y-4">
            {allTimeApex > 0 && (
              <div className="bg-background/50 p-4 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <span className="award-badge award-apex">👑 {allTimeApex}x Apex Titles</span>
                </div>
                <div className="text-sm text-muted-foreground pl-2">
                  {apexWins.map((w, i) => (
                    <span key={w.year}>
                      {w.player} ({w.year}){i < apexWins.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {allTimeCTT > 0 && (
              <div className="bg-background/50 p-4 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <span className="award-badge award-ctt">🛡️ {allTimeCTT}x CTT Titles</span>
                </div>
                <div className="text-sm text-muted-foreground pl-2">
                  Years: {cttWins.map(w => w.year).join(", ")}
                </div>
              </div>
            )}
            {allTimeStar > 0 && (
              <div className="bg-background/50 p-4 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <span className="award-badge award-major">⭐ {allTimeStar}x Season Stars</span>
                </div>
                <div className="text-sm text-muted-foreground pl-2">
                  {starWins.map((w, i) => (
                    <span key={w.year}>
                      {w.player} ({w.year}){i < starWins.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {allTimeApex === 0 && allTimeCTT === 0 && allTimeStar === 0 && (
              <span className="text-muted-foreground">No major titles recorded.</span>
            )}
          </div>

          {topPlayers.length > 0 && (
            <>
              <div className="text-primary border-b border-border pb-2 mb-4 text-sm uppercase font-bold tracking-wider">
                Top Historical Players (Since 700)
              </div>
              <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {topPlayers.map((p, idx) => (
                  <div 
                    key={p.name}
                    className={`flex items-center justify-between p-2 rounded border border-border/50 bg-background/30 ${onPlayerClick ? 'cursor-pointer hover:bg-background/60' : ''}`}
                    onClick={() => onPlayerClick?.(p.name)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-5">#{idx + 1}</span>
                      <span className="text-sm font-medium text-foreground">{p.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {p.totalPoints.toLocaleString()} pts • {p.seasons} szn
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="text-primary border-b border-border pb-2 mb-4 text-sm uppercase font-bold tracking-wider">
            Era Statistics (Since 700)
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-background p-4 rounded-lg border border-border text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Total Points</div>
              <div className="text-2xl text-white font-bold mt-1">{totalPoints.toLocaleString()}</div>
            </div>
            <div className="bg-background p-4 rounded-lg border border-border text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Avg. Finish</div>
              <div className="text-2xl text-white font-bold mt-1">{seasonCount > 0 ? (rankSum / seasonCount).toFixed(1) : "-"}</div>
            </div>
            <div className="bg-background p-4 rounded-lg border border-border text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Best Season</div>
              <div className="text-2xl text-white font-bold mt-1">{bestRank < 99 ? `#${bestRank} (${bestYear})` : "-"}</div>
            </div>
            <div className="bg-background p-4 rounded-lg border border-border text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">CTT Titles</div>
              <div className="text-2xl text-white font-bold mt-1">{allTimeCTT}</div>
            </div>
          </div>

          {/* Team Trajectory Chart */}
          {history.length > 1 && (
            <>
              <div className="text-primary border-b border-border pb-2 mb-4 text-sm uppercase font-bold tracking-wider">
                Franchise Trajectory
              </div>
              <div className="mb-8 bg-background/50 p-4 rounded-lg border border-border">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={[...history].sort((a, b) => a.year - b.year)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="year" stroke="#888" fontSize={12} />
                    <YAxis yAxisId="left" stroke="#00d4ff" fontSize={12} />
                    <YAxis yAxisId="right" orientation="right" stroke="#ff6b6b" fontSize={12} reversed domain={[1, 20]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1f25', border: '1px solid #333', borderRadius: '8px' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="points" stroke="#00d4ff" strokeWidth={2} dot={{ fill: '#00d4ff' }} name="Points" />
                    <Line yAxisId="right" type="monotone" dataKey="rank" stroke="#ff6b6b" strokeWidth={2} dot={{ fill: '#ff6b6b' }} name="Rank" />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[#00d4ff] inline-block"></span> Points (left axis)</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[#ff6b6b] inline-block"></span> Rank (right axis, lower=better)</span>
                </div>
              </div>
            </>
          )}

          <div className="text-primary border-b border-border pb-2 mb-4 text-sm uppercase font-bold tracking-wider">
            Season-by-Season Record (Click to expand roster)
          </div>
          <div className="overflow-x-auto bg-panel rounded-lg shadow-lg max-h-[400px] overflow-y-auto">
            <table className="w-full border-collapse text-sm min-w-[400px]">
              <thead>
                <tr>
                  <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">Season</th>
                  <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">Rank</th>
                  <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">Points</th>
                  <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">Notes</th>
                  <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-center sticky top-0 z-10 w-10"></th>
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
                        <td className="p-3 text-primary font-bold">{h.year}</td>
                        <td className={`p-3 ${h.rank === 1 ? "text-[hsl(var(--gold))] font-bold" : ""}`}>#{h.rank}</td>
                        <td className="p-3">{h.points.toLocaleString()}</td>
                        <td className="p-3 text-sm text-muted-foreground">{h.note}</td>
                        <td className="p-3 text-center">
                          {h.players.length > 0 && (
                            isExpanded ? 
                              <ChevronUp className="h-4 w-4 text-muted-foreground inline" /> : 
                              <ChevronDown className="h-4 w-4 text-muted-foreground inline" />
                          )}
                        </td>
                      </tr>
                      {isExpanded && h.players.length > 0 && (
                        <tr key={`${h.year}-players`}>
                          <td colSpan={5} className="p-0 bg-[#1a1f25]">
                            <div className="p-3 space-y-1">
                              <div className="text-xs text-muted-foreground mb-2">Top 40 Players ({h.players.length})</div>
                              {h.players.map(p => (
                                <div 
                                  key={p.name} 
                                  className={`flex justify-between items-center text-xs py-1 px-2 hover:bg-[#2c323d] rounded ${onPlayerClick ? 'cursor-pointer' : ''}`}
                                  onClick={(e) => { e.stopPropagation(); onPlayerClick?.(p.name); }}
                                >
                                  <span className="text-muted-foreground">#{p.rank}</span>
                                  <span className="clickable-name flex-1 mx-2">{p.name}</span>
                                  <span className="font-semibold text-foreground">{p.points} pts</span>
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
