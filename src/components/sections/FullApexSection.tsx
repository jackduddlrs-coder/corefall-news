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
    // Find the last ) before " vs " to handle nested scores like (2-1(4-3,0-4,4-2))
    const vsIndex = m.match.indexOf(" vs ");
    if (vsIndex === -1) return { round: m.round, winner: "", loser: "", score: "" };
    
    const beforeVs = m.match.substring(0, vsIndex);
    const loser = m.match.substring(vsIndex + 4).trim();
    
    // Find the opening parenthesis for the score
    const firstParen = beforeVs.indexOf("(");
    if (firstParen === -1) return { round: m.round, winner: beforeVs.trim(), loser, score: "" };
    
    const winner = beforeVs.substring(0, firstParen).trim();
    const score = beforeVs.substring(firstParen + 1, beforeVs.lastIndexOf(")"));
    
    return {
      round: m.round,
      winner,
      loser,
      score
    };
  });
}

function Apex700Bracket() {
  const matches = parseBracketData(fullMatches["700"]);
  
  const r16 = matches.filter(m => m.round === "R16");
  const qf = matches.filter(m => m.round === "QF");
  const sf = matches.filter(m => m.round === "SF");
  const finals = matches.find(m => m.round === "Finals");

  const MatchBox = ({ winner, loser, score, isWinner }: { winner: string; loser: string; score: string; isWinner?: boolean }) => (
    <div className="bg-card border border-border rounded-lg overflow-hidden text-xs min-w-[140px]">
      <div className={`px-2 py-1.5 flex justify-between items-center ${isWinner ? 'bg-primary/20 text-primary font-bold' : 'bg-muted/30'}`}>
        <span className="truncate">{winner}</span>
        <span className="text-[10px] ml-1 opacity-70">{score.split(',')[0] || score.split('(')[0]}</span>
      </div>
      <div className="px-2 py-1.5 text-muted-foreground border-t border-border/50">
        <span className="truncate">{loser}</span>
      </div>
    </div>
  );

  return (
    <div className="overflow-x-auto pb-4">
      <div className="min-w-[900px] p-4">
        <h3 className="text-lg font-bold text-primary mb-4">Apex 700 Championship Bracket</h3>
        
        <div className="flex gap-8 items-start">
          {/* Round of 16 */}
          <div className="flex flex-col gap-2">
            <div className="text-xs font-semibold text-muted-foreground mb-2 text-center">Round of 16</div>
            <div className="flex flex-col gap-4">
              {r16.map((m, i) => (
                <MatchBox key={i} winner={m.winner} loser={m.loser} score={m.score} />
              ))}
            </div>
          </div>

          {/* Quarterfinals */}
          <div className="flex flex-col gap-2 pt-8">
            <div className="text-xs font-semibold text-muted-foreground mb-2 text-center">Quarterfinals</div>
            <div className="flex flex-col gap-[72px]">
              {qf.map((m, i) => (
                <MatchBox key={i} winner={m.winner} loser={m.loser} score={m.score} />
              ))}
            </div>
          </div>

          {/* Semifinals */}
          <div className="flex flex-col gap-2 pt-24">
            <div className="text-xs font-semibold text-muted-foreground mb-2 text-center">Semifinals</div>
            <div className="flex flex-col gap-[180px]">
              {sf.map((m, i) => (
                <MatchBox key={i} winner={m.winner} loser={m.loser} score={m.score} />
              ))}
            </div>
          </div>

          {/* Finals */}
          <div className="flex flex-col gap-2 pt-48">
            <div className="text-xs font-semibold text-muted-foreground mb-2 text-center">Finals</div>
            {finals && (
              <MatchBox winner={finals.winner} loser={finals.loser} score={finals.score} isWinner />
            )}
          </div>

          {/* Champion */}
          <div className="flex flex-col gap-2 pt-48">
            <div className="text-xs font-semibold text-primary mb-2 text-center">Champion</div>
            <div className="bg-gradient-to-r from-primary/20 to-primary/10 border-2 border-primary rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-primary">{finals?.winner}</div>
              <div className="text-xs text-muted-foreground mt-1">Apex 700 World Champion</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FullApexSection() {
  const [openSeason, setOpenSeason] = useState<string | null>("700");
  const [viewMode, setViewMode] = useState<"bracket" | "list">("bracket");

  const seasonKeys = Object.keys(fullMatches).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="animate-fadeIn">
      <h1 className="text-white">Full Apex Tournament Results (700-707)</h1>
      <p className="text-foreground mb-4">Complete match history for every Apex World Championship.</p>

      <div>
        {seasonKeys.map(season => (
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
                {/* View toggle for Apex 700 */}
                {season === "700" && (
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => setViewMode("bracket")}
                      className={`px-3 py-1.5 text-xs rounded transition-colors ${viewMode === "bracket" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                    >
                      Bracket View
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`px-3 py-1.5 text-xs rounded transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                    >
                      List View
                    </button>
                  </div>
                )}

                {/* Show bracket for Apex 700, list for others */}
                {season === "700" && viewMode === "bracket" ? (
                  <Apex700Bracket />
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
        ))}
      </div>
    </div>
  );
}
