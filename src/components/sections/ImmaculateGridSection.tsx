import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check, X, RotateCcw, Trophy, Users } from "lucide-react";
import { toast } from "sonner";

interface ImmaculateGridSectionProps {
  onPlayerClick: (name: string) => void;
}

// Player database with team history
const playerDatabase: Record<string, { teams: string[]; seasons: string[]; achievements: string[] }> = {
  // Multi-team legends
  "Cascade Juner": { teams: ["Qalf", "Damage"], seasons: ["701", "702", "703", "704", "705", "706", "707", "708", "709"], achievements: ["Apex Champion", "Season Star", "1000+ Points"] },
  "Legend Reyes": { teams: ["Qalf", "Gastro"], seasons: ["701", "702", "703", "704", "705", "706", "707", "708", "709"], achievements: ["Apex Champion", "Season Star", "1000+ Points"] },
  "Brawler Kazi": { teams: ["Gastro", "CTT"], seasons: ["701", "702", "703", "704", "705", "706", "707", "708", "709"], achievements: ["Apex Champion", "10+ KOs"] },
  "Viper Montague": { teams: ["Gastro", "Engery", "Damage"], seasons: ["701", "702", "703", "704", "705", "706", "707", "708", "709"], achievements: ["Apex Champion", "10+ KOs"] },
  "Storm Valkyr": { teams: ["CTT", "Qalf"], seasons: ["703", "704", "705", "706", "707", "708", "709"], achievements: ["Apex Champion", "Season Star"] },
  "Blaze Harmon": { teams: ["CTT", "Damage", "AFE"], seasons: ["701", "702", "703", "704", "705", "706", "707", "708", "709"], achievements: ["Apex Champion", "1000+ Points"] },
  "Fury Tanaka": { teams: ["AFE", "Gastro"], seasons: ["702", "703", "704", "705", "706", "707", "708", "709"], achievements: ["Season Star", "10+ KOs"] },
  "Ghost Erikson": { teams: ["AFE", "Zemiga-Mar", "Juire"], seasons: ["701", "702", "703", "704", "705", "706", "707", "708", "709"], achievements: ["Apex Champion"] },
  "Thunder Okonkwo": { teams: ["Juire", "Damage"], seasons: ["704", "705", "706", "707", "708", "709"], achievements: ["1000+ Points"] },
  "Phantom Drake": { teams: ["Juire", "Qalf", "CTT"], seasons: ["701", "702", "703", "704", "705", "706"], achievements: ["Apex Champion", "Season Star"] },
  "Razor Chen": { teams: ["Damage", "CTT", "Gastro"], seasons: ["701", "702", "703", "704", "705", "706", "707", "708", "709"], achievements: ["10+ KOs"] },
  "Nova Sterling": { teams: ["Gastro", "Damage", "Engery"], seasons: ["703", "704", "705", "706", "707", "708", "709"], achievements: ["Season Star"] },
  "Titan Volkov": { teams: ["Engery", "Qalf"], seasons: ["701", "702", "703", "704", "705", "706", "707"], achievements: ["Apex Champion", "1000+ Points"] },
  "Hawk Mendez": { teams: ["Cal Hal", "AFE", "Damage"], seasons: ["705", "706", "707", "708", "709"], achievements: ["10+ KOs"] },
  "Bolt Nakamura": { teams: ["Cal Hal", "Zemiga-Mar", "CTT"], seasons: ["701", "702", "703", "704", "705", "706", "707", "708"], achievements: ["Season Star"] },
  "Ace Williams": { teams: ["Dashlol", "Juire"], seasons: ["701", "702", "703", "704", "705"], achievements: ["Apex Champion"] },
  "Striker Popov": { teams: ["Dashlol", "AFE", "Gastro"], seasons: ["703", "704", "705", "706", "707", "708", "709"], achievements: ["10+ KOs"] },
  "Venom Reyes": { teams: ["Zemiga-Mar", "Gastro", "Qalf"], seasons: ["701", "702", "703", "704", "705", "706"], achievements: ["Season Star", "1000+ Points"] },
  "Shadow Kim": { teams: ["Qalf", "Engery", "Cal Hal"], seasons: ["702", "703", "704", "705", "706", "707", "708"], achievements: ["Apex Champion"] },
  "Inferno Costa": { teams: ["CTT", "Juire", "Zemiga-Mar"], seasons: ["701", "702", "703", "704", "705", "706", "707", "708", "709"], achievements: ["1000+ Points", "10+ KOs"] },
  
  // Additional multi-team players for better grid coverage
  "Blitz Yamamoto": { teams: ["Qalf", "Gastro", "AFE"], seasons: ["702", "703", "704", "705", "706", "707"], achievements: ["Apex Champion", "10+ KOs"] },
  "Comet Lindgren": { teams: ["CTT", "Engery", "Dashlol"], seasons: ["703", "704", "705", "706", "707", "708"], achievements: ["Season Star"] },
  "Dagger Osei": { teams: ["Damage", "Juire", "Cal Hal"], seasons: ["701", "702", "703", "704", "705"], achievements: ["Apex Champion", "1000+ Points"] },
  "Eclipse Moreau": { teams: ["AFE", "CTT", "Qalf"], seasons: ["704", "705", "706", "707", "708", "709"], achievements: ["10+ KOs"] },
  "Fang Petrov": { teams: ["Zemiga-Mar", "Damage", "Gastro"], seasons: ["701", "702", "703", "704", "705", "706"], achievements: ["Season Star", "Apex Champion"] },
  "Granite Torres": { teams: ["Cal Hal", "Engery", "Juire"], seasons: ["705", "706", "707", "708", "709"], achievements: ["1000+ Points"] },
  "Haze Nilsson": { teams: ["Dashlol", "Qalf", "CTT"], seasons: ["702", "703", "704", "705", "706", "707"], achievements: ["Apex Champion"] },
  "Ion Vasquez": { teams: ["Gastro", "AFE", "Zemiga-Mar"], seasons: ["703", "704", "705", "706", "707", "708"], achievements: ["10+ KOs", "Season Star"] },
  "Jinx Kowalski": { teams: ["Engery", "Damage", "Cal Hal"], seasons: ["701", "702", "703", "704", "705"], achievements: ["Apex Champion"] },
  "Krypton Adeyemi": { teams: ["Juire", "Gastro", "Dashlol"], seasons: ["704", "705", "706", "707", "708", "709"], achievements: ["1000+ Points", "10+ KOs"] },
  "Lynx Bergman": { teams: ["CTT", "Zemiga-Mar", "AFE"], seasons: ["702", "703", "704", "705", "706"], achievements: ["Season Star"] },
  "Meteor Singh": { teams: ["Qalf", "Juire", "Engery"], seasons: ["703", "704", "705", "706", "707", "708"], achievements: ["Apex Champion", "1000+ Points"] },
  "Nebula Fernandez": { teams: ["Damage", "Cal Hal", "Gastro"], seasons: ["701", "702", "703", "704", "705", "706", "707"], achievements: ["10+ KOs"] },
  "Orbit Johansson": { teams: ["AFE", "Dashlol", "CTT"], seasons: ["705", "706", "707", "708", "709"], achievements: ["Season Star", "Apex Champion"] },
  "Pulse Nakamura": { teams: ["Zemiga-Mar", "Qalf", "Damage"], seasons: ["702", "703", "704", "705", "706", "707"], achievements: ["1000+ Points"] },
  "Quake Ivanov": { teams: ["Engery", "Juire", "AFE"], seasons: ["703", "704", "705", "706", "707", "708", "709"], achievements: ["10+ KOs", "Apex Champion"] },
  "Rift Olsen": { teams: ["Cal Hal", "CTT", "Zemiga-Mar"], seasons: ["701", "702", "703", "704", "705"], achievements: ["Season Star"] },
  "Spark Kimura": { teams: ["Dashlol", "Gastro", "Engery"], seasons: ["704", "705", "706", "707", "708"], achievements: ["Apex Champion", "1000+ Points"] },
  "Tempest Dubois": { teams: ["Juire", "Damage", "Qalf"], seasons: ["702", "703", "704", "705", "706", "707"], achievements: ["10+ KOs"] },
  "Umbra Kovalenko": { teams: ["Gastro", "Cal Hal", "Dashlol"], seasons: ["705", "706", "707", "708", "709"], achievements: ["Season Star", "Apex Champion"] },
  
  // Single-team players
  "Game Darwonn": { teams: ["Engery"], seasons: ["705", "706", "707", "708", "709"], achievements: [] },
  "Cross Exzona": { teams: ["Cal Hal"], seasons: ["706", "707", "708", "709"], achievements: [] },
  "Harsh Raii": { teams: ["AFE"], seasons: ["707", "708", "709"], achievements: [] },
  "Rocket Dalbale": { teams: ["Zemiga-Mar"], seasons: ["708", "709"], achievements: [] },
  "Horse Queanlend": { teams: ["Juire"], seasons: ["707", "708", "709"], achievements: [] },
  "Rain Lieryon": { teams: ["Dashlol"], seasons: ["701", "702", "703", "704", "705", "706", "707", "708", "709"], achievements: [] },
  "Whiteout Gar-Kiola": { teams: ["Juire"], seasons: ["705", "706", "707", "708", "709"], achievements: [] },
};

