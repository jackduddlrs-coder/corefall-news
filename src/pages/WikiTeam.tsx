import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Trophy, Users, TrendingUp, Calendar, Shield, MapPin, User, Heart, DollarSign } from "lucide-react";
import { pastTeamStandings, pastStandings, seasons, getTeamClass } from "@/data/corefallData";
import { teamBios, teamInfo, contractData } from "@/data/wikiData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const WikiTeam = () => {
  const { teamName } = useParams<{ teamName: string }>();
  const decodedName = decodeURIComponent(teamName || "");

  // Get team bio
  const bio = teamBios[decodedName];

  // Compile team history
  const history = useMemo(() => {
    const result: { year: number; rank: number; points: number; players: { name: string; rank: number; points: number }[] }[] = [];
    
    Object.keys(pastTeamStandings).sort((a, b) => Number(b) - Number(a)).forEach(year => {
      const seasonData = pastTeamStandings[year];
      const idx = seasonData.findIndex(t => t.team === decodedName);
      if (idx !== -1) {
        const rank = idx + 1;
        const points = seasonData[idx].points;
        
        // Get players for this team in this season
        const seasonStandings = pastStandings[year] || [];
        const teamPlayers = seasonStandings
          .filter(p => p.Team === decodedName)
          .map(p => ({ name: p.Name, rank: p.Rank, points: p.Points }))
          .sort((a, b) => a.rank - b.rank);

        result.push({ year: parseInt(year), rank, points, players: teamPlayers });
      }
    });
    
    return result;
  }, [decodedName]);

  // Calculate totals
  const totals = useMemo(() => {
    let totalPoints = 0;
    let bestRank = 99;
    let bestYear = 0;
    
    history.forEach(h => {
      totalPoints += h.points;
      if (h.rank < bestRank) {
        bestRank = h.rank;
        bestYear = h.year;
      }
    });
    
    const avgRank = history.length > 0 
      ? history.reduce((sum, h) => sum + h.rank, 0) / history.length 
      : 0;
    
    return { totalPoints, bestRank, bestYear, avgRank, seasons: history.length };
  }, [history]);

  // Awards
  const apexWins = seasons.filter(s => s.team === decodedName).map(s => ({ year: s.year, player: s.apex }));
  const cttWins = seasons.filter(s => s.ctt === decodedName).map(s => s.year);
  const starWins = seasons.filter(s => s.starTeam === decodedName).map(s => ({ year: s.year, player: s.star }));

  // All-time players
  const allTimePlayers = useMemo(() => {
    const players: Record<string, { totalPoints: number; totalKOs: number; seasons: number }> = {};
    
    Object.values(pastStandings).forEach(seasonStandings => {
      seasonStandings.forEach(p => {
        if (p.Team === decodedName) {
          if (!players[p.Name]) {
            players[p.Name] = { totalPoints: 0, totalKOs: 0, seasons: 0 };
          }
          players[p.Name].totalPoints += p.Points;
          players[p.Name].totalKOs += p.KOs;
          players[p.Name].seasons += 1;
        }
      });
    });
    
    return Object.entries(players)
      .map(([name, stats]) => ({ name, ...stats }))
      .sort((a, b) => b.totalPoints - a.totalPoints);
  }, [decodedName]);

  // Current roster (709)
  const currentRoster = useMemo(() => {
    const season709 = pastStandings["709"] || [];
    return season709
      .filter(p => p.Team === decodedName)
      .sort((a, b) => a.Rank - b.Rank);
  }, [decodedName]);

  // Team info (location, coach, popularity)
  const info = teamInfo[decodedName];

  // Get contracts for current roster
  const rosterContracts = useMemo(() => {
    return currentRoster.map(p => ({
      ...p,
      contract: contractData[p.Name]
    }));
  }, [currentRoster]);

  // Team payroll
  const teamPayroll = useMemo(() => {
    let total = 0;
    currentRoster.forEach(p => {
      const c = contractData[p.Name];
      if (c) {
        const amount = parseFloat(c.amount.replace(/[^0-9.]/g, ''));
        total += amount;
      }
    });
    return total;
  }, [currentRoster]);

  if (!decodedName || history.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Team Not Found</h1>
          <Link to="/wiki" className="text-primary hover:underline">← Back to Wiki</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="bg-header px-3 md:px-8 border-b-[3px] border-primary sticky top-0 z-50 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
        <div className="flex justify-between items-center h-[50px] md:h-[70px] gap-2">
          <Link 
            to="/"
            className="text-lg md:text-3xl font-extrabold uppercase tracking-wider text-white shrink-0 hover:text-primary transition-colors"
          >
            Corefall<span className="text-primary">News</span>
          </Link>
          <Link to="/wiki" className="text-primary hover:underline flex items-center gap-1 text-sm">
            <ChevronLeft className="h-4 w-4" /> Wiki
          </Link>
        </div>
      </nav>

      <div className="max-w-[1000px] mx-auto py-6 md:py-10 px-3 md:px-5">
        {/* Hero Header */}
        <div className="bg-gradient-to-br from-panel to-background border border-border rounded-2xl p-6 md:p-10 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <span className={`team-tag ${getTeamClass(decodedName)} text-lg font-bold mb-3 inline-block`}>
                {decodedName}
              </span>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-wider text-white">
                {decodedName}
              </h1>
              {bio?.founded && (
                <div className="text-muted-foreground mt-2">Est. {bio.founded}</div>
              )}
              {bio?.colors && (
                <div className="text-xs text-muted-foreground mt-1">Colors: {bio.colors}</div>
              )}
            </div>
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center min-w-[150px]">
              <div className="text-[10px] text-primary uppercase font-bold tracking-wider">Era Points</div>
              <div className="text-4xl font-black text-white">{totals.totalPoints.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">{totals.seasons} seasons</div>
            </div>
          </div>
        </div>

        {/* Team Info Card */}
        {info && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5" /> Team Info
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-panel border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Location</span>
                </div>
                <div className="text-sm font-medium text-white">{info.location}</div>
              </div>
              <div className="bg-panel border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Head Coach</span>
                </div>
                <div className="text-sm font-medium text-white">{info.coach}</div>
              </div>
              <div className="bg-panel border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-4 w-4 text-primary" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Popularity</span>
                </div>
                <div className="text-sm font-medium text-white">#{info.popularity}</div>
              </div>
              <div className="bg-panel border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-green-400" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Payroll</span>
                </div>
                <div className="text-sm font-medium text-green-400">{teamPayroll.toFixed(1)}M</div>
              </div>
            </div>
          </section>
        )}

        {/* Description */}
        {bio?.description && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5" /> About
            </h2>
            <div className="bg-panel border border-border rounded-xl p-5">
              <p className="text-muted-foreground leading-relaxed">{bio.description}</p>
              {bio.rivalTeams && bio.rivalTeams.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="text-xs font-bold text-foreground mb-2">Rival Teams:</div>
                  <div className="flex flex-wrap gap-2">
                    {bio.rivalTeams.map((rival, i) => (
                      <Link
                        key={i}
                        to={`/wiki/team/${encodeURIComponent(rival)}`}
                        className={`team-tag ${getTeamClass(rival)} text-xs hover:opacity-80`}
                      >
                        {rival}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Trophy Case */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
            <Trophy className="h-5 w-5" /> Trophy Case
          </h2>
          <div className="bg-panel border border-border rounded-xl p-5 space-y-4">
            {apexWins.length > 0 && (
              <div className="bg-background/50 p-4 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <span className="award-badge award-apex">👑 {apexWins.length}x Apex</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {apexWins.map((w, i) => (
                    <span key={w.year}>
                      <Link to={`/wiki/player/${encodeURIComponent(w.player)}`} className="hover:text-primary">
                        {w.player}
                      </Link>
                      {" "}({w.year}){i < apexWins.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {cttWins.length > 0 && (
              <div className="bg-background/50 p-4 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <span className="award-badge award-ctt">🛡️ {cttWins.length}x CTT</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Years: {cttWins.join(", ")}
                </div>
              </div>
            )}
            {starWins.length > 0 && (
              <div className="bg-background/50 p-4 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <span className="award-badge award-major">⭐ {starWins.length}x Season Stars</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {starWins.map((w, i) => (
                    <span key={w.year}>
                      <Link to={`/wiki/player/${encodeURIComponent(w.player)}`} className="hover:text-primary">
                        {w.player}
                      </Link>
                      {" "}({w.year}){i < starWins.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {apexWins.length === 0 && cttWins.length === 0 && starWins.length === 0 && (
              <span className="text-muted-foreground text-sm">No major titles recorded</span>
            )}
          </div>
        </section>

        {/* Stats Grid */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" /> Era Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-panel border border-border rounded-xl p-4 text-center">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Best Finish</div>
              <div className="text-2xl font-bold text-white">#{totals.bestRank}</div>
              <div className="text-xs text-muted-foreground">({totals.bestYear})</div>
            </div>
            <div className="bg-panel border border-border rounded-xl p-4 text-center">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Avg Rank</div>
              <div className="text-2xl font-bold text-white">{totals.avgRank.toFixed(1)}</div>
            </div>
            <div className="bg-panel border border-border rounded-xl p-4 text-center">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Apex Titles</div>
              <div className="text-2xl font-bold text-white">{apexWins.length}</div>
            </div>
            <div className="bg-panel border border-border rounded-xl p-4 text-center">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">CTT Titles</div>
              <div className="text-2xl font-bold text-white">{cttWins.length}</div>
            </div>
          </div>
        </section>

        {/* Trajectory Chart */}
        {history.length > 1 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5" /> Team Trajectory
            </h2>
            <div className="bg-panel border border-border rounded-xl p-5">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={[...history].sort((a, b) => a.year - b.year)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="year" stroke="#888" fontSize={12} />
                  <YAxis yAxisId="left" stroke="hsl(var(--primary))" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" stroke="#ff6b6b" fontSize={12} reversed domain={[1, 'dataMax']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1f25', border: '1px solid #333', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Line yAxisId="left" type="monotone" dataKey="points" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))', r: 4 }} name="Points" />
                  <Line yAxisId="right" type="monotone" dataKey="rank" stroke="#ff6b6b" strokeWidth={2} dot={{ fill: '#ff6b6b', r: 4 }} name="Rank" />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-primary inline-block"></span> Points</span>
                <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[#ff6b6b] inline-block"></span> Rank</span>
              </div>
            </div>
          </section>
        )}

        {/* Current Roster */}
        {currentRoster.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
              <Users className="h-5 w-5" /> Current Roster & Contracts (709)
            </h2>
            <div className="bg-panel border border-border rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-black">
                    <th className="text-left p-3 text-primary uppercase text-xs">Rank</th>
                    <th className="text-left p-3 text-primary uppercase text-xs">Player</th>
                    <th className="text-left p-3 text-primary uppercase text-xs">Points</th>
                    <th className="text-left p-3 text-primary uppercase text-xs hidden md:table-cell">Salary</th>
                    <th className="text-left p-3 text-primary uppercase text-xs hidden md:table-cell">Through</th>
                  </tr>
                </thead>
                <tbody>
                  {rosterContracts.map(p => (
                    <tr key={p.Name} className="border-t border-border hover:bg-muted/30">
                      <td className="p-3 text-muted-foreground">#{p.Rank}</td>
                      <td className="p-3">
                        <Link 
                          to={`/wiki/player/${encodeURIComponent(p.Name)}`}
                          className="text-foreground hover:text-primary transition-colors font-medium"
                        >
                          {p.Name}
                        </Link>
                      </td>
                      <td className="p-3">{p.Points.toLocaleString()}</td>
                      <td className="p-3 text-green-400 hidden md:table-cell">
                        {p.contract?.amount || "—"}
                      </td>
                      <td className={`p-3 hidden md:table-cell ${p.contract?.contractThrough && p.contract.contractThrough <= 709 ? "text-amber-400" : ""}`}>
                        {p.contract?.contractThrough || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* All-Time Top Players */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
            <Users className="h-5 w-5" /> All-Time Top Players
          </h2>
          <div className="bg-panel border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-black">
                  <th className="text-left p-3 text-primary uppercase text-xs">#</th>
                  <th className="text-left p-3 text-primary uppercase text-xs">Player</th>
                  <th className="text-left p-3 text-primary uppercase text-xs">Points</th>
                  <th className="text-left p-3 text-primary uppercase text-xs">Seasons</th>
                </tr>
              </thead>
              <tbody>
                {allTimePlayers.slice(0, 10).map((p, idx) => (
                  <tr key={p.name} className="border-t border-border hover:bg-muted/30">
                    <td className="p-3 text-muted-foreground">{idx + 1}</td>
                    <td className="p-3">
                      <Link 
                        to={`/wiki/player/${encodeURIComponent(p.name)}`}
                        className="text-foreground hover:text-primary transition-colors font-medium"
                      >
                        {p.name}
                      </Link>
                    </td>
                    <td className="p-3">{p.totalPoints.toLocaleString()}</td>
                    <td className="p-3">{p.seasons}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Season History */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-primary mb-3">Season History</h2>
          <div className="bg-panel border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-black">
                  <th className="text-left p-3 text-primary uppercase text-xs">Season</th>
                  <th className="text-left p-3 text-primary uppercase text-xs">Rank</th>
                  <th className="text-left p-3 text-primary uppercase text-xs">Points</th>
                  <th className="text-left p-3 text-primary uppercase text-xs">Top Player</th>
                </tr>
              </thead>
              <tbody>
                {history.map(h => (
                  <tr key={h.year} className="border-t border-border hover:bg-muted/30">
                    <td className="p-3 font-bold text-primary">{h.year}</td>
                    <td className={`p-3 ${h.rank === 1 ? "text-amber-400 font-bold" : ""}`}>#{h.rank}</td>
                    <td className="p-3">{h.points.toLocaleString()}</td>
                    <td className="p-3">
                      {h.players.length > 0 && (
                        <Link 
                          to={`/wiki/player/${encodeURIComponent(h.players[0].name)}`}
                          className="text-foreground hover:text-primary transition-colors"
                        >
                          {h.players[0].name}
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="text-center p-6 md:p-10 mt-8 bg-header text-muted-foreground border-t border-border text-sm">
        <p>&copy; 707 Corefall News.</p>
        <Link to="/wiki" className="text-primary hover:underline text-xs">← Back to Wiki</Link>
      </footer>
    </div>
  );
};

export default WikiTeam;
