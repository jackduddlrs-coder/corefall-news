import { useState, useMemo, useRef, useEffect } from "react";
import { Search, X, User, Users } from "lucide-react";
import { pastStandings, pastTeamStandings, getTeamClass } from "@/data/corefallData";

interface GlobalSearchProps {
  onPlayerClick: (name: string) => void;
  onTeamClick: (name: string) => void;
}

type SearchResult = {
  type: "player" | "team";
  name: string;
  team?: string;
};

export const GlobalSearch = ({ onPlayerClick, onTeamClick }: GlobalSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get all unique players with their most played team
  const allPlayers = useMemo(() => {
    const playerTeams: Record<string, Record<string, number>> = {};
    
    Object.values(pastStandings).forEach(players => {
      players.forEach(p => {
        if (!playerTeams[p.Name]) {
          playerTeams[p.Name] = {};
        }
        playerTeams[p.Name][p.Team] = (playerTeams[p.Name][p.Team] || 0) + 1;
      });
    });

    return Object.entries(playerTeams).map(([name, teams]) => {
      const mostPlayed = Object.entries(teams).sort((a, b) => b[1] - a[1])[0][0];
      return { name, team: mostPlayed };
    });
  }, []);

  // Get all unique teams
  const allTeams = useMemo(() => {
    const teams = new Set<string>();
    Object.values(pastTeamStandings).forEach(standings => {
      standings.forEach(t => teams.add(t.team));
    });
    return Array.from(teams).sort();
  }, []);

  // Filter results based on query
  const results = useMemo((): SearchResult[] => {
    if (!query.trim()) return [];
    
    const q = query.toLowerCase();
    const playerResults: SearchResult[] = allPlayers
      .filter(p => p.name.toLowerCase().includes(q))
      .slice(0, 5)
      .map(p => ({ type: "player", name: p.name, team: p.team }));
    
    const teamResults: SearchResult[] = allTeams
      .filter(t => t.toLowerCase().includes(q))
      .slice(0, 3)
      .map(t => ({ type: "team", name: t }));

    return [...teamResults, ...playerResults];
  }, [query, allPlayers, allTeams]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when opening
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard shortcut (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelect = (result: SearchResult) => {
    if (result.type === "player") {
      onPlayerClick(result.name);
    } else {
      onTeamClick(result.name);
    }
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors"
      >
        <Search className="w-4 h-4" />
        <span className="hidden md:inline text-sm">Search...</span>
        <kbd className="hidden md:inline text-[10px] bg-background/50 px-1.5 py-0.5 rounded border border-border">
          ⌘K
        </kbd>
      </button>

      {/* Search Modal/Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" onClick={() => setIsOpen(false)} />
          
          {/* Search Panel */}
          <div className="fixed left-1/2 top-1/4 -translate-x-1/2 w-[90vw] max-w-md bg-card border border-border rounded-lg shadow-2xl z-50 overflow-hidden">
            {/* Search Input */}
            <div className="flex items-center gap-2 p-3 border-b border-border">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search players or teams..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto">
              {query && results.length === 0 && (
                <div className="p-4 text-center text-muted-foreground text-sm">
                  No results found for "{query}"
                </div>
              )}
              
              {results.length > 0 && (
                <div className="p-2">
                  {results.map((result, idx) => (
                    <button
                      key={`${result.type}-${result.name}-${idx}`}
                      onClick={() => handleSelect(result)}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors text-left"
                    >
                      {result.type === "player" ? (
                        <User className="w-4 h-4 text-primary shrink-0" />
                      ) : (
                        <Users className="w-4 h-4 text-yellow-500 shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">
                          {result.name}
                        </div>
                        {result.type === "player" && result.team && (
                          <div className="text-xs text-muted-foreground">
                            <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] ${getTeamClass(result.team)}`}>
                              {result.team}
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-muted-foreground uppercase">
                        {result.type}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {!query && (
                <div className="p-4 text-center text-muted-foreground text-sm">
                  Type to search for players or teams
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-2 border-t border-border bg-muted/30 flex items-center justify-between text-[10px] text-muted-foreground">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>Esc Close</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