type CategoryType = "team" | "achievement";

interface Category {
  type: CategoryType;
  value: string;
  label: string;
}

const teamCategories: Category[] = [
  { type: "team", value: "Qalf", label: "Qalf" },
  { type: "team", value: "Gastro", label: "Gastro" },
  { type: "team", value: "CTT", label: "CTT" },
  { type: "team", value: "Damage", label: "Damage" },
  { type: "team", value: "AFE", label: "AFE" },
  { type: "team", value: "Juire", label: "Juire" },
  { type: "team", value: "Engery", label: "Engery" },
  { type: "team", value: "Cal Hal", label: "Cal Hal" },
  { type: "team", value: "Zemiga-Mar", label: "Zemiga-Mar" },
  { type: "team", value: "Dashlol", label: "Dashlol" },
];

const achievementCategories: Category[] = [
  { type: "achievement", value: "Apex Champion", label: "Apex Champion" },
  { type: "achievement", value: "Season Star", label: "Season Star" },
  { type: "achievement", value: "1000+ Points", label: "1000+ Pts" },
  { type: "achievement", value: "10+ KOs", label: "10+ KOs" },
];

const allCategories = [...teamCategories, ...achievementCategories];

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function isValidGrid(rows: Category[], cols: Category[]): boolean {
  // Check that every cell has at least one valid player
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const validPlayers = findValidPlayers(rows[r], cols[c]);
      if (validPlayers.length === 0) {
        return false;
      }
    }
  }
  return true;
}

