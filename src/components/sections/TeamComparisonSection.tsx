import { useState, useMemo } from "react";
import { pastStandings, pastTeamStandings, getTeamClass, apexDetailed, seasons, inactiveTeams, fullMatches } from "@/data/corefallData";
import { Search, X, Swords, Trophy, Users, Target } from "lucide-react";

interface TeamComparisonSectionProps {
  onPlayerClick: (name: string) => void;
  onTeamClick: (name: string) => void;
}

export const TeamComparisonSection = ({ onPlayerClick, onTeamClick }: TeamComparisonSectionProps) => {
  const allSeasons = Object.keys(pastStandings).sort();
  const [selectedYears, setSelectedYears] = useState<Set<string>>(new Set(allSeasons));
  const [team1, setTeam1] = useState<string>("");
  const [team2, setTeam2] = useState<string>("");
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);

  // Get all unique team names
  const allTeams = useMemo(() => {
    const names = new Set<string>();
    Object.values(pastTeamStandings).forEach(teams => {
      teams.forEach(t => names.add(t.team));
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

  // Calculate stats for a team across selected years
  const getTeamStats = (teamName: string) => {
    if (!teamName) return null;

    let totalPoints = 0;
    let activeYears = 0;
    let apexTitles = 0;
    let cttTitles = 0;
    let seasonStars = 0;
    const topPlayers: { name: string; points: number; kos: number }[] = [];
    const playerMap: Record<string, { points: number; kos: number }> = {};
    const seasonData: { year: string; points: number; rank: number; players: number }[] = [];

    allSeasons.forEach(season => {
      if (!selectedYears.has(season)) return;
      
      // Get team standings
      const teamStandings = pastTeamStandings[season];
      const team = teamStandings?.find(t => t.team === teamName);
      if (team) {
        totalPoints += team.points;
        activeYears++;
        const rank = teamStandings.indexOf(team) + 1;
        
        // Count top 40 players
        const players = pastStandings[season]?.filter(p => p.Team === teamName) || [];
        seasonData.push({ year: season, points: team.points, rank, players: players.length });
        
        // Aggregate player stats
        players.forEach(p => {
          if (!playerMap[p.Name]) {
            playerMap[p.Name] = { points: 0, kos: 0 };
          }
          playerMap[p.Name].points += p.Points;
          playerMap[p.Name].kos += p.KOs;
        });
      }

      // Check for championships
      const seasonInfo = seasons.find(s => s.year.toString() === season);
      if (seasonInfo) {
        if (seasonInfo.team === teamName) apexTitles++;
        if (seasonInfo.ctt === teamName) cttTitles++;
        if (seasonInfo.starTeam === teamName) seasonStars++;
      }
    });

    if (activeYears === 0) return null;

    // Get top 5 players
    Object.entries(playerMap).forEach(([name, stats]) => {
      topPlayers.push({ name, ...stats });
    });
    topPlayers.sort((a, b) => b.points - a.points);

    const avgRank = seasonData.reduce((sum, s) => sum + s.rank, 0) / seasonData.length;

    return {
      name: teamName,
      totalPoints,
      activeYears,
      apexTitles,
      cttTitles,
      seasonStars,
      avgRank,
      topPlayers: topPlayers.slice(0, 5),
      seasonData
    };
  };

  const stats1 = getTeamStats(team1);
  const stats2 = getTeamStats(team2);

  // Helper to get a player's team for a specific season
  const getPlayerTeamForSeason = (playerName: string, season: string): string | null => {
    const seasonData = pastStandings[season];
    if (!seasonData) return null;
    const player = seasonData.find(p => p.Name === playerName);
    return player?.Team || null;
  };

  // Get head-to-head Apex records (Finals matches where teams faced each other)
  const h2hApexRecord = useMemo(() => {
    if (!team1 || !team2) return null;

    let team1Wins = 0;
    let team2Wins = 0;
    const matches: { year: number; winner: string; loser: string; winnerTeam: string; loserTeam: string }[] = [];

    apexDetailed.forEach(match => {
      if (!selectedYears.has(match.year.toString())) return;
      
      const winnerTeam = match.wTeam;
      const loserTeam = match.lTeam;
      
      if ((winnerTeam === team1 && loserTeam === team2) || (winnerTeam === team2 && loserTeam === team1)) {
        if (winnerTeam === team1) {
          team1Wins++;
        } else {
          team2Wins++;
        }
        matches.push({
          year: match.year,
          winner: match.win,
          loser: match.lose,
          winnerTeam,
          loserTeam
        });
      }
    });

    if (matches.length === 0) return null;

    return { team1Wins, team2Wins, matches: matches.sort((a, b) => b.year - a.year) };
  }, [team1, team2, selectedYears]);

  // Get all Apex bracket matchups between the two teams (all rounds)
  const allApexMatchups = useMemo(() => {
    if (!team1 || !team2) return null;

    let team1Wins = 0;
    let team2Wins = 0;
    const matchups: { 
      year: string; 
      round: string; 
      winner: string; 
      loser: string; 
      winnerTeam: string;
      loserTeam: string;
      score: string;
    }[] = [];

    Object.entries(fullMatches).forEach(([year, matches]) => {
      if (!selectedYears.has(year)) return;

      matches.forEach(m => {
        // Parse match string: "Winner Name (score) vs Loser Name"
        const matchStr = m.match.replace(/\s*\(Group [AB]\)$/, '');
        const vsIndex = matchStr.indexOf(' vs ');
        if (vsIndex === -1) return;

        const leftPart = matchStr.substring(0, vsIndex);
        const loser = matchStr.substring(vsIndex + 4).trim();

        const scoreMatch = leftPart.match(/^(.+?)\s*\(([^)]+)\)$/);
        if (!scoreMatch) return;

        const winner = scoreMatch[1].trim();
        const score = scoreMatch[2];

        // Get teams for both players in this season
        const winnerTeam = getPlayerTeamForSeason(winner, year);
        const loserTeam = getPlayerTeamForSeason(loser, year);

        if (!winnerTeam || !loserTeam) return;

        // Check if this match is between the two selected teams
        if ((winnerTeam === team1 && loserTeam === team2) || (winnerTeam === team2 && loserTeam === team1)) {
          if (winnerTeam === team1) {
            team1Wins++;
          } else {
            team2Wins++;
          }
          matchups.push({
            year,
            round: m.round,
            winner,
            loser,
            winnerTeam,
            loserTeam,
            score
          });
        }
      });
    });

    if (matchups.length === 0) return null;

    // Sort by year desc, then by round importance
    const roundOrder = ['Finals', 'SF', 'UBF', 'LBF', 'UBSF', 'LBSF', 'QF', 'UBQF', 'LBQF', 'UBR1', 'LBR1', 'R16'];
    return {
      team1Wins,
      team2Wins,
      matchups: matchups.sort((a, b) => {
        const yearDiff = parseInt(b.year) - parseInt(a.year);
        if (yearDiff !== 0) return yearDiff;
        return roundOrder.indexOf(a.round) - roundOrder.indexOf(b.round);
      })
    };
  }, [team1, team2, selectedYears]);

  // Get round display name
  const getRoundName = (round: string) => {
    const names: Record<string, string> = {
      'Finals': 'Finals',
      'SF': 'Semifinals',
      'QF': 'Quarterfinals',
      'R16': 'Round of 16',
      'UBR1': 'Upper R1',
      'LBR1': 'Lower R1',
      'UBSF': 'Upper SF',
      'LBSF': 'Lower SF',
      'UBQF': 'Upper QF',
      'LBQF': 'Lower QF',
      'UBF': 'Upper Final',
      'LBF': 'Lower Final'
    };
    return names[round] || round;
  };

  const filteredTeams1 = allTeams.filter(t => 
    t.toLowerCase().includes(search1.toLowerCase()) && t !== team2
  );
  const filteredTeams2 = allTeams.filter(t => 
    t.toLowerCase().includes(search2.toLowerCase()) && t !== team1
  );

  const renderTeamSelector = (
    teamNum: 1 | 2,
    selectedTeam: string,
    setTeam: (t: string) => void,
    search: string,
    setSearch: (s: string) => void,
    showDropdown: boolean,
    setShowDropdown: (show: boolean) => void,
    filteredTeams: string[]
  ) => (
    <div className="relative">
      <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-2">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder={`Search Team ${teamNum}...`}
          value={selectedTeam || search}
          onChange={(e) => {
            setSearch(e.target.value);
            setTeam("");
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          className="bg-transparent border-none outline-none flex-1 text-foreground placeholder:text-muted-foreground text-sm"
        />
        {selectedTeam && (
          <button onClick={() => { setTeam(""); setSearch(""); }} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {showDropdown && !selectedTeam && filteredTeams.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredTeams.slice(0, 20).map(name => (
            <button
              key={name}
              onClick={() => {
                setTeam(name);
                setSearch("");
                setShowDropdown(false);
              }}
              className={`w-full text-left px-3 py-2 hover:bg-muted/50 transition-colors text-sm flex items-center gap-2 ${
                inactiveTeams.includes(name) ? 'opacity-60' : ''
              }`}
            >
              <span className={`w-3 h-3 rounded-full ${getTeamClass(name)}`}></span>
              {name}
              {inactiveTeams.includes(name) && <span className="text-xs text-muted-foreground">(Inactive)</span>}
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
        <h2 className="text-xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">Team Comparison</h2>
        <p className="text-muted-foreground text-xs md:text-base">Compare two teams' historical records, championships, and top players.</p>
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

      {/* Team Selection */}
      <div className="grid md:grid-cols-2 gap-3 md:gap-4">
        <div className="bg-card rounded-lg border border-border p-3 md:p-4">
          <h3 className="text-xs md:text-sm font-semibold text-muted-foreground mb-2">Team 1</h3>
          {renderTeamSelector(1, team1, setTeam1, search1, setSearch1, showDropdown1, setShowDropdown1, filteredTeams1)}
          {stats1 && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <span 
                onClick={() => onTeamClick(stats1.name)}
                className={`team-tag clickable-team cursor-pointer ${getTeamClass(stats1.name)}`}
              >
                {stats1.name}
              </span>
              {inactiveTeams.includes(stats1.name) && (
                <span className="text-xs text-muted-foreground italic">(Inactive)</span>
              )}
            </div>
          )}
        </div>
        <div className="bg-card rounded-lg border border-border p-3 md:p-4">
          <h3 className="text-xs md:text-sm font-semibold text-muted-foreground mb-2">Team 2</h3>
          {renderTeamSelector(2, team2, setTeam2, search2, setSearch2, showDropdown2, setShowDropdown2, filteredTeams2)}
          {stats2 && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <span 
                onClick={() => onTeamClick(stats2.name)}
                className={`team-tag clickable-team cursor-pointer ${getTeamClass(stats2.name)}`}
              >
                {stats2.name}
              </span>
              {inactiveTeams.includes(stats2.name) && (
                <span className="text-xs text-muted-foreground italic">(Inactive)</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* H2H Apex Finals Record */}
      {team1 && team2 && (
        <div className="bg-card rounded-lg border border-border p-4 md:p-6">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-4">
            <Trophy className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">Apex Finals Head-to-Head</h3>
          </div>
          
          {h2hApexRecord ? (
            <>
              <div className="flex items-center justify-center gap-4 md:gap-8 mb-4">
                <div className="text-center">
                  <span 
                    onClick={() => onTeamClick(team1)}
                    className={`block text-xs md:text-sm mb-1 cursor-pointer team-tag ${getTeamClass(team1)}`}
                  >
                    {team1}
                  </span>
                  <span className={`text-2xl md:text-4xl font-bold ${h2hApexRecord.team1Wins > h2hApexRecord.team2Wins ? 'text-green-500' : h2hApexRecord.team1Wins < h2hApexRecord.team2Wins ? 'text-red-500' : 'text-foreground'}`}>
                    {h2hApexRecord.team1Wins}
                  </span>
                </div>
                <div className="text-xl md:text-2xl text-muted-foreground font-light">-</div>
                <div className="text-center">
                  <span 
                    onClick={() => onTeamClick(team2)}
                    className={`block text-xs md:text-sm mb-1 cursor-pointer team-tag ${getTeamClass(team2)}`}
                  >
                    {team2}
                  </span>
                  <span className={`text-2xl md:text-4xl font-bold ${h2hApexRecord.team2Wins > h2hApexRecord.team1Wins ? 'text-green-500' : h2hApexRecord.team2Wins < h2hApexRecord.team1Wins ? 'text-red-500' : 'text-foreground'}`}>
                    {h2hApexRecord.team2Wins}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                {h2hApexRecord.matches.map((match, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-muted/30 rounded-lg p-2 md:p-3">
                    <div className="flex items-center gap-2 flex-1">
                      <span className={`text-xs font-bold ${match.winnerTeam === team1 ? 'text-green-500' : 'text-red-500'}`}>
                        {match.winnerTeam === team1 ? 'W' : 'L'}
                      </span>
                      <span 
                        onClick={() => onPlayerClick(match.winnerTeam === team1 ? match.winner : match.loser)}
                        className="text-xs md:text-sm hover:text-primary cursor-pointer truncate"
                      >
                        {match.winnerTeam === team1 ? match.winner : match.loser}
                      </span>
                    </div>
                    <div className="text-center px-2 md:px-4">
                      <span className="text-xs md:text-sm font-bold text-foreground">{match.year}</span>
                      <span className="text-[10px] md:text-xs text-muted-foreground block">Finals</span>
                    </div>
                    <div className="flex items-center gap-2 flex-1 justify-end">
                      <span 
                        onClick={() => onPlayerClick(match.winnerTeam === team2 ? match.winner : match.loser)}
                        className="text-xs md:text-sm hover:text-primary cursor-pointer truncate"
                      >
                        {match.winnerTeam === team2 ? match.winner : match.loser}
                      </span>
                      <span className={`text-xs font-bold ${match.winnerTeam === team2 ? 'text-green-500' : 'text-red-500'}`}>
                        {match.winnerTeam === team2 ? 'W' : 'L'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-muted-foreground text-sm">No Apex Finals matches between these teams.</p>
          )}
        </div>
      )}

      {/* All Apex Bracket Matchups */}
      {team1 && team2 && allApexMatchups && (
        <div className="bg-card rounded-lg border border-border p-4 md:p-6">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-4">
            <Target className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">All Apex Matchups ({allApexMatchups.matchups.length})</h3>
          </div>
          
          <div className="flex items-center justify-center gap-4 md:gap-8 mb-4">
            <div className="text-center">
              <span className={`block text-xs md:text-sm mb-1 team-tag ${getTeamClass(team1)}`}>
                {team1}
              </span>
              <span className={`text-2xl md:text-4xl font-bold ${allApexMatchups.team1Wins > allApexMatchups.team2Wins ? 'text-green-500' : allApexMatchups.team1Wins < allApexMatchups.team2Wins ? 'text-red-500' : 'text-foreground'}`}>
                {allApexMatchups.team1Wins}
              </span>
            </div>
            <div className="text-xl md:text-2xl text-muted-foreground font-light">-</div>
            <div className="text-center">
              <span className={`block text-xs md:text-sm mb-1 team-tag ${getTeamClass(team2)}`}>
                {team2}
              </span>
              <span className={`text-2xl md:text-4xl font-bold ${allApexMatchups.team2Wins > allApexMatchups.team1Wins ? 'text-green-500' : allApexMatchups.team2Wins < allApexMatchups.team1Wins ? 'text-red-500' : 'text-foreground'}`}>
                {allApexMatchups.team2Wins}
              </span>
            </div>
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {allApexMatchups.matchups.map((match, idx) => {
              const team1Won = match.winnerTeam === team1;
              const team1Player = team1Won ? match.winner : match.loser;
              const team2Player = team1Won ? match.loser : match.winner;
              
              return (
                <div key={idx} className="flex items-center justify-between bg-muted/30 rounded-lg p-2 md:p-3">
                  <div className="flex items-center gap-1.5 md:gap-2 flex-1 min-w-0">
                    <span className={`text-xs md:text-sm font-bold shrink-0 ${team1Won ? 'text-green-500' : 'text-red-500'}`}>
                      {team1Won ? 'W' : 'L'}
                    </span>
                    <span 
                      onClick={() => onPlayerClick(team1Player)}
                      className="text-xs md:text-sm hover:text-primary cursor-pointer truncate"
                    >
                      {team1Player}
                    </span>
                  </div>
                  
                  <div className="text-center px-2 md:px-4 shrink-0">
                    <span className="text-[10px] md:text-xs text-muted-foreground block">{getRoundName(match.round)}</span>
                    <span className="text-xs md:text-sm font-bold text-foreground">{match.year}</span>
                    <span className="text-[10px] md:text-xs text-muted-foreground block">({match.score})</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 md:gap-2 flex-1 justify-end min-w-0">
                    <span 
                      onClick={() => onPlayerClick(team2Player)}
                      className="text-xs md:text-sm hover:text-primary cursor-pointer truncate"
                    >
                      {team2Player}
                    </span>
                    <span className={`text-xs md:text-sm font-bold shrink-0 ${!team1Won ? 'text-green-500' : 'text-red-500'}`}>
                      {!team1Won ? 'W' : 'L'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Stats Comparison */}
      {(stats1 || stats2) && (
        <div className="bg-card rounded-lg border border-border p-3 md:p-4">
          <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-center text-foreground">Team Totals</h3>
          <div className="max-w-md mx-auto">
            {renderStatRow("Total Points", stats1?.totalPoints.toLocaleString(), stats2?.totalPoints.toLocaleString())}
            {renderStatRow("Apex Titles", stats1?.apexTitles, stats2?.apexTitles)}
            {renderStatRow("CTT Titles", stats1?.cttTitles, stats2?.cttTitles)}
            {renderStatRow("Season Stars", stats1?.seasonStars, stats2?.seasonStars)}
            {renderStatRow("Avg Rank", stats1?.avgRank.toFixed(1), stats2?.avgRank.toFixed(1), false)}
            {renderStatRow("Active Seasons", stats1?.activeYears, stats2?.activeYears)}
          </div>
        </div>
      )}

      {/* Top Players Comparison */}
      {stats1 && stats2 && (
        <div className="bg-card rounded-lg border border-border p-3 md:p-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">Top Players</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className={`text-sm font-semibold mb-2 team-tag ${getTeamClass(team1)}`}>{team1}</h4>
              <div className="space-y-1">
                {stats1.topPlayers.map((p, idx) => (
                  <div key={p.name} className="flex items-center justify-between text-sm bg-muted/30 rounded px-2 py-1">
                    <span className="text-muted-foreground">{idx + 1}.</span>
                    <span 
                      onClick={() => onPlayerClick(p.name)}
                      className="flex-1 ml-2 hover:text-primary cursor-pointer truncate"
                    >
                      {p.name}
                    </span>
                    <span className="text-xs text-muted-foreground">{p.points.toLocaleString()} pts</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className={`text-sm font-semibold mb-2 team-tag ${getTeamClass(team2)}`}>{team2}</h4>
              <div className="space-y-1">
                {stats2.topPlayers.map((p, idx) => (
                  <div key={p.name} className="flex items-center justify-between text-sm bg-muted/30 rounded px-2 py-1">
                    <span className="text-muted-foreground">{idx + 1}.</span>
                    <span 
                      onClick={() => onPlayerClick(p.name)}
                      className="flex-1 ml-2 hover:text-primary cursor-pointer truncate"
                    >
                      {p.name}
                    </span>
                    <span className="text-xs text-muted-foreground">{p.points.toLocaleString()} pts</span>
                  </div>
                ))}
              </div>
            </div>
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
                  <th className="py-2 px-2 text-right">
                    <span className={`team-tag ${getTeamClass(team1)}`}>{team1}</span>
                  </th>
                  <th className="py-2 px-2 text-center text-muted-foreground">Season</th>
                  <th className="py-2 px-2 text-left">
                    <span className={`team-tag ${getTeamClass(team2)}`}>{team2}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from(selectedYears).sort().map(year => {
                  const s1 = stats1.seasonData.find(s => s.year === year);
                  const s2 = stats2.seasonData.find(s => s.year === year);
                  const p1Better = s1 && s2 && s1.points > s2.points;
                  const p2Better = s1 && s2 && s2.points > s1.points;
                  
                  return (
                    <tr key={year} className="border-b border-border/50 hover:bg-muted/20">
                      <td className={`py-2 px-2 text-right ${p1Better ? 'text-green-500 font-bold' : ''}`}>
                        {s1 ? (
                          <span>{s1.points.toLocaleString()} <span className="text-muted-foreground text-xs">(#{s1.rank})</span></span>
                        ) : '-'}
                      </td>
                      <td className="py-2 px-2 text-center text-muted-foreground">{year}</td>
                      <td className={`py-2 px-2 text-left ${p2Better ? 'text-green-500 font-bold' : ''}`}>
                        {s2 ? (
                          <span>{s2.points.toLocaleString()} <span className="text-muted-foreground text-xs">(#{s2.rank})</span></span>
                        ) : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!team1 && !team2 && (
        <div className="bg-card rounded-lg border border-border p-8 text-center">
          <Swords className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Select two teams above to compare their historical records.</p>
        </div>
      )}
    </div>
  );
};
