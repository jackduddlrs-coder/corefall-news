import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, HelpCircle, ArrowUp, ArrowDown, Check, User } from "lucide-react";
import { toast } from "sonner";
import { pastStandings, majorWinners } from "@/data/corefallData";

interface PlayerGuessSectionProps {
  onPlayerClick: (name: string) => void;
}

interface PlayerInfo {
  name: string;
  teams: string[];
  primaryTeam: string;
  seasons: number;
  totalPoints: number;
  totalKOs: number;
  majorWins: number;
  firstSeason: number;
}

function buildPlayerList(): PlayerInfo[] {
  const players: Record<string, {
    teams: Set<string>;
    seasons: Set<string>;
    totalPoints: number;
    totalKOs: number;
    majorWins: number;
  }> = {};
  
  // Get stats from pastStandings
  Object.entries(pastStandings).forEach(([season, standings]) => {
    standings.forEach(player => {
      if (!players[player.Name]) {
        players[player.Name] = { 
          teams: new Set(), 
          seasons: new Set(), 
          totalPoints: 0, 
          totalKOs: 0,
          majorWins: 0
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
    if (players[winner]) {
      players[winner].majorWins++;
    }
  });
  
  // Convert to array and filter to players with enough data
  return Object.entries(players)
    .filter(([_, p]) => p.seasons.size >= 2) // Only players with 2+ seasons
    .map(([name, p]) => {
      const seasonsArr = Array.from(p.seasons).map(Number).sort();
      // Find most common team
      const teamCounts: Record<string, number> = {};
      Object.entries(pastStandings).forEach(([season, standings]) => {
        if (p.seasons.has(season)) {
          const player = standings.find(s => s.Name === name);
          if (player) {
            teamCounts[player.Team] = (teamCounts[player.Team] || 0) + 1;
          }
        }
      });
      const primaryTeam = Object.entries(teamCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "";
      
      return {
        name,
        teams: Array.from(p.teams),
        primaryTeam,
        seasons: p.seasons.size,
        totalPoints: p.totalPoints,
        totalKOs: p.totalKOs,
        majorWins: p.majorWins,
        firstSeason: seasonsArr[0]
      };
    });
}

interface GuessResult {
  player: PlayerInfo;
  teamMatch: "correct" | "partial" | "wrong";
  seasonsMatch: "correct" | "higher" | "lower";
  pointsMatch: "correct" | "higher" | "lower";
  kosMatch: "correct" | "higher" | "lower";
  majorsMatch: "correct" | "higher" | "lower";
  firstSeasonMatch: "correct" | "higher" | "lower";
}

function compareGuess(guess: PlayerInfo, target: PlayerInfo): GuessResult {
  const teamMatch = guess.primaryTeam === target.primaryTeam 
    ? "correct" 
    : guess.teams.some(t => target.teams.includes(t)) 
      ? "partial" 
      : "wrong";
  
  const seasonsMatch = guess.seasons === target.seasons 
    ? "correct" 
    : guess.seasons > target.seasons ? "lower" : "higher";
  
  const pointsMatch = Math.abs(guess.totalPoints - target.totalPoints) < 500
    ? "correct" 
    : guess.totalPoints > target.totalPoints ? "lower" : "higher";
  
  const kosMatch = Math.abs(guess.totalKOs - target.totalKOs) < 5
    ? "correct" 
    : guess.totalKOs > target.totalKOs ? "lower" : "higher";
  
  const majorsMatch = guess.majorWins === target.majorWins
    ? "correct" 
    : guess.majorWins > target.majorWins ? "lower" : "higher";
  
  const firstSeasonMatch = guess.firstSeason === target.firstSeason
    ? "correct" 
    : guess.firstSeason > target.firstSeason ? "lower" : "higher";
  
  return { player: guess, teamMatch, seasonsMatch, pointsMatch, kosMatch, majorsMatch, firstSeasonMatch };
}

export const PlayerGuessSection = ({ onPlayerClick }: PlayerGuessSectionProps) => {
  const playerList = useMemo(() => buildPlayerList(), []);
  const allPlayerNames = useMemo(() => playerList.map(p => p.name), [playerList]);
  
  const [targetPlayer, setTargetPlayer] = useState<PlayerInfo | null>(null);
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  // Initialize game
  useEffect(() => {
    if (playerList.length > 0 && !targetPlayer) {
      const randomPlayer = playerList[Math.floor(Math.random() * playerList.length)];
      setTargetPlayer(randomPlayer);
    }
  }, [playerList, targetPlayer]);

  const handleInputChange = (value: string) => {
    setCurrentInput(value);
    
    if (value.length >= 2) {
      const guessedNames = guesses.map(g => g.player.name);
      const matches = allPlayerNames.filter(name =>
        name.toLowerCase().includes(value.toLowerCase()) &&
        !guessedNames.includes(name)
      ).slice(0, 6);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const submitGuess = (playerName: string) => {
    if (!targetPlayer || gameOver) return;
    
    const guessPlayer = playerList.find(p => p.name === playerName);
    if (!guessPlayer) {
      toast.error("Player not found!");
      return;
    }
    
    if (guesses.some(g => g.player.name === playerName)) {
      toast.error("Already guessed!");
      return;
    }
    
    const result = compareGuess(guessPlayer, targetPlayer);
    setGuesses(prev => [...prev, result]);
    setCurrentInput("");
    setSuggestions([]);
    
    if (guessPlayer.name === targetPlayer.name) {
      setWon(true);
      setGameOver(true);
      toast.success(`Correct! You got it in ${guesses.length + 1} guesses!`);
    } else if (guesses.length >= 7) {
      setGameOver(true);
      toast.error(`Game over! The player was ${targetPlayer.name}`);
    }
  };

  const resetGame = () => {
    const randomPlayer = playerList[Math.floor(Math.random() * playerList.length)];
    setTargetPlayer(randomPlayer);
    setGuesses([]);
    setCurrentInput("");
    setSuggestions([]);
    setGameOver(false);
    setWon(false);
  };

  const getCellClass = (match: "correct" | "partial" | "wrong" | "higher" | "lower") => {
    switch (match) {
      case "correct": return "bg-green-500/30 border-green-500";
      case "partial": return "bg-yellow-500/30 border-yellow-500";
      case "wrong": return "bg-red-500/30 border-red-500";
      case "higher": return "bg-red-500/30 border-red-500";
      case "lower": return "bg-red-500/30 border-red-500";
    }
  };

  const getArrow = (match: "correct" | "higher" | "lower") => {
    if (match === "correct") return <Check className="h-3 w-3 text-green-500" />;
    if (match === "higher") return <ArrowUp className="h-3 w-3 text-yellow-500" />;
    return <ArrowDown className="h-3 w-3 text-yellow-500" />;
  };

  if (!targetPlayer) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <section className="py-8">
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
            <User className="h-6 w-6 text-primary" />
            Guess the Player
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Guess the mystery Corefall player in 8 tries or less
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-6">
            {/* Stats */}
            <div className="flex gap-4 text-sm">
              <Badge variant="secondary">Guesses: {guesses.length}/8</Badge>
              {gameOver && won && <Badge className="bg-green-500">Won!</Badge>}
              {gameOver && !won && <Badge variant="destructive">Game Over</Badge>}
            </div>

            {/* Input area */}
            {!gameOver && (
              <div className="w-full max-w-md space-y-2">
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

            {/* Column headers */}
            {guesses.length > 0 && (
              <div className="w-full max-w-3xl overflow-x-auto">
                <div className="grid grid-cols-7 gap-1 text-[10px] font-medium text-muted-foreground mb-1 min-w-[600px]">
                  <div className="text-center">Player</div>
                  <div className="text-center">Team</div>
                  <div className="text-center">Seasons</div>
                  <div className="text-center">Points</div>
                  <div className="text-center">KOs</div>
                  <div className="text-center">Majors</div>
                  <div className="text-center">1st Season</div>
                </div>
              </div>
            )}

            {/* Guesses */}
            <div className="w-full max-w-3xl space-y-1 overflow-x-auto">
              {guesses.map((guess, i) => (
                <div key={i} className="grid grid-cols-7 gap-1 min-w-[600px]">
                  <div 
                    className={`p-2 rounded border text-center text-xs cursor-pointer hover:opacity-80 ${
                      guess.player.name === targetPlayer.name ? "bg-green-500/30 border-green-500" : "bg-muted/50 border-border"
                    }`}
                    onClick={() => onPlayerClick(guess.player.name)}
                  >
                    {guess.player.name.split(" ")[0]}
                  </div>
                  <div className={`p-2 rounded border text-center text-xs ${getCellClass(guess.teamMatch)}`}>
                    <div>{guess.player.primaryTeam}</div>
                    {guess.teamMatch === "partial" && <span className="text-[8px]">shared team</span>}
                  </div>
                  <div className={`p-2 rounded border text-center text-xs flex flex-col items-center justify-center ${getCellClass(guess.seasonsMatch)}`}>
                    <span>{guess.player.seasons}</span>
                    {getArrow(guess.seasonsMatch)}
                  </div>
                  <div className={`p-2 rounded border text-center text-xs flex flex-col items-center justify-center ${getCellClass(guess.pointsMatch)}`}>
                    <span>{guess.player.totalPoints.toLocaleString()}</span>
                    {getArrow(guess.pointsMatch)}
                  </div>
                  <div className={`p-2 rounded border text-center text-xs flex flex-col items-center justify-center ${getCellClass(guess.kosMatch)}`}>
                    <span>{guess.player.totalKOs}</span>
                    {getArrow(guess.kosMatch)}
                  </div>
                  <div className={`p-2 rounded border text-center text-xs flex flex-col items-center justify-center ${getCellClass(guess.majorsMatch)}`}>
                    <span>{guess.player.majorWins}</span>
                    {getArrow(guess.majorsMatch)}
                  </div>
                  <div className={`p-2 rounded border text-center text-xs flex flex-col items-center justify-center ${getCellClass(guess.firstSeasonMatch)}`}>
                    <span>{guess.player.firstSeason}</span>
                    {getArrow(guess.firstSeasonMatch)}
                  </div>
                </div>
              ))}
            </div>

            {/* Game over reveal */}
            {gameOver && !won && (
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">The player was:</p>
                <p 
                  className="text-xl font-bold text-primary cursor-pointer hover:underline"
                  onClick={() => onPlayerClick(targetPlayer.name)}
                >
                  {targetPlayer.name}
                </p>
              </div>
            )}

            {/* Reset/Play Again button */}
            <Button onClick={resetGame} variant={gameOver ? "default" : "outline"} size="sm" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              {gameOver ? "Play Again" : "New Player"}
            </Button>

            {/* Legend */}
            <div className="text-xs text-muted-foreground text-center space-y-1">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-green-500/30 border border-green-500" /> Correct
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-yellow-500/30 border border-yellow-500" /> Partial
                </span>
                <span className="flex items-center gap-1">
                  <ArrowUp className="h-3 w-3" /> Higher
                </span>
                <span className="flex items-center gap-1">
                  <ArrowDown className="h-3 w-3" /> Lower
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
