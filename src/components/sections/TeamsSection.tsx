import { seasons, getTeamClass } from "@/data/corefallData";

interface TeamsSectionProps {
  onTeamClick: (name: string) => void;
}

export function TeamsSection({ onTeamClick }: TeamsSectionProps) {
  // Calculate team stats
  const teamStats: Record<string, { apex: number; ctt: number; star: number }> = {};

  seasons.forEach(s => {
    if (!teamStats[s.team]) teamStats[s.team] = { apex: 0, ctt: 0, star: 0 };
    teamStats[s.team].apex++;

    if (!teamStats[s.ctt]) teamStats[s.ctt] = { apex: 0, ctt: 0, star: 0 };
    teamStats[s.ctt].ctt++;

    if (!teamStats[s.starTeam]) teamStats[s.starTeam] = { apex: 0, ctt: 0, star: 0 };
    teamStats[s.starTeam].star++;
  });

  const teamList = Object.entries(teamStats)
    .map(([name, stats]) => ({ name, ...stats }))
    .sort((a, b) => b.apex - a.apex);

  return (
    <div className="animate-fadeIn">
      <h1 className="text-white">Team Franchise History</h1>
      <p className="text-foreground">Comprehensive record of Apex Championships, CTT Titles, and Season Stars for every active team.</p>

      <div className="overflow-x-auto bg-panel rounded-lg shadow-lg">
        <table className="w-full border-collapse text-sm min-w-[600px]">
          <thead>
            <tr>
              <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10 cursor-pointer hover:bg-[#111] hover:text-white">Team</th>
              <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-center sticky top-0 z-10 cursor-pointer hover:bg-[#111] hover:text-white">Apex Titles</th>
              <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-center sticky top-0 z-10 cursor-pointer hover:bg-[#111] hover:text-white">CTT Titles</th>
              <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-center sticky top-0 z-10 cursor-pointer hover:bg-[#111] hover:text-white">Season Stars</th>
            </tr>
          </thead>
          <tbody>
            {teamList.map(t => (
              <tr key={t.name} className="border-b border-[#2a2f38] hover:bg-[#2c323d] even:bg-[#1f242b]">
                <td className="p-3">
                  <span className={`team-tag clickable-team ${getTeamClass(t.name)}`} onClick={() => onTeamClick(t.name)}>
                    {t.name}
                  </span>
                </td>
                <td className="p-3 text-center font-bold c-apex">{t.apex}</td>
                <td className="p-3 text-center font-bold c-ctt">{t.ctt}</td>
                <td className="p-3 text-center font-bold c-major">{t.star}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
