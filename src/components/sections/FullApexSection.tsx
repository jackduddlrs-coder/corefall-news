import { useState } from "react";
import { fullMatches } from "@/data/corefallData";

interface BracketMatch {
  round: string;
  winner: string;
  loser: string;
  score: string;
}

function parseBracketData(matches: { round: string; match: string }[]): BracketMatch[] {
  return matches.map(m => {
    // Parse "Winner (score) vs Loser" format - handle nested parentheses
    const vsIndex = m.match.indexOf(" vs ");
    if (vsIndex === -1) return { round: m.round, winner: "", loser: "", score: "" };
    
    const beforeVs = m.match.substring(0, vsIndex);
    const loser = m.match.substring(vsIndex + 4).trim();
    
    const firstParen = beforeVs.indexOf("(");
    if (firstParen === -1) return { round: m.round, winner: beforeVs.trim(), loser, score: "" };
    
    const winner = beforeVs.substring(0, firstParen).trim();
    const score = beforeVs.substring(firstParen + 1, beforeVs.lastIndexOf(")"));
    
    return { round: m.round, winner, loser, score };
  });
}

// Check if a season has standard single-elimination bracket format
function hasStandardBracket(season: string): boolean {
  const matches = fullMatches[season];
  if (!matches) return false;
  
  const rounds = matches.map(m => m.round);
  // Standard bracket has R16, QF, SF, Finals (no group stages)
  return rounds.includes("R16") && rounds.includes("QF") && 
         rounds.includes("SF") && rounds.includes("Finals") &&
         !rounds.includes("UBR1") && !rounds.includes("LBR1");
}

