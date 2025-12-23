import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shuffle, RotateCcw, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { pastStandings, seasons, majorWinners, apexDetailed, trophyData, pastTeamStandings } from "@/data/corefallData";
import { tournamentNames } from "@/data/tournamentResults";

interface Category {
  name: string;
  items: string[];
  difficulty: 1 | 2 | 3 | 4;
  solved: boolean;
}

interface Puzzle {
  categories: Category[];
  remainingItems: string[];
}

const DIFFICULTY_COLORS: Record<number, string> = {
  1: "bg-yellow-500",
  2: "bg-green-500",
  3: "bg-blue-500",
  4: "bg-purple-500",
};

const DIFFICULTY_LABELS: Record<number, string> = {
  1: "Easy",
  2: "Medium",
  3: "Hard",
  4: "Tricky",
};

interface ConnectionsSectionProps {
  onPlayerClick: (name: string) => void;
}

// Helper to get unique players from standings
const getPlayersFromSeason = (seasonId: string): string[] => {
  const standings = pastStandings[seasonId];
  if (!standings) return [];
  return standings.slice(0, 20).map(p => p.Name);
};

// Helper to get team members from a season
const getTeamMembers = (seasonId: string, team: string): string[] => {
  const standings = pastStandings[seasonId];
  if (!standings) return [];
  return standings.filter(p => p.Team === team).map(p => p.Name);
};

