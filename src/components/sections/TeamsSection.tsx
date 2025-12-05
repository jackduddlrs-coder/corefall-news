import { seasons, getTeamClass } from "@/data/corefallData";

interface TeamsSectionProps {
  onTeamClick: (name: string) => void;
}

interface AwardDetail {
  year: number;
  player?: string;
}

interface TeamAwards {
  apex: AwardDetail[];
  ctt: AwardDetail[];
  star: AwardDetail[];
}

export function TeamsSection({ onTeamClick }: TeamsSectionProps) {
  // Calculate team stats with details
  const teamStats: Record<string, TeamAwards> = {};

  seasons.forEach(s => {
    // Apex titles
    if (!teamStats[s.team]) teamStats[s.team] = { apex: [], ctt: [], star: [] };
    teamStats[s.team].apex.push({ year: s.year, player: s.apex });

    // CTT titles
    if (!teamStats[s.ctt]) teamStats[s.ctt] = { apex: [], ctt: [], star: [] };
    teamStats[s.ctt].ctt.push({ year: s.year });

    // Season stars
    if (!teamStats[s.starTeam]) teamStats[s.starTeam] = { apex: [], ctt: [], star: [] };
    teamStats[s.starTeam].star.push({ year: s.year, player: s.star });
  });

  const teamList = Object.entries(teamStats)
    .map(([name, awards]) => ({ 
      name, 
      apex: awards.apex,
      ctt: awards.ctt,
      star: awards.star,
      apexCount: awards.apex.length,
      cttCount: awards.ctt.length,
      starCount: awards.star.length
    }))
    .sort((a, b) => b.apexCount - a.apexCount);

  const formatAwards = (awards: AwardDetail[], showPlayer: boolean) => {
    if (awards.length === 0) return <span className="text-muted-foreground">—</span>;
    return (
      <div className="space-y-1">
        <div className="font-bold">{awards.length}x</div>
        <div className="text-xs text-muted-foreground">
          {awards.map((a, i) => (
            <span key={a.year}>
              {showPlayer && a.player ? `${a.player} (${a.year})` : a.year}
              {i < awards.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fadeIn">
      <h1 className="text-white">Team Franchise History</h1>
      <p className="text-foreground">Comprehensive record of Apex Championships, CTT Titles, and Season Stars for every active team.</p>

      <div className="overflow-x-auto bg-panel rounded-lg shadow-lg">
        <table className="w-full border-collapse text-sm min-w-[700px]">
          <thead>
            <tr>
              <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">Team</th>
              <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-center sticky top-0 z-10">Apex Titles</th>
              <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-center sticky top-0 z-10">CTT Titles</th>
              <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-center sticky top-0 z-10">Season Stars</th>
            </tr>
          </thead>
          <tbody>
            {teamList.map(t => (
              <tr key={t.name} className="border-b border-[#2a2f38] hover:bg-[#2c323d] even:bg-[#1f242b] align-top">
                <td className="p-3">
                  <span className={`team-tag clickable-team ${getTeamClass(t.name)}`} onClick={() => onTeamClick(t.name)}>
                    {t.name}
                  </span>
                </td>
                <td className="p-3 text-center c-apex">{formatAwards(t.apex, true)}</td>
                <td className="p-3 text-center c-ctt">{formatAwards(t.ctt, false)}</td>
                <td className="p-3 text-center c-major">{formatAwards(t.star, true)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