function generateGrid(): { rows: Category[]; cols: Category[] } {
  const maxAttempts = 100;
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const shuffledTeams = shuffleArray(teamCategories);
    const shuffledAchievements = shuffleArray(achievementCategories);
    
    // Try different configurations
    const rows: Category[] = [
      shuffledTeams[0],
      shuffledTeams[1],
      shuffledAchievements[0] || shuffledTeams[2],
    ];
    
    const cols: Category[] = [
      shuffledTeams[3],
      shuffledTeams[4],
      shuffledAchievements[1] || shuffledTeams[5],
    ];
    
    const finalRows = shuffleArray(rows);
    const finalCols = shuffleArray(cols);
    
    if (isValidGrid(finalRows, finalCols)) {
      return { rows: finalRows, cols: finalCols };
    }
  }
  
  // Fallback: use only teams which are more likely to have overlaps
  const shuffledTeams = shuffleArray(teamCategories);
  return {
    rows: [shuffledTeams[0], shuffledTeams[1], shuffledTeams[2]],
    cols: [shuffledTeams[3], shuffledTeams[4], shuffledTeams[5]],
  };
}

function playerMatchesCategory(playerName: string, category: Category): boolean {
  const player = playerDatabase[playerName];
  if (!player) return false;
  
  if (category.type === "team") {
    return player.teams.includes(category.value);
  } else if (category.type === "achievement") {
    return player.achievements.includes(category.value);
  }
  return false;
}

function findValidPlayers(rowCat: Category, colCat: Category): string[] {
  return Object.keys(playerDatabase).filter(name => 
    playerMatchesCategory(name, rowCat) && playerMatchesCategory(name, colCat)
  );
}

interface CellState {
  guess: string;
  correct: boolean | null;
  locked: boolean;
  validAnswers: string[];
}

export const ImmaculateGridSection = ({ onPlayerClick }: ImmaculateGridSectionProps) => {
  const [grid, setGrid] = useState<{ rows: Category[]; cols: Category[] }>(generateGrid);
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
          validAnswers: findValidPlayers(grid.rows[r], grid.cols[c]),
        });
      }
      newCells.push(row);
    }
    setCells(newCells);
  }, [grid]);

  const handleCellClick = (row: number, col: number) => {
    if (gameOver || cells[row]?.[col]?.locked) return;
    setActiveCell({ row, col });
    setCurrentInput("");
    setSuggestions([]);
  };

  const handleInputChange = (value: string) => {
    setCurrentInput(value);
    
    if (value.length >= 2) {
      const matches = Object.keys(playerDatabase).filter(name =>
        name.toLowerCase().includes(value.toLowerCase()) &&
        !cells.flat().some(cell => cell.guess === name)
      ).slice(0, 5);
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
    setGrid(generateGrid());
    setGuessesRemaining(9);
    setScore(0);
    setGameOver(false);
    setActiveCell(null);
    setCurrentInput("");
    setSuggestions([]);
  };

  const getCategoryIcon = (category: Category) => {
    if (category.type === "team") {
      return <Users className="h-3 w-3 mr-1" />;
    }
    return <Trophy className="h-3 w-3 mr-1" />;
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
                      {getCategoryIcon(col)}
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
                      {getCategoryIcon(row)}
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
                  <div className="bg-card border border-border rounded-md overflow-hidden">
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
              <p className="flex items-center justify-center gap-4">
                <span className="flex items-center gap-1"><Users className="h-3 w-3" /> = Team</span>
                <span className="flex items-center gap-1"><Trophy className="h-3 w-3" /> = Achievement</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
