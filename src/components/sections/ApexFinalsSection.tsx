import { apexDetailed, getTeamClass } from "@/data/corefallData";

interface ApexFinalsSectionProps {
  onPlayerClick: (name: string) => void;
  onTeamClick: (name: string) => void;
}

export function ApexFinalsSection({ onPlayerClick, onTeamClick }: ApexFinalsSectionProps) {
  return (
    <div className="animate-fadeIn">
      <h1 className="text-white">Apex Finals History (679–708)</h1>
      <p className="text-foreground">Detailed breakdown of every Grand Finals match in the recorded era.</p>

      <div className="overflow-x-auto bg-panel rounded-lg shadow-lg">
        <table className="w-full border-collapse text-sm min-w-[700px]">
          <thead>
            <tr>
              <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">Year</th>
              <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">Champion</th>
              <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">Team</th>
              <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">Runner-Up</th>
              <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">Team</th>
            </tr>
          </thead>
          <tbody>
            {apexDetailed.map(a => (
              <tr key={a.year} className="border-b border-[#2a2f38] hover:bg-[#2c323d] even:bg-[#1f242b]">
                <td className="p-3 text-primary font-bold">{a.year}</td>
                <td className="p-3">
                  <span className="clickable-name c-apex text-lg font-bold" onClick={() => onPlayerClick(a.win)}>
                    {a.win} 👑
                  </span>
                  <span className="text-muted-foreground text-xs ml-1">({a.winAge})</span>
                </td>
                <td className="p-3">
                  <span className={`team-tag clickable-team ${getTeamClass(a.wTeam)}`} onClick={() => onTeamClick(a.wTeam)}>
                    {a.wTeam}
                  </span>
                </td>
                <td className="p-3">
                  <span className="clickable-name" onClick={() => onPlayerClick(a.lose)}>{a.lose}</span>
                  <span className="text-muted-foreground text-xs ml-1">({a.loseAge})</span>
                </td>
                <td className="p-3">
                  <span className={`team-tag clickable-team ${getTeamClass(a.lTeam)}`} onClick={() => onTeamClick(a.lTeam)}>
                    {a.lTeam}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
