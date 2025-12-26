import { useState } from "react";
import { fullMatches, pastStandings, getTeamClass } from "@/data/corefallData";

interface BracketMatch {
  round: string;
  winner: string;
  loser: string;
  score: string;
  group?: string;
}

// Get player's team for a specific season from standings
function getPlayerTeamForSeason(playerName: string, season: string): string {
  const seasonStandings = pastStandings[season];
  if (!seasonStandings) return "";
  
  const player = seasonStandings.find(p => p.Name === playerName);
  return player?.Team || "";
}

function parseBracketData(matches: { round: string; match: string }[]): BracketMatch[] {
  return matches.map(m => {
    const vsIndex = m.match.indexOf(" vs ");
    if (vsIndex === -1) return { round: m.round, winner: "", loser: "", score: "" };
    
    const beforeVs = m.match.substring(0, vsIndex);
    let loser = m.match.substring(vsIndex + 4).trim();
    
    // Extract group info if present
    let group: string | undefined;
    const groupMatch = loser.match(/\(Group ([AB])\)$/);
    if (groupMatch) {
      group = groupMatch[1];
      loser = loser.replace(/\s*\(Group [AB]\)$/, "").trim();
    }
    
    const firstParen = beforeVs.indexOf("(");
    if (firstParen === -1) return { round: m.round, winner: beforeVs.trim(), loser, score: "", group };
    
    const winner = beforeVs.substring(0, firstParen).trim();
    const score = beforeVs.substring(firstParen + 1, beforeVs.lastIndexOf(")"));
    
    return { round: m.round, winner, loser, score, group };
  });
}

function hasStandardBracket(season: string): boolean {
  const matches = fullMatches[season];
  if (!matches) return false;
  const rounds = matches.map(m => m.round);
  return rounds.includes("R16") && rounds.includes("QF") && 
         rounds.includes("SF") && rounds.includes("Finals") &&
         !rounds.includes("UBR1") && !rounds.includes("LBR1");
}

function hasDoubleElimBracket(season: string): boolean {
  const matches = fullMatches[season];
  if (!matches) return false;
  const rounds = matches.map(m => m.round);
  return rounds.includes("UBR1") && rounds.includes("LBR1");
}

const TeamBadge = ({ team, compact }: { team: string; compact?: boolean }) => {
  if (!team) return null;
  const teamClass = getTeamClass(team);
  return (
    <span className={`${teamClass} ${compact ? 'text-[7px] px-1 py-0.5' : 'text-[8px] px-1.5 py-0.5'} rounded font-bold uppercase whitespace-nowrap`}>
      {team.slice(0, 3)}
    </span>
  );
};

const MatchBox = ({ winner, loser, score, isChampion, compact, season }: { 
  winner: string; loser: string; score: string; isChampion?: boolean; compact?: boolean; season: string 
}) => {
  const winnerTeam = getPlayerTeamForSeason(winner, season);
  const loserTeam = getPlayerTeamForSeason(loser, season);
  
  return (
    <div className={`bg-card border rounded-lg overflow-hidden ${compact ? 'text-[10px] min-w-[130px]' : 'text-xs min-w-[160px]'} ${isChampion ? 'border-primary' : 'border-border'}`}>
      <div className={`px-2 py-1.5 flex items-center gap-1.5 ${isChampion ? 'bg-primary/20 text-primary font-bold' : 'bg-muted/30 text-foreground'}`}>
        <TeamBadge team={winnerTeam} compact={compact} />
        <span className="truncate flex-1">{winner}</span>
        <span className="text-[10px] opacity-70">{score.includes("(") ? score.split("(")[0] : score}</span>
      </div>
      <div className="px-2 py-1.5 text-muted-foreground border-t border-border/50 flex items-center gap-1.5">
        <TeamBadge team={loserTeam} compact={compact} />
        <span className="truncate">{loser}</span>
      </div>
    </div>
  );
};