// Generate category pools
const generateCategoryPools = (): { name: string; items: string[]; difficulty: 1 | 2 | 3 | 4 }[] => {
  const pools: { name: string; items: string[]; difficulty: 1 | 2 | 3 | 4 }[] = [];
  
  // === EASY (1) - Basic groupings ===
  
  // Tournament names
  const allTournaments = Object.values(tournamentNames).flat();
  const uniqueTournaments = [...new Set(allTournaments)];
  if (uniqueTournaments.length >= 4) {
    pools.push({
      name: "Major Tournament Names",
      items: uniqueTournaments,
      difficulty: 1
    });
  }

  // Team names (Easy)
  const allTeams = Object.values(pastTeamStandings).flatMap(s => s.map(t => t.team));
  const uniqueTeams = [...new Set(allTeams)];
  pools.push({
    name: "CTT Team Names",
    items: uniqueTeams.slice(0, 12),
    difficulty: 1
  });

  // First names starting with same letter
  const allPlayerNames = Object.values(pastStandings).flatMap(s => s.map(p => p.Name));
  const uniquePlayerNames = [...new Set(allPlayerNames)];
  
  // Players with "animal" first names
  const animalNames = uniquePlayerNames.filter(n => 
    ["Tiger", "Shark", "Horse", "Bat", "Rhino", "Duck", "Jungle"].some(a => n.startsWith(a))
  );
  if (animalNames.length >= 4) {
    pools.push({
      name: "Animal First Names",
      items: animalNames,
      difficulty: 1
    });
  }

  // Weather/Nature first names
  const weatherNames = uniquePlayerNames.filter(n => 
    ["Rain", "Snow", "Storm", "Cloud", "Freeze", "Cold", "Tempest", "Whiteout", "Spring"].some(w => n.startsWith(w))
  );
  if (weatherNames.length >= 4) {
    pools.push({
      name: "Weather First Names",
      items: weatherNames,
      difficulty: 1
    });
  }

  // === MEDIUM (2) - Achievement-based ===

  // Apex Winners
  const apexWinners = [...new Set(apexDetailed.map(a => a.win))];
  if (apexWinners.length >= 4) {
    pools.push({
      name: "Apex Champions",
      items: apexWinners,
      difficulty: 2
    });
  }

  // Apex Finalists (losers)
  const apexFinalists = [...new Set(apexDetailed.map(a => a.lose))];
  if (apexFinalists.length >= 4) {
    pools.push({
      name: "Apex Finalists (Lost Final)",
      items: apexFinalists,
      difficulty: 2
    });
  }

  // Season Stars
  const seasonStars = [...new Set(seasons.map(s => s.star).filter(Boolean))];
  if (seasonStars.length >= 4) {
    pools.push({
      name: "Season Stars",
      items: seasonStars as string[],
      difficulty: 2
    });
  }

  // CTT Winners (teams that won CTT)
  const cttWinners = [...new Set(seasons.map(s => s.ctt))];
  if (cttWinners.length >= 4) {
    pools.push({
      name: "CTT Winning Teams",
      items: cttWinners,
      difficulty: 2
    });
  }

  // Players with 5+ total trophies
  const multiTrophyPlayers = trophyData.filter(p => p.total >= 5).map(p => p.name);
  if (multiTrophyPlayers.length >= 4) {
    pools.push({
      name: "5+ Career Trophies",
      items: multiTrophyPlayers,
      difficulty: 2
    });
  }

  // Players with CTT wins
  const cttPlayerWinners = trophyData.filter(p => p.ctt >= 1).map(p => p.name);
  if (cttPlayerWinners.length >= 4) {
    pools.push({
      name: "CTT Champions",
      items: cttPlayerWinners,
      difficulty: 2
    });
  }

  // === HARD (3) - Team/Season specific ===

  // Team-based categories for multiple seasons
  const teams = ["Damage", "Qalf", "Dashlol", "Limium", "Gastro", "Cal Hal", "Engery", "Varcity", "AFE"];
  const seasonIds = ["708", "707", "706", "705"];
  
  teams.forEach(team => {
    seasonIds.forEach(seasonId => {
      const members = getTeamMembers(seasonId, team);
      if (members.length >= 4) {
        pools.push({
          name: `${team} Players (S${seasonId})`,
          items: members,
          difficulty: 3
        });
      }
    });
  });

  // Top 5 finishers per season
  seasonIds.forEach(seasonId => {
    const top5 = pastStandings[seasonId]?.slice(0, 5).map(p => p.Name) || [];
    if (top5.length >= 4) {
      pools.push({
        name: `Top 5 Season ${seasonId}`,
        items: top5,
        difficulty: 3
      });
    }
  });

  // Players who played for specific team (across seasons)
  teams.slice(0, 5).forEach(team => {
    const playersForTeam = new Set<string>();
    Object.values(pastStandings).forEach(season => {
      season.filter(p => p.Team === team).forEach(p => playersForTeam.add(p.Name));
    });
    if (playersForTeam.size >= 4) {
      pools.push({
        name: `Played for ${team}`,
        items: [...playersForTeam].slice(0, 8),
        difficulty: 3
      });
    }
  });

  // Players aged 30+ in a season
  const veteranPlayers = pastStandings["708"]?.filter(p => p.Age >= 30).map(p => p.Name) || [];
  if (veteranPlayers.length >= 4) {
    pools.push({
      name: "Age 30+ (Season 708)",
      items: veteranPlayers,
      difficulty: 3
    });
  }

  // Young players (under 25) in a season
  const youngPlayers = pastStandings["708"]?.filter(p => p.Age <= 24).map(p => p.Name) || [];
  if (youngPlayers.length >= 4) {
    pools.push({
      name: "Under 25 (Season 708)",
      items: youngPlayers,
      difficulty: 3
    });
  }

  // === TRICKY (4) - Obscure connections ===

  // Tournament-specific winners
  const tournaments = ["Heartland", "Chaos", "Heritage", "Descent", "Solar", "Nightmare", "Wind Breakers", "Malice", "Armageddon", "New Life"];
  tournaments.forEach(tournament => {
    const winners = majorWinners
      .filter(m => m.tournament === tournament)
      .map(m => m.winner);
    const uniqueWinners = [...new Set(winners)];
    if (uniqueWinners.length >= 4) {
      pools.push({
        name: `${tournament} Winners`,
        items: uniqueWinners,
        difficulty: 4
      });
    }
  });

  // Players with high KOs
  const highKOPlayers = pastStandings["708"]?.filter(p => p.KOs >= 10).map(p => p.Name) || [];
  if (highKOPlayers.length >= 4) {
    pools.push({
      name: "10+ KOs (Season 708)",
      items: highKOPlayers,
      difficulty: 4
    });
  }

  // Players with multiple Apex wins
  const multiApexWinners = apexDetailed.reduce((acc, a) => {
    acc[a.win] = (acc[a.win] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const twoTimeApex = Object.entries(multiApexWinners).filter(([_, count]) => count >= 2).map(([name]) => name);
  if (twoTimeApex.length >= 4) {
    pools.push({
      name: "2+ Apex Titles",
      items: twoTimeApex,
      difficulty: 4
    });
  }

  // Players who won Apex for specific teams
  const damageApexWinners = [...new Set(apexDetailed.filter(a => a.wTeam === "Damage").map(a => a.win))];
  if (damageApexWinners.length >= 4) {
    pools.push({
      name: "Won Apex for Damage",
      items: damageApexWinners,
      difficulty: 4
    });
  }

  const engeryApexWinners = [...new Set(apexDetailed.filter(a => a.wTeam === "Engery").map(a => a.win))];
  if (engeryApexWinners.length >= 4) {
    pools.push({
      name: "Won Apex for Engery",
      items: engeryApexWinners,
      difficulty: 4
    });
  }

  // Players who lost Apex finals
  const apexLosers = [...new Set(apexDetailed.map(a => a.lose))];
  if (apexLosers.length >= 4) {
    pools.push({
      name: "Lost Apex Finals",
      items: apexLosers,
      difficulty: 4
    });
  }

  // Players with exactly 1 major win
  const oneMajorPlayers = trophyData.filter(p => p.major === 1).map(p => p.name);
  if (oneMajorPlayers.length >= 4) {
    pools.push({
      name: "Exactly 1 Major Win",
      items: oneMajorPlayers,
      difficulty: 4
    });
  }

  // Players with Apex but no CTT
  const apexNoCTT = trophyData.filter(p => p.apex >= 1 && p.ctt === 0).map(p => p.name);
  if (apexNoCTT.length >= 4) {
    pools.push({
      name: "Apex Champion, No CTT",
      items: apexNoCTT,
      difficulty: 4
    });
  }

  // Apex winners at young age (under 28)
  const youngApexWinners = [...new Set(apexDetailed.filter(a => a.winAge < 28).map(a => a.win))];
  if (youngApexWinners.length >= 4) {
    pools.push({
      name: "Won Apex Under Age 28",
      items: youngApexWinners,
      difficulty: 4
    });
  }

  // Apex winners at older age (30+)
  const oldApexWinners = [...new Set(apexDetailed.filter(a => a.winAge >= 30).map(a => a.win))];
  if (oldApexWinners.length >= 4) {
    pools.push({
      name: "Won Apex Age 30+",
      items: oldApexWinners,
      difficulty: 4
    });
  }

  return pools;
};

// Check if categories have overlapping items
const hasOverlap = (categories: { items: string[] }[]): boolean => {
  const allItems = categories.flatMap(c => c.items);
  const uniqueItems = new Set(allItems);
  return allItems.length !== uniqueItems.size;
};

// Generate a valid puzzle
const generatePuzzle = (): Puzzle => {
  const pools = generateCategoryPools();
  
  // Shuffle pools
  const shuffledPools = [...pools].sort(() => Math.random() - 0.5);
  
  // Try to select 4 non-overlapping categories with different difficulties
  const selectedCategories: Category[] = [];
  const usedItems = new Set<string>();
  const targetDifficulties = [1, 2, 3, 4];
  
  for (const difficulty of targetDifficulties) {
    const poolsOfDifficulty = shuffledPools.filter(p => p.difficulty === difficulty);
    
    for (const pool of poolsOfDifficulty) {
      // Get 4 items that aren't used yet
      const availableItems = pool.items.filter(item => !usedItems.has(item));
      
      if (availableItems.length >= 4) {
        const selectedItems = availableItems.slice(0, 4);
        selectedItems.forEach(item => usedItems.add(item));
        
        selectedCategories.push({
          name: pool.name,
          items: selectedItems,
          difficulty: pool.difficulty,
          solved: false
        });
        break;
      }
    }
  }

  // If we don't have 4 categories, fill with any available
  while (selectedCategories.length < 4) {
    for (const pool of shuffledPools) {
      if (selectedCategories.some(c => c.name === pool.name)) continue;
      
      const availableItems = pool.items.filter(item => !usedItems.has(item));
      
      if (availableItems.length >= 4) {
        const selectedItems = availableItems.slice(0, 4);
        selectedItems.forEach(item => usedItems.add(item));
        
        selectedCategories.push({
          name: pool.name,
          items: selectedItems,
          difficulty: pool.difficulty,
          solved: false
        });
        break;
      }
    }
    
    // Prevent infinite loop
    if (selectedCategories.length < 4) {
      // Generate fallback categories from player names
      const allPlayers = getPlayersFromSeason("708");
      const unusedPlayers = allPlayers.filter(p => !usedItems.has(p));
      
      if (unusedPlayers.length >= 4) {
        const selectedItems = unusedPlayers.slice(0, 4);
        selectedItems.forEach(item => usedItems.add(item));
        
        selectedCategories.push({
          name: "Mystery Category",
          items: selectedItems,
          difficulty: 4,
          solved: false
        });
      } else {
        break;
      }
    }
  }

  // Sort by difficulty
  selectedCategories.sort((a, b) => a.difficulty - b.difficulty);

  // Create remaining items pool (shuffled)
  const allItems = selectedCategories.flatMap(c => c.items);
  const shuffledItems = [...allItems].sort(() => Math.random() - 0.5);

  return {
    categories: selectedCategories,
    remainingItems: shuffledItems
  };
};

export const ConnectionsSection = ({ onPlayerClick }: ConnectionsSectionProps) => {
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [shakeItems, setShakeItems] = useState(false);

  const MAX_MISTAKES = 4;

  const initGame = useCallback(() => {
    setPuzzle(generatePuzzle());
    setSelectedItems([]);
    setMistakes(0);
    setGameOver(false);
    setWon(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleItemClick = (item: string) => {
    if (gameOver) return;
    
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else if (selectedItems.length < 4) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const shuffleRemaining = () => {
    if (!puzzle) return;
    const shuffled = [...puzzle.remainingItems].sort(() => Math.random() - 0.5);
    setPuzzle({ ...puzzle, remainingItems: shuffled });
  };

  const checkSelection = () => {
    if (!puzzle || selectedItems.length !== 4) return;

    // Check if selection matches any unsolved category
    const matchingCategory = puzzle.categories.find(cat => 
      !cat.solved && 
      selectedItems.every(item => cat.items.includes(item)) &&
      cat.items.every(item => selectedItems.includes(item))
    );

    if (matchingCategory) {
      // Correct guess!
      const updatedCategories = puzzle.categories.map(cat =>
        cat.name === matchingCategory.name ? { ...cat, solved: true } : cat
      );
      
      const remainingItems = puzzle.remainingItems.filter(
        item => !matchingCategory.items.includes(item)
      );

      setPuzzle({
        categories: updatedCategories,
        remainingItems
      });
      setSelectedItems([]);

      // Check for win
      if (updatedCategories.every(cat => cat.solved)) {
        setWon(true);
        setGameOver(true);
      }
    } else {
      // Check for "one away"
      const oneAway = puzzle.categories.some(cat => 
        !cat.solved && 
        selectedItems.filter(item => cat.items.includes(item)).length === 3
      );

      // Wrong guess
      setShakeItems(true);
      setTimeout(() => setShakeItems(false), 500);
      
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);

      if (newMistakes >= MAX_MISTAKES) {
        setGameOver(true);
      }

      setSelectedItems([]);
    }
  };

  const solvedCategories = puzzle?.categories.filter(c => c.solved) || [];

  if (!puzzle) {
    return <div className="text-center text-muted-foreground">Loading puzzle...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Connections</h2>
        <p className="text-muted-foreground">Group 16 items into 4 hidden categories</p>
      </div>

      {/* Mistakes indicator */}
      <div className="flex justify-center gap-2 mb-4">
        <span className="text-sm text-muted-foreground mr-2">Mistakes remaining:</span>
        {Array.from({ length: MAX_MISTAKES }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-3 h-3 rounded-full transition-colors",
              i < (MAX_MISTAKES - mistakes) ? "bg-primary" : "bg-muted"
            )}
          />
        ))}
      </div>

      {/* Solved categories */}
      <div className="space-y-2 mb-4">
        {solvedCategories.map(category => (
          <Card
            key={category.name}
            className={cn(
              "p-4 text-center text-white",
              DIFFICULTY_COLORS[category.difficulty]
            )}
          >
            <div className="font-bold text-sm mb-1">{category.name}</div>
            <div className="text-sm opacity-90">
              {category.items.join(", ")}
            </div>
          </Card>
        ))}
      </div>

      {/* Game grid */}
      {!gameOver && (
        <div className={cn("grid grid-cols-4 gap-2 mb-4", shakeItems && "animate-pulse")}>
          {puzzle.remainingItems.map(item => (
            <Button
              key={item}
              variant={selectedItems.includes(item) ? "default" : "outline"}
              className={cn(
                "h-16 text-xs sm:text-sm font-medium whitespace-normal leading-tight p-2",
                selectedItems.includes(item) && "ring-2 ring-primary ring-offset-2"
              )}
              onClick={() => handleItemClick(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      )}

      {/* Game over - show all categories */}
      {gameOver && !won && (
        <div className="space-y-2 mb-4">
          {puzzle.categories.filter(c => !c.solved).map(category => (
            <Card
              key={category.name}
              className={cn(
                "p-4 text-center text-white opacity-70",
                DIFFICULTY_COLORS[category.difficulty]
              )}
            >
              <div className="font-bold text-sm mb-1">{category.name}</div>
              <div className="text-sm opacity-90">
                {category.items.join(", ")}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex justify-center gap-2 flex-wrap">
        {!gameOver && (
          <>
            <Button
              variant="outline"
              onClick={shuffleRemaining}
              className="gap-2"
            >
              <Shuffle className="h-4 w-4" />
              Shuffle
            </Button>
            <Button
              onClick={checkSelection}
              disabled={selectedItems.length !== 4}
              className="gap-2"
            >
              <Check className="h-4 w-4" />
              Submit
            </Button>
            <Button
              variant="ghost"
              onClick={() => setSelectedItems([])}
              disabled={selectedItems.length === 0}
            >
              Deselect All
            </Button>
          </>
        )}
        
        {gameOver && (
          <div className="text-center w-full">
            <div className={cn(
              "text-xl font-bold mb-4",
              won ? "text-green-500" : "text-red-500"
            )}>
              {won ? "🎉 You Won!" : "Game Over"}
            </div>
            <Button onClick={initGame} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Play Again
            </Button>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-8 pt-4 border-t">
        <div className="text-sm text-muted-foreground text-center mb-2">Difficulty</div>
        <div className="flex justify-center gap-4 flex-wrap">
          {[1, 2, 3, 4].map(d => (
            <div key={d} className="flex items-center gap-1">
              <div className={cn("w-3 h-3 rounded-full", DIFFICULTY_COLORS[d])} />
              <span className="text-xs text-muted-foreground">{DIFFICULTY_LABELS[d]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
