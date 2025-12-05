import { seasons, getTeamClass } from "@/data/corefallData";

interface SeasonsSectionProps {
  onPlayerClick: (name: string) => void;
  onTeamClick: (name: string) => void;
}

export function SeasonsSection({ onPlayerClick, onTeamClick }: SeasonsSectionProps) {
  return (
    <div className="animate-fadeIn">
      <h1 className="text-white">Complete Season History (679–707)</h1>
      <p className="text-foreground">A comprehensive archive of the Modern Era, tracking the three pillars of Corefall success: The Apex, The Team Title (CTT), and The Season Star.</p>

      <div className="overflow-x-auto bg-panel rounded-lg shadow-lg">
        <table className="w-full border-collapse text-sm min-w-[800px]">
          <thead>
            <tr>
              <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">Season</th>
              <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">Apex World Champion</th>
              <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">CTT (Team) Winner</th>
              <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">Season Star (MVP)</th>
            </tr>
          </thead>
          <tbody>
            {seasons.map(s => (
              <tr key={s.year} className="border-b border-[#2a2f38] hover:bg-[#2c323d] even:bg-[#1f242b]">
                <td className="p-3 text-primary font-bold">{s.year}</td>
                <td className="p-3">
                  <span className="clickable-name c-apex" onClick={() => onPlayerClick(s.apex)}>🏆 {s.apex}</span>
                  <span className="text-muted-foreground text-xs ml-1">({s.apexAge})</span>
                  {" "}
                  <span className={`team-tag clickable-team ${getTeamClass(s.team)}`} onClick={() => onTeamClick(s.team)}>
                    {s.team}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`team-tag clickable-team ${getTeamClass(s.ctt)}`} onClick={() => onTeamClick(s.ctt)}>
                    {s.ctt}
                  </span>
                </td>
                <td className="p-3">
                  <span className="clickable-name" onClick={() => onPlayerClick(s.star)}>⭐ {s.star}</span>
                  <span className="text-muted-foreground text-xs ml-1">({s.starAge})</span>
                  {" "}
                  <span className={`team-tag clickable-team ${getTeamClass(s.starTeam)}`} onClick={() => onTeamClick(s.starTeam)}>
                    {s.starTeam}
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