function DoubleElimBracket({ season }: { season: string }) {
  const matches = parseBracketData(fullMatches[season]);
  
  const getGroupMatches = (group: string, round: string) => 
    matches.filter(m => m.group === group && m.round === round);
  
  const finals = matches.find(m => m.round === "Finals");
  const sf = matches.filter(m => m.round === "SF");

  // Get group winners for display
  const getGroupWinner = (group: string) => {
    const ubf = getGroupMatches(group, "UBF");
    return ubf[0]?.winner || "";
  };

  const getGroupRunnerUp = (group: string) => {
    const lbf = getGroupMatches(group, "LBF");
    return lbf[0]?.winner || "";
  };

  const GroupBracket = ({ group }: { group: string }) => {
    const ubr1 = getGroupMatches(group, "UBR1");
    const ubsf = getGroupMatches(group, "UBSF");
    const ubf = getGroupMatches(group, "UBF");
    const lbr1 = getGroupMatches(group, "LBR1");
    const lbqf = getGroupMatches(group, "LBQF");
    const lbsf = getGroupMatches(group, "LBSF");
    const lbf = getGroupMatches(group, "LBF");

    const groupWinner = ubf[0]?.winner || "";
    const groupRunnerUp = lbf[0]?.winner || "";
    const winnerTeam = getPlayerTeamForSeason(groupWinner, season);
    const runnerUpTeam = getPlayerTeamForSeason(groupRunnerUp, season);

    return (
      <div className="bg-card/30 rounded-lg p-4 border border-border/50 relative">
        <h4 className="text-sm font-bold text-primary mb-4">Group {group}</h4>
        
        {/* Upper Bracket */}
        <div className="mb-4">
          <div className="text-[10px] font-semibold text-cyan-400 mb-2">UPPER BRACKET</div>
          <div className="flex gap-4 items-start overflow-x-auto pb-2">
            {/* UB Round 1 */}
            <div className="flex flex-col">
              <div className="text-[9px] text-muted-foreground mb-1 text-center">Round 1</div>
              <div className="flex flex-col gap-2">
                {ubr1.map((m, i) => (
                  <MatchBox key={i} winner={m.winner} loser={m.loser} score={m.score} compact season={season} />
                ))}
              </div>
            </div>
            
            {/* UB Semis */}
            <div className="flex flex-col pt-6">
              <div className="text-[9px] text-muted-foreground mb-1 text-center">Semis</div>
              <div className="flex flex-col gap-[52px]">
                {ubsf.map((m, i) => (
                  <MatchBox key={i} winner={m.winner} loser={m.loser} score={m.score} compact season={season} />
                ))}
              </div>
            </div>
            
            {/* UB Finals */}
            <div className="flex flex-col pt-[60px]">
              <div className="text-[9px] text-muted-foreground mb-1 text-center">Finals</div>
              {ubf.map((m, i) => (
                <MatchBox key={i} winner={m.winner} loser={m.loser} score={m.score} compact season={season} />
              ))}
            </div>
          </div>
        </div>

        {/* Lower Bracket */}
        <div>
          <div className="text-[10px] font-semibold text-red-400 mb-2">LOWER BRACKET</div>
          <div className="flex gap-4 items-start overflow-x-auto pb-2">
            {/* LB Round 1 */}
            <div className="flex flex-col">
              <div className="text-[9px] text-muted-foreground mb-1 text-center">Round 1</div>
              <div className="flex flex-col gap-2">
                {lbr1.map((m, i) => (
                  <MatchBox key={i} winner={m.winner} loser={m.loser} score={m.score} compact season={season} />
                ))}
              </div>
            </div>
            
            {/* LB Quarters */}
            <div className="flex flex-col">
              <div className="text-[9px] text-muted-foreground mb-1 text-center">Quarters</div>
              <div className="flex flex-col gap-2">
                {lbqf.map((m, i) => (
                  <MatchBox key={i} winner={m.winner} loser={m.loser} score={m.score} compact season={season} />
                ))}
              </div>
            </div>
            
            {/* LB Semis */}
            <div className="flex flex-col pt-3">
              <div className="text-[9px] text-muted-foreground mb-1 text-center">Semis</div>
              {lbsf.map((m, i) => (
                <MatchBox key={i} winner={m.winner} loser={m.loser} score={m.score} compact season={season} />
              ))}
            </div>
            
            {/* LB Finals */}
            <div className="flex flex-col pt-3">
              <div className="text-[9px] text-muted-foreground mb-1 text-center">Finals</div>
              {lbf.map((m, i) => (
                <MatchBox key={i} winner={m.winner} loser={m.loser} score={m.score} compact season={season} />
              ))}
            </div>
          </div>
        </div>

        {/* Advancing Players indicator */}
        <div className="mt-4 pt-3 border-t border-border/50">
          <div className="text-[9px] text-muted-foreground mb-2">ADVANCES TO CHAMPIONSHIP</div>
          <div className="flex gap-2">
            <div className="flex items-center gap-1.5 bg-primary/10 border border-primary/30 rounded px-2 py-1">
              <TeamBadge team={winnerTeam} compact />
              <span className="text-[10px] text-primary font-medium">{groupWinner}</span>
              <span className="text-[8px] text-cyan-400">(UB)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-muted/30 border border-border rounded px-2 py-1">
              <TeamBadge team={runnerUpTeam} compact />
              <span className="text-[10px] text-foreground">{groupRunnerUp}</span>
              <span className="text-[8px] text-red-400">(LB)</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="overflow-x-auto pb-4">
      <h3 className="text-lg font-bold text-primary mb-4">Apex {season} Championship Bracket</h3>
      <p className="text-xs text-muted-foreground mb-4">Double-elimination group stages → Single elimination finals</p>
      
      {/* Group Stage */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <GroupBracket group="A" />
        <GroupBracket group="B" />
      </div>

      {/* Flow Connector */}
      <div className="flex justify-center mb-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-6 bg-gradient-to-b from-primary/50 to-primary"></div>
            <div className="text-[9px] text-primary font-semibold">Group A Winner</div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg">
            <span className="text-lg">↓</span>
            <span className="text-xs text-primary font-bold">CHAMPIONSHIP BRACKET</span>
            <span className="text-lg">↓</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-6 bg-gradient-to-b from-primary/50 to-primary"></div>
            <div className="text-[9px] text-primary font-semibold">Group B Winner</div>
          </div>
        </div>
      </div>

      {/* Final Bracket */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/30">
        <h4 className="text-sm font-bold text-primary mb-4">CHAMPIONSHIP BRACKET</h4>
        
        {/* Matchup Labels */}
        <div className="flex justify-center gap-8 mb-3 text-[9px] text-muted-foreground">
          <span>Group A UB Winner vs Group B LB Winner</span>
          <span>Group B UB Winner vs Group A LB Winner</span>
        </div>

        <div className="flex gap-8 items-center justify-center flex-wrap">
          {/* Semifinals */}
          <div className="flex flex-col">
            <div className="text-[10px] text-muted-foreground mb-2 text-center">Semifinals</div>
            <div className="flex flex-col gap-3">
              {sf.map((m, i) => (
                <MatchBox key={i} winner={m.winner} loser={m.loser} score={m.score} season={season} />
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-0.5 bg-primary/50"></div>
            <div className="text-primary text-xl">→</div>
            <div className="w-8 h-0.5 bg-primary/50"></div>
          </div>

          {/* Finals */}
          <div className="flex flex-col">
            <div className="text-[10px] text-muted-foreground mb-2 text-center">Grand Finals</div>
            {finals && (
              <MatchBox winner={finals.winner} loser={finals.loser} score={finals.score} isChampion season={season} />
            )}
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-0.5 bg-primary/50"></div>
            <div className="text-primary text-xl">→</div>
            <div className="w-8 h-0.5 bg-primary/50"></div>
          </div>

          {/* Champion */}
          <div className="flex flex-col">
            <div className="text-[10px] text-primary mb-2 text-center font-semibold">Champion</div>
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

function ApexBracket({ season }: { season: string }) {
  const matches = parseBracketData(fullMatches[season]);
  
  const r16 = matches.filter(m => m.round === "R16");
  const qf = matches.filter(m => m.round === "QF");
  const sf = matches.filter(m => m.round === "SF");
  const finals = matches.find(m => m.round === "Finals");

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
                <MatchBox key={i} winner={m.winner} loser={m.loser} score={m.score} season={season} />
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
                <MatchBox key={i} winner={m.winner} loser={m.loser} score={m.score} season={season} />
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
                <MatchBox key={i} winner={m.winner} loser={m.loser} score={m.score} season={season} />
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
              <MatchBox winner={finals.winner} loser={finals.loser} score={finals.score} isChampion season={season} />
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
  const [openSeason, setOpenSeason] = useState<string | null>("709");
  const [viewModes, setViewModes] = useState<Record<string, "bracket" | "list">>({
    "700": "bracket", "701": "bracket", "702": "bracket", 
    "703": "bracket", "704": "bracket", "705": "bracket",
    "706": "bracket", "707": "bracket", "708": "bracket",
    "709": "bracket"
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
      <h1 className="text-white">Full Apex Tournament Results (700-708)</h1>
      <p className="text-foreground mb-4">Complete match history for every Apex World Championship.</p>

      <div>
        {seasonKeys.map(season => {
          const hasBracket = hasStandardBracket(season) || hasDoubleElimBracket(season);
          const isDoubleElim = hasDoubleElimBracket(season);
          const currentView = viewModes[season] || "list";
          
          return (
            <div key={season}>
              <button
                className={`cursor-pointer p-4 w-full border-none text-left text-lg transition-colors bg-[#222] text-white border-b border-border flex justify-between items-center font-bold hover:bg-[#333] hover:text-primary ${openSeason === season ? "bg-[#333] text-primary" : ""}`}
                onClick={() => setOpenSeason(openSeason === season ? null : season)}
              >
                <span>
                  Apex {season}
                  {isDoubleElim && <span className="ml-2 text-xs text-cyan-400">(Double Elim)</span>}
                </span>
                <span className="text-primary font-bold ml-1">{openSeason === season ? "−" : "+"}</span>
              </button>
              
              <div 
                className={`bg-panel overflow-hidden transition-all duration-200 ${openSeason === season ? "max-h-[3000px]" : "max-h-0"}`}
              >
                <div className="p-4">
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

                  {hasBracket && currentView === "bracket" ? (
                    isDoubleElim ? (
                      <DoubleElimBracket season={season} />
                    ) : (
                      <ApexBracket season={season} />
                    )
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
