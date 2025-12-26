import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Trophy, Target, Calendar, TrendingUp, Swords, Star } from "lucide-react";
import { pastStandings, trophyData, seasons, apexDetailed, majorWinners, getTeamClass } from "@/data/corefallData";
import { fighterBios } from "@/data/wikiData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const WikiPlayer = () => {
  const { playerName } = useParams<{ playerName: string }>();
  const decodedName = decodeURIComponent(playerName || "");

  // Get fighter bio
  const bio = fighterBios[decodedName];

  // Gather season history
  const seasonHistory = useMemo(() => {
    const history: { year: number; team: string; rank: number; points: number; ko: number; age: number }[] = [];
    Object.keys(pastStandings).forEach(year => {
      const pData = pastStandings[year].find(p => p.Name === decodedName);
      if (pData) {
        history.push({
          year: parseInt(year),
          team: pData.Team,
          rank: pData.Rank,
          points: pData.Points,
          ko: pData.KOs,
          age: pData.Age
        });
      }
    });
    return history.sort((a, b) => a.year - b.year);
  }, [decodedName]);

  // Career totals
  const careerTotals = useMemo(() => {
    let points = 0, kos = 0, eliteSeasons = 0, apexApps = 0;
    seasonHistory.forEach(s => {
      points += s.points;
      kos += s.ko;
      if (s.points >= 2000) eliteSeasons++;
      if (s.year === 709) {
        const apex709 = apexDetailed.find(a => a.year === 709);
        if (apex709?.qualified?.includes(decodedName)) apexApps++;
      } else if (s.rank <= 16) {
        apexApps++;
      }
    });
    return { points, kos, eliteSeasons, apexApps, seasons: seasonHistory.length };
  }, [seasonHistory, decodedName]);

  // Trophy data
  const playerTrophies = trophyData.find(t => t.name === decodedName);
  
  // Season Stars
  const seasonStars = seasons.filter(s => s.star === decodedName).map(s => s.year);

  // Hall of Immortals check
  const isHallOfImmortals = [
    "Pheonix Oliv", "Mountain Granton", "Snow Masogoto", "Soler Varo", 
    "Spade Faxzin", "Prince Jonkan", "Vibrant Yaul", "Ring Hawlikaw", 
    "Rolle Asikov", "Rain Lieryon"
  ].includes(decodedName);

  // Apex Finals history
  const apexHistory = apexDetailed.filter(a => a.win === decodedName || a.lose === decodedName);

  // Major wins
  const majorWins = majorWinners.filter(w => w.winner === decodedName);

  // Current team (most recent season)
  const currentTeam = seasonHistory.length > 0 
    ? seasonHistory[seasonHistory.length - 1].team 
    : "Unknown";

  const isActive = seasonHistory.some(s => s.year === 709);

  if (!decodedName || seasonHistory.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Fighter Not Found</h1>
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
              {isHallOfImmortals && (
                <div className="inline-block bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/50 text-amber-400 text-xs px-3 py-1 rounded-full mb-3">
                  👑 Hall of Immortals
                </div>
              )}
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-wider text-white">
                {decodedName}
              </h1>
              {bio?.nickname && (
                <div className="text-xl text-muted-foreground italic mt-1">"{bio.nickname}"</div>
              )}
              <div className="flex items-center gap-3 mt-3">
                <Link 
                  to={`/wiki/team/${encodeURIComponent(currentTeam)}`}
                  className={`team-tag ${getTeamClass(currentTeam)} text-sm hover:opacity-80`}
                >
                  {currentTeam}
                </Link>
                <span className={`text-sm ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {isActive ? "Active (709)" : "Inactive"}
                </span>
              </div>
            </div>
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center min-w-[150px]">
              <div className="text-[10px] text-primary uppercase font-bold tracking-wider">Career Points</div>
              <div className="text-4xl font-black text-white">{careerTotals.points.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">{careerTotals.seasons} seasons</div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        {bio && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
              <Target className="h-5 w-5" /> Biography
            </h2>
            <div className="bg-panel border border-border rounded-xl p-5">
              {bio.style && (
                <div className="text-xs text-primary font-bold uppercase tracking-wider mb-2">
                  Fighting Style: {bio.style}
                </div>
              )}
              <p className="text-muted-foreground leading-relaxed">{bio.bio}</p>
              {bio.notableMoments && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="text-xs font-bold text-foreground mb-2">Notable Moments:</div>
                  <div className="flex flex-wrap gap-2">
                    {bio.notableMoments.map((moment, i) => (
                      <span key={i} className="bg-muted/50 text-xs px-2 py-1 rounded text-muted-foreground">
                        {moment}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {bio.rivalries && bio.rivalries.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="text-xs font-bold text-foreground mb-2">Key Rivalries:</div>
                  <div className="flex flex-wrap gap-2">
                    {bio.rivalries.map((rival, i) => (
                      <Link
                        key={i}
                        to={`/wiki/player/${encodeURIComponent(rival)}`}
                        className="bg-destructive/10 text-destructive text-xs px-2 py-1 rounded hover:bg-destructive/20 transition-colors"
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

        {/* Honors */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
            <Trophy className="h-5 w-5" /> Career Honors
          </h2>
          <div className="bg-panel border border-border rounded-xl p-5">
            <div className="flex flex-wrap gap-2 mb-4">
              {playerTrophies && playerTrophies.apex > 0 && (
                Array(playerTrophies.apex).fill(0).map((_, i) => (
                  <span key={`apex-${i}`} className="award-badge award-apex">🏆 Apex Champion</span>
                ))
              )}
              {playerTrophies && playerTrophies.ctt > 0 && (
                Array(playerTrophies.ctt).fill(0).map((_, i) => (
                  <span key={`ctt-${i}`} className="award-badge award-ctt">🛡️ CTT Winner</span>
                ))
              )}
              {seasonStars.length > 0 && (
                <span className="award-badge award-star">⭐ {seasonStars.length}x Season Star</span>
              )}
              {playerTrophies && playerTrophies.major > 0 && (
                <span className="award-badge award-major">⚔️ {playerTrophies.major} Major Titles</span>
              )}
              {!playerTrophies && seasonStars.length === 0 && (
                <span className="text-muted-foreground text-sm">No major titles recorded</span>
              )}
            </div>
            {playerTrophies?.list && (
              <div className="text-xs text-muted-foreground border-t border-border pt-3">
                {playerTrophies.list}
              </div>
            )}
          </div>
        </section>

        {/* Stats Grid */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" /> Career Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-panel border border-border rounded-xl p-4 text-center">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Total KOs</div>
              <div className="text-2xl font-bold text-white">{careerTotals.kos}</div>
            </div>
            <div className="bg-panel border border-border rounded-xl p-4 text-center">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Elite Seasons</div>
              <div className="text-2xl font-bold text-white">{careerTotals.eliteSeasons}</div>
            </div>
            <div className="bg-panel border border-border rounded-xl p-4 text-center">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Apex Apps</div>
              <div className="text-2xl font-bold text-white">{careerTotals.apexApps}</div>
            </div>
            <div className="bg-panel border border-border rounded-xl p-4 text-center">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Avg Rank</div>
              <div className="text-2xl font-bold text-white">
                {(seasonHistory.reduce((sum, s) => sum + s.rank, 0) / seasonHistory.length).toFixed(1)}
              </div>
            </div>
          </div>
        </section>

        {/* Career Trajectory Chart */}
        {seasonHistory.length > 1 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5" /> Career Trajectory
            </h2>
            <div className="bg-panel border border-border rounded-xl p-5">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={seasonHistory}>
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
                <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[#ff6b6b] inline-block"></span> Rank (lower is better)</span>
              </div>
            </div>
          </section>
        )}

        {/* Apex Finals History */}
        {apexHistory.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
              <Swords className="h-5 w-5" /> Apex Finals History
            </h2>
            <div className="bg-panel border border-border rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-black">
                    <th className="text-left p-3 text-primary uppercase text-xs">Year</th>
                    <th className="text-left p-3 text-primary uppercase text-xs">Result</th>
                    <th className="text-left p-3 text-primary uppercase text-xs">Opponent</th>
                  </tr>
                </thead>
                <tbody>
                  {apexHistory.sort((a, b) => b.year - a.year).map(apex => {
                    const isWin = apex.win === decodedName;
                    const opponent = isWin ? apex.lose : apex.win;
                    return (
                      <tr key={apex.year} className="border-t border-border hover:bg-muted/30">
                        <td className="p-3 font-bold text-primary">{apex.year}</td>
                        <td className={`p-3 font-bold ${isWin ? "text-green-400" : "text-red-400"}`}>
                          {isWin ? "🏆 Champion" : "Runner-Up"}
                        </td>
                        <td className="p-3">
                          <Link 
                            to={`/wiki/player/${encodeURIComponent(opponent)}`}
                            className="text-foreground hover:text-primary transition-colors"
                          >
                            {opponent}
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Season Record */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
            <Star className="h-5 w-5" /> Season Record
          </h2>
          <div className="bg-panel border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-black">
                  <th className="text-left p-3 text-primary uppercase text-xs">Season</th>
                  <th className="text-left p-3 text-primary uppercase text-xs">Team</th>
                  <th className="text-left p-3 text-primary uppercase text-xs">Rank</th>
                  <th className="text-left p-3 text-primary uppercase text-xs">Points</th>
                  <th className="text-left p-3 text-primary uppercase text-xs">KOs</th>
                </tr>
              </thead>
              <tbody>
                {[...seasonHistory].reverse().map(s => (
                  <tr key={s.year} className="border-t border-border hover:bg-muted/30">
                    <td className="p-3 font-bold text-primary">{s.year}</td>
                    <td className="p-3">
                      <Link 
                        to={`/wiki/team/${encodeURIComponent(s.team)}`}
                        className={`team-tag ${getTeamClass(s.team)} text-xs hover:opacity-80`}
                      >
                        {s.team}
                      </Link>
                    </td>
                    <td className={`p-3 ${s.rank <= 3 ? "text-amber-400 font-bold" : ""}`}>#{s.rank}</td>
                    <td className="p-3">{s.points.toLocaleString()}</td>
                    <td className="p-3">{s.ko}</td>
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

export default WikiPlayer;
