import { useState, useMemo } from "react";
import { pastStandings, pastTeamStandings, getTeamClass } from "@/data/corefallData";

interface ArchiveSectionProps {
  onPlayerClick: (name: string) => void;
  onTeamClick: (name: string) => void;
}

type SortKey = "Points" | "KOs" | "Age" | null;
type SortDir = "asc" | "desc";

export function ArchiveSection({ onPlayerClick, onTeamClick }: ArchiveSectionProps) {
  const [selectedSeason, setSelectedSeason] = useState("707");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  
  const seasonOptions = ["707", "706", "705", "704", "703", "702", "701", "700"];
  
  const standings = pastStandings[selectedSeason] || [];
  const teamStandings = pastTeamStandings[selectedSeason] || [];

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "desc" ? "asc" : "desc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const sortedStandings = useMemo(() => {
    let filtered = standings.filter(p => 
      p.Name.toLowerCase().includes(search.toLowerCase()) ||
      p.Team.toLowerCase().includes(search.toLowerCase())
    );

    if (sortKey) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        return sortDir === "desc" ? bVal - aVal : aVal - bVal;
      });
    }

    return filtered;
  }, [standings, search, sortKey, sortDir]);

  const getSortIndicator = (key: SortKey) => {
    if (sortKey !== key) return "";
    return sortDir === "desc" ? " ▼" : " ▲";
  };

  return (
    <div className="animate-fadeIn">
      <h1 className="text-white">Historical Standings Archive</h1>
      <p className="text-foreground">Browse standings from past seasons (700-707). Click column headers to sort.</p>

      <div className="flex flex-wrap gap-4 mb-5">
        <select 
          value={selectedSeason}
          onChange={e => { setSelectedSeason(e.target.value); setSortKey(null); }}
          className="p-2.5 bg-[#222] text-white border border-border rounded cursor-pointer w-[200px]"
        >
          {seasonOptions.map(s => (
            <option key={s} value={s}>Season {s}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search fighter or team..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="p-2.5 w-full max-w-[300px] bg-[#222] border border-border text-white rounded focus:outline-none focus:border-primary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        <div>
          <h2 className="text-white">Individual Standings (Top 40)</h2>
          <div className="overflow-x-auto bg-panel rounded-lg shadow-lg max-h-[600px] overflow-y-auto">
            <table className="w-full border-collapse text-sm min-w-[600px]">
              <thead>
                <tr>
                  <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">Rank</th>
                  <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">Fighter</th>
                  <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">Team</th>
                  <th 
                    className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-center sticky top-0 z-10 cursor-pointer hover:bg-[#111] hover:text-white select-none"
                    onClick={() => handleSort("Points")}
                  >
                    Points{getSortIndicator("Points")}
                  </th>
                  <th 
                    className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-center sticky top-0 z-10 cursor-pointer hover:bg-[#111] hover:text-white select-none"
                    onClick={() => handleSort("KOs")}
                  >
                    KOs{getSortIndicator("KOs")}
                  </th>
                  <th 
                    className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-center sticky top-0 z-10 cursor-pointer hover:bg-[#111] hover:text-white select-none"
                    onClick={() => handleSort("Age")}
                  >
                    Age{getSortIndicator("Age")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedStandings.map((p, idx) => (
                  <tr key={`${p.Name}-${idx}`} className="border-b border-[#2a2f38] hover:bg-[#2c323d] even:bg-[#1f242b]">
                    <td className="p-3 font-bold text-muted-foreground">{sortKey ? idx + 1 : p.Rank}</td>
                    <td className="p-3">
                      <span className="clickable-name" onClick={() => onPlayerClick(p.Name)}>{p.Name}</span>
                    </td>
                    <td className="p-3">
                      <span className={`team-tag clickable-team ${getTeamClass(p.Team)}`} onClick={() => onTeamClick(p.Team)}>
                        {p.Team}
                      </span>
                    </td>
                    <td className="p-3 text-center font-bold">{p.Points}</td>
                    <td className="p-3 text-center font-semibold">{p.KOs}</td>
                    <td className="p-3 text-center">{p.Age}</td>
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
                  <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">Rank</th>
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
