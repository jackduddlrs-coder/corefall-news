import { useState, useMemo } from "react";
import { pastStandings, pastTeamStandings, getTeamClass } from "@/data/corefallData";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ResultsSectionProps {
  onPlayerClick: (name: string) => void;
  onTeamClick: (name: string) => void;
}

type SortKey = "Points" | "KOs" | "Age" | null;
type SortDir = "asc" | "desc";

export function ResultsSection({ onPlayerClick, onTeamClick }: ResultsSectionProps) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  
  const standings = pastStandings["710"] || [];
  const teamStandings = pastTeamStandings["710"] || [];

  // Get players for each team
  const teamPlayers = useMemo(() => {
    const players: Record<string, { name: string; rank: number; points: number }[]> = {};
    standings.forEach(p => {
      if (!players[p.Team]) players[p.Team] = [];
      players[p.Team].push({ name: p.Name, rank: p.Rank, points: p.Points });
    });
    // Sort by rank within each team
    Object.values(players).forEach(arr => arr.sort((a, b) => a.rank - b.rank));
    return players;
  }, [standings]);

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

  const toggleTeamExpand = (teamName: string) => {
    setExpandedTeam(expandedTeam === teamName ? null : teamName);
  };

  return (
    <div className="animate-fadeIn">
      <h1 className="text-[hsl(var(--gold))]">Season 710 Standings</h1>
      <p className="text-foreground">Live standings for <strong>Season 710</strong>. Click column headers to sort.</p>

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
                  <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-center sticky top-0 z-10 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {teamStandings.map((t, idx) => {
                  const players = teamPlayers[t.team] || [];
                  const isExpanded = expandedTeam === t.team;
                  return (
                    <>
                      <tr 
                        key={t.team} 
                        className={`border-b border-[#2a2f38] hover:bg-[#2c323d] cursor-pointer ${isExpanded ? 'bg-[#2c323d]' : 'even:bg-[#1f242b]'}`}
                        onClick={() => players.length > 0 && toggleTeamExpand(t.team)}
                      >
                        <td className="p-3 font-bold text-muted-foreground">{idx + 1}</td>
                        <td className="p-3">
                          <span 
                            className={`team-tag clickable-team ${getTeamClass(t.team)}`} 
                            onClick={(e) => { e.stopPropagation(); onTeamClick(t.team); }}
                          >
                            {t.team}
                          </span>
                          {players.length > 0 && (
                          <span className="ml-2 text-xs text-muted-foreground">
                              ({players.length} in top 40)
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-center font-bold text-white">{t.points.toLocaleString()}</td>
                        <td className="p-3 text-center">
                          {players.length > 0 && (
                            isExpanded ? 
                              <ChevronUp className="h-4 w-4 text-muted-foreground inline" /> : 
                              <ChevronDown className="h-4 w-4 text-muted-foreground inline" />
                          )}
                        </td>
                      </tr>
                      {isExpanded && players.length > 0 && (
                        <tr key={`${t.team}-players`}>
                          <td colSpan={4} className="p-0 bg-[#1a1f25]">
                            <div className="p-3 space-y-1">
                              {players.map(p => (
                                <div 
                                  key={p.name} 
                                  className="flex justify-between items-center text-xs py-1 px-2 hover:bg-[#2c323d] rounded cursor-pointer"
                                  onClick={(e) => { e.stopPropagation(); onPlayerClick(p.name); }}
                                >
                                  <span className="text-muted-foreground">#{p.rank}</span>
                                  <span className="clickable-name flex-1 mx-2">{p.name}</span>
                                  <span className="font-semibold text-foreground">{p.points} pts</span>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
