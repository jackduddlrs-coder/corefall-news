import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check, X, RotateCcw, Trophy, Users, Award, Target } from "lucide-react";
import { toast } from "sonner";
import { pastStandings, majorWinners, fullMatches, apexDetailed } from "@/data/corefallData";

interface ImmaculateGridSectionProps {
  onPlayerClick: (name: string) => void;
}

interface PlayerData {
  teams: Set<string>;
  seasons: Set<string>;
  totalPoints: number;
  totalKOs: number;
  majorWins: number;
  apexAppearances: number;
  apexWins: number;
}

// Build player database dynamically from all data sources
function buildPlayerDatabase(): Record<string, PlayerData> {
  const players: Record<string, PlayerData> = {};
  
  // Get stats from pastStandings
  Object.entries(pastStandings).forEach(([season, standings]) => {
    standings.forEach(player => {
      if (!players[player.Name]) {
        players[player.Name] = { 
          teams: new Set(), 
          seasons: new Set(), 
          totalPoints: 0, 
          totalKOs: 0,
          majorWins: 0,
          apexAppearances: 0,
          apexWins: 0
        };
      }
      players[player.Name].teams.add(player.Team);
      players[player.Name].seasons.add(season);
      players[player.Name].totalPoints += player.Points;
      players[player.Name].totalKOs += player.KOs;
    });
  });
  
  // Count major wins
  majorWinners.forEach(({ winner }) => {
    if (!players[winner]) {
      players[winner] = { 
        teams: new Set(), 
        seasons: new Set(), 
        totalPoints: 0, 
        totalKOs: 0,
        majorWins: 0,
        apexAppearances: 0,
        apexWins: 0
      };
    }
    players[winner].majorWins++;
  });
  
  // Count Apex appearances from fullMatches
  Object.values(fullMatches).forEach(matches => {
    const playersInApex = new Set<string>();
    matches.forEach(match => {
      // Extract player names from match strings like "Player1 (4-2) vs Player2"
      const matchStr = match.match;
      const nameMatch = matchStr.match(/^([A-Za-z]+ [A-Za-z\-]+)/);
      if (nameMatch && players[nameMatch[1]]) {
        playersInApex.add(nameMatch[1]);
      }
      // Also extract second player
      const vsMatch = matchStr.match(/vs ([A-Za-z]+ [A-Za-z\-]+)/);
      if (vsMatch && players[vsMatch[1]]) {
        playersInApex.add(vsMatch[1]);
      }
    });
    playersInApex.forEach(name => {
      if (players[name]) {
        players[name].apexAppearances++;
      }
    });
  });
  
  // Count Apex wins from apexDetailed
  apexDetailed.forEach(({ win }) => {
    if (players[win]) {
      players[win].apexWins++;
    }
  });
  
  return players;
}

type CategoryType = "team" | "stat";

interface Category {
  type: CategoryType;
  value: string;
  label: string;
  check: (player: PlayerData) => boolean;
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function playerMatchesCategory(playerName: string, category: Category, playerDb: Record<string, PlayerData>): boolean {
  const player = playerDb[playerName];
  if (!player) return false;
  return category.check(player);
}

function findValidPlayers(rowCat: Category, colCat: Category, playerDb: Record<string, PlayerData>): string[] {
  return Object.keys(playerDb).filter(name => 
    playerMatchesCategory(name, rowCat, playerDb) && playerMatchesCategory(name, colCat, playerDb)
  );
}

function isValidGrid(rows: Category[], cols: Category[], playerDb: Record<string, PlayerData>): boolean {
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const validPlayers = findValidPlayers(rows[r], cols[c], playerDb);
      if (validPlayers.length === 0) {
        return false;
      }
    }
  }
  return true;
}

