import React, { useState, useMemo } from "react";
import { pastStandings, pastTeamStandings, getTeamClass, seasons, majorWinners, apexDetailed, trophyData, fullMatches } from "@/data/corefallData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, ChevronRight } from "lucide-react";

interface LeaderboardsSectionProps {
  onPlayerClick: (name: string) => void;
  onTeamClick: (name: string) => void;
}

type LeaderboardType = "legacy-score" | "points" | "kos" | "averages" | "consistency" | "peak-season" | "age-analytics" | "appearances" | "misc" | "team-points" | "team-championships" | "team-players" | "team-season-pts";
type PointsSubTab = "season" | "career";
type KOsSubTab = "season" | "career" | "ko-rate" | "ko-specialist";
type AvgSubTab = "avg-points" | "avg-finish";
type AgeSubTab = "peak-age" | "age-brackets" | "champ-ages" | "debut-season" | "longevity" | "pods";
type MiscSubTab = "dominance" | "era-dominance" | "teammate-pairs" | "journeymen";

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
  const [pointsSubTab, setPointsSubTab] = useState<PointsSubTab>("season");
  const [kosSubTab, setKOsSubTab] = useState<KOsSubTab>("season");
  const [avgSubTab, setAvgSubTab] = useState<AvgSubTab>("avg-points");
  const [expandedAgeBracket, setExpandedAgeBracket] = useState<string | null>(null);
  const [expandedAge, setExpandedAge] = useState<number | null>(null);
  const [expandedPod, setExpandedPod] = useState<string | null>(null);
  const [miscSubTab, setMiscSubTab] = useState<MiscSubTab>("dominance");
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

    // Individual age stats for expandable brackets - now includes individual seasons
    const individualAgeStats: Record<number, { 
      totalPoints: number; 
      totalKOs: number; 
      count: number; 
      players: Set<string>; 
      majors: number; 
      apexWins: number;
      apexAppearances: number;
      seasons: { name: string; team: string; points: number; kos: number; season: string }[];
    }> = {};
    
    allPlayers.forEach(entry => {
      if (entry.age <= 0) return;
      if (!individualAgeStats[entry.age]) {
        individualAgeStats[entry.age] = { totalPoints: 0, totalKOs: 0, count: 0, players: new Set(), majors: 0, apexWins: 0, apexAppearances: 0, seasons: [] };
      }
      individualAgeStats[entry.age].totalPoints += entry.points;
      individualAgeStats[entry.age].totalKOs += entry.kos;
      individualAgeStats[entry.age].count++;
      individualAgeStats[entry.age].players.add(entry.name);
      individualAgeStats[entry.age].seasons.push({
        name: entry.name,
        team: entry.team,
        points: entry.points,
        kos: entry.kos,
        season: entry.season
      });
    });
    
    // Sort seasons within each age by points descending
    Object.values(individualAgeStats).forEach(stats => {
      stats.seasons.sort((a, b) => b.points - a.points);
    });

    // Count Apex appearances by age (top 16 finishers qualify for Apex)
    Object.entries(pastStandings).forEach(([season, players]) => {
      if (!selectedYears.has(season)) return;
      if (season === "709") {
        // For 709, use the qualified array from apexDetailed
        const apex709 = apexDetailed.find(a => a.year === 709);
        if (apex709?.qualified) {
          apex709.qualified.forEach(name => {
            const player = players.find(p => p.Name === name);
            const age = player?.Age || 0;
            if (age > 0) {
              if (!individualAgeStats[age]) {
                individualAgeStats[age] = { totalPoints: 0, totalKOs: 0, count: 0, players: new Set(), majors: 0, apexWins: 0, apexAppearances: 0, seasons: [] };
              }
              individualAgeStats[age].apexAppearances++;
            }
          });
        }
      } else {
        players.forEach(player => {
          if (player.Rank <= 16 && player.Age > 0) {
            if (!individualAgeStats[player.Age]) {
              individualAgeStats[player.Age] = { totalPoints: 0, totalKOs: 0, count: 0, players: new Set(), majors: 0, apexWins: 0, apexAppearances: 0, seasons: [] };
            }
            individualAgeStats[player.Age].apexAppearances++;
          }
        });
      }
    });

    // Count majors and apex wins by age
    majorWinners.forEach(win => {
      if (!selectedYears.has(win.year.toString())) return;
      const age = getPlayerAgeForSeason(win.winner, win.year);
      if (age > 0) {
        if (!individualAgeStats[age]) {
          individualAgeStats[age] = { totalPoints: 0, totalKOs: 0, count: 0, players: new Set(), majors: 0, apexWins: 0, apexAppearances: 0, seasons: [] };
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
      apexAppearances: number;
      individualAges: { age: number; avgPoints: number; avgKOs: number; count: number; players: string[]; majors: number; apexWins: number; apexAppearances: number; seasons: { name: string; team: string; points: number; kos: number; season: string }[] }[];
    }
    
    const ageBrackets: Record<string, AgeBracketData> = {
      "20-22": { totalPoints: 0, totalKOs: 0, count: 0, players: new Set(), majors: 0, apexWins: 0, apexAppearances: 0, individualAges: [] },
      "23-25": { totalPoints: 0, totalKOs: 0, count: 0, players: new Set(), majors: 0, apexWins: 0, apexAppearances: 0, individualAges: [] },
      "26-28": { totalPoints: 0, totalKOs: 0, count: 0, players: new Set(), majors: 0, apexWins: 0, apexAppearances: 0, individualAges: [] },
      "29-31": { totalPoints: 0, totalKOs: 0, count: 0, players: new Set(), majors: 0, apexWins: 0, apexAppearances: 0, individualAges: [] },
      "32-34": { totalPoints: 0, totalKOs: 0, count: 0, players: new Set(), majors: 0, apexWins: 0, apexAppearances: 0, individualAges: [] },
      "35+": { totalPoints: 0, totalKOs: 0, count: 0, players: new Set(), majors: 0, apexWins: 0, apexAppearances: 0, individualAges: [] }
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

    // Aggregate majors/apex/appearances by bracket and build individual ages
    Object.entries(individualAgeStats).forEach(([ageStr, stats]) => {
      const age = parseInt(ageStr);
      const bracket = getBracketForAge(age);
      if (bracket && ageBrackets[bracket]) {
        ageBrackets[bracket].majors += stats.majors;
        ageBrackets[bracket].apexWins += stats.apexWins;
        ageBrackets[bracket].apexAppearances += stats.apexAppearances;
        ageBrackets[bracket].individualAges.push({
          age,
          avgPoints: stats.count > 0 ? Math.round(stats.totalPoints / stats.count) : 0,
          avgKOs: stats.count > 0 ? Math.round((stats.totalKOs / stats.count) * 10) / 10 : 0,
          count: stats.count,
          players: Array.from(stats.players),
          majors: stats.majors,
          apexWins: stats.apexWins,
          apexAppearances: stats.apexAppearances,
          seasons: stats.seasons
        });
      }
    });

    // Sort individual ages within each bracket
    Object.values(ageBrackets).forEach(bracket => {
      bracket.individualAges.sort((a, b) => a.age - b.age);
    });
    
    const ageBracketStats: { bracket: string; avgPoints: number; avgKOs: number; seasons: number; uniquePlayers: number; majors: number; apexWins: number; apexAppearances: number; individualAges: { age: number; avgPoints: number; avgKOs: number; count: number; players: string[]; majors: number; apexWins: number; apexAppearances: number; seasons: { name: string; team: string; points: number; kos: number; season: string }[] }[] }[] = 
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
          apexAppearances: data.apexAppearances,
          individualAges: data.individualAges
        }));

    // Debut Season - youngest players by debut age (first season they appeared)
    const playerDebutAge: Record<string, { age: number; season: string; team: string }> = {};
    allPlayers.forEach(entry => {
      if (entry.age <= 0) return;
      const seasonNum = parseInt(entry.season);
      if (!playerDebutAge[entry.name] || seasonNum < parseInt(playerDebutAge[entry.name].season)) {
        playerDebutAge[entry.name] = { age: entry.age, season: entry.season, team: entry.team };
      }
    });
    
    const debutSeasons: PlayerStats[] = Object.entries(playerDebutAge)
      .map(([name, data]) => ({
        name,
        team: data.team,
        value: data.age,
        season: data.season,
        age: data.age
      }))
      .sort((a, b) => a.value - b.value) // Youngest debut first
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

    // Pods - group players by their debut era
    const podRanges: { pod: string; startYear: number; endYear: number }[] = [
      { pod: "701-702", startYear: 701, endYear: 702 },
      { pod: "703-704", startYear: 703, endYear: 704 },
      { pod: "705-706", startYear: 705, endYear: 706 },
      { pod: "707-708", startYear: 707, endYear: 708 },
      { pod: "709-710", startYear: 709, endYear: 710 },
      { pod: "711", startYear: 711, endYear: 711 }
    ];

    // Find each player's debut season
    const playerDebut: Record<string, number> = {};
    Object.entries(pastStandings).forEach(([season, players]) => {
      const yearNum = parseInt(season);
      players.forEach(player => {
        if (!playerDebut[player.Name] || yearNum < playerDebut[player.Name]) {
          playerDebut[player.Name] = yearNum;
        }
      });
    });

    // Get pod for a debut year
    const getPodForYear = (year: number): string => {
      const range = podRanges.find(r => year >= r.startYear && year <= r.endYear);
      return range?.pod || "Unknown";
    };

    // Aggregate pod statistics
    interface PodData {
      totalPoints: number;
      totalKOs: number;
      count: number;
      players: Set<string>;
      majors: number;
      apexWins: number;
      apexAppearances: number;
      playerStats: { name: string; team: string; points: number; kos: number; seasons: number; majors: number; apexWins: number; apexAppearances: number }[];
    }

    const podStats: Record<string, PodData> = {};
    podRanges.forEach(r => {
      podStats[r.pod] = { totalPoints: 0, totalKOs: 0, count: 0, players: new Set(), majors: 0, apexWins: 0, apexAppearances: 0, playerStats: [] };
    });

    // Aggregate player career stats by pod
    const playerCareerByPod: Record<string, { points: number; kos: number; seasons: number; team: string }> = {};
    
    allPlayers.forEach(entry => {
      const debut = playerDebut[entry.name];
      if (!debut) return;
      const pod = getPodForYear(debut);
      if (!podStats[pod]) return;

      podStats[pod].totalPoints += entry.points;
      podStats[pod].totalKOs += entry.kos;
      podStats[pod].count++;
      podStats[pod].players.add(entry.name);

      if (!playerCareerByPod[entry.name]) {
        playerCareerByPod[entry.name] = { points: 0, kos: 0, seasons: 0, team: getMostPointsTeam(entry.name) };
      }
      playerCareerByPod[entry.name].points += entry.points;
      playerCareerByPod[entry.name].kos += entry.kos;
      playerCareerByPod[entry.name].seasons++;
    });

    // Count majors/apex by pod and track apex appearances per player
    const playerMajorsByPod: Record<string, { majors: number; apexWins: number }> = {};
    majorWinners.forEach(win => {
      if (!selectedYears.has(win.year.toString())) return;
      if (!playerMajorsByPod[win.winner]) {
        playerMajorsByPod[win.winner] = { majors: 0, apexWins: 0 };
      }
      if (win.tournament === "Apex") {
        playerMajorsByPod[win.winner].apexWins++;
      } else {
        playerMajorsByPod[win.winner].majors++;
      }
    });

    // Count Apex appearances per player (for pod aggregation)
    const playerApexAppearances: Record<string, number> = {};
    Object.entries(pastStandings).forEach(([season, players]) => {
      if (!selectedYears.has(season)) return;
      if (season === "709") {
        const apex709 = apexDetailed.find(a => a.year === 709);
        if (apex709?.qualified) {
          apex709.qualified.forEach(name => {
            playerApexAppearances[name] = (playerApexAppearances[name] || 0) + 1;
          });
        }
      } else {
        players.forEach(player => {
          if (player.Rank <= 16) {
            playerApexAppearances[player.Name] = (playerApexAppearances[player.Name] || 0) + 1;
          }
        });
      }
    });

    // Build individual player stats within each pod
    Object.entries(playerCareerByPod).forEach(([name, stats]) => {
      const debut = playerDebut[name];
      if (!debut) return;
      const pod = getPodForYear(debut);
      if (!podStats[pod]) return;

      const playerMajors = playerMajorsByPod[name] || { majors: 0, apexWins: 0 };
      const playerApex = playerApexAppearances[name] || 0;
      podStats[pod].majors += playerMajors.majors;
      podStats[pod].apexWins += playerMajors.apexWins;
      podStats[pod].apexAppearances += playerApex;
      
      podStats[pod].playerStats.push({
        name,
        team: stats.team,
        points: stats.points,
        kos: stats.kos,
        seasons: stats.seasons,
        majors: playerMajors.majors,
        apexWins: playerMajors.apexWins,
        apexAppearances: playerApex
      });
    });

    // Sort players within each pod by points
    Object.values(podStats).forEach(pod => {
      pod.playerStats.sort((a, b) => b.points - a.points);
    });

    const podData: { pod: string; avgPoints: number; avgKOs: number; totalSeasons: number; uniquePlayers: number; majors: number; apexWins: number; apexAppearances: number; playerStats: { name: string; team: string; points: number; kos: number; seasons: number; majors: number; apexWins: number; apexAppearances: number }[] }[] = 
      podRanges.map(r => ({
        pod: r.pod,
        avgPoints: podStats[r.pod].count > 0 ? Math.round(podStats[r.pod].totalPoints / podStats[r.pod].count) : 0,
        avgKOs: podStats[r.pod].count > 0 ? Math.round((podStats[r.pod].totalKOs / podStats[r.pod].count) * 10) / 10 : 0,
        totalSeasons: podStats[r.pod].count,
        uniquePlayers: podStats[r.pod].players.size,
        majors: podStats[r.pod].majors,
        apexWins: podStats[r.pod].apexWins,
        apexAppearances: podStats[r.pod].apexAppearances,
        playerStats: podStats[r.pod].playerStats
      })).filter(p => p.uniquePlayers > 0);

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

    // KO Rate: KOs per 100 points (who's most "exciting")
    // Requires at least 2 seasons to avoid outliers
    const koRate: PlayerStats[] = Object.entries(playerTotalPoints)
      .filter(([name]) => playerSeasonCounts[name] >= 2)
      .map(([name, points]) => {
        const kos = playerTotalKOs[name] || 0;
        const rate = points > 0 ? Math.round((kos / points) * 1000) / 10 : 0; // KOs per 100 points, 1 decimal
        return {
          name,
          team: getMostPointsTeam(name),
          value: rate,
          season: `${kos} KOs / ${points} pts`
        };
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 50);

    // KO Specialists: Best single-season KOs relative to rank
    // Formula: kos * (41 - rank) / 40 to weight lower-ranked players with high KOs
    const koSpecialists: PlayerStats[] = [];
    Object.entries(pastStandings).forEach(([season, players]) => {
      if (!selectedYears.has(season)) return;
      players.forEach(player => {
        const adjustedScore = Math.round((player.KOs * (41 - player.Rank) / 40) * 10) / 10;
        koSpecialists.push({
          name: player.Name,
          team: player.Team,
          value: adjustedScore,
          season: `${season} - Rank #${player.Rank}, ${player.KOs} KOs`
        });
      });
    });
    koSpecialists.sort((a, b) => b.value - a.value);
    const topKoSpecialists = koSpecialists.slice(0, 50);

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

    // === MISC TAB CALCULATIONS ===

    // Season Dominance Score: Points gap between #1 and #2 each season
    const seasonDominance: { player: string; team: string; season: string; points: number; gap: number; runnerUp: string; runnerUpPoints: number }[] = [];
    Object.entries(pastStandings).forEach(([season, players]) => {
      if (!selectedYears.has(season)) return;
      const sorted = [...players].sort((a, b) => b.Points - a.Points);
      if (sorted.length >= 2) {
        seasonDominance.push({
          player: sorted[0].Name,
          team: sorted[0].Team,
          season,
          points: sorted[0].Points,
          gap: sorted[0].Points - sorted[1].Points,
          runnerUp: sorted[1].Name,
          runnerUpPoints: sorted[1].Points
        });
      }
    });
    seasonDominance.sort((a, b) => b.gap - a.gap);

    // Era Dominance: Who dominated each 2-3 season period
    const eraRanges = [
      { era: "701-703", years: [701, 702, 703] },
      { era: "704-706", years: [704, 705, 706] },
      { era: "707-709", years: [707, 708, 709] },
      { era: "710-711", years: [710, 711] }
    ];
    
    const eraDominance: { era: string; player: string; team: string; points: number; seasons: number }[] = [];
    eraRanges.forEach(({ era, years }) => {
      const eraPlayerPoints: Record<string, { points: number; seasons: number }> = {};
      years.forEach(year => {
        const season = year.toString();
        if (!selectedYears.has(season)) return;
        const players = pastStandings[season];
        if (players) {
          players.forEach(p => {
            if (!eraPlayerPoints[p.Name]) eraPlayerPoints[p.Name] = { points: 0, seasons: 0 };
            eraPlayerPoints[p.Name].points += p.Points;
            eraPlayerPoints[p.Name].seasons++;
          });
        }
      });
      
      // Get top player for this era
      const eraLeaders = Object.entries(eraPlayerPoints)
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.points - a.points)
        .slice(0, 5);
      
      eraLeaders.forEach(leader => {
        eraDominance.push({
          era,
          player: leader.name,
          team: getMostPointsTeam(leader.name),
          points: leader.points,
          seasons: leader.seasons
        });
      });
    });

    // Best Teammate Pairs: Two players from same team with combined highest points
    const teammatePairsBySeason: { player1: string; player2: string; team: string; combinedPoints: number; season: string }[] = [];
    Object.entries(pastStandings).forEach(([season, players]) => {
      if (!selectedYears.has(season)) return;
      
      // Group players by team
      const teamPlayers: Record<string, { name: string; points: number }[]> = {};
      players.forEach(p => {
        if (!teamPlayers[p.Team]) teamPlayers[p.Team] = [];
        teamPlayers[p.Team].push({ name: p.Name, points: p.Points });
      });
      
      // For each team with 2+ players, create pairs
      Object.entries(teamPlayers).forEach(([team, teamPlayerList]) => {
        if (teamPlayerList.length < 2) return;
        teamPlayerList.sort((a, b) => b.points - a.points);
        
        // Get the top pair (could iterate for all pairs but top pair is most relevant)
        for (let i = 0; i < teamPlayerList.length - 1; i++) {
          for (let j = i + 1; j < teamPlayerList.length; j++) {
            teammatePairsBySeason.push({
              player1: teamPlayerList[i].name,
              player2: teamPlayerList[j].name,
              team,
              combinedPoints: teamPlayerList[i].points + teamPlayerList[j].points,
              season
            });
          }
        }
      });
    });
    teammatePairsBySeason.sort((a, b) => b.combinedPoints - a.combinedPoints);
    const topTeammatePairs = teammatePairsBySeason.slice(0, 50);

    // Journeymen: Players who played for the most teams
    const playerTeams: Record<string, Set<string>> = {};
    allPlayers.forEach(p => {
      if (!playerTeams[p.name]) playerTeams[p.name] = new Set();
      playerTeams[p.name].add(p.team);
    });
    
    const journeymen: PlayerStats[] = Object.entries(playerTeams)
      .filter(([_, teams]) => teams.size >= 2)
      .map(([name, teams]) => ({
        name,
        team: getMostPointsTeam(name),
        value: teams.size,
        season: Array.from(teams).join(", ")
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
      "ko-rate": koRate,
      "ko-specialists": topKoSpecialists,
      "appearances": appearances,
      "avg-finish": avgFinish,
      "champ-ages": champAges,
      "debut-season": debutSeasons,
      "longevity": longevityLeaders,
      "pods": podData,
      "season-dominance": seasonDominance,
      "era-dominance": eraDominance,
      "teammate-pairs": topTeammatePairs,
      "journeymen": journeymen,
      "team-points": teamPoints,
      "team-championships": teamChamps,
      "team-players": teamPlayers,
      "team-season-pts": teamSeasonPts
    };
  }, [selectedYears]);

  const getTitle = (type: LeaderboardType): string => {
    switch (type) {
      case "legacy-score": return "All-Time Legacy Rankings";
      case "points": return getPointsSubTabTitle();
      case "kos": return getKOsSubTabTitle();
      case "averages": return getAvgSubTabTitle();
      case "consistency": return "Consistency Rating";
      case "peak-season": return "Peak Season Finder";
      case "age-analytics": return getAgeSubTabTitle();
      case "appearances": return "Most Apex Appearances";
      case "misc": return getMiscSubTabTitle();
      case "team-points": return "Team Total Points";
      case "team-championships": return "Team Championships";
      case "team-players": return "Top 40 Players Produced";
      case "team-season-pts": return "Best Team Season Points";
      default: return "";
    }
  };

  const getMiscSubTabTitle = (): string => {
    switch (miscSubTab) {
      case "dominance": return "Season Dominance Score";
      case "era-dominance": return "Era Dominance";
      case "teammate-pairs": return "Best Teammate Pairs";
      case "journeymen": return "Journeymen (Most Teams)";
      default: return "Misc";
    }
  };

  const getAgeSubTabTitle = (): string => {
    switch (ageSubTab) {
      case "peak-age": return "Best Seasons by Age";
      case "age-brackets": return "Performance by Age Bracket";
      case "champ-ages": return `Champion Ages (${(leaderboards["champ-ages"] as PlayerStats[]).length} titles)`;
      case "debut-season": return "Debut Season";
      case "longevity": return "Longevity Leaders";
      case "pods": return "Generation Pods";
      default: return "Age Analytics";
    }
  };

  const getPointsSubTabTitle = (): string => {
    return pointsSubTab === "season" ? "Most Single Season Points" : "All-Time Career Points";
  };

  const getKOsSubTabTitle = (): string => {
    switch (kosSubTab) {
      case "season": return "Most Single Season KOs";
      case "career": return "All-Time Career KOs";
      case "ko-rate": return "KO Rate (KOs per 100 Points)";
      case "ko-specialist": return "KO Specialists (Rank-Adjusted)";
      default: return "KOs";
    }
  };

  const getAvgSubTabTitle = (): string => {
    return avgSubTab === "avg-points" ? "Average Points Per Season" : "Best Average Finish";
  };

  const getValueLabel = (type: LeaderboardType): string => {
    switch (type) {
      case "legacy-score": return "Legacy Score";
      case "points": return "Points";
      case "kos": return "KOs";
      case "averages": return avgSubTab === "avg-points" ? "Avg Pts" : "Avg Rank";
      case "consistency": return "Rating";
      case "peak-season": return "Score";
      case "age-analytics": return ageSubTab === "age-brackets" ? "Avg Pts" : "Age";
      case "appearances": return "Seasons";
      case "team-points": return "Points";
      case "team-championships": return "Titles";
      case "team-players": return "Players";
      case "team-season-pts": return "Points";
      default: return "Value";
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

  const renderPlayerLeaderboard = (dataKey: string) => {
    const data = leaderboards[dataKey] as PlayerStats[];
    const showSeason = dataKey === "single-points" || dataKey === "single-kos" || dataKey === "avg-finish" || dataKey === "avg-points" || dataKey === "peak-season" || dataKey === "consistency";
    
    const getDataValueLabel = (): string => {
      if (dataKey === "avg-points") return "Avg Pts";
      if (dataKey === "avg-finish") return "Avg Rank";
      if (dataKey.includes("points")) return "Points";
      if (dataKey.includes("kos")) return "KOs";
      if (dataKey === "consistency") return "Rating";
      if (dataKey === "peak-season") return "Score";
      if (dataKey === "appearances") return "Seasons";
      return "Value";
    };

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
              <th className="text-right p-2 md:p-3 text-muted-foreground font-semibold">{getDataValueLabel()}</th>
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

  const renderPointsSection = () => {
    return (
      <div className="space-y-4">
        <div className="flex gap-1 flex-wrap bg-muted/30 p-1 rounded-lg">
          <button
            onClick={() => setPointsSubTab("season")}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              pointsSubTab === "season"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Season Pts
          </button>
          <button
            onClick={() => setPointsSubTab("career")}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              pointsSubTab === "career"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Career Pts
          </button>
        </div>
        {pointsSubTab === "season" && renderPlayerLeaderboard("single-points")}
        {pointsSubTab === "career" && renderPlayerLeaderboard("all-time-points")}
      </div>
    );
  };

  const renderKOsSection = () => {
    return (
      <div className="space-y-4">
        <div className="flex gap-1 flex-wrap bg-muted/30 p-1 rounded-lg">
          <button
            onClick={() => setKOsSubTab("season")}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              kosSubTab === "season"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Season KOs
          </button>
          <button
            onClick={() => setKOsSubTab("career")}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              kosSubTab === "career"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Career KOs
          </button>
          <button
            onClick={() => setKOsSubTab("ko-rate")}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              kosSubTab === "ko-rate"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            KO Rate
          </button>
          <button
            onClick={() => setKOsSubTab("ko-specialist")}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              kosSubTab === "ko-specialist"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Specialists
          </button>
        </div>
        {kosSubTab === "season" && renderPlayerLeaderboard("single-kos")}
        {kosSubTab === "career" && renderPlayerLeaderboard("all-time-kos")}
        {kosSubTab === "ko-rate" && renderPlayerLeaderboard("ko-rate")}
        {kosSubTab === "ko-specialist" && renderPlayerLeaderboard("ko-specialists")}
      </div>
    );
  };

  const renderAveragesSection = () => {
    return (
      <div className="space-y-4">
        <div className="flex gap-1 flex-wrap bg-muted/30 p-1 rounded-lg">
          <button
            onClick={() => setAvgSubTab("avg-points")}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              avgSubTab === "avg-points"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Avg Pts
          </button>
          <button
            onClick={() => setAvgSubTab("avg-finish")}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              avgSubTab === "avg-finish"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Avg Finish
          </button>
        </div>
        {avgSubTab === "avg-points" && renderPlayerLeaderboard("avg-points")}
        {avgSubTab === "avg-finish" && renderPlayerLeaderboard("avg-finish")}
      </div>
    );
  };

  const renderAgeBracketsLeaderboard = () => {
    const data = leaderboards["age-brackets"] as { bracket: string; avgPoints: number; avgKOs: number; seasons: number; uniquePlayers: number; majors: number; apexWins: number; apexAppearances: number; individualAges: { age: number; avgPoints: number; avgKOs: number; count: number; players: string[]; majors: number; apexWins: number; apexAppearances: number; seasons: { name: string; team: string; points: number; kos: number; season: string }[] }[] }[];
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
              <th className="text-right p-2 md:p-3 text-purple-500 font-semibold hidden sm:table-cell">Apex App</th>
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
                    onClick={() => {
                      setExpandedAgeBracket(isExpanded ? null : bracket.bracket);
                      setExpandedAge(null); // Reset expanded age when changing bracket
                    }}
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
                    <td className="p-2 md:p-3 text-right font-semibold text-purple-500 hidden sm:table-cell">{bracket.apexAppearances}</td>
                  </tr>
                  {isExpanded && bracket.individualAges.length > 0 && (
                    <tr>
                      <td colSpan={9} className="p-0 bg-muted/20">
                        <div className="p-3">
                          <div className="text-xs text-muted-foreground mb-2 font-medium">
                            Individual Ages in {bracket.bracket} - Click an age to see all seasons
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-xs">
                              <thead>
                                <tr className="border-b border-border/30">
                                  <th className="text-left p-2 text-muted-foreground w-6"></th>
                                  <th className="text-left p-2 text-muted-foreground">Age</th>
                                  <th className="text-right p-2 text-muted-foreground">Avg Pts</th>
                                  <th className="text-right p-2 text-muted-foreground hidden sm:table-cell">Avg KOs</th>
                                  <th className="text-right p-2 text-muted-foreground hidden sm:table-cell">Seasons</th>
                                  <th className="text-right p-2 text-muted-foreground hidden md:table-cell">Players</th>
                                  <th className="text-right p-2 text-amber-500">Majors</th>
                                  <th className="text-right p-2 text-cyan-500">Apex</th>
                                  <th className="text-right p-2 text-purple-500 hidden sm:table-cell">App</th>
                                </tr>
                              </thead>
                              <tbody>
                                {bracket.individualAges.map(ageData => {
                                  const isAgeExpanded = expandedAge === ageData.age;
                                  return (
                                    <React.Fragment key={ageData.age}>
                                      <tr 
                                        className={`border-b border-border/20 hover:bg-background/30 cursor-pointer ${isAgeExpanded ? 'bg-background/40' : ''}`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setExpandedAge(isAgeExpanded ? null : ageData.age);
                                        }}
                                      >
                                        <td className="p-2 text-muted-foreground">
                                          {isAgeExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                                        </td>
                                        <td className="p-2 font-semibold text-foreground">{ageData.age}</td>
                                        <td className="p-2 text-right text-foreground">{ageData.avgPoints.toLocaleString()}</td>
                                        <td className="p-2 text-right text-muted-foreground hidden sm:table-cell">{ageData.avgKOs}</td>
                                        <td className="p-2 text-right text-muted-foreground hidden sm:table-cell">{ageData.count}</td>
                                        <td className="p-2 text-right text-muted-foreground hidden md:table-cell">{ageData.players.length}</td>
                                        <td className="p-2 text-right font-medium text-amber-500">{ageData.majors || '-'}</td>
                                        <td className="p-2 text-right font-medium text-cyan-500">{ageData.apexWins || '-'}</td>
                                        <td className="p-2 text-right font-medium text-purple-500 hidden sm:table-cell">{ageData.apexAppearances || '-'}</td>
                                      </tr>
                                      {isAgeExpanded && ageData.seasons.length > 0 && (
                                        <tr>
                                          <td colSpan={9} className="p-0 bg-background/20">
                                            <div className="p-2 pl-6">
                                              <div className="text-xs text-muted-foreground mb-1 font-medium">
                                                All seasons at age {ageData.age} (sorted by points)
                                              </div>
                                              <div className="max-h-[200px] overflow-y-auto">
                                                <table className="w-full text-xs">
                                                  <thead>
                                                    <tr className="border-b border-border/20">
                                                      <th className="text-left p-1 text-muted-foreground w-8">#</th>
                                                      <th className="text-left p-1 text-muted-foreground">Player</th>
                                                      <th className="text-left p-1 text-muted-foreground hidden sm:table-cell">Team</th>
                                                      <th className="text-right p-1 text-muted-foreground hidden sm:table-cell">Season</th>
                                                      <th className="text-right p-1 text-muted-foreground">Pts</th>
                                                      <th className="text-right p-1 text-muted-foreground hidden sm:table-cell">KOs</th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    {ageData.seasons.map((s, idx) => (
                                                      <tr key={`${s.name}-${s.season}-${idx}`} className="border-b border-border/10 hover:bg-muted/20">
                                                        <td className="p-1 text-muted-foreground font-mono">{idx + 1}</td>
                                                        <td className="p-1">
                                                          <span 
                                                            onClick={(e) => {
                                                              e.stopPropagation();
                                                              onPlayerClick(s.name);
                                                            }}
                                                            className="text-primary hover:underline cursor-pointer"
                                                          >
                                                            {s.name}
                                                          </span>
                                                        </td>
                                                        <td className="p-1 hidden sm:table-cell">
                                                          <span 
                                                            onClick={(e) => {
                                                              e.stopPropagation();
                                                              onTeamClick(s.team);
                                                            }}
                                                            className={`text-xs px-1 py-0.5 rounded cursor-pointer ${getTeamClass(s.team)}`}
                                                          >
                                                            {s.team}
                                                          </span>
                                                        </td>
                                                        <td className="p-1 text-right text-muted-foreground hidden sm:table-cell">{s.season}</td>
                                                        <td className="p-1 text-right font-semibold text-foreground">{s.points.toLocaleString()}</td>
                                                        <td className="p-1 text-right text-muted-foreground hidden sm:table-cell">{s.kos}</td>
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
          <p><strong>Insights:</strong> Click any bracket to expand individual ages. Click an age to see every season at that age, sorted by points. "Seasons" = total player-seasons.</p>
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
            onClick={() => setAgeSubTab("debut-season")}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              ageSubTab === "debut-season"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Debut Season
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
          <button
            onClick={() => setAgeSubTab("pods")}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              ageSubTab === "pods"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Pods
          </button>
        </div>

        {/* Render the appropriate sub-section */}
        {ageSubTab === "peak-age" && renderPeakAgeLeaderboard()}
        {ageSubTab === "age-brackets" && renderAgeBracketsLeaderboard()}
        {ageSubTab === "champ-ages" && renderChampAgesLeaderboard()}
        {ageSubTab === "debut-season" && renderDebutSeasonLeaderboard()}
        {ageSubTab === "longevity" && renderLongevityLeaderboard()}
        {ageSubTab === "pods" && renderPodsLeaderboard()}
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

  const renderDebutSeasonLeaderboard = () => {
    const data = leaderboards["debut-season"] as PlayerStats[];
    
    return (
      <div className="overflow-x-auto">
        <div className="mb-3 text-sm text-muted-foreground">
          The 50 youngest debut seasons - players ranked by age when they first appeared in the top 40.
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold w-12">#</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold">Player</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold hidden sm:table-cell">Team</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold hidden md:table-cell">Season</th>
              <th className="text-right p-2 md:p-3 text-muted-foreground font-semibold">Debut Age</th>
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
          <p><strong>Insights:</strong> Shows the youngest players to break into the top 40. Early debuts often indicate exceptional talent, though some late bloomers have gone on to become legends.</p>
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


  const renderPodsLeaderboard = () => {
    const data = leaderboards["pods"] as { pod: string; avgPoints: number; avgKOs: number; totalSeasons: number; uniquePlayers: number; majors: number; apexWins: number; apexAppearances: number; playerStats: { name: string; team: string; points: number; kos: number; seasons: number; majors: number; apexWins: number; apexAppearances: number }[] }[];
    const maxAvgPoints = Math.max(...data.map(d => d.avgPoints), 1);

    return (
      <div className="overflow-x-auto">
        <div className="mb-3 text-sm text-muted-foreground">
          Players grouped by their debut era. Click any pod to see individual players who debuted in that era.
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold w-8"></th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold">Pod</th>
              <th className="text-right p-2 md:p-3 text-muted-foreground font-semibold">Avg Pts</th>
              <th className="text-right p-2 md:p-3 text-muted-foreground font-semibold hidden sm:table-cell">Avg KOs</th>
              <th className="text-right p-2 md:p-3 text-muted-foreground font-semibold hidden md:table-cell">Seasons</th>
              <th className="text-right p-2 md:p-3 text-muted-foreground font-semibold">Players</th>
              <th className="text-right p-2 md:p-3 text-amber-500 font-semibold">Majors</th>
              <th className="text-right p-2 md:p-3 text-cyan-500 font-semibold">Apex</th>
              <th className="text-right p-2 md:p-3 text-purple-500 font-semibold hidden sm:table-cell">Apex App</th>
            </tr>
          </thead>
          <tbody>
            {data.map((pod) => {
              const percentage = (pod.avgPoints / maxAvgPoints) * 100;
              const isExpanded = expandedPod === pod.pod;
              
              return (
                <React.Fragment key={pod.pod}>
                  <tr 
                    className={`border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer ${isExpanded ? 'bg-muted/30' : ''}`}
                    onClick={() => setExpandedPod(isExpanded ? null : pod.pod)}
                  >
                    <td className="p-2 md:p-3 text-muted-foreground">
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </td>
                    <td className="p-2 md:p-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{pod.pod}</span>
                        <div className="flex-1 max-w-[100px] h-2 bg-muted rounded-full overflow-hidden hidden lg:block">
                          <div 
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-2 md:p-3 text-right font-bold text-foreground">{pod.avgPoints.toLocaleString()}</td>
                    <td className="p-2 md:p-3 text-right text-muted-foreground hidden sm:table-cell">{pod.avgKOs}</td>
                    <td className="p-2 md:p-3 text-right text-muted-foreground hidden md:table-cell">{pod.totalSeasons.toLocaleString()}</td>
                    <td className="p-2 md:p-3 text-right text-muted-foreground">{pod.uniquePlayers}</td>
                    <td className="p-2 md:p-3 text-right font-semibold text-amber-500">{pod.majors}</td>
                    <td className="p-2 md:p-3 text-right font-semibold text-cyan-500">{pod.apexWins}</td>
                    <td className="p-2 md:p-3 text-right font-semibold text-purple-500 hidden sm:table-cell">{pod.apexAppearances}</td>
                  </tr>
                  {isExpanded && pod.playerStats.length > 0 && (
                    <tr>
                      <td colSpan={9} className="p-0 bg-muted/20">
                        <div className="p-3">
                          <div className="text-xs text-muted-foreground mb-2 font-medium">
                            Players who debuted in {pod.pod}
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-xs">
                              <thead>
                                <tr className="border-b border-border/30">
                                  <th className="text-left p-2 text-muted-foreground">#</th>
                                  <th className="text-left p-2 text-muted-foreground">Player</th>
                                  <th className="text-left p-2 text-muted-foreground hidden sm:table-cell">Team</th>
                                  <th className="text-right p-2 text-muted-foreground">Points</th>
                                  <th className="text-right p-2 text-muted-foreground hidden sm:table-cell">KOs</th>
                                  <th className="text-right p-2 text-muted-foreground hidden md:table-cell">Seasons</th>
                                  <th className="text-right p-2 text-amber-500">Majors</th>
                                  <th className="text-right p-2 text-cyan-500">Apex</th>
                                  <th className="text-right p-2 text-purple-500 hidden sm:table-cell">App</th>
                                </tr>
                              </thead>
                              <tbody>
                                {pod.playerStats.map((player, idx) => (
                                  <tr key={player.name} className="border-b border-border/20 hover:bg-background/30">
                                    <td className="p-2 text-muted-foreground font-mono">{idx + 1}</td>
                                    <td className="p-2">
                                      <span 
                                        onClick={(e) => { e.stopPropagation(); onPlayerClick(player.name); }}
                                        className="text-primary hover:underline cursor-pointer font-medium"
                                      >
                                        {player.name}
                                      </span>
                                    </td>
                                    <td className="p-2 hidden sm:table-cell">
                                      <span 
                                        onClick={(e) => { e.stopPropagation(); onTeamClick(player.team); }}
                                        className={`text-xs px-1.5 py-0.5 rounded cursor-pointer hover:opacity-80 ${getTeamClass(player.team)}`}
                                      >
                                        {player.team}
                                      </span>
                                    </td>
                                    <td className="p-2 text-right font-semibold text-foreground">{player.points.toLocaleString()}</td>
                                    <td className="p-2 text-right text-muted-foreground hidden sm:table-cell">{player.kos}</td>
                                    <td className="p-2 text-right text-muted-foreground hidden md:table-cell">{player.seasons}</td>
                                    <td className="p-2 text-right font-medium text-amber-500">{player.majors || '-'}</td>
                                    <td className="p-2 text-right font-medium text-cyan-500">{player.apexWins || '-'}</td>
                                    <td className="p-2 text-right font-medium text-purple-500 hidden sm:table-cell">{player.apexAppearances || '-'}</td>
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
          <p><strong>Insights:</strong> Compares different "generations" of players based on when they debuted. Click any pod to see which players belong to that era and their career stats.</p>
        </div>
      </div>
    );
  };

  const renderMiscSection = () => {
    return (
      <div className="space-y-4">
        {/* Sub-tabs for misc analytics */}
        <div className="flex gap-1 flex-wrap bg-muted/30 p-1 rounded-lg">
          <button
            onClick={() => setMiscSubTab("dominance")}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              miscSubTab === "dominance"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Dominance
          </button>
          <button
            onClick={() => setMiscSubTab("era-dominance")}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              miscSubTab === "era-dominance"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Era Dominance
          </button>
          <button
            onClick={() => setMiscSubTab("teammate-pairs")}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              miscSubTab === "teammate-pairs"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Best Pairs
          </button>
          <button
            onClick={() => setMiscSubTab("journeymen")}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              miscSubTab === "journeymen"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Journeymen
          </button>
        </div>

        {miscSubTab === "dominance" && renderSeasonDominanceLeaderboard()}
        {miscSubTab === "era-dominance" && renderEraDominanceLeaderboard()}
        {miscSubTab === "teammate-pairs" && renderTeammatePairsLeaderboard()}
        {miscSubTab === "journeymen" && renderJourneymenLeaderboard()}
      </div>
    );
  };

  const renderSeasonDominanceLeaderboard = () => {
    const data = leaderboards["season-dominance"] as { player: string; team: string; season: string; points: number; gap: number; runnerUp: string; runnerUpPoints: number }[];
    
    return (
      <div className="overflow-x-auto">
        <div className="mb-3 text-sm text-muted-foreground">
          Seasons ranked by how dominant the #1 player was - the point gap over #2.
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold w-12">#</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold">Player</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold hidden sm:table-cell">Team</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold hidden md:table-cell">Season</th>
              <th className="text-right p-2 md:p-3 text-muted-foreground font-semibold hidden lg:table-cell">Points</th>
              <th className="text-right p-2 md:p-3 text-muted-foreground font-semibold">Gap</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold hidden xl:table-cell">Over</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={`${entry.player}-${entry.season}`} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="p-2 md:p-3 text-muted-foreground font-mono">{index + 1}</td>
                <td className="p-2 md:p-3">
                  <span
                    onClick={() => onPlayerClick(entry.player)}
                    className="text-primary hover:underline cursor-pointer font-medium"
                  >
                    {entry.player}
                  </span>
                </td>
                <td className="p-2 md:p-3 hidden sm:table-cell">
                  <span 
                    onClick={() => onTeamClick(entry.team)}
                    className={`text-xs px-2 py-1 rounded cursor-pointer hover:opacity-80 transition-opacity ${getTeamClass(entry.team)}`}
                  >
                    {entry.team}
                  </span>
                </td>
                <td className="p-2 md:p-3 text-muted-foreground hidden md:table-cell">{entry.season}</td>
                <td className="p-2 md:p-3 text-right text-muted-foreground hidden lg:table-cell">{entry.points.toLocaleString()}</td>
                <td className="p-2 md:p-3 text-right font-bold text-emerald-400">+{entry.gap.toLocaleString()}</td>
                <td className="p-2 md:p-3 hidden xl:table-cell">
                  <span 
                    onClick={() => onPlayerClick(entry.runnerUp)}
                    className="text-primary hover:underline cursor-pointer text-sm"
                  >
                    {entry.runnerUp}
                  </span>
                  <span className="text-muted-foreground text-xs ml-1">({entry.runnerUpPoints.toLocaleString()})</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 p-3 bg-muted/30 rounded-lg text-xs text-muted-foreground">
          <p><strong>Insights:</strong> Higher gaps indicate seasons where one player truly dominated the competition, putting significant distance between themselves and the field.</p>
        </div>
      </div>
    );
  };

  const renderEraDominanceLeaderboard = () => {
    const data = leaderboards["era-dominance"] as { era: string; player: string; team: string; points: number; seasons: number }[];
    
    // Group by era for display
    const eras = ["701-703", "704-706", "707-709", "710-711"];
    
    return (
      <div className="overflow-x-auto">
        <div className="mb-3 text-sm text-muted-foreground">
          Who dominated each multi-season era? Top 5 point scorers per era shown.
        </div>
        <div className="space-y-6">
          {eras.map(era => {
            const eraData = data.filter(d => d.era === era);
            if (eraData.length === 0) return null;
            
            return (
              <div key={era} className="bg-muted/20 rounded-lg p-3">
                <h4 className="font-semibold text-foreground mb-2">Era: {era}</h4>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="text-left p-2 text-muted-foreground font-semibold w-10">#</th>
                      <th className="text-left p-2 text-muted-foreground font-semibold">Player</th>
                      <th className="text-left p-2 text-muted-foreground font-semibold hidden sm:table-cell">Team</th>
                      <th className="text-right p-2 text-muted-foreground font-semibold">Total Pts</th>
                      <th className="text-right p-2 text-muted-foreground font-semibold hidden md:table-cell">Seasons</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eraData.map((entry, idx) => (
                      <tr key={entry.player} className="border-b border-border/20 hover:bg-muted/20">
                        <td className="p-2 text-muted-foreground font-mono">{idx + 1}</td>
                        <td className="p-2">
                          <span
                            onClick={() => onPlayerClick(entry.player)}
                            className="text-primary hover:underline cursor-pointer font-medium"
                          >
                            {entry.player}
                          </span>
                        </td>
                        <td className="p-2 hidden sm:table-cell">
                          <span 
                            onClick={() => onTeamClick(entry.team)}
                            className={`text-xs px-1.5 py-0.5 rounded cursor-pointer ${getTeamClass(entry.team)}`}
                          >
                            {entry.team}
                          </span>
                        </td>
                        <td className="p-2 text-right font-bold text-foreground">{entry.points.toLocaleString()}</td>
                        <td className="p-2 text-right text-muted-foreground hidden md:table-cell">{entry.seasons}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
        <div className="mt-4 p-3 bg-muted/30 rounded-lg text-xs text-muted-foreground">
          <p><strong>Insights:</strong> Shows who accumulated the most points during each defined era. "Seasons" indicates how many of the era's seasons that player competed in.</p>
        </div>
      </div>
    );
  };

  const renderTeammatePairsLeaderboard = () => {
    const data = leaderboards["teammate-pairs"] as { player1: string; player2: string; team: string; combinedPoints: number; season: string }[];
    
    return (
      <div className="overflow-x-auto">
        <div className="mb-3 text-sm text-muted-foreground">
          Best single-season teammate combinations by combined points.
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold w-12">#</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold">Players</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold hidden sm:table-cell">Team</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold hidden md:table-cell">Season</th>
              <th className="text-right p-2 md:p-3 text-muted-foreground font-semibold">Combined</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={`${entry.player1}-${entry.player2}-${entry.season}`} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="p-2 md:p-3 text-muted-foreground font-mono">{index + 1}</td>
                <td className="p-2 md:p-3">
                  <span
                    onClick={() => onPlayerClick(entry.player1)}
                    className="text-primary hover:underline cursor-pointer font-medium"
                  >
                    {entry.player1}
                  </span>
                  <span className="text-muted-foreground mx-1">&</span>
                  <span
                    onClick={() => onPlayerClick(entry.player2)}
                    className="text-primary hover:underline cursor-pointer font-medium"
                  >
                    {entry.player2}
                  </span>
                </td>
                <td className="p-2 md:p-3 hidden sm:table-cell">
                  <span 
                    onClick={() => onTeamClick(entry.team)}
                    className={`text-xs px-2 py-1 rounded cursor-pointer hover:opacity-80 transition-opacity ${getTeamClass(entry.team)}`}
                  >
                    {entry.team}
                  </span>
                </td>
                <td className="p-2 md:p-3 text-muted-foreground hidden md:table-cell">{entry.season}</td>
                <td className="p-2 md:p-3 text-right font-bold text-foreground">{entry.combinedPoints.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 p-3 bg-muted/30 rounded-lg text-xs text-muted-foreground">
          <p><strong>Insights:</strong> Highlights the most productive teammate duos in a single season. Great chemistry and team depth often leads to high combined totals.</p>
        </div>
      </div>
    );
  };

  const renderJourneymenLeaderboard = () => {
    const data = leaderboards["journeymen"] as PlayerStats[];
    
    return (
      <div className="overflow-x-auto">
        <div className="mb-3 text-sm text-muted-foreground">
          Players who competed for the most different teams throughout their careers.
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold w-12">#</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold">Player</th>
              <th className="text-right p-2 md:p-3 text-muted-foreground font-semibold w-16">Teams</th>
              <th className="text-left p-2 md:p-3 text-muted-foreground font-semibold">Team History</th>
            </tr>
          </thead>
          <tbody>
            {data.map((player, index) => {
              const teamList = player.season?.split(", ") || [];
              return (
                <tr key={player.name} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="p-2 md:p-3 text-muted-foreground font-mono">{index + 1}</td>
                  <td className="p-2 md:p-3">
                    <span
                      onClick={() => onPlayerClick(player.name)}
                      className="text-primary hover:underline cursor-pointer font-medium"
                    >
                      {player.name}
                    </span>
                  </td>
                  <td className="p-2 md:p-3 text-right font-bold text-foreground">{player.value}</td>
                  <td className="p-2 md:p-3">
                    <div className="flex flex-wrap gap-1">
                      {teamList.map((team, idx) => (
                        <span 
                          key={`${player.name}-${team}-${idx}`}
                          onClick={() => onTeamClick(team)}
                          className={`text-xs px-1.5 py-0.5 rounded cursor-pointer hover:opacity-80 transition-opacity ${getTeamClass(team)}`}
                        >
                          {team}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="mt-4 p-3 bg-muted/30 rounded-lg text-xs text-muted-foreground">
          <p><strong>Insights:</strong> "Journeymen" are players who moved between multiple organizations during their careers. This can reflect adaptability, team needs, or career reinvention.</p>
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
            <TabsTrigger value="points" className="flex-1 min-w-[100px] text-xs md:text-sm py-2">
              Points
            </TabsTrigger>
            <TabsTrigger value="kos" className="flex-1 min-w-[100px] text-xs md:text-sm py-2">
              KOs
            </TabsTrigger>
            <TabsTrigger value="averages" className="flex-1 min-w-[100px] text-xs md:text-sm py-2">
              Average
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
            <TabsTrigger value="appearances" className="flex-1 min-w-[100px] text-xs md:text-sm py-2">
              Appearances
            </TabsTrigger>
            <TabsTrigger value="misc" className="flex-1 min-w-[100px] text-xs md:text-sm py-2">
              Misc
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
          <TabsContent value="points" className="mt-0">
            {renderPointsSection()}
          </TabsContent>
          <TabsContent value="kos" className="mt-0">
            {renderKOsSection()}
          </TabsContent>
          <TabsContent value="averages" className="mt-0">
            {renderAveragesSection()}
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
          <TabsContent value="appearances" className="mt-0">
            {renderPlayerLeaderboard("appearances")}
          </TabsContent>
          <TabsContent value="misc" className="mt-0">
            {renderMiscSection()}
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
