import { useState, useMemo } from "react";
import { trophyData } from "@/data/corefallData";
import { ChevronUp, ChevronDown } from "lucide-react";

interface MajorsSectionProps {
  onPlayerClick: (name: string) => void;
}

type SortKey = "total" | "apex" | "ctt" | "major" | "name";
type SortDirection = "asc" | "desc";

const ALL_YEARS = ["700", "701", "702", "703", "704", "705", "706", "707", "708"];

// Parse trophy list to extract year-specific trophies
function parseTrophyList(list: string): { apex: string[]; ctt: string[]; major: string[] } {
  const result = { apex: [] as string[], ctt: [] as string[], major: [] as string[] };
  
  // Match patterns like "Apex (702, 704)" or "Heritage (701, 702)"
  const regex = /([A-Za-z\s]+)\s*\(([^)]+)\)/g;
  let match;
  
  while ((match = regex.exec(list)) !== null) {
    const trophyName = match[1].trim();
    const years = match[2].split(",").map(y => y.trim());
    
    years.forEach(year => {
      const entry = `${trophyName} (${year})`;
      if (trophyName === "Apex") {
        result.apex.push(year);
      } else if (trophyName === "CTT") {
        result.ctt.push(year);
      } else {
        result.major.push(year);
      }
    });
  }
  
  return result;
}

export function MajorsSection({ onPlayerClick }: MajorsSectionProps) {
  const [sortKey, setSortKey] = useState<SortKey>("total");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [selectedYears, setSelectedYears] = useState<Set<string>>(new Set(ALL_YEARS));

  const toggleYear = (year: string) => {
    setSelectedYears(prev => {
      const next = new Set(prev);
      if (next.has(year)) {
        next.delete(year);
      } else {
        next.add(year);
      }
      return next;
    });
  };

  const selectAll = () => setSelectedYears(new Set(ALL_YEARS));
  const clearAll = () => setSelectedYears(new Set());

  // Filter and recalculate trophies based on selected years
  const filteredTrophies = useMemo(() => {
    return trophyData.map(t => {
      const parsed = parseTrophyList(t.list);
      
      const filteredApex = parsed.apex.filter(y => selectedYears.has(y)).length;
      const filteredCtt = parsed.ctt.filter(y => selectedYears.has(y)).length;
      const filteredMajor = parsed.major.filter(y => selectedYears.has(y)).length;
      const filteredTotal = filteredApex + filteredCtt + filteredMajor;
      
      // Filter the list string to only show selected years
      const filteredList = t.list.split(",").map(part => part.trim()).filter(part => {
        const yearMatch = part.match(/\((\d{3})\)/);
        if (yearMatch) {
          return selectedYears.has(yearMatch[1]);
        }
        // Handle entries like "Apex (702, 704)" - need to filter individual years
        const multiYearMatch = part.match(/\(([^)]+)\)/);
        if (multiYearMatch) {
          const years = multiYearMatch[1].split(",").map(y => y.trim());
          return years.some(y => selectedYears.has(y));
        }
        return true;
      }).join(", ");
      
      return {
        ...t,
        apex: filteredApex,
        ctt: filteredCtt,
        major: filteredMajor,
        total: filteredTotal,
        filteredList
      };
    }).filter(t => t.total > 0);
  }, [selectedYears]);

  const sortedTrophies = useMemo(() => {
    return [...filteredTrophies].sort((a, b) => {
      let comparison = 0;
      if (sortKey === "name") {
        comparison = a.name.localeCompare(b.name);
      } else {
        comparison = a[sortKey] - b[sortKey];
      }
      return sortDirection === "desc" ? -comparison : comparison;
    });
  }, [filteredTrophies, sortKey, sortDirection]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "desc" ? "asc" : "desc");
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
  };

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return null;
    return sortDirection === "desc" ? (
      <ChevronDown className="inline w-4 h-4 ml-1" />
    ) : (
      <ChevronUp className="inline w-4 h-4 ml-1" />
    );
  };

  return (
    <div className="animate-fadeIn">
      <h1 className="text-white">Championship Trophy Room (Since 700)</h1>
      <p className="text-foreground"><strong>Click headers to sort.</strong> Includes Apex Championships, Team Titles (CTT), and Major Tournaments.</p>

      {/* Year Filter */}
      <div className="bg-panel p-4 rounded-lg mb-6 border border-border">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground mr-2">Filter by Year:</span>
          <button
            onClick={selectAll}
            className="px-3 py-1 text-xs rounded bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
          >
            All
          </button>
          <button
            onClick={clearAll}
            className="px-3 py-1 text-xs rounded bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
          >
            Clear
          </button>
          <div className="w-px h-6 bg-border mx-2" />
          {ALL_YEARS.map(year => (
            <button
              key={year}
              onClick={() => toggleYear(year)}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                selectedYears.has(year)
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto bg-panel rounded-lg shadow-lg">
        <table className="w-full border-collapse text-sm min-w-[800px]">
          <thead>
            <tr>
              <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">#</th>
              <th 
                className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10 cursor-pointer hover:bg-[#111] hover:text-white transition-colors"
                onClick={() => handleSort("name")}
              >
                Fighter
                <SortIcon column="name" />
              </th>
              <th 
                className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-center sticky top-0 z-10 cursor-pointer hover:bg-[#111] hover:text-white transition-colors"
                onClick={() => handleSort("total")}
              >
                Total
                <SortIcon column="total" />
              </th>
              <th 
                className="bg-black text-[hsl(var(--gold))] uppercase text-xs tracking-wider p-3 text-center sticky top-0 z-10 cursor-pointer hover:bg-[#111] hover:text-white transition-colors"
                onClick={() => handleSort("apex")}
              >
                Apex
                <SortIcon column="apex" />
              </th>
              <th 
                className="bg-black text-[hsl(var(--silver))] uppercase text-xs tracking-wider p-3 text-center sticky top-0 z-10 cursor-pointer hover:bg-[#111] hover:text-white transition-colors"
                onClick={() => handleSort("ctt")}
              >
                CTT
                <SortIcon column="ctt" />
              </th>
              <th 
                className="bg-black text-[hsl(var(--bronze))] uppercase text-xs tracking-wider p-3 text-center sticky top-0 z-10 cursor-pointer hover:bg-[#111] hover:text-white transition-colors"
                onClick={() => handleSort("major")}
              >
                Major
                <SortIcon column="major" />
              </th>
              <th className="bg-black text-primary uppercase text-xs tracking-wider p-3 text-left sticky top-0 z-10">Detailed Victory List</th>
            </tr>
          </thead>
          <tbody>
            {sortedTrophies.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-muted-foreground">No trophies found for selected years.</td>
              </tr>
            ) : (
              sortedTrophies.map((t, idx) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