function generateCategories(playerDb: Record<string, PlayerData>): Category[] {
  // Get all unique teams from the data
  const allTeams = new Set<string>();
  Object.values(playerDb).forEach(player => {
    player.teams.forEach(team => allTeams.add(team));
  });
  
  const teamCategories: Category[] = Array.from(allTeams).map(team => ({
    type: "team" as const,
    value: team,
    label: team,
    check: (p: PlayerData) => p.teams.has(team)
  }));
  
  // Stat-based categories
  const statCategories: Category[] = [
    { type: "stat", value: "5000pts", label: "5000+ Pts", check: (p) => p.totalPoints >= 5000 },
    { type: "stat", value: "10000pts", label: "10000+ Pts", check: (p) => p.totalPoints >= 10000 },
    { type: "stat", value: "20kos", label: "20+ KOs", check: (p) => p.totalKOs >= 20 },
    { type: "stat", value: "50kos", label: "50+ KOs", check: (p) => p.totalKOs >= 50 },
    { type: "stat", value: "2majors", label: "2+ Majors", check: (p) => p.majorWins >= 2 },
    { type: "stat", value: "5majors", label: "5+ Majors", check: (p) => p.majorWins >= 5 },
    { type: "stat", value: "10majors", label: "10+ Majors", check: (p) => p.majorWins >= 10 },
    { type: "stat", value: "3apex", label: "3+ Apex App.", check: (p) => p.apexAppearances >= 3 },
    { type: "stat", value: "5apex", label: "5+ Apex App.", check: (p) => p.apexAppearances >= 5 },
    { type: "stat", value: "apexwinner", label: "Apex Winner", check: (p) => p.apexWins >= 1 },
    { type: "stat", value: "2apexwins", label: "2+ Apex Wins", check: (p) => p.apexWins >= 2 },
  ];
  
  // Filter stat categories to only include ones that have players
  const validStatCategories = statCategories.filter(cat => 
    Object.values(playerDb).some(p => cat.check(p))
  );
  
  return [...teamCategories, ...validStatCategories];
}

function generateGrid(allCategories: Category[], playerDb: Record<string, PlayerData>): { rows: Category[]; cols: Category[] } {
  const maxAttempts = 500;
  
  // Separate teams and stats
  const teamCats = allCategories.filter(c => c.type === "team");
  const statCats = allCategories.filter(c => c.type === "stat");
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const shuffledTeams = shuffleArray(teamCats);
    const shuffledStats = shuffleArray(statCats);
    
    // Try different configurations: mix of teams and stats
    const configs = [
      // 4 teams + 2 stats
      { rows: [shuffledTeams[0], shuffledTeams[1], shuffledStats[0]], cols: [shuffledTeams[2], shuffledTeams[3], shuffledStats[1]] },
      // 5 teams + 1 stat
      { rows: [shuffledTeams[0], shuffledTeams[1], shuffledTeams[2]], cols: [shuffledTeams[3], shuffledTeams[4], shuffledStats[0]] },
      // 6 teams (fallback)
      { rows: [shuffledTeams[0], shuffledTeams[1], shuffledTeams[2]], cols: [shuffledTeams[3], shuffledTeams[4], shuffledTeams[5]] },
      // 3 teams + 3 stats
      { rows: [shuffledTeams[0], shuffledStats[0], shuffledStats[1]], cols: [shuffledTeams[1], shuffledTeams[2], shuffledStats[2]] },
    ];
    
    for (const config of configs) {
      if (config.rows.every(Boolean) && config.cols.every(Boolean)) {
        const rows = shuffleArray(config.rows);
        const cols = shuffleArray(config.cols);
        if (isValidGrid(rows, cols, playerDb)) {
          return { rows, cols };
        }
      }
    }
  }
  
  // Ultimate fallback: just use teams
  const fallbackTeams = shuffleArray(allCategories.filter(c => c.type === "team")).slice(0, 6);
  return {
    rows: [fallbackTeams[0], fallbackTeams[1], fallbackTeams[2]],
    cols: [fallbackTeams[3], fallbackTeams[4], fallbackTeams[5]],
  };
}

interface CellState {
  guess: string;
  correct: boolean | null;
  locked: boolean;
  validAnswers: string[];
}

