import { pastTeamStandings, seasons, getTeamClass } from "@/data/corefallData";

interface TeamModalProps {
  teamName: string;
  onClose: () => void;
}

export function TeamModal({ teamName, onClose }: TeamModalProps) {
  let totalPoints = 0;
  let seasonCount = 0;
  let rankSum = 0;
  let bestRank = 99;
  let bestYear = "";

  const history: { year: number; rank: number; points: number; note: string }[] = [];

  // Compile History
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

      history.push({
        year: parseInt(year),
        rank,
        points,
        note: notes.join(" • ")
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

          <div className="text-primary border-b border-border pb-2 mb-4 text-sm uppercase font-bold tracking-wider">
            Season-by-Season Record
          </div>
          <div className="overflow-x-auto bg-panel rounded-lg shadow-lg max-h-[300px] overflow-y-auto">
            <table className="w-full border-collapse text-sm min-w-[400px]">
              <thead>
                <tr>
                  <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0">Season</th>
                  <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0">Rank</th>
                  <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0">Points</th>
                  <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0">Notes</th>
                </tr>
              </thead>
              <tbody>
                {history.map(h => (
                  <tr key={h.year} className="border-b border-border hover:bg-muted/50">
                    <td className="p-3 text-primary font-bold">{h.year}</td>
                    <td className={`p-3 ${h.rank === 1 ? "text-[hsl(var(--gold))] font-bold" : ""}`}>#{h.rank}</td>
                    <td className="p-3">{h.points.toLocaleString()}</td>
                    <td className="p-3 text-sm text-muted-foreground">{h.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
