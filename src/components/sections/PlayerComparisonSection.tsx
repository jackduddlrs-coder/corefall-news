import { useState, useMemo } from "react";
import { pastStandings, getTeamClass, apexDetailed, fullMatches } from "@/data/corefallData";
import { getH2HRecord, getAllMatchupsBetween } from "@/data/h2hData";
import { Search, X, Swords, Trophy, Users } from "lucide-react";

interface H2HSectionProps {
  onPlayerClick: (name: string) => void;
  onTeamClick: (name: string) => void;
}

export const H2HSection = ({ onPlayerClick, onTeamClick }: H2HSectionProps) => {
  const allSeasons = Object.keys(pastStandings).sort();
  const [selectedYears, setSelectedYears] = useState<Set<string>>(new Set(allSeasons));
  const [player1, setPlayer1] = useState<string>("");
  const [player2, setPlayer2] = useState<string>("");
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);

  // Get all unique player names
  const allPlayers = useMemo(() => {
    const names = new Set<string>();
    Object.values(pastStandings).forEach(players => {
      players.forEach(p => names.add(p.Name));
    });
    return Array.from(names).sort();
  }, []);

  const toggleYear = (year: string) => {
    setSelectedYears(prev => {
      const newSet = new Set(prev);
      if (newSet.has(year)) {
        if (newSet.size > 1) newSet.delete(year);
      } else {
        newSet.add(year);
      }
      return newSet;
    });
  };

  const selectAll = () => setSelectedYears(new Set(allSeasons));
  const clearAll = () => setSelectedYears(new Set([allSeasons[0]]));

  // Calculate stats for a player across selected years
  const getPlayerStats = (playerName: string) => {
    if (!playerName) return null;

    let totalPoints = 0;
    let totalKOs = 0;
    let totalRanks = 0;
    let activeYears = 0;
    let apexApps = 0;
    const teamSeasons: Record<string, number> = {};
    const seasons: { year: string; rank: number; points: number; kos: number; team: string }[] = [];

    allSeasons.forEach(season => {
      if (!selectedYears.has(season)) return;
      const players = pastStandings[season];
      const player = players.find(p => p.Name === playerName);
      if (player) {
        totalPoints += player.Points;
        totalKOs += player.KOs;
        totalRanks += player.Rank;
        activeYears++;
        if (player.Rank <= 12) apexApps++;
        teamSeasons[player.Team] = (teamSeasons[player.Team] || 0) + 1;
        seasons.push({
          year: season,
          rank: player.Rank,
          points: player.Points,
          kos: player.KOs,
          team: player.Team
        });
      }
    });

    if (activeYears === 0) return null;

    const mostPlayedTeam = Object.entries(teamSeasons).sort((a, b) => b[1] - a[1])[0][0];
    const avgFinish = totalRanks / activeYears;

    return {
      name: playerName,
      team: mostPlayedTeam,
      totalPoints,
      totalKOs,
      avgFinish,
      activeYears,
      apexApps,
      seasons
    };
  };

  const stats1 = getPlayerStats(player1);
  const stats2 = getPlayerStats(player2);

  // Get H2H record
  const h2hRecord = player1 && player2 ? getH2HRecord(player1, player2) : null;

  // Get all Apex matchups between the two players from fullMatches
  const apexMatchups = useMemo(() => {
    if (!player1 || !player2) return [];
    
    const matchups: { year: string; round: string; winner: string; loser: string; score: string }[] = [];
    
    Object.entries(fullMatches).forEach(([year, matches]) => {
      if (!selectedYears.has(year)) return;
      
      matches.forEach(m => {
        // Parse match string: "Winner Name (score) vs Loser Name" or with group info
        const matchStr = m.match.replace(/\s*\(Group [AB]\)$/, ''); // Remove group suffix
        const vsIndex = matchStr.indexOf(' vs ');
        if (vsIndex === -1) return;
        
        const leftPart = matchStr.substring(0, vsIndex);
        const loser = matchStr.substring(vsIndex + 4).trim();
        
        // Parse winner and score from left part: "Winner Name (score)"
        const scoreMatch = leftPart.match(/^(.+?)\s*\(([^)]+)\)$/);
        if (!scoreMatch) return;
        
        const winner = scoreMatch[1].trim();
        const score = scoreMatch[2];
        
        // Check if this match involves both players
        if ((winner === player1 && loser === player2) || (winner === player2 && loser === player1)) {
          matchups.push({ year, round: m.round, winner, loser, score });
        }
      });
    });
    
    // Sort by year descending, then by round importance
    const roundOrder = ['Finals', 'SF', 'UBF', 'LBF', 'UBSF', 'LBSF', 'QF', 'UBQF', 'LBQF', 'UBR1', 'LBR1', 'R16'];
    return matchups.sort((a, b) => {
      const yearDiff = parseInt(b.year) - parseInt(a.year);
      if (yearDiff !== 0) return yearDiff;
      return roundOrder.indexOf(a.round) - roundOrder.indexOf(b.round);
    });
  }, [player1, player2, selectedYears]);

  // Get round display name
  const getRoundName = (round: string) => {
    const names: Record<string, string> = {
      'Finals': 'Finals',
      'SF': 'Semifinals',
      'QF': 'Quarterfinals',
      'R16': 'Round of 16',
      'UBR1': 'Upper Bracket R1',
      'LBR1': 'Lower Bracket R1',
      'UBSF': 'Upper Bracket SF',
      'LBSF': 'Lower Bracket SF',
      'UBQF': 'Upper Bracket QF',
      'LBQF': 'Lower Bracket QF',
      'UBF': 'Upper Bracket Final',
      'LBF': 'Lower Bracket Final'
    };
    return names[round] || round;
  };

  const filteredPlayers1 = allPlayers.filter(p => 
    p.toLowerCase().includes(search1.toLowerCase()) && p !== player2
  );
  const filteredPlayers2 = allPlayers.filter(p => 
    p.toLowerCase().includes(search2.toLowerCase()) && p !== player1
  );

  const renderPlayerSelector = (
    playerNum: 1 | 2,
    selectedPlayer: string,
    setPlayer: (p: string) => void,
    search: string,
    setSearch: (s: string) => void,
    showDropdown: boolean,
    setShowDropdown: (show: boolean) => void,
    filteredPlayers: string[]
  ) => (
    <div className="relative">
      <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-2">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder={`Search Player ${playerNum}...`}
          value={selectedPlayer || search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPlayer("");
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          className="bg-transparent border-none outline-none flex-1 text-foreground placeholder:text-muted-foreground text-sm"
        />
        {selectedPlayer && (
          <button onClick={() => { setPlayer(""); setSearch(""); }} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {showDropdown && !selectedPlayer && filteredPlayers.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredPlayers.slice(0, 20).map(name => (
            <button
              key={name}
              onClick={() => {
                setPlayer(name);
                setSearch("");
                setShowDropdown(false);
              }}
              className="w-full text-left px-3 py-2 hover:bg-muted/50 transition-colors text-sm"
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const renderStatRow = (label: string, val1: number | string | undefined, val2: number | string | undefined, higherBetter = true) => {
    const num1 = typeof val1 === 'number' ? val1 : parseFloat(String(val1) || '0');
    const num2 = typeof val2 === 'number' ? val2 : parseFloat(String(val2) || '0');
    const winner1 = higherBetter ? num1 > num2 : num1 < num2;
    const winner2 = higherBetter ? num2 > num1 : num2 < num1;

    return (
      <div className="grid grid-cols-3 gap-2 md:gap-4 py-2 border-b border-border/50">
        <div className={`text-right font-bold text-sm md:text-base ${stats1 && stats2 && winner1 ? 'text-green-500' : 'text-foreground'}`}>
          {val1 ?? '-'}
        </div>
        <div className="text-center text-muted-foreground text-xs md:text-sm">{label}</div>
        <div className={`text-left font-bold text-sm md:text-base ${stats1 && stats2 && winner2 ? 'text-green-500' : 'text-foreground'}`}>
          {val2 ?? '-'}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">Head to Head</h2>
        <p className="text-muted-foreground text-xs md:text-base">Compare two players' tournament records and stats.</p>
      </div>

      {/* Year Filter */}
      <div className="bg-card rounded-lg border border-border p-3">
        <div className="flex flex-wrap items-center gap-2 mb-2 md:mb-3">
          <span className="text-xs md:text-sm font-medium text-muted-foreground">Filter by Season:</span>
          <button
            onClick={selectAll}
            className="text-xs px-2 py-1 rounded bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
          >
            All
          </button>
          <button
            onClick={clearAll}
            className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
          >
            Clear
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {allSeasons.map(year => (
            <button
              key={year}
              onClick={() => toggleYear(year)}
              className={`px-2 md:px-3 py-1 md:py-1.5 rounded text-xs md:text-sm font-medium transition-all ${
                selectedYears.has(year)
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Player Selection */}
      <div className="grid md:grid-cols-2 gap-3 md:gap-4">
        <div className="bg-card rounded-lg border border-border p-3 md:p-4">
          <h3 className="text-xs md:text-sm font-semibold text-muted-foreground mb-2">Player 1</h3>
          {renderPlayerSelector(1, player1, setPlayer1, search1, setSearch1, showDropdown1, setShowDropdown1, filteredPlayers1)}
          {stats1 && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <span 
                onClick={() => onPlayerClick(stats1.name)}
                className="text-primary hover:underline cursor-pointer font-bold text-sm md:text-base"
              >
                {stats1.name}
              </span>
              <span 
                onClick={() => onTeamClick(stats1.team)}
                className={`text-xs px-2 py-1 rounded cursor-pointer ${getTeamClass(stats1.team)}`}
              >
                {stats1.team}
              </span>
            </div>
          )}
        </div>
        <div className="bg-card rounded-lg border border-border p-3 md:p-4">
          <h3 className="text-xs md:text-sm font-semibold text-muted-foreground mb-2">Player 2</h3>
          {renderPlayerSelector(2, player2, setPlayer2, search2, setSearch2, showDropdown2, setShowDropdown2, filteredPlayers2)}
          {stats2 && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <span 
                onClick={() => onPlayerClick(stats2.name)}
                className="text-primary hover:underline cursor-pointer font-bold text-sm md:text-base"
              >
                {stats2.name}
              </span>
              <span 
                onClick={() => onTeamClick(stats2.team)}
                className={`text-xs px-2 py-1 rounded cursor-pointer ${getTeamClass(stats2.team)}`}
              >
                {stats2.team}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* H2H Record */}
      {player1 && player2 && (
        <div className="bg-card rounded-lg border border-border p-4 md:p-6">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-4">
            <Swords className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">Tournament Record</h3>
          </div>
          
          {h2hRecord ? (
            <div className="flex items-center justify-center gap-4 md:gap-8">
              <div className="text-center">
                <span 
                  onClick={() => onPlayerClick(player1)}
                  className="block text-xs md:text-sm text-muted-foreground hover:text-primary cursor-pointer mb-1"
                >
                  {player1.split(' ')[0]}
                </span>
                <span className={`text-2xl md:text-4xl font-bold ${h2hRecord.wins > h2hRecord.losses ? 'text-green-500' : h2hRecord.wins < h2hRecord.losses ? 'text-red-500' : 'text-foreground'}`}>
                  {h2hRecord.wins}
                </span>
              </div>
              <div className="text-xl md:text-2xl text-muted-foreground font-light">-</div>
              <div className="text-center">
                <span 
                  onClick={() => onPlayerClick(player2)}
                  className="block text-xs md:text-sm text-muted-foreground hover:text-primary cursor-pointer mb-1"
                >
                  {player2.split(' ')[0]}
                </span>
                <span className={`text-2xl md:text-4xl font-bold ${h2hRecord.losses > h2hRecord.wins ? 'text-green-500' : h2hRecord.losses < h2hRecord.wins ? 'text-red-500' : 'text-foreground'}`}>
                  {h2hRecord.losses}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-sm">No tournament matches found between these players.</p>
          )}
        </div>
      )}

      {/* Apex Matchups */}
      {player1 && player2 && apexMatchups.length > 0 && (
        <div className="bg-card rounded-lg border border-border p-4 md:p-6">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-4">
            <Trophy className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">Apex Matchups ({apexMatchups.length})</h3>
          </div>
          
          {/* Grand Finals highlight if any */}
          {apexMatchups.some(m => m.round === 'Finals') && (
            <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-semibold text-yellow-500">Grand Finals Meetings</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {apexMatchups.filter(m => m.round === 'Finals').map((match, idx) => {
                  const p1Won = match.winner === player1;
                  return (
                    <div key={idx} className={`text-xs px-2 py-1 rounded ${p1Won ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      <span className="font-bold">{match.year}</span>: {match.winner.split(' ')[0]} ({match.score})
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            {apexMatchups.map((match, idx) => {
              const p1Won = match.winner === player1;
              const isFinals = match.round === 'Finals';
              return (
                <div key={idx} className={`flex items-center justify-between rounded-lg p-2 md:p-3 ${isFinals ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-muted/30'}`}>
                  <div className="flex items-center gap-1.5 md:gap-2 flex-1 min-w-0">
                    <span className={`text-xs md:text-sm font-bold shrink-0 ${p1Won ? 'text-green-500' : 'text-red-500'}`}>
                      {p1Won ? 'W' : 'L'}
                    </span>
                    <span 
                      onClick={() => onPlayerClick(player1)}
                      className="text-xs md:text-sm hover:text-primary cursor-pointer truncate"
                    >
                      {player1.split(' ')[0]}
                    </span>
                  </div>
                  
                  <div className="text-center px-2 md:px-4 shrink-0">
                    <span className={`text-[10px] md:text-xs block ${isFinals ? 'text-yellow-500 font-semibold' : 'text-muted-foreground'}`}>{getRoundName(match.round)}</span>
                    <span className="text-xs md:text-sm font-bold text-foreground">{match.year}</span>
                    <span className="text-[10px] md:text-xs text-muted-foreground block">({match.score})</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 md:gap-2 flex-1 justify-end min-w-0">
                    <span 
                      onClick={() => onPlayerClick(player2)}
                      className="text-xs md:text-sm hover:text-primary cursor-pointer truncate"
                    >
                      {player2.split(' ')[0]}
                    </span>
                    <span className={`text-xs md:text-sm font-bold shrink-0 ${!p1Won ? 'text-green-500' : 'text-red-500'}`}>
                      {!p1Won ? 'W' : 'L'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* All Matchups List */}
      {player1 && player2 && h2hRecord && (
        <div className="bg-card rounded-lg border border-border p-4 md:p-6">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-4">
            <Users className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">All Matchups ({h2hRecord.wins + h2hRecord.losses})</h3>
          </div>
          
          <div className="text-center mb-4">
            <p className="text-xs md:text-sm text-muted-foreground">
              Complete list of all tournament meetings (Apex + CTT)
            </p>
          </div>
          
          {(() => {
            const allMatchups = getAllMatchupsBetween(player1, player2);
            const p1Wins = allMatchups.filter(m => m.winner === player1).length;
            const p2Wins = allMatchups.filter(m => m.winner === player2).length;
            
            return (
              <div className="space-y-3">
                {/* Summary */}
                <div className="flex items-center justify-center gap-4 md:gap-8 py-2 bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <span className="block text-xs text-muted-foreground">{player1.split(' ')[0]}</span>
                    <span className={`text-xl md:text-2xl font-bold ${p1Wins > p2Wins ? 'text-green-500' : p1Wins < p2Wins ? 'text-red-500' : 'text-foreground'}`}>
                      {p1Wins}
                    </span>
                  </div>
                  <span className="text-muted-foreground">-</span>
                  <div className="text-center">
                    <span className="block text-xs text-muted-foreground">{player2.split(' ')[0]}</span>
                    <span className={`text-xl md:text-2xl font-bold ${p2Wins > p1Wins ? 'text-green-500' : p2Wins < p1Wins ? 'text-red-500' : 'text-foreground'}`}>
                      {p2Wins}
                    </span>
                  </div>
                </div>
                
                {/* Individual matchups */}
                <div className="space-y-2">
                  {allMatchups.map((match, idx) => {
                    const p1Won = match.winner === player1;
                    return (
                      <div 
                        key={idx} 
                        className={`flex items-center justify-between p-2 md:p-3 rounded-lg ${
                          p1Won ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'
                        }`}
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className={`text-xs md:text-sm font-bold ${p1Won ? 'text-green-500' : 'text-red-500'}`}>
                            {p1Won ? 'W' : 'L'}
                          </span>
                          <span 
                            onClick={() => onPlayerClick(player1)}
                            className="text-xs md:text-sm hover:text-primary cursor-pointer truncate"
                          >
                            {player1.split(' ')[0]}
                          </span>
                        </div>
                        
                        <div className="text-center px-2 md:px-4 shrink-0">
                          <span className={`text-[10px] md:text-xs block font-medium ${match.tournament === 'Apex' ? 'text-yellow-500' : 'text-blue-400'}`}>
                            {match.tournament}
                          </span>
                          <span className="text-xs md:text-sm font-bold text-foreground">{match.season}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 flex-1 justify-end min-w-0">
                          <span 
                            onClick={() => onPlayerClick(player2)}
                            className="text-xs md:text-sm hover:text-primary cursor-pointer truncate"
                          >
                            {player2.split(' ')[0]}
                          </span>
                          <span className={`text-xs md:text-sm font-bold ${!p1Won ? 'text-green-500' : 'text-red-500'}`}>
                            {!p1Won ? 'W' : 'L'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Comparison Table */}
      {(stats1 || stats2) && (
        <div className="bg-card rounded-lg border border-border p-3 md:p-4">
          <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-center text-foreground">Career Totals</h3>
          <div className="max-w-md mx-auto">
            {renderStatRow("Total Points", stats1?.totalPoints.toLocaleString(), stats2?.totalPoints.toLocaleString())}
            {renderStatRow("Total KOs", stats1?.totalKOs, stats2?.totalKOs)}
            {renderStatRow("Avg Finish", stats1?.avgFinish.toFixed(1), stats2?.avgFinish.toFixed(1), false)}
            {renderStatRow("Apex Apps", stats1?.apexApps, stats2?.apexApps)}
            {renderStatRow("Years Active", stats1?.activeYears, stats2?.activeYears)}
          </div>
        </div>
      )}

      {/* Season by Season */}
      {stats1 && stats2 && (
        <div className="bg-card rounded-lg border border-border p-3 md:p-4">
          <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-center text-foreground">Season by Season</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-1.5 md:p-2 text-right text-muted-foreground">Pts</th>
                  <th className="p-1.5 md:p-2 text-right text-muted-foreground hidden sm:table-cell">Rank</th>
                  <th className="p-1.5 md:p-2 text-center text-muted-foreground">Season</th>
                  <th className="p-1.5 md:p-2 text-left text-muted-foreground hidden sm:table-cell">Rank</th>
                  <th className="p-1.5 md:p-2 text-left text-muted-foreground">Pts</th>
                </tr>
              </thead>
              <tbody>
                {Array.from(selectedYears).sort().map(year => {
                  const s1 = stats1.seasons.find(s => s.year === year);
                  const s2 = stats2.seasons.find(s => s.year === year);
                  const p1Better = s1 && s2 ? s1.points > s2.points : false;
                  const p2Better = s1 && s2 ? s2.points > s1.points : false;
                  
                  return (
                    <tr key={year} className="border-b border-border/50">
                      <td className={`p-1.5 md:p-2 text-right ${p1Better ? 'text-green-500 font-bold' : 'text-foreground'}`}>
                        {s1?.points.toLocaleString() ?? '-'}
                      </td>
                      <td className="p-1.5 md:p-2 text-right text-muted-foreground hidden sm:table-cell">
                        {s1 ? `#${s1.rank}` : '-'}
                      </td>
                      <td className="p-1.5 md:p-2 text-center font-medium text-foreground">{year}</td>
                      <td className="p-1.5 md:p-2 text-left text-muted-foreground hidden sm:table-cell">
                        {s2 ? `#${s2.rank}` : '-'}
                      </td>
                      <td className={`p-1.5 md:p-2 text-left ${p2Better ? 'text-green-500 font-bold' : 'text-foreground'}`}>
                        {s2?.points.toLocaleString() ?? '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!player1 && !player2 && (
        <div className="text-center py-8 md:py-12 text-muted-foreground">
          <p className="text-sm md:text-base">Select two players above to compare their stats</p>
        </div>
      )}
    </div>
  );
};
