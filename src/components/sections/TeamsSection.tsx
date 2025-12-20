import React, { useState, useMemo } from "react";
import { seasons, getTeamClass, pastStandings, inactiveTeams } from "@/data/corefallData";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TeamsSectionProps {
  onTeamClick: (name: string) => void;
  onPlayerClick?: (name: string) => void;
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

type SortKey = "name" | "apex" | "ctt" | "star";
type SortDir = "asc" | "desc";

export function TeamsSection({ onTeamClick, onPlayerClick }: TeamsSectionProps) {
  const [sortKey, setSortKey] = useState<SortKey>("apex");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);

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

  // Get all-time top players for each team
  const teamTopPlayers = useMemo(() => {
    const result: Record<string, { name: string; totalPoints: number; seasons: number }[]> = {};
    const playersByTeam: Record<string, Record<string, { totalPoints: number; seasons: number }>> = {};

    Object.values(pastStandings).forEach(seasonStandings => {
      seasonStandings.forEach(p => {
        if (!playersByTeam[p.Team]) playersByTeam[p.Team] = {};
        if (!playersByTeam[p.Team][p.Name]) {
          playersByTeam[p.Team][p.Name] = { totalPoints: 0, seasons: 0 };
        }
        playersByTeam[p.Team][p.Name].totalPoints += p.Points;
        playersByTeam[p.Team][p.Name].seasons += 1;
      });
    });

    Object.entries(playersByTeam).forEach(([team, players]) => {
      result[team] = Object.entries(players)
        .map(([name, stats]) => ({ name, ...stats }))
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .slice(0, 5);
    });

    return result;
  }, []);

  const teamList = Object.entries(teamStats)
    .map(([name, awards]) => ({ 
      name, 
      apex: awards.apex,
      ctt: awards.ctt,
      star: awards.star,
      apexCount: awards.apex.length,
      cttCount: awards.ctt.length,
      starCount: awards.star.length,
      topPlayers: teamTopPlayers[name] || []
    }))
    .sort((a, b) => {
      let aVal: string | number;
      let bVal: string | number;
      
      switch (sortKey) {
        case "name":
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case "apex":
          aVal = a.apexCount;
          bVal = b.apexCount;
          break;
        case "ctt":
          aVal = a.cttCount;
          bVal = b.cttCount;
          break;
        case "star":
          aVal = a.starCount;
          bVal = b.starCount;
          break;
        default:
          return 0;
      }
      
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  };

  const getSortIndicator = (key: SortKey) => {
    if (sortKey !== key) return "";
    return sortDir === "asc" ? " ▲" : " ▼";
  };

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

  const toggleTeamExpand = (teamName: string) => {
    setExpandedTeam(expandedTeam === teamName ? null : teamName);
  };

  return (
    <div className="animate-fadeIn">
      <h1 className="text-white">Team Franchise History</h1>
      <p className="text-foreground">Comprehensive record of Apex Championships, CTT Titles, and Season Stars for every team.</p>

      <div className="overflow-x-auto bg-panel rounded-lg shadow-lg">
        <table className="w-full border-collapse text-sm min-w-[700px]">
          <thead>
            <tr>
              <th 
                className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10 cursor-pointer hover:bg-[#111] hover:text-white"
                onClick={() => handleSort("name")}
              >
                Team{getSortIndicator("name")}
              </th>
              <th 
                className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-center sticky top-0 z-10 cursor-pointer hover:bg-[#111] hover:text-white"
                onClick={() => handleSort("apex")}
              >
                Apex Titles{getSortIndicator("apex")}
              </th>
              <th 
                className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-center sticky top-0 z-10 cursor-pointer hover:bg-[#111] hover:text-white"
                onClick={() => handleSort("ctt")}
              >
                CTT Titles{getSortIndicator("ctt")}
              </th>
              <th 
                className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-center sticky top-0 z-10 cursor-pointer hover:bg-[#111] hover:text-white"
                onClick={() => handleSort("star")}
              >
                Season Stars{getSortIndicator("star")}
              </th>
              <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-center sticky top-0 z-10 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {teamList.map(t => {
              const isExpanded = expandedTeam === t.name;
              return (
                <React.Fragment key={t.name}>
                  <tr 
                    className={`border-b border-[#2a2f38] hover:bg-[#2c323d] align-top cursor-pointer ${isExpanded ? 'bg-[#2c323d]' : 'even:bg-[#1f242b]'}`}
                    onClick={() => t.topPlayers.length > 0 && toggleTeamExpand(t.name)}
                  >
                    <td className="p-3">
                      <span 
                        className={`team-tag clickable-team ${getTeamClass(t.name)} ${inactiveTeams.includes(t.name) ? 'opacity-60' : ''}`} 
                        onClick={(e) => { e.stopPropagation(); onTeamClick(t.name); }}
                      >
                        {t.name}
                      </span>
                      {inactiveTeams.includes(t.name) && (
                        <span className="ml-2 text-xs text-muted-foreground italic">(Inactive)</span>
                      )}
                      {t.topPlayers.length > 0 && !inactiveTeams.includes(t.name) && (
                        <span className="ml-2 text-xs text-muted-foreground hidden md:inline">
                          ({t.topPlayers.length} top players)
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-center c-apex">{formatAwards(t.apex, true)}</td>
                    <td className="p-3 text-center c-ctt">{formatAwards(t.ctt, false)}</td>
                    <td className="p-3 text-center c-major">{formatAwards(t.star, true)}</td>
                    <td className="p-3 text-center">
                      {t.topPlayers.length > 0 && (
                        isExpanded ? 
                          <ChevronUp className="h-4 w-4 text-muted-foreground inline" /> : 
                          <ChevronDown className="h-4 w-4 text-muted-foreground inline" />
                      )}
                    </td>
                  </tr>
                  {isExpanded && t.topPlayers.length > 0 && (
                    <tr>
                      <td colSpan={5} className="p-0 bg-[#1a1f25]">
                        <div className="p-3">
                          <div className="text-xs text-muted-foreground mb-2">Top Historical Players (Since 700)</div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {t.topPlayers.map((p, idx) => (
                              <div 
                                key={p.name} 
                                className={`flex justify-between items-center text-xs py-2 px-3 bg-background/30 rounded border border-border/30 ${onPlayerClick ? 'cursor-pointer hover:bg-background/60' : ''}`}
                                onClick={(e) => { e.stopPropagation(); onPlayerClick?.(p.name); }}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground">#{idx + 1}</span>
                                  <span className="clickable-name">{p.name}</span>
                                </div>
                                <span className="font-semibold text-foreground">{p.totalPoints.toLocaleString()} pts</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