function ApexBracket({ season }: { season: string }) {
  const matches = parseBracketData(fullMatches[season]);
  
  const r16 = matches.filter(m => m.round === "R16");
  const qf = matches.filter(m => m.round === "QF");
  const sf = matches.filter(m => m.round === "SF");
  const finals = matches.find(m => m.round === "Finals");

  const MatchBox = ({ winner, loser, score, isChampion }: { winner: string; loser: string; score: string; isChampion?: boolean }) => (
    <div className={`bg-card border rounded-lg overflow-hidden text-xs min-w-[140px] ${isChampion ? 'border-primary' : 'border-border'}`}>
      <div className={`px-2 py-1.5 flex justify-between items-center ${isChampion ? 'bg-primary/20 text-primary font-bold' : 'bg-muted/30 text-foreground'}`}>
        <span className="truncate">{winner}</span>
        <span className="text-[10px] ml-1 opacity-70">{score.includes("(") ? score.split("(")[0] : score}</span>
      </div>
      <div className="px-2 py-1.5 text-muted-foreground border-t border-border/50">
        <span className="truncate">{loser}</span>
      </div>
    </div>
  );

  return (
    <div className="overflow-x-auto pb-4">
      <div className="min-w-[900px] p-4">
        <h3 className="text-lg font-bold text-primary mb-4">Apex {season} Championship Bracket</h3>
        
        <div className="flex gap-6 items-start">
          {/* Round of 16 */}
          <div className="flex flex-col">
            <div className="text-xs font-semibold text-muted-foreground mb-2 text-center">Round of 16</div>
            <div className="flex flex-col gap-3">
              {r16.map((m, i) => (
                <MatchBox key={i} winner={m.winner} loser={m.loser} score={m.score} />
              ))}
            </div>
          </div>

          {/* Connector lines R16 to QF */}
          <div className="flex flex-col justify-around h-full pt-6">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="flex items-center h-[100px]">
                <div className="w-4 border-t border-r border-b border-border/50 h-[50px] rounded-r" />
              </div>
            ))}
          </div>

          {/* Quarterfinals */}
          <div className="flex flex-col pt-[38px]">
            <div className="text-xs font-semibold text-muted-foreground mb-2 text-center">Quarterfinals</div>
            <div className="flex flex-col gap-[54px]">
              {qf.map((m, i) => (
                <MatchBox key={i} winner={m.winner} loser={m.loser} score={m.score} />
              ))}
            </div>
          </div>

          {/* Connector lines QF to SF */}
          <div className="flex flex-col justify-around pt-[60px]">
            {[0, 1].map(i => (
              <div key={i} className="flex items-center h-[156px]">
                <div className="w-4 border-t border-r border-b border-border/50 h-[78px] rounded-r" />
              </div>
            ))}
          </div>

          {/* Semifinals */}
          <div className="flex flex-col pt-[94px]">
            <div className="text-xs font-semibold text-muted-foreground mb-2 text-center">Semifinals</div>
            <div className="flex flex-col gap-[156px]">
              {sf.map((m, i) => (
                <MatchBox key={i} winner={m.winner} loser={m.loser} score={m.score} />
              ))}
            </div>
          </div>

          {/* Connector lines SF to Finals */}
          <div className="flex items-center pt-[140px]">
            <div className="w-4 border-t border-r border-b border-border/50 h-[105px] rounded-r" />
          </div>

          {/* Finals */}
          <div className="flex flex-col pt-[188px]">
            <div className="text-xs font-semibold text-muted-foreground mb-2 text-center">Finals</div>
            {finals && (
              <MatchBox winner={finals.winner} loser={finals.loser} score={finals.score} isChampion />
            )}
          </div>

          {/* Champion */}
          <div className="flex flex-col pt-[188px]">
            <div className="text-xs font-semibold text-primary mb-2 text-center">Champion</div>
            <div className="bg-gradient-to-r from-primary/20 to-primary/10 border-2 border-primary rounded-lg p-3 text-center min-w-[140px]">
              <div className="text-base font-bold text-primary">{finals?.winner}</div>
              <div className="text-[10px] text-muted-foreground mt-1">Apex {season} Champion</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FullApexSection() {
  const [openSeason, setOpenSeason] = useState<string | null>("700");
  const [viewModes, setViewModes] = useState<Record<string, "bracket" | "list">>({
    "700": "bracket", "701": "bracket", "702": "bracket", 
    "703": "bracket", "704": "bracket", "705": "bracket"
  });

  const seasonKeys = Object.keys(fullMatches).sort((a, b) => Number(b) - Number(a));

  const toggleViewMode = (season: string) => {
    setViewModes(prev => ({
      ...prev,
      [season]: prev[season] === "bracket" ? "list" : "bracket"
    }));
  };

  return (
    <div className="animate-fadeIn">
      <h1 className="text-white">Full Apex Tournament Results (700-707)</h1>
      <p className="text-foreground mb-4">Complete match history for every Apex World Championship.</p>

      <div>
        {seasonKeys.map(season => {
          const hasBracket = hasStandardBracket(season);
          const currentView = viewModes[season] || "list";
          
          return (
            <div key={season}>
              <button
                className={`cursor-pointer p-4 w-full border-none text-left text-lg transition-colors bg-[#222] text-white border-b border-border flex justify-between items-center font-bold hover:bg-[#333] hover:text-primary ${openSeason === season ? "bg-[#333] text-primary" : ""}`}
                onClick={() => setOpenSeason(openSeason === season ? null : season)}
              >
                <span>Apex {season}</span>
                <span className="text-primary font-bold ml-1">{openSeason === season ? "−" : "+"}</span>
              </button>
              
              <div 
                className={`bg-panel overflow-hidden transition-all duration-200 ${openSeason === season ? "max-h-[2000px]" : "max-h-0"}`}
              >
                <div className="p-4">
                  {/* View toggle for seasons with bracket support */}
                  {hasBracket && (
                    <div className="flex gap-2 mb-4">
                      <button
                        onClick={() => toggleViewMode(season)}
                        className={`px-3 py-1.5 text-xs rounded transition-colors ${currentView === "bracket" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                      >
                        Bracket View
                      </button>
                      <button
                        onClick={() => toggleViewMode(season)}
                        className={`px-3 py-1.5 text-xs rounded transition-colors ${currentView === "list" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                      >
                        List View
                      </button>
                    </div>
                  )}

                  {/* Show bracket or list based on view mode */}
                  {hasBracket && currentView === "bracket" ? (
                    <ApexBracket season={season} />
                  ) : (
                    fullMatches[season].map((m, idx) => (
                      <div 
                        key={idx} 
                        className="py-2 border-b border-border last:border-b-0 flex justify-between text-sm"
                      >
                        <span className="text-muted-foreground font-semibold min-w-[100px]">{m.round}</span>
                        <span className="text-white">{m.match}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
