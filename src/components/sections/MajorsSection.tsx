import { trophyData } from "@/data/corefallData";

interface MajorsSectionProps {
  onPlayerClick: (name: string) => void;
}

export function MajorsSection({ onPlayerClick }: MajorsSectionProps) {
  const sortedTrophies = [...trophyData].sort((a, b) => b.total - a.total);

  return (
    <div className="animate-fadeIn">
      <h1 className="text-white">Championship Trophy Room (Since 700)</h1>
      <p className="text-foreground"><strong>Click headers to sort.</strong> Includes Apex Championships, Team Titles (CTT), and Major Tournaments.</p>

      <div className="overflow-x-auto bg-panel rounded-lg shadow-lg">
        <table className="w-full border-collapse text-sm min-w-[800px]">
          <thead>
            <tr>
              <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10 cursor-pointer hover:bg-[#111] hover:text-white">#</th>
              <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10 cursor-pointer hover:bg-[#111] hover:text-white">Fighter</th>
              <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-center sticky top-0 z-10 cursor-pointer hover:bg-[#111] hover:text-white">Total</th>
              <th className="bg-black text-[hsl(var(--gold))] uppercase text-xs tracking-wider p-3 text-center sticky top-0 z-10 cursor-pointer hover:bg-[#111] hover:text-white">Apex</th>
              <th className="bg-black text-[hsl(var(--silver))] uppercase text-xs tracking-wider p-3 text-center sticky top-0 z-10 cursor-pointer hover:bg-[#111] hover:text-white">CTT</th>
              <th className="bg-black text-[hsl(var(--bronze))] uppercase text-xs tracking-wider p-3 text-center sticky top-0 z-10 cursor-pointer hover:bg-[#111] hover:text-white">Major</th>
              <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">Detailed Victory List</th>
            </tr>
          </thead>
          <tbody>
            {sortedTrophies.map((t, idx) => (
              <tr key={t.name} className="border-b border-[#2a2f38] hover:bg-[#2c323d] even:bg-[#1f242b]">
                <td className="p-3 font-bold text-muted-foreground w-12">{idx + 1}</td>
                <td className="p-3">
                  <span className="clickable-name" onClick={() => onPlayerClick(t.name)}>{t.name}</span>
                </td>
                <td className="p-3 text-center font-bold text-white text-lg bg-white/5">{t.total}</td>
                <td className="p-3 text-center font-semibold c-apex">{t.apex}</td>
                <td className="p-3 text-center font-semibold c-ctt">{t.ctt}</td>
                <td className="p-3 text-center font-semibold c-major">{t.major}</td>
                <td className="p-3 text-xs text-muted-foreground max-w-[500px] leading-relaxed">{t.list}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
