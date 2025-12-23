import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check, X, RotateCcw, Trophy, Users } from "lucide-react";
import { toast } from "sonner";
import { pastStandings } from "@/data/corefallData";

interface ImmaculateGridSectionProps {
  onPlayerClick: (name: string) => void;
}

interface PlayerData {
  teams: Set<string>;
  seasons: Set<string>;
  totalPoints: number;
  totalKOs: number;
}

// Build player database dynamically from pastStandings
function buildPlayerDatabase(): Record<string, PlayerData> {
  const players: Record<string, PlayerData> = {};
  
  Object.entries(pastStandings).forEach(([season, standings]) => {
    standings.forEach(player => {
      if (!players[player.Name]) {
        players[player.Name] = { teams: new Set(), seasons: new Set(), totalPoints: 0, totalKOs: 0 };
      }
      players[player.Name].teams.add(player.Team);
      players[player.Name].seasons.add(season);
      players[player.Name].totalPoints += player.Points;
      players[player.Name].totalKOs += player.KOs;
    });
  });
  
  return players;
}

type CategoryType = "team";

interface Category {
  type: CategoryType;
  value: string;
  label: string;
}

// Get all unique teams from the data that have crossover players
function getTeamCategories(playerDb: Record<string, PlayerData>): Category[] {
  // Find players who played for multiple teams
  const multiTeamPlayers = Object.entries(playerDb).filter(([_, p]) => p.teams.size >= 2);
  const teamsWithCrossover = new Set<string>();
  multiTeamPlayers.forEach(([_, player]) => {
    player.teams.forEach(team => teamsWithCrossover.add(team));
  });
  
  return Array.from(teamsWithCrossover)
    .sort()
    .map(team => ({ type: "team" as const, value: team, label: team }));
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
  return player.teams.has(category.value);
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

function generateGrid(teamCategories: Category[], playerDb: Record<string, PlayerData>): { rows: Category[]; cols: Category[] } {
  const maxAttempts = 200;
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const shuffled = shuffleArray(teamCategories);
    if (shuffled.length < 6) continue;
    
    const rows: Category[] = [shuffled[0], shuffled[1], shuffled[2]];
    const cols: Category[] = [shuffled[3], shuffled[4], shuffled[5]];
    
    if (isValidGrid(rows, cols, playerDb)) {
      return { rows, cols };
    }
  }
  
  // Fallback: just use first 6 teams
  const fallbackTeams = teamCategories.slice(0, 6);
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
  const teamCategories = useMemo(() => getTeamCategories(playerDb), [playerDb]);
  const allPlayerNames = useMemo(() => Object.keys(playerDb), [playerDb]);
  
  const [grid, setGrid] = useState<{ rows: Category[]; cols: Category[] }>(() => 
    generateGrid(teamCategories, playerDb)
  );
  const [cells, setCells] = useState<CellState[][]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [activeCell, setActiveCell] = useState<{ row: number; col: number } | null>(null);
  const [guessesRemaining, setGuessesRemaining] = useState(9);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Initialize cells when grid changes
  useEffect(() => {
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
    
    const newCells = [...cells];
    newCells[row][col] = {
      ...cell,
      guess: playerName,
      correct: isCorrect,
      locked: true,
    };
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
    setGrid(generateGrid(teamCategories, playerDb));
    setGuessesRemaining(9);
    setScore(0);
    setGameOver(false);
    setActiveCell(null);
    setCurrentInput("");
    setSuggestions([]);
  };

  return (
    <section className="py-8">
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            Corefall Grid
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Name a player who has played for both the row and column teams
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
            <div className="relative">
              {/* Column headers */}
              <div className="grid grid-cols-4 gap-1 mb-1">
                <div className="w-20 h-12" /> {/* Empty corner */}
                {grid.cols.map((col, i) => (
                  <div
                    key={`col-${i}`}
                    className="w-20 h-12 flex items-center justify-center text-xs font-medium text-foreground bg-muted/50 rounded-md px-1 text-center"
                  >
                    <span className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {col.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Rows with cells */}
              {grid.rows.map((row, rowIdx) => (
                <div key={`row-${rowIdx}`} className="grid grid-cols-4 gap-1 mb-1">
                  {/* Row header */}
                  <div className="w-20 h-20 flex items-center justify-center text-xs font-medium text-foreground bg-muted/50 rounded-md px-1 text-center">
                    <span className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {row.label}
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
                          w-20 h-20 rounded-md border-2 transition-all text-xs font-medium
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
            <div className="text-xs text-muted-foreground text-center mt-4">
              <p>Click a cell, then type a player's name who has played for both teams</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
