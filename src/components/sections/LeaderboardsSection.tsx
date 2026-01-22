import React, { useState, useMemo } from "react";
import { pastStandings, pastTeamStandings, getTeamClass, seasons, majorWinners, apexDetailed, trophyData, fullMatches } from "@/data/corefallData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, ChevronRight } from "lucide-react";

interface LeaderboardsSectionProps {
  onPlayerClick: (name: string) => void;
  onTeamClick: (name: string) => void;
}

type LeaderboardType = "legacy-score" | "single-points" | "all-time-points" | "avg-points" | "consistency" | "peak-season" | "age-analytics" | "single-kos" | "all-time-kos" | "appearances" | "avg-finish" | "team-points" | "team-championships" | "team-players" | "team-season-pts";
type AgeSubTab = "peak-age" | "age-brackets" | "champ-ages" | "first-major" | "longevity";

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

interface TeamSeasonPtsEntry {
  team: string;
  points: number;
  season: string;
  players: { name: string; rank: number; points: number }[];
}

export const LeaderboardsSection = ({ onPlayerClick, onTeamClick }: LeaderboardsSectionProps) => {
  const [activeTab, setActiveTab] = useState<LeaderboardType>("legacy-score");
  const allSeasons = Object.keys(pastStandings).sort();
  const [selectedYears, setSelectedYears] = useState<Set<string>>(new Set(allSeasons));
  const [champAgeSortAsc, setChampAgeSortAsc] = useState<boolean>(true);
  const [expandedTeamSeason, setExpandedTeamSeason] = useState<string | null>(null);
  const [ageSubTab, setAgeSubTab] = useState<AgeSubTab>("peak-age");
  const [expandedAgeBracket, setExpandedAgeBracket] = useState<string | null>(null);
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
    const allPlayers: { name: string; team: string; points: number; kos: number; season: string; age: number }[] = [];
    
    Object.entries(pastStandings).forEach(([season, players]) => {
      if (!selectedYears.has(season)) return;
      players.forEach(player => {
        allPlayers.push({
          name: player.Name,
          team: player.Team,
          points: player.Points,
          kos: player.KOs,
          season,
          age: player.Age || 0
        });
      });
    });

    // Single season points (best individual season)
    const singleSeasonPoints: PlayerStats[] = [...allPlayers]
      .sort((a, b) => b.points - a.points)
      .slice(0, 50)
      .map(p => ({ name: p.name, team: p.team, value: p.points, season: p.season }));

    // Track total points scored per team for each player (within selected years)
    const playerTeamPoints: Record<string, Record<string, number>> = {};
    allPlayers.forEach(p => {
      if (!playerTeamPoints[p.name]) {
        playerTeamPoints[p.name] = {};
      }
      playerTeamPoints[p.name][p.team] = (playerTeamPoints[p.name][p.team] || 0) + p.points;
    });

    // Helper to get team where player scored most points
    const getMostPointsTeam = (name: string): string => {
      const teams = playerTeamPoints[name];
      if (!teams) return "Unknown";
      return Object.entries(teams).sort((a, b) => b[1] - a[1])[0][0];
    };

    // All-time points (sum across selected seasons)
    const playerTotalPoints: Record<string, number> = {};
    allPlayers.forEach(p => {
      playerTotalPoints[p.name] = (playerTotalPoints[p.name] || 0) + p.points;
    });
    const allTimePoints: PlayerStats[] = Object.entries(playerTotalPoints)
      .map(([name, total]) => ({ name, team: getMostPointsTeam(name), value: total }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 50);

    // Average points per season (requires at least 2 seasons)
    const playerSeasonCounts: Record<string, number> = {};
    allPlayers.forEach(p => {
      playerSeasonCounts[p.name] = (playerSeasonCounts[p.name] || 0) + 1;
    });
    const avgPoints: PlayerStats[] = Object.entries(playerTotalPoints)
      .filter(([name]) => playerSeasonCounts[name] >= 2)
      .map(([name, total]) => ({
        name,
        team: getMostPointsTeam(name),
        value: Math.round(total / playerSeasonCounts[name]),
        season: `${playerSeasonCounts[name]} seasons`
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 50);

    // Consistency Rating (requires at least 3 seasons)
    const playerPointsBySeason: Record<string, number[]> = {};
    allPlayers.forEach(p => {
      if (!playerPointsBySeason[p.name]) playerPointsBySeason[p.name] = [];
      playerPointsBySeason[p.name].push(p.points);
    });

    const consistencyRaw = Object.entries(playerPointsBySeason)
      .filter(([_, points]) => points.length >= 3)
      .map(([name, points]) => {
        const mean = points.reduce((a, b) => a + b, 0) / points.length;
        const variance = points.reduce((sum, p) => sum + Math.pow(p - mean, 2), 0) / points.length;
        const stdDev = Math.sqrt(variance);
        const cv = mean > 0 ? (stdDev / mean) * 100 : 0;
        const consistencyPct = Math.max(0, 100 - cv) / 100;
        const rawScore = mean * consistencyPct;
        
        return { name, mean, consistencyPct, rawScore, seasons: points.length };
      });

    const maxRawScore = Math.max(...consistencyRaw.map(p => p.rawScore), 1);
    
    const consistencyRating: PlayerStats[] = consistencyRaw
      .map(({ name, mean, rawScore, seasons }) => ({
        name,
        team: getMostPointsTeam(name),
        value: Math.round((rawScore / maxRawScore) * 1000) / 10, // 0-100 scale with 1 decimal
        season: `${seasons} seasons, ${Math.round(mean)} avg`
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 50);

    // Peak Season Finder - best individual season based on points, majors, apex finish, season star, CTT
    const peakSeasonData: { name: string; team: string; season: string; points: number; majors: number; apexFinish: string; seasonStar: boolean; cttWin: boolean; score: number }[] = [];
    
    Object.entries(pastStandings).forEach(([season, players]) => {
      if (!selectedYears.has(season)) return;
      const yearNum = parseInt(season);
      const seasonInfo = seasons.find(s => s.year === yearNum);
      
      players.forEach(player => {
        // Count majors won this season (excluding Apex which is handled separately)
        const majorsThisSeason = majorWinners.filter(
          m => m.year === yearNum && m.winner === player.Name && m.tournament !== "Apex"
        ).length;
        
        // Determine Apex finish
        let apexFinish = "";
        let apexBonus = 0;
        if (seasonInfo?.apex === player.Name) {
          apexFinish = "Winner";
          apexBonus = 500;
        } else {
          const apexData = apexDetailed.find(a => a.year === yearNum);
          if (apexData?.lose === player.Name) {
            apexFinish = "Finals";
            apexBonus = 250;
          } else {
            // Use fullMatches to check for SF, QF, R16 finishes (player lost at that round)
            const matchData = fullMatches[season];
            if (matchData) {
              const sfLoss = matchData.find(r => r.round === "SF" && r.match.includes(player.Name) && !r.match.startsWith(player.Name));
              const qfLoss = matchData.find(r => r.round === "QF" && r.match.includes(player.Name) && !r.match.startsWith(player.Name));
              const r16Loss = matchData.find(r => r.round === "R16" && r.match.includes(player.Name) && !r.match.startsWith(player.Name));
              if (sfLoss) { apexFinish = "Top 4"; apexBonus = 125; }
              else if (qfLoss) { apexFinish = "Top 8"; apexBonus = 60; }
              else if (r16Loss) { apexFinish = "Top 16"; apexBonus = 30; }
            }
          }
        }
        
        const isStar = seasonInfo?.star === player.Name;
        const isCttWin = trophyData.find(t => t.name === player.Name)?.list.includes(`CTT (${season})`) || false;
        
        // Score calculation: Points (base) + Majors (100 each) + Apex Finish + Season Star (150) + CTT (75)
        const score = player.Points + (majorsThisSeason * 100) + apexBonus + (isStar ? 150 : 0) + (isCttWin ? 75 : 0);
        
        peakSeasonData.push({
          name: player.Name,
          team: player.Team,
          season,
          points: player.Points,
          majors: majorsThisSeason,
          apexFinish,
          seasonStar: isStar,
          cttWin: isCttWin,
          score
        });
      });
    });
    
    // Get best season per player
    const playerBestSeason: Record<string, typeof peakSeasonData[0]> = {};
    peakSeasonData.forEach(entry => {
      if (!playerBestSeason[entry.name] || entry.score > playerBestSeason[entry.name].score) {
        playerBestSeason[entry.name] = entry;
      }
    });
    
    const peakSeasons: PlayerStats[] = Object.values(playerBestSeason)
      .sort((a, b) => b.score - a.score)
      .slice(0, 50)
      .map(entry => {
        const details: string[] = [`${entry.points} pts`];
        if (entry.majors > 0) details.push(`${entry.majors} major${entry.majors > 1 ? 's' : ''}`);
        if (entry.apexFinish) details.push(`Apex ${entry.apexFinish}`);
        if (entry.seasonStar) details.push('Star');
        if (entry.cttWin) details.push('CTT');
        
        return {
          name: entry.name,
          team: entry.team,
          value: entry.score,
          season: `${entry.season} (${details.join(', ')})`
        };
      });

    // Peak Age - at what age each player had their best season (by points) - NOW SORTED BY POINTS
    const playerBestByAge: Record<string, { age: number; points: number; season: string; team: string }> = {};
    allPlayers.forEach(entry => {
      if (entry.age <= 0) return;
      if (!playerBestByAge[entry.name] || entry.points > playerBestByAge[entry.name].points) {
        playerBestByAge[entry.name] = { age: entry.age, points: entry.points, season: entry.season, team: entry.team };
      }
    });
    
    // Sort by points (descending) - show best seasons with the age they occurred at
    const peakAges: PlayerStats[] = Object.entries(playerBestByAge)
      .map(([name, data]) => ({
        name,
        team: getMostPointsTeam(name),
        value: data.points, // Value is now points
        season: `Season ${data.season}`,
        age: data.age
      }))
      .sort((a, b) => b.value - a.value) // Sort by highest points
      .slice(0, 50);

    // Helper to get age for a player in a season
    const getPlayerAgeForSeason = (playerName: string, year: number): number => {
      const seasonAges = pastStandings[year.toString()];
      const player = seasonAges?.find(p => p.Name === playerName);
      if (player?.Age) return player.Age;
      // Fallback to apexDetailed
      const apexEntry = apexDetailed.find(a => a.year === year && (a.win === playerName || a.lose === playerName));
      if (apexEntry) {
        return apexEntry.win === playerName ? (apexEntry.winAge || 0) : (apexEntry.loseAge || 0);
      }
      return 0;
    };

    // Helper to get bracket for an age
    const getBracketForAge = (age: number): string => {
      if (age >= 20 && age <= 22) return "20-22";
      if (age >= 23 && age <= 25) return "23-25";
      if (age >= 26 && age <= 28) return "26-28";
      if (age >= 29 && age <= 31) return "29-31";
      if (age >= 32 && age <= 34) return "32-34";
      if (age >= 35) return "35+";
      return "";
    };

    // Individual age stats for expandable brackets
    const individualAgeStats: Record<number, { totalPoints: number; totalKOs: number; count: number; players: Set<string>; majors: number; apexWins: number }> = {};
    
    allPlayers.forEach(entry => {
      if (entry.age <= 0) return;
      if (!individualAgeStats[entry.age]) {
        individualAgeStats[entry.age] = { totalPoints: 0, totalKOs: 0, count: 0, players: new Set(), majors: 0, apexWins: 0 };
      }
      individualAgeStats[entry.age].totalPoints += entry.points;
      individualAgeStats[entry.age].totalKOs += entry.kos;
      individualAgeStats[entry.age].count++;
      individualAgeStats[entry.age].players.add(entry.name);
    });

    // Count majors and apex wins by age
    majorWinners.forEach(win => {
      if (!selectedYears.has(win.year.toString())) return;
      const age = getPlayerAgeForSeason(win.winner, win.year);
      if (age > 0) {
        if (!individualAgeStats[age]) {
          individualAgeStats[age] = { totalPoints: 0, totalKOs: 0, count: 0, players: new Set(), majors: 0, apexWins: 0 };
        }
        if (win.tournament === "Apex") {
          individualAgeStats[age].apexWins++;
        } else {
          individualAgeStats[age].majors++;
        }
      }
    });

    // Age Brackets - average performance by age group with majors/apex wins
    interface AgeBracketData {
      totalPoints: number;
      totalKOs: number;
      count: number;
      players: Set<string>;
      majors: number;
      apexWins: number;
      individualAges: { age: number; avgPoints: number; avgKOs: number; count: number; players: string[]; majors: number; apexWins: number }[];
    }
    
    const ageBrackets: Record<string, AgeBracketData> = {
      "20-22": { totalPoints: 0, totalKOs: 0, count: 0, players: new Set(), majors: 0, apexWins: 0, individualAges: [] },
      "23-25": { totalPoints: 0, totalKOs: 0, count: 0, players: new Set(), majors: 0, apexWins: 0, individualAges: [] },
      "26-28": { totalPoints: 0, totalKOs: 0, count: 0, players: new Set(), majors: 0, apexWins: 0, individualAges: [] },
      "29-31": { totalPoints: 0, totalKOs: 0, count: 0, players: new Set(), majors: 0, apexWins: 0, individualAges: [] },
      "32-34": { totalPoints: 0, totalKOs: 0, count: 0, players: new Set(), majors: 0, apexWins: 0, individualAges: [] },
      "35+": { totalPoints: 0, totalKOs: 0, count: 0, players: new Set(), majors: 0, apexWins: 0, individualAges: [] }
    };
    
    allPlayers.forEach(entry => {
      if (entry.age <= 0) return;
      const bracket = getBracketForAge(entry.age);
      
      if (bracket && ageBrackets[bracket]) {
        ageBrackets[bracket].totalPoints += entry.points;
        ageBrackets[bracket].totalKOs += entry.kos;
        ageBrackets[bracket].count++;
        ageBrackets[bracket].players.add(entry.name);
      }
    });

    // Aggregate majors/apex by bracket and build individual ages
    Object.entries(individualAgeStats).forEach(([ageStr, stats]) => {
      const age = parseInt(ageStr);
      const bracket = getBracketForAge(age);
      if (bracket && ageBrackets[bracket]) {
        ageBrackets[bracket].majors += stats.majors;
        ageBrackets[bracket].apexWins += stats.apexWins;
        ageBrackets[bracket].individualAges.push({
          age,
          avgPoints: stats.count > 0 ? Math.round(stats.totalPoints / stats.count) : 0,
          avgKOs: stats.count > 0 ? Math.round((stats.totalKOs / stats.count) * 10) / 10 : 0,
          count: stats.count,
          players: Array.from(stats.players),
          majors: stats.majors,
          apexWins: stats.apexWins
        });
      }
    });

    // Sort individual ages within each bracket
    Object.values(ageBrackets).forEach(bracket => {
      bracket.individualAges.sort((a, b) => a.age - b.age);
    });
    
    const ageBracketStats: { bracket: string; avgPoints: number; avgKOs: number; seasons: number; uniquePlayers: number; majors: number; apexWins: number; individualAges: { age: number; avgPoints: number; avgKOs: number; count: number; players: string[]; majors: number; apexWins: number }[] }[] = 
      Object.entries(ageBrackets)
        .filter(([_, data]) => data.count > 0)
        .map(([bracket, data]) => ({
          bracket,
          avgPoints: Math.round(data.totalPoints / data.count),
          avgKOs: Math.round((data.totalKOs / data.count) * 10) / 10,
          seasons: data.count,
          uniquePlayers: data.players.size,
          majors: data.majors,
          apexWins: data.apexWins,
          individualAges: data.individualAges
        }));

    // Age at First Major - youngest age when a player won their first major
    const playerFirstMajor: Record<string, { age: number; tournament: string; year: number }> = {};
    majorWinners.forEach(win => {
      if (!selectedYears.has(win.year.toString())) return;
      const age = getPlayerAgeForSeason(win.winner, win.year);
      if (age > 0) {
        if (!playerFirstMajor[win.winner] || win.year < playerFirstMajor[win.winner].year) {
          playerFirstMajor[win.winner] = { age, tournament: win.tournament, year: win.year };
        }
      }
    });
    
    const firstMajorAges: PlayerStats[] = Object.entries(playerFirstMajor)
      .map(([name, data]) => ({
        name,
        team: getMostPointsTeam(name),
        value: data.age,
        season: `${data.year} ${data.tournament}`,
        age: data.age
      }))
      .sort((a, b) => a.value - b.value) // Youngest first
      .slice(0, 50);

    // Longevity Leaders - players who competed across widest age range
    const playerAgeRange: Record<string, { minAge: number; maxAge: number; seasons: number }> = {};
    allPlayers.forEach(entry => {
      if (entry.age <= 0) return;
      if (!playerAgeRange[entry.name]) {
        playerAgeRange[entry.name] = { minAge: entry.age, maxAge: entry.age, seasons: 1 };
      } else {
        playerAgeRange[entry.name].minAge = Math.min(playerAgeRange[entry.name].minAge, entry.age);
        playerAgeRange[entry.name].maxAge = Math.max(playerAgeRange[entry.name].maxAge, entry.age);
        playerAgeRange[entry.name].seasons++;
      }
    });
    
    const longevityLeaders: PlayerStats[] = Object.entries(playerAgeRange)
      .filter(([_, data]) => data.seasons >= 2) // Must have played multiple seasons
      .map(([name, data]) => ({
        name,
        team: getMostPointsTeam(name),
        value: data.maxAge - data.minAge, // Years active
        season: `Ages ${data.minAge}-${data.maxAge} (${data.seasons} seasons)`,
        age: data.maxAge - data.minAge
      }))
      .sort((a, b) => b.value - a.value) // Most years first
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
      .map(([name, total]) => ({ name, team: getMostPointsTeam(name), value: total }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 50);

    // Most Apex Appearances (top 16 finishes - the Apex bracket)
    const playerAppearances: Record<string, number> = {};
    Object.entries(pastStandings).forEach(([season, players]) => {
      if (!selectedYears.has(season)) return;
      if (season === "709") {
        // For 709, use the qualified array from apexDetailed
        const apex709 = apexDetailed.find(a => a.year === 709);
        if (apex709?.qualified) {
          apex709.qualified.forEach(name => {
            playerAppearances[name] = (playerAppearances[name] || 0) + 1;
          });
        }
      } else {
        players.forEach(player => {
          if (player.Rank <= 16) {
            playerAppearances[player.Name] = (playerAppearances[player.Name] || 0) + 1;
          }
        });
      }
    });
    const appearances: PlayerStats[] = Object.entries(playerAppearances)
      .map(([name, count]) => ({ name, team: getMostPointsTeam(name), value: count }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 50);

    // Best Average Finish (requires at least 2 seasons)
    const playerRanks: Record<string, number[]> = {};
    allPlayers.forEach(p => {
      if (!playerRanks[p.name]) playerRanks[p.name] = [];
      const seasonData = pastStandings[p.season];
      const playerData = seasonData?.find(pd => pd.Name === p.name);
      if (playerData) {
        playerRanks[p.name].push(playerData.Rank);
      }
    });
    const avgFinish: PlayerStats[] = Object.entries(playerRanks)
      .filter(([_, ranks]) => ranks.length >= 2)
      .map(([name, ranks]) => ({
        name,
        team: getMostPointsTeam(name),
        value: Math.round((ranks.reduce((a, b) => a + b, 0) / ranks.length) * 10) / 10,
        season: `${ranks.length} seasons`
      }))
      .sort((a, b) => a.value - b.value)
      .slice(0, 50);

    // Team Leaderboards
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

    // Team championships
    const teamChampionships: Record<string, { apex: number; ctt: number; star: number; major: number }> = {};
    seasons.forEach(s => {
      if (!selectedYears.has(s.year.toString())) return;
      if (s.team) {
        if (!teamChampionships[s.team]) teamChampionships[s.team] = { apex: 0, ctt: 0, star: 0, major: 0 };
        teamChampionships[s.team].apex++;
      }
      if (s.ctt) {
        if (!teamChampionships[s.ctt]) teamChampionships[s.ctt] = { apex: 0, ctt: 0, star: 0, major: 0 };
        teamChampionships[s.ctt].ctt++;
      }
      if (s.starTeam) {
        if (!teamChampionships[s.starTeam]) teamChampionships[s.starTeam] = { apex: 0, ctt: 0, star: 0, major: 0 };
        teamChampionships[s.starTeam].star++;
      }
    });
    
    // Count majors by team (using majorWinners and pastStandings to find team)
    majorWinners.forEach(win => {
      if (!selectedYears.has(win.year.toString())) return;
      if (win.tournament === "Apex") return; // Skip Apex as it's already counted
      // Find the player's team for that season
      const seasonPlayers = pastStandings[win.year.toString()];
      const playerData = seasonPlayers?.find(p => p.Name === win.winner);
      const team = playerData?.Team;
      if (team) {
        if (!teamChampionships[team]) teamChampionships[team] = { apex: 0, ctt: 0, star: 0, major: 0 };
        teamChampionships[team].major++;
      }
    });
    
    const teamChamps: TeamStats[] = Object.entries(teamChampionships)
      .map(([team, counts]) => ({
        team, 
        value: counts.apex + counts.ctt + counts.star + counts.major,
        details: `${counts.apex} Apex, ${counts.ctt} CTT, ${counts.star} Star, ${counts.major} Major`
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

    // Team best single season points
    const teamSeasonPts: TeamSeasonPtsEntry[] = [];
    Object.entries(pastTeamStandings).forEach(([season, teams]) => {
      if (!selectedYears.has(season)) return;
      teams.forEach(t => {
        const seasonPlayers = pastStandings[season]
          ?.filter(p => p.Team === t.team)
          .map(p => ({ name: p.Name, rank: p.Rank, points: p.Points }))
          .sort((a, b) => a.rank - b.rank) || [];
        
        teamSeasonPts.push({
          team: t.team,
          points: t.points,
          season,
          players: seasonPlayers
        });
      });
    });
    teamSeasonPts.sort((a, b) => b.points - a.points);

    // Champion Ages
    const playerAgesBySeason: Record<string, Record<string, number>> = {};
    Object.entries(pastStandings).forEach(([season, players]) => {
      playerAgesBySeason[season] = {};
      players.forEach(p => {
        playerAgesBySeason[season][p.Name] = p.Age;
      });
    });

    const champAges: PlayerStats[] = [];
    majorWinners.forEach(win => {
      if (!selectedYears.has(win.year.toString())) return;
      const seasonAges = playerAgesBySeason[win.year.toString()];
      let age = seasonAges?.[win.winner];
      if (!age) {
        const apexEntry = apexDetailed.find(a => a.year === win.year && (a.win === win.winner || a.lose === win.winner));
        if (apexEntry) {
          age = apexEntry.win === win.winner ? apexEntry.winAge : apexEntry.loseAge;
        }
      }
      if (age && age > 0) {
        champAges.push({
          name: win.winner,
          team: getMostPointsTeam(win.winner) || 'Unknown',
          value: age,
          season: `${win.year} ${win.tournament}`,
          age: age
        });
      }
    });

    // Legacy Score calculation
    const playerLegacyMap: Record<string, { points: number; kos: number; elite: number; apexApps: number; apex: number; majors: number; ctt: number; star: number; apexFinals: number }> = {};

    allPlayers.forEach(p => {
      if (!playerLegacyMap[p.name]) playerLegacyMap[p.name] = { points: 0, kos: 0, elite: 0, apexApps: 0, apex: 0, majors: 0, ctt: 0, star: 0, apexFinals: 0 };
      playerLegacyMap[p.name].points += p.points;
      playerLegacyMap[p.name].kos += p.kos;
      if (p.points >= 2000) playerLegacyMap[p.name].elite++;
    });

    // Apex appearances (top 16 finishes or qualified for 709)
    Object.entries(pastStandings).forEach(([season, players]) => {
      if (!selectedYears.has(season)) return;
      if (season === "709") {
        const apex709 = apexDetailed.find(a => a.year === 709);
        if (apex709?.qualified) {
          apex709.qualified.forEach(name => {
            if (!playerLegacyMap[name]) playerLegacyMap[name] = { points: 0, kos: 0, elite: 0, apexApps: 0, apex: 0, majors: 0, ctt: 0, star: 0, apexFinals: 0 };
            playerLegacyMap[name].apexApps++;
          });
        }
      } else {
        players.forEach(player => {
          if (player.Rank <= 16) {
            if (!playerLegacyMap[player.Name]) playerLegacyMap[player.Name] = { points: 0, kos: 0, elite: 0, apexApps: 0, apex: 0, majors: 0, ctt: 0, star: 0, apexFinals: 0 };
            playerLegacyMap[player.Name].apexApps++;
          }
        });
      }
    });

    majorWinners.forEach(win => {
      if (!selectedYears.has(win.year.toString())) return;
      if (!playerLegacyMap[win.winner]) playerLegacyMap[win.winner] = { points: 0, kos: 0, elite: 0, apexApps: 0, apex: 0, majors: 0, ctt: 0, star: 0, apexFinals: 0 };
      if (win.tournament === "Apex") playerLegacyMap[win.winner].apex++;
      else playerLegacyMap[win.winner].majors++;
    });

    // Season Star awards and CTT wins from trophyData
    seasons.forEach(s => {
      if (!selectedYears.has(s.year.toString())) return;
      if (s.star) {
        if (!playerLegacyMap[s.star]) playerLegacyMap[s.star] = { points: 0, kos: 0, elite: 0, apexApps: 0, apex: 0, majors: 0, ctt: 0, star: 0, apexFinals: 0 };
        playerLegacyMap[s.star].star++;
      }
    });

    // CTT wins from trophyData (individual CTT contributions)
    trophyData.forEach(trophy => {
      if (trophy.ctt > 0) {
        if (!playerLegacyMap[trophy.name]) playerLegacyMap[trophy.name] = { points: 0, kos: 0, elite: 0, apexApps: 0, apex: 0, majors: 0, ctt: 0, star: 0, apexFinals: 0 };
        playerLegacyMap[trophy.name].ctt += trophy.ctt;
      }
    });

    // Apex Finals appearances (both winner and loser)
    apexDetailed.forEach(apex => {
      if (!selectedYears.has(apex.year.toString())) return;
      if (apex.win) {
        if (!playerLegacyMap[apex.win]) playerLegacyMap[apex.win] = { points: 0, kos: 0, elite: 0, apexApps: 0, apex: 0, majors: 0, ctt: 0, star: 0, apexFinals: 0 };
        playerLegacyMap[apex.win].apexFinals++;
      }
      if (apex.lose) {
        if (!playerLegacyMap[apex.lose]) playerLegacyMap[apex.lose] = { points: 0, kos: 0, elite: 0, apexApps: 0, apex: 0, majors: 0, ctt: 0, star: 0, apexFinals: 0 };
        playerLegacyMap[apex.lose].apexFinals++;
      }
    });

    // Legacy Score: (points * 0.8) + (kos * 10) + (elite * 100) + (apexApps * 100) + (ctt * 50) + (majors * 200) + (star * 400) + (apexFinals * 200) + (apex * 1200)
    const legacyRankings: PlayerStats[] = Object.entries(playerLegacyMap)
      .map(([name, stats]) => ({
        name,
        team: getMostPointsTeam(name),
        value: Math.round(stats.points * 0.8) + (stats.kos * 10) + (stats.elite * 100) + (stats.apexApps * 100) + (stats.ctt * 50) + (stats.majors * 200) + (stats.star * 400) + (stats.apexFinals * 200) + (stats.apex * 1200)
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 50);

    return {
      "legacy-score": legacyRankings,
      "single-points": singleSeasonPoints,
      "all-time-points": allTimePoints,
      "avg-points": avgPoints,
      "consistency": consistencyRating,
      "peak-season": peakSeasons,
      "peak-age": peakAges,
      "age-brackets": ageBracketStats,
      "single-kos": singleSeasonKOs,
      "all-time-kos": allTimeKOs,
      "appearances": appearances,
      "avg-finish": avgFinish,
      "champ-ages": champAges,
      "first-major": firstMajorAges,
      "longevity": longevityLeaders,
      "team-points": teamPoints,
      "team-championships": teamChamps,
      "team-players": teamPlayers,
      "team-season-pts": teamSeasonPts
    };
  }, [selectedYears]);

  const getTitle = (type: LeaderboardType): string => {
    switch (type) {
      case "legacy-score": return "All-Time Legacy Rankings";
      case "single-points": return "Most Single Season Points";
      case "all-time-points": return "All-Time Career Points";
      case "avg-points": return "Average Points Per Season";
      case "consistency": return "Consistency Rating";
      case "peak-season": return "Peak Season Finder";
      case "age-analytics": return getAgeSubTabTitle();
      case "single-kos": return "Most Single Season KOs";
      case "all-time-kos": return "All-Time Career KOs";
      case "appearances": return "Most Apex Appearances";
      case "avg-finish": return "Best Average Finish";
      case "team-points": return "Team Total Points";
      case "team-championships": return "Team Championships";
      case "team-players": return "Top 40 Players Produced";
      case "team-season-pts": return "Best Team Season Points";
      default: return "";
    }
  };

  const getAgeSubTabTitle = (): string => {
    switch (ageSubTab) {
      case "peak-age": return "Best Seasons by Age";
      case "age-brackets": return "Performance by Age Bracket";
      case "champ-ages": return `Champion Ages (${(leaderboards["champ-ages"] as PlayerStats[]).length} titles)`;
      case "first-major": return "Age at First Major";
      case "longevity": return "Longevity Leaders";
      default: return "Age Analytics";
    }
  };

  const getValueLabel = (type: LeaderboardType): string => {
    switch (type) {
      case "legacy-score": return "Legacy Score";
      case "avg-points": return "Avg Pts";
      case "consistency": return "Rating";
      case "peak-season": return "Score";
      case "age-analytics": return ageSubTab === "age-brackets" ? "Avg Pts" : "Age";
      case "appearances": return "Seasons";
      case "avg-finish": return "Avg Rank";
      case "team-points": return "Points";
      case "team-championships": return "Titles";
      case "team-players": return "Players";
      case "team-season-pts": return "Points";
      default: return type.includes("points") ? "Points" : "KOs";
    }
  };

  const renderTeamSeasonPtsLeaderboard = () => {
    const data = leaderboards["team-season-pts"] as TeamSeasonPtsEntry[];
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold w-12">#</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold">Team</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold hidden sm:table-cell">Season</th>
              <th className="text-right p-2 md:p-3 text-muted-foreground font-semibold">Points</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 50).map((entry, index) => {
              const key = `${entry.team}-${entry.season}`;
              const isExpanded = expandedTeamSeason === key;
              
              return (
                <React.Fragment key={key}>
                  <tr 
                    className={`border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer ${isExpanded ? 'bg-muted/30' : ''}`}
                    onClick={() => setExpandedTeamSeason(isExpanded ? null : key)}
                  >
                    <td className="p-2 md:p-3 text-muted-foreground font-mono">{index + 1}</td>
                    <td className="p-2 md:p-3">
                      <span 
                        onClick={(e) => { e.stopPropagation(); onTeamClick(entry.team); }}
                        className={`text-xs px-2 py-1 rounded cursor-pointer hover:opacity-80 transition-opacity ${getTeamClass(entry.team)}`}
                      >
                        {entry.team}
                      </span>
                      <span className="ml-2 text-xs text-muted-foreground sm:hidden">({entry.season})</span>
                    </td>
                    <td className="p-2 md:p-3 text-muted-foreground hidden sm:table-cell">{entry.season}</td>
                    <td className="p-2 md:p-3 text-right font-bold text-foreground">
                      {entry.points.toLocaleString()}
                      {entry.players.length > 0 && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          ({entry.players.length} players)
                        </span>
                      )}
                    </td>
                  </tr>
                  {isExpanded && entry.players.length > 0 && (
                    <tr>
                      <td colSpan={4} className="p-0 bg-muted/20">
                        <div className="p-3 space-y-1">
                          <div className="text-xs text-muted-foreground mb-2">
                            Season {entry.season} Breakdown
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {entry.players.map(p => (
                              <div 
                                key={p.name}
                                onClick={(e) => { e.stopPropagation(); onPlayerClick(p.name); }}
                                className="flex justify-between items-center text-xs py-2 px-3 bg-background/30 rounded border border-border/30 cursor-pointer hover:bg-background/60"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground">#{p.rank}</span>
                                  <span className="text-primary hover:underline">{p.name}</span>
                                </div>
                                <span className="font-semibold text-foreground">{p.points.toLocaleString()} pts</span>
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
    );
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
    const showSeason = type === "single-points" || type === "single-kos" || type === "avg-finish" || type === "avg-points" || type === "peak-season" || type === "consistency";

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

  const renderAgeBracketsLeaderboard = () => {
    const data = leaderboards["age-brackets"] as { bracket: string; avgPoints: number; avgKOs: number; seasons: number; uniquePlayers: number; majors: number; apexWins: number; individualAges: { age: number; avgPoints: number; avgKOs: number; count: number; players: string[]; majors: number; apexWins: number }[] }[];
    const maxAvgPoints = Math.max(...data.map(d => d.avgPoints), 1);

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold w-8"></th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold">Age Range</th>
              <th className="text-right p-2 md:p-3 text-muted-foreground font-semibold">Avg Pts</th>
              <th className="text-right p-2 md:p-3 text-muted-foreground font-semibold hidden sm:table-cell">Avg KOs</th>
              <th className="text-right p-2 md:p-3 text-muted-foreground font-semibold hidden md:table-cell">Seasons</th>
              <th className="text-right p-2 md:p-3 text-muted-foreground font-semibold hidden md:table-cell">Players</th>
              <th className="text-right p-2 md:p-3 text-amber-500 font-semibold">Majors</th>
              <th className="text-right p-2 md:p-3 text-cyan-500 font-semibold">Apex</th>
            </tr>
          </thead>
          <tbody>
            {data.map((bracket) => {
              const percentage = (bracket.avgPoints / maxAvgPoints) * 100;
              const isExpanded = expandedAgeBracket === bracket.bracket;
              
              return (
                <React.Fragment key={bracket.bracket}>
                  <tr 
                    className={`border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer ${isExpanded ? 'bg-muted/30' : ''}`}
                    onClick={() => setExpandedAgeBracket(isExpanded ? null : bracket.bracket)}
                  >
                    <td className="p-2 md:p-3 text-muted-foreground">
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </td>
                    <td className="p-2 md:p-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{bracket.bracket}</span>
                        <div className="flex-1 max-w-[100px] h-2 bg-muted rounded-full overflow-hidden hidden lg:block">
                          <div 
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-2 md:p-3 text-right font-bold text-foreground">{bracket.avgPoints.toLocaleString()}</td>
                    <td className="p-2 md:p-3 text-right text-muted-foreground hidden sm:table-cell">{bracket.avgKOs}</td>
                    <td className="p-2 md:p-3 text-right text-muted-foreground hidden md:table-cell">{bracket.seasons.toLocaleString()}</td>
                    <td className="p-2 md:p-3 text-right text-muted-foreground hidden md:table-cell">{bracket.uniquePlayers}</td>
                    <td className="p-2 md:p-3 text-right font-semibold text-amber-500">{bracket.majors}</td>
                    <td className="p-2 md:p-3 text-right font-semibold text-cyan-500">{bracket.apexWins}</td>
                  </tr>
                  {isExpanded && bracket.individualAges.length > 0 && (
                    <tr>
                      <td colSpan={8} className="p-0 bg-muted/20">
                        <div className="p-3">
                          <div className="text-xs text-muted-foreground mb-2 font-medium">
                            Individual Ages in {bracket.bracket}
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-xs">
                              <thead>
                                <tr className="border-b border-border/30">
                                  <th className="text-left p-2 text-muted-foreground">Age</th>
                                  <th className="text-right p-2 text-muted-foreground">Avg Pts</th>
                                  <th className="text-right p-2 text-muted-foreground hidden sm:table-cell">Avg KOs</th>
                                  <th className="text-right p-2 text-muted-foreground hidden sm:table-cell">Seasons</th>
                                  <th className="text-right p-2 text-muted-foreground hidden md:table-cell">Players</th>
                                  <th className="text-right p-2 text-amber-500">Majors</th>
                                  <th className="text-right p-2 text-cyan-500">Apex</th>
                                </tr>
                              </thead>
                              <tbody>
                                {bracket.individualAges.map(ageData => (
                                  <tr key={ageData.age} className="border-b border-border/20 hover:bg-background/30">
                                    <td className="p-2 font-semibold text-foreground">{ageData.age}</td>
                                    <td className="p-2 text-right text-foreground">{ageData.avgPoints.toLocaleString()}</td>
                                    <td className="p-2 text-right text-muted-foreground hidden sm:table-cell">{ageData.avgKOs}</td>
                                    <td className="p-2 text-right text-muted-foreground hidden sm:table-cell">{ageData.count}</td>
                                    <td className="p-2 text-right text-muted-foreground hidden md:table-cell">{ageData.players.length}</td>
                                    <td className="p-2 text-right font-medium text-amber-500">{ageData.majors || '-'}</td>
                                    <td className="p-2 text-right font-medium text-cyan-500">{ageData.apexWins || '-'}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
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
        <div className="mt-4 p-3 bg-muted/30 rounded-lg text-xs text-muted-foreground">
          <p><strong>Insights:</strong> Click any bracket to expand individual ages. Shows average performance, major wins, and Apex titles won at each age. "Seasons" = total player-seasons in bracket.</p>
        </div>
      </div>
    );
  };

  const renderAgeAnalyticsSection = () => {
    return (
      <div className="space-y-4">
        {/* Sub-tabs for age analytics */}
        <div className="flex gap-1 flex-wrap bg-muted/30 p-1 rounded-lg">
          <button
            onClick={() => setAgeSubTab("peak-age")}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              ageSubTab === "peak-age"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Best Seasons
          </button>
          <button
            onClick={() => setAgeSubTab("age-brackets")}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              ageSubTab === "age-brackets"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Age Brackets
          </button>
          <button
            onClick={() => setAgeSubTab("champ-ages")}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              ageSubTab === "champ-ages"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Champion Ages
          </button>
          <button
            onClick={() => setAgeSubTab("first-major")}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              ageSubTab === "first-major"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            First Major
          </button>
          <button
            onClick={() => setAgeSubTab("longevity")}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              ageSubTab === "longevity"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Longevity
          </button>
        </div>

        {/* Render the appropriate sub-section */}
        {ageSubTab === "peak-age" && renderPeakAgeLeaderboard()}
        {ageSubTab === "age-brackets" && renderAgeBracketsLeaderboard()}
        {ageSubTab === "champ-ages" && renderChampAgesLeaderboard()}
        {ageSubTab === "first-major" && renderFirstMajorLeaderboard()}
        {ageSubTab === "longevity" && renderLongevityLeaderboard()}
      </div>
    );
  };

  const renderPeakAgeLeaderboard = () => {
    const data = leaderboards["peak-age"] as PlayerStats[];
    
    return (
      <div className="overflow-x-auto">
        <div className="mb-3 text-sm text-muted-foreground">
          Best individual seasons ranked by points, showing the player's age during that peak performance.
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold w-12">#</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold">Player</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold hidden sm:table-cell">Team</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold hidden md:table-cell">Season</th>
              <th className="text-right p-2 md:p-3 text-muted-foreground font-semibold">Points</th>
              <th className="text-right p-2 md:p-3 text-muted-foreground font-semibold">Age</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((player, index) => (
              <tr key={`${player.name}-${index}`} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="p-2 md:p-3 text-muted-foreground font-mono">{index + 1}</td>
                <td className="p-2 md:p-3">
                  <span 
                    onClick={() => onPlayerClick(player.name)}
                    className="text-primary hover:underline cursor-pointer font-medium"
                  >
                    {player.name}
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
                <td className="p-2 md:p-3 text-right font-bold text-foreground">{player.value.toLocaleString()}</td>
                <td className="p-2 md:p-3 text-right font-semibold text-cyan-400">{player.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 p-3 bg-muted/30 rounded-lg text-xs text-muted-foreground">
          <p><strong>Insights:</strong> Shows each player's best individual season by points, with their age at that time. Useful for identifying prime performance ages.</p>
        </div>
      </div>
    );
  };

  const renderFirstMajorLeaderboard = () => {
    const data = leaderboards["first-major"] as PlayerStats[];
    
    return (
      <div className="overflow-x-auto">
        <div className="mb-3 text-sm text-muted-foreground">
          The youngest age at which each player won their first major championship.
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold w-12">#</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold">Player</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold hidden sm:table-cell">Team</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold hidden md:table-cell">First Major</th>
              <th className="text-right p-2 md:p-3 text-muted-foreground font-semibold">Age</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((player, index) => (
              <tr key={`${player.name}-${index}`} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="p-2 md:p-3 text-muted-foreground font-mono">{index + 1}</td>
                <td className="p-2 md:p-3">
                  <span 
                    onClick={() => onPlayerClick(player.name)}
                    className="text-primary hover:underline cursor-pointer font-medium"
                  >
                    {player.name}
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
        <div className="mt-4 p-3 bg-muted/30 rounded-lg text-xs text-muted-foreground">
          <p><strong>Insights:</strong> Identifies "early bloomers" who won their first major at a young age vs "late bloomers" who broke through later in their careers.</p>
        </div>
      </div>
    );
  };

  const renderLongevityLeaderboard = () => {
    const data = leaderboards["longevity"] as PlayerStats[];
    
    return (
      <div className="overflow-x-auto">
        <div className="mb-3 text-sm text-muted-foreground">
          Players who maintained top 40 status across the widest age range, celebrating competitive longevity.
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold w-12">#</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold">Player</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold hidden sm:table-cell">Team</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold hidden md:table-cell">Career Span</th>
              <th className="text-right p-2 md:p-3 text-muted-foreground font-semibold">Years Active</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((player, index) => (
              <tr key={`${player.name}-${index}`} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="p-2 md:p-3 text-muted-foreground font-mono">{index + 1}</td>
                <td className="p-2 md:p-3">
                  <span 
                    onClick={() => onPlayerClick(player.name)}
                    className="text-primary hover:underline cursor-pointer font-medium"
                  >
                    {player.name}
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
        <div className="mt-4 p-3 bg-muted/30 rounded-lg text-xs text-muted-foreground">
          <p><strong>Insights:</strong> Celebrates players with the longest competitive careers, showing the age range they competed at the top level.</p>
        </div>
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
    ? "700-710" 
    : Array.from(selectedYears).sort().join(", ");

  const isTeamLeaderboard = (type: LeaderboardType) => 
    type === "team-points" || type === "team-championships" || type === "team-players" || type === "team-season-pts";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Leaderboards</h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Records from {selectedYears.size === allSeasons.length ? "seasons 700-710" : `season${selectedYears.size > 1 ? "s" : ""} ${yearRangeLabel}`}.
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
            <TabsTrigger value="legacy-score" className="flex-1 min-w-[100px] text-xs md:text-sm py-2 font-bold text-secondary">
              Legacy Score
            </TabsTrigger>
            <TabsTrigger value="single-points" className="flex-1 min-w-[100px] text-xs md:text-sm py-2">
              Season Pts
            </TabsTrigger>
            <TabsTrigger value="all-time-points" className="flex-1 min-w-[100px] text-xs md:text-sm py-2">
              Career Pts
            </TabsTrigger>
            <TabsTrigger value="avg-points" className="flex-1 min-w-[100px] text-xs md:text-sm py-2">
              Avg Pts
            </TabsTrigger>
            <TabsTrigger value="consistency" className="flex-1 min-w-[100px] text-xs md:text-sm py-2">
              Consistency
            </TabsTrigger>
            <TabsTrigger value="peak-season" className="flex-1 min-w-[100px] text-xs md:text-sm py-2">
              Peak Season
            </TabsTrigger>
            <TabsTrigger value="age-analytics" className="flex-1 min-w-[100px] text-xs md:text-sm py-2">
              Age Analytics
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
            <TabsTrigger value="avg-finish" className="flex-1 min-w-[100px] text-xs md:text-sm py-2">
              Avg Finish
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="space-y-2 mt-4">
          <p className="text-xs text-muted-foreground font-medium">Team Stats</p>
          <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
            <TabsTrigger value="team-points" className="flex-1 min-w-[100px] text-xs md:text-sm py-2">
              Total Points
            </TabsTrigger>
            <TabsTrigger value="team-season-pts" className="flex-1 min-w-[100px] text-xs md:text-sm py-2">
              Season Pts
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
          
          <TabsContent value="legacy-score" className="mt-0">
            {renderPlayerLeaderboard("legacy-score")}
          </TabsContent>
          <TabsContent value="single-points" className="mt-0">
            {renderPlayerLeaderboard("single-points")}
          </TabsContent>
          <TabsContent value="all-time-points" className="mt-0">
            {renderPlayerLeaderboard("all-time-points")}
          </TabsContent>
          <TabsContent value="avg-points" className="mt-0">
            {renderPlayerLeaderboard("avg-points")}
          </TabsContent>
          <TabsContent value="consistency" className="mt-0">
            {renderPlayerLeaderboard("consistency")}
          </TabsContent>
          <TabsContent value="peak-season" className="mt-0">
            {renderPlayerLeaderboard("peak-season")}
          </TabsContent>
          <TabsContent value="age-analytics" className="mt-0">
            {renderAgeAnalyticsSection()}
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
          <TabsContent value="avg-finish" className="mt-0">
            {renderPlayerLeaderboard("avg-finish")}
          </TabsContent>
          <TabsContent value="team-points" className="mt-0">
            {renderTeamLeaderboard("team-points")}
          </TabsContent>
          <TabsContent value="team-season-pts" className="mt-0">
            {renderTeamSeasonPtsLeaderboard()}
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
