import { useState, useMemo } from "react";
import { pastStandings, pastTeamStandings, getTeamClass, seasons, majorWinners, apexDetailed } from "@/data/corefallData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LeaderboardsSectionProps {
  onPlayerClick: (name: string) => void;
  onTeamClick: (name: string) => void;
}

type LeaderboardType = "single-points" | "all-time-points" | "single-kos" | "all-time-kos" | "appearances" | "champ-ages" | "team-points" | "team-championships" | "team-players";

interface PlayerStats {
  name: string;
  team: string;
  value: number;
  season?: string;
  age?: number;
}

interface TeamStats {
  team: string;
  value: number;
  details?: string;
}

export const LeaderboardsSection = ({ onPlayerClick, onTeamClick }: LeaderboardsSectionProps) => {
  const [activeTab, setActiveTab] = useState<LeaderboardType>("single-points");
  const allSeasons = Object.keys(pastStandings).sort();
  const [selectedYears, setSelectedYears] = useState<Set<string>>(new Set(allSeasons));
  const [champAgeSortAsc, setChampAgeSortAsc] = useState<boolean>(true); // true = youngest first

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

  // Calculate all leaderboards from pastStandings data filtered by selected years
  const leaderboards = useMemo(() => {
    const allPlayers: { name: string; team: string; points: number; kos: number; season: string }[] = [];
    
    Object.entries(pastStandings).forEach(([season, players]) => {
      if (!selectedYears.has(season)) return;
      players.forEach(player => {
        allPlayers.push({
          name: player.Name,
          team: player.Team,
          points: player.Points,
          kos: player.KOs,
          season
        });
      });
    });

    // Single season points (best individual season)
    const singleSeasonPoints: PlayerStats[] = [...allPlayers]
      .sort((a, b) => b.points - a.points)
      .slice(0, 50)
      .map(p => ({ name: p.name, team: p.team, value: p.points, season: p.season }));

    // Track team seasons for each player (within selected years)
    const playerTeamSeasons: Record<string, Record<string, number>> = {};
    allPlayers.forEach(p => {
      if (!playerTeamSeasons[p.name]) {
        playerTeamSeasons[p.name] = {};
      }
      playerTeamSeasons[p.name][p.team] = (playerTeamSeasons[p.name][p.team] || 0) + 1;
    });

    // Helper to get most played team
    const getMostPlayedTeam = (name: string): string => {
      const teams = playerTeamSeasons[name];
      if (!teams) return "Unknown";
      return Object.entries(teams).sort((a, b) => b[1] - a[1])[0][0];
    };

    // All-time points (sum across selected seasons)
    const playerTotalPoints: Record<string, number> = {};
    allPlayers.forEach(p => {
      playerTotalPoints[p.name] = (playerTotalPoints[p.name] || 0) + p.points;
    });
    const allTimePoints: PlayerStats[] = Object.entries(playerTotalPoints)
      .map(([name, total]) => ({ name, team: getMostPlayedTeam(name), value: total }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 50);

    // Single season KOs (best individual season)
    const singleSeasonKOs: PlayerStats[] = [...allPlayers]
      .sort((a, b) => b.kos - a.kos)
      .slice(0, 50)
      .map(p => ({ name: p.name, team: p.team, value: p.kos, season: p.season }));

    // All-time KOs (sum across selected seasons)
    const playerTotalKOs: Record<string, number> = {};
    allPlayers.forEach(p => {
      playerTotalKOs[p.name] = (playerTotalKOs[p.name] || 0) + p.kos;
    });
    const allTimeKOs: PlayerStats[] = Object.entries(playerTotalKOs)
      .map(([name, total]) => ({ name, team: getMostPlayedTeam(name), value: total }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 50);

    // Most Apex Appearances (top 16 finishes - the Apex bracket)
    const playerAppearances: Record<string, number> = {};
    Object.entries(pastStandings).forEach(([season, players]) => {
      if (!selectedYears.has(season)) return;
      players.forEach(player => {
        if (player.Rank <= 16) {
          playerAppearances[player.Name] = (playerAppearances[player.Name] || 0) + 1;
        }
      });
    });
    const appearances: PlayerStats[] = Object.entries(playerAppearances)
      .map(([name, count]) => ({ name, team: getMostPlayedTeam(name), value: count }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 50);

    // Team Leaderboards
    // Team total points (from pastTeamStandings)
    const teamTotalPoints: Record<string, number> = {};
    Object.entries(pastTeamStandings).forEach(([season, teams]) => {
      if (!selectedYears.has(season)) return;
      teams.forEach(t => {
        teamTotalPoints[t.team] = (teamTotalPoints[t.team] || 0) + t.points;
      });
    });
    const teamPoints: TeamStats[] = Object.entries(teamTotalPoints)
      .map(([team, total]) => ({ team, value: total }))
      .sort((a, b) => b.value - a.value);

    // Team championships (Apex, CTT, Star from seasons data - same logic as Team History)
    const teamChampionships: Record<string, { apex: number; ctt: number; star: number }> = {};
    seasons.forEach(s => {
      if (!selectedYears.has(s.year.toString())) return;
      // Apex titles
      if (s.team) {
        if (!teamChampionships[s.team]) teamChampionships[s.team] = { apex: 0, ctt: 0, star: 0 };
        teamChampionships[s.team].apex++;
      }
      // CTT titles (s.ctt is the team name)
      if (s.ctt) {
        if (!teamChampionships[s.ctt]) teamChampionships[s.ctt] = { apex: 0, ctt: 0, star: 0 };
        teamChampionships[s.ctt].ctt++;
      }
      // Season Star
      if (s.starTeam) {
        if (!teamChampionships[s.starTeam]) teamChampionships[s.starTeam] = { apex: 0, ctt: 0, star: 0 };
        teamChampionships[s.starTeam].star++;
      }
    });
    const teamChamps: TeamStats[] = Object.entries(teamChampionships)
      .map(([team, counts]) => ({
        team, 
        value: counts.apex + counts.ctt + counts.star,
        details: `${counts.apex} Apex, ${counts.ctt} CTT, ${counts.star} Star`
      }))
      .sort((a, b) => b.value - a.value);

    // Team top 40 players produced
    const teamPlayersCount: Record<string, Set<string>> = {};
    allPlayers.forEach(p => {
      if (!teamPlayersCount[p.team]) teamPlayersCount[p.team] = new Set();
      teamPlayersCount[p.team].add(p.name);
    });
    const teamPlayers: TeamStats[] = Object.entries(teamPlayersCount)
      .map(([team, players]) => ({ team, value: players.size }))
      .sort((a, b) => b.value - a.value);

    // Champion Ages (all major/apex winners from majorWinners data)
    // Build a map of player ages by season from pastStandings
    const playerAgesBySeason: Record<string, Record<string, number>> = {};
    Object.entries(pastStandings).forEach(([season, players]) => {
      playerAgesBySeason[season] = {};
      players.forEach(p => {
        playerAgesBySeason[season][p.Name] = p.Age;
      });
    });

    // Collect all major/apex wins with ages from majorWinners
    const champAges: PlayerStats[] = [];
    
    majorWinners.forEach(win => {
      if (!selectedYears.has(win.year.toString())) return;
      
      // Get player age for that season
      const seasonAges = playerAgesBySeason[win.year.toString()];
      let age = seasonAges?.[win.winner];
      
      // If not in standings, try to infer from apexDetailed
      if (!age) {
        const apexEntry = apexDetailed.find(a => a.year === win.year && (a.win === win.winner || a.lose === win.winner));
        if (apexEntry) {
          age = apexEntry.win === win.winner ? apexEntry.winAge : apexEntry.loseAge;
        }
      }
      
      if (age && age > 0) {
        champAges.push({
          name: win.winner,
          team: getMostPlayedTeam(win.winner) || 'Unknown',
          value: age,
          season: `${win.year} ${win.tournament}`,
          age: age
        });
      }
    });

    return {
      "single-points": singleSeasonPoints,
      "all-time-points": allTimePoints,
      "single-kos": singleSeasonKOs,
      "all-time-kos": allTimeKOs,
      "appearances": appearances,
      "champ-ages": champAges,
      "team-points": teamPoints,
      "team-championships": teamChamps,
      "team-players": teamPlayers
    };
  }, [selectedYears]);

  const getTitle = (type: LeaderboardType) => {
    switch (type) {
      case "single-points": return "Most Single Season Points";
      case "all-time-points": return "All-Time Career Points";
      case "single-kos": return "Most Single Season KOs";
      case "all-time-kos": return "All-Time Career KOs";
      case "appearances": return "Most Apex Appearances";
      case "champ-ages": return `Champion Ages (${(leaderboards["champ-ages"] as PlayerStats[]).length} titles)`;
      case "team-points": return "Team Total Points";
      case "team-championships": return "Team Championships";
      case "team-players": return "Top 40 Players Produced";
    }
  };

  const getValueLabel = (type: LeaderboardType) => {
    switch (type) {
      case "appearances": return "Seasons";
      case "champ-ages": return "Age";
      case "team-points": return "Points";
      case "team-championships": return "Titles";
      case "team-players": return "Players";
      default: return type.includes("points") ? "Points" : "KOs";
    }
  };

  const renderChampAgesLeaderboard = () => {
    const data = [...(leaderboards["champ-ages"] as PlayerStats[])].sort((a, b) => 
      champAgeSortAsc ? a.value - b.value : b.value - a.value
    );

    return (
      <div className="overflow-x-auto">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground">
            Showing {data.length} tournament wins
          </span>
          <button
            onClick={() => setChampAgeSortAsc(!champAgeSortAsc)}
            className="text-xs px-3 py-1.5 rounded bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
          >
            Sort: {champAgeSortAsc ? "Youngest First ↑" : "Oldest First ↓"}
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold w-12">#</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold">Player</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold hidden sm:table-cell">Team</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold hidden md:table-cell">Tournament</th>
              <th 
                className="text-right p-2 md:p-3 text-muted-foreground font-semibold cursor-pointer hover:text-primary"
                onClick={() => setChampAgeSortAsc(!champAgeSortAsc)}
              >
                Age {champAgeSortAsc ? "↑" : "↓"}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((player, index) => (
              <tr key={`${player.name}-${player.season}-${index}`} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="p-2 md:p-3 text-muted-foreground font-mono">{index + 1}</td>
                <td className="p-2 md:p-3">
                  <span
                    onClick={() => onPlayerClick(player.name)}
                    className="text-primary hover:underline cursor-pointer font-medium"
                  >
                    {player.name}
                  </span>
                  <span 
                    onClick={() => onTeamClick(player.team)}
                    className={`ml-2 text-xs px-1.5 py-0.5 rounded cursor-pointer sm:hidden ${getTeamClass(player.team)}`}
                  >
                    {player.team}
                  </span>
                </td>
                <td className="p-2 md:p-3 hidden sm:table-cell">
                  <span 
                    onClick={() => onTeamClick(player.team)}
                    className={`text-xs px-2 py-1 rounded cursor-pointer hover:opacity-80 transition-opacity ${getTeamClass(player.team)}`}
                  >
                    {player.team}
                  </span>
                </td>
                <td className="p-2 md:p-3 text-muted-foreground hidden md:table-cell">{player.season}</td>
                <td className="p-2 md:p-3 text-right font-bold text-foreground">{player.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderPlayerLeaderboard = (type: LeaderboardType) => {
    const data = leaderboards[type] as PlayerStats[];
    const showSeason = type === "single-points" || type === "single-kos";

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold w-12">#</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold">Player</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold hidden sm:table-cell">Team</th>
              {showSeason && (
                <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold hidden md:table-cell">Season</th>
              )}
              <th className="text-right p-2 md:p-3 text-muted-foreground font-semibold">{getValueLabel(type)}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((player, index) => (
              <tr key={`${player.name}-${player.season || index}`} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="p-2 md:p-3 text-muted-foreground font-mono">{index + 1}</td>
                <td className="p-2 md:p-3">
                  <span
                    onClick={() => onPlayerClick(player.name)}
                    className="text-primary hover:underline cursor-pointer font-medium"
                  >
                    {player.name}
                  </span>
                  <span 
                    onClick={() => onTeamClick(player.team)}
                    className={`ml-2 text-xs px-1.5 py-0.5 rounded cursor-pointer sm:hidden ${getTeamClass(player.team)}`}
                  >
                    {player.team}
                  </span>
                </td>
                <td className="p-2 md:p-3 hidden sm:table-cell">
                  <span 
                    onClick={() => onTeamClick(player.team)}
                    className={`text-xs px-2 py-1 rounded cursor-pointer hover:opacity-80 transition-opacity ${getTeamClass(player.team)}`}
                  >
                    {player.team}
                  </span>
                </td>
                {showSeason && (
                  <td className="p-2 md:p-3 text-muted-foreground hidden md:table-cell">{player.season}</td>
                )}
                <td className="p-2 md:p-3 text-right font-bold text-foreground">{player.value.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderTeamLeaderboard = (type: LeaderboardType) => {
    const data = leaderboards[type] as TeamStats[];
    const showDetails = type === "team-championships";

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold w-12">#</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold">Team</th>
              {showDetails && (
                <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold hidden sm:table-cell">Breakdown</th>
              )}
              <th className="text-right p-2 md:p-3 text-muted-foreground font-semibold">{getValueLabel(type)}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((team, index) => (
              <tr key={team.team} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="p-2 md:p-3 text-muted-foreground font-mono">{index + 1}</td>
                <td className="p-2 md:p-3">
                  <span 
                    onClick={() => onTeamClick(team.team)}
                    className={`text-xs px-2 py-1 rounded cursor-pointer hover:opacity-80 transition-opacity ${getTeamClass(team.team)}`}
                  >
                    {team.team}
                  </span>
                </td>
                {showDetails && (
                  <td className="p-2 md:p-3 text-muted-foreground hidden sm:table-cell">{team.details}</td>
                )}
                <td className="p-2 md:p-3 text-right font-bold text-foreground">{team.value.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const yearRangeLabel = selectedYears.size === allSeasons.length 
    ? "700-707" 
    : Array.from(selectedYears).sort().join(", ");

  const isTeamLeaderboard = (type: LeaderboardType) => 
    type === "team-points" || type === "team-championships" || type === "team-players";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Leaderboards</h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Records from {selectedYears.size === allSeasons.length ? "seasons 700-707" : `season${selectedYears.size > 1 ? "s" : ""} ${yearRangeLabel}`}.
        </p>
      </div>

      {/* Year Filter */}
      <div className="bg-card rounded-lg border border-border p-3 md:p-4">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-sm font-medium text-muted-foreground">Filter by Season:</span>
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
        <div className="flex flex-wrap gap-2">
          {allSeasons.map(year => (
            <button
              key={year}
              onClick={() => toggleYear(year)}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
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

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as LeaderboardType)} className="w-full">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-medium">Player Stats</p>
          <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
            <TabsTrigger value="single-points" className="flex-1 min-w-[100px] text-xs md:text-sm py-2">
              Season Pts
            </TabsTrigger>
            <TabsTrigger value="all-time-points" className="flex-1 min-w-[100px] text-xs md:text-sm py-2">
              Career Pts
            </TabsTrigger>
            <TabsTrigger value="single-kos" className="flex-1 min-w-[100px] text-xs md:text-sm py-2">
              Season KOs
            </TabsTrigger>
            <TabsTrigger value="all-time-kos" className="flex-1 min-w-[100px] text-xs md:text-sm py-2">
              Career KOs
            </TabsTrigger>
            <TabsTrigger value="appearances" className="flex-1 min-w-[100px] text-xs md:text-sm py-2">
              Appearances
            </TabsTrigger>
            <TabsTrigger value="champ-ages" className="flex-1 min-w-[100px] text-xs md:text-sm py-2">
              Champion Ages
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="space-y-2 mt-4">
          <p className="text-xs text-muted-foreground font-medium">Team Stats</p>
          <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
            <TabsTrigger value="team-points" className="flex-1 min-w-[100px] text-xs md:text-sm py-2">
              Total Points
            </TabsTrigger>
            <TabsTrigger value="team-championships" className="flex-1 min-w-[100px] text-xs md:text-sm py-2">
              Championships
            </TabsTrigger>
            <TabsTrigger value="team-players" className="flex-1 min-w-[100px] text-xs md:text-sm py-2">
              Players Produced
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="mt-4 bg-card rounded-lg border border-border p-2 md:p-4">
          <h3 className="text-lg md:text-xl font-semibold mb-4 text-foreground">{getTitle(activeTab)}</h3>
          
          <TabsContent value="single-points" className="mt-0">
            {renderPlayerLeaderboard("single-points")}
          </TabsContent>
          <TabsContent value="all-time-points" className="mt-0">
            {renderPlayerLeaderboard("all-time-points")}
          </TabsContent>
          <TabsContent value="single-kos" className="mt-0">
            {renderPlayerLeaderboard("single-kos")}
          </TabsContent>
          <TabsContent value="all-time-kos" className="mt-0">
            {renderPlayerLeaderboard("all-time-kos")}
          </TabsContent>
          <TabsContent value="appearances" className="mt-0">
            {renderPlayerLeaderboard("appearances")}
          </TabsContent>
          <TabsContent value="champ-ages" className="mt-0">
            {renderChampAgesLeaderboard()}
          </TabsContent>
          <TabsContent value="team-points" className="mt-0">
            {renderTeamLeaderboard("team-points")}
          </TabsContent>
          <TabsContent value="team-championships" className="mt-0">
            {renderTeamLeaderboard("team-championships")}
          </TabsContent>
          <TabsContent value="team-players" className="mt-0">
            {renderTeamLeaderboard("team-players")}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