export const ImmaculateGridSection = ({ onPlayerClick }: ImmaculateGridSectionProps) => {
  // Build player database once
  const playerDb = useMemo(() => buildPlayerDatabase(), []);
  const allCategories = useMemo(() => generateCategories(playerDb), [playerDb]);
  const allPlayerNames = useMemo(() => Object.keys(playerDb), [playerDb]);
  
  const [grid, setGrid] = useState<{ rows: Category[]; cols: Category[] }>({ rows: [], cols: [] });
  const [cells, setCells] = useState<CellState[][]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [activeCell, setActiveCell] = useState<{ row: number; col: number } | null>(null);
  const [guessesRemaining, setGuessesRemaining] = useState(9);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Generate initial grid
  useEffect(() => {
    if (allCategories.length > 0) {
      setGrid(generateGrid(allCategories, playerDb));
    }
  }, [allCategories, playerDb]);

  // Initialize cells when grid changes
  useEffect(() => {
    if (grid.rows.length === 0 || grid.cols.length === 0) return;
    
    const newCells: CellState[][] = [];
    for (let r = 0; r < 3; r++) {
      const row: CellState[] = [];
      for (let c = 0; c < 3; c++) {
        row.push({
          guess: "",
          correct: null,
          locked: false,
          validAnswers: findValidPlayers(grid.rows[r], grid.cols[c], playerDb),
        });
      }
      newCells.push(row);
    }
    setCells(newCells);
  }, [grid, playerDb]);

  const handleCellClick = (row: number, col: number) => {
    if (gameOver || cells[row]?.[col]?.locked) return;
    setActiveCell({ row, col });
    setCurrentInput("");
    setSuggestions([]);
  };

  const handleInputChange = (value: string) => {
    setCurrentInput(value);
    
    if (value.length >= 2) {
      const matches = allPlayerNames.filter(name =>
        name.toLowerCase().includes(value.toLowerCase()) &&
        !cells.flat().some(cell => cell.guess === name)
      ).slice(0, 8);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const submitGuess = (playerName: string) => {
    if (!activeCell || gameOver) return;
    
    const { row, col } = activeCell;
    const cell = cells[row][col];
    
    // Check if player already used
    if (cells.flat().some(c => c.guess === playerName)) {
      toast.error("Player already used!");
      return;
    }
    
    const isCorrect = cell.validAnswers.includes(playerName);
    
    const newCells = cells.map((r, ri) => 
      r.map((c, ci) => 
        ri === row && ci === col 
          ? { ...c, guess: playerName, correct: isCorrect, locked: true }
          : c
      )
    );
    setCells(newCells);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      toast.success("Correct!");
    } else {
      toast.error("Incorrect!");
    }
    
    setGuessesRemaining(prev => prev - 1);
    setActiveCell(null);
    setCurrentInput("");
    setSuggestions([]);
    
    // Check if game over
    if (guessesRemaining <= 1 || newCells.flat().every(c => c.locked)) {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    const newGrid = generateGrid(allCategories, playerDb);
    setGrid(newGrid);
    setGuessesRemaining(9);
    setScore(0);
    setGameOver(false);
    setActiveCell(null);
    setCurrentInput("");
    setSuggestions([]);
  };

  const getCategoryIcon = (category: Category) => {
    if (category.type === "team") {
      return <Users className="h-3 w-3 mr-1 shrink-0" />;
    }
    if (category.value.includes("apex") || category.value.includes("Apex")) {
      return <Trophy className="h-3 w-3 mr-1 shrink-0" />;
    }
    if (category.value.includes("major")) {
      return <Award className="h-3 w-3 mr-1 shrink-0" />;
    }
    return <Target className="h-3 w-3 mr-1 shrink-0" />;
  };

  if (grid.rows.length === 0) {
    return <div className="text-center py-8">Loading grid...</div>;
  }

  return (
    <section className="py-8">
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            Corefall Grid
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Name a player who matches both the row and column criteria
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-6">
            {/* Stats */}
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Score: {score}/9</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Guesses: {guessesRemaining}</Badge>
              </div>
            </div>

            {/* Grid */}
            <div className="relative overflow-x-auto">
              {/* Column headers */}
              <div className="grid grid-cols-4 gap-1 mb-1">
                <div className="w-24 h-14" /> {/* Empty corner */}
                {grid.cols.map((col, i) => (
                  <div
                    key={`col-${i}`}
                    className="w-24 h-14 flex items-center justify-center text-[10px] font-medium text-foreground bg-muted/50 rounded-md px-1 text-center"
                  >
                    <span className="flex items-center">
                      {getCategoryIcon(col)}
                      <span className="break-words">{col.label}</span>
                    </span>
                  </div>
                ))}
              </div>

              {/* Rows with cells */}
              {grid.rows.map((row, rowIdx) => (
                <div key={`row-${rowIdx}`} className="grid grid-cols-4 gap-1 mb-1">
                  {/* Row header */}
                  <div className="w-24 h-24 flex items-center justify-center text-[10px] font-medium text-foreground bg-muted/50 rounded-md px-1 text-center">
                    <span className="flex items-center">
                      {getCategoryIcon(row)}
                      <span className="break-words">{row.label}</span>
                    </span>
                  </div>

                  {/* Grid cells */}
                  {grid.cols.map((_, colIdx) => {
                    const cell = cells[rowIdx]?.[colIdx];
                    const isActive = activeCell?.row === rowIdx && activeCell?.col === colIdx;

                    return (
                      <button
                        key={`cell-${rowIdx}-${colIdx}`}
                        onClick={() => handleCellClick(rowIdx, colIdx)}
                        disabled={cell?.locked || gameOver}
                        className={`
                          w-24 h-24 rounded-md border-2 transition-all text-xs font-medium
                          flex items-center justify-center p-1 text-center
                          ${isActive ? "border-primary bg-primary/10" : "border-border"}
                          ${cell?.locked && cell?.correct ? "bg-green-500/20 border-green-500" : ""}
                          ${cell?.locked && !cell?.correct ? "bg-red-500/20 border-red-500" : ""}
                          ${!cell?.locked && !gameOver ? "hover:border-primary/50 hover:bg-muted/30 cursor-pointer" : ""}
                          ${cell?.locked ? "cursor-default" : ""}
                        `}
                      >
                        {cell?.locked ? (
                          <div className="flex flex-col items-center gap-1">
                            {cell.correct ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <X className="h-4 w-4 text-red-500" />
                            )}
                            <span 
                              className="text-[10px] leading-tight cursor-pointer hover:underline"
                              onClick={(e) => {
                                e.stopPropagation();
                                onPlayerClick(cell.guess);
                              }}
                            >
                              {cell.guess.split(" ")[0]}
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">?</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Input area */}
            {activeCell && !gameOver && (
              <div className="w-full max-w-xs space-y-2">
                <Input
                  value={currentInput}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="Type player name..."
                  className="text-center"
                  autoFocus
                />
                {suggestions.length > 0 && (
                  <div className="bg-card border border-border rounded-md overflow-hidden max-h-48 overflow-y-auto">
                    {suggestions.map((name) => (
                      <button
                        key={name}
                        onClick={() => submitGuess(name)}
                        className="w-full px-3 py-2 text-sm text-left hover:bg-muted/50 transition-colors border-b border-border last:border-b-0"
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Game over */}
            {gameOver && (
              <div className="text-center space-y-4">
                <div className="text-lg font-semibold text-foreground">
                  Game Over! Final Score: {score}/9
                </div>
                <Button onClick={resetGame} variant="default" className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Play Again
                </Button>
              </div>
            )}

            {/* Reset button */}
            {!gameOver && (
              <Button onClick={resetGame} variant="outline" size="sm" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                New Grid
              </Button>
            )}

            {/* Legend */}
            <div className="text-xs text-muted-foreground text-center mt-4 space-y-1">
              <p>Click a cell, then type a player's name who fits both criteria</p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <span className="flex items-center gap-1"><Users className="h-3 w-3" /> Team</span>
                <span className="flex items-center gap-1"><Trophy className="h-3 w-3" /> Apex</span>
                <span className="flex items-center gap-1"><Award className="h-3 w-3" /> Majors</span>
                <span className="flex items-center gap-1"><Target className="h-3 w-3" /> Stats</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
