import { useState } from "react";
import { pastStandings, pastTeamStandings, getTeamClass } from "@/data/corefallData";

interface ResultsSectionProps {
  onPlayerClick: (name: string) => void;
  onTeamClick: (name: string) => void;
}

export function ResultsSection({ onPlayerClick, onTeamClick }: ResultsSectionProps) {
  const [search, setSearch] = useState("");
  
  const standings = pastStandings["707"] || [];
  const teamStandings = pastTeamStandings["707"] || [];

  const filteredStandings = standings.filter(p => 
    p.Name.toLowerCase().includes(search.toLowerCase()) ||
    p.Team.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fadeIn">
      <h1 className="text-[hsl(var(--gold))]">Season 708 Standings</h1>
      <p className="text-foreground">Live standings for <strong>Season 708</strong>. (Season Starting Soon - Showing 707 Results)</p>

      <input
        type="text"
        placeholder="Search fighter or team..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="p-2.5 w-full max-w-[300px] bg-[#222] border border-border text-white rounded mb-5 focus:outline-none focus:border-primary"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        <div>
          <h2 className="text-white">Individual Standings</h2>
          <div className="overflow-x-auto bg-panel rounded-lg shadow-lg max-h-[600px] overflow-y-auto">
            <table className="w-full border-collapse text-sm min-w-[800px]">
              <thead>
                <tr>
                  <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">#</th>
                  <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">Fighter</th>
                  <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">Team</th>
                  <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">Age</th>
                  <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-center sticky top-0 z-10">Points</th>
                  <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-center sticky top-0 z-10">KOs</th>
                </tr>
              </thead>
              <tbody>
                {filteredStandings.map(p => (
                  <tr key={p.Rank} className="border-b border-[#2a2f38] hover:bg-[#2c323d] even:bg-[#1f242b]">
                    <td className="p-3 font-bold text-muted-foreground w-12">{p.Rank}</td>
                    <td className="p-3">
                      <span className="clickable-name" onClick={() => onPlayerClick(p.Name)}>{p.Name}</span>
                    </td>
                    <td className="p-3">
                      <span className={`team-tag clickable-team ${getTeamClass(p.Team)}`} onClick={() => onTeamClick(p.Team)}>
                        {p.Team}
                      </span>
                    </td>
                    <td className="p-3">{p.Age}</td>
                    <td className="p-3 text-center font-bold text-white text-lg bg-white/5">{p.Points}</td>
                    <td className="p-3 text-center font-semibold">{p.KOs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-white">Team Standings</h2>
          <div className="overflow-x-auto bg-panel rounded-lg shadow-lg max-h-[600px] overflow-y-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">#</th>
                  <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">Team</th>
                  <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-center sticky top-0 z-10">Points</th>
                </tr>
              </thead>
              <tbody>
                {teamStandings.map((t, idx) => (
                  <tr key={t.team} className="border-b border-[#2a2f38] hover:bg-[#2c323d] even:bg-[#1f242b]">
                    <td className="p-3 font-bold text-muted-foreground">{idx + 1}</td>
                    <td className="p-3">
                      <span className={`team-tag clickable-team ${getTeamClass(t.team)}`} onClick={() => onTeamClick(t.team)}>
                        {t.team}
                      </span>
                    </td>
                    <td className="p-3 text-center font-bold text-white">{t.points.toLocaleString()}</td>
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
