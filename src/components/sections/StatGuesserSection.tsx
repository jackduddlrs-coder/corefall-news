import { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BarChart3, RotateCcw, ArrowUp, ArrowDown, CheckCircle2 } from "lucide-react";
import { pastStandings, trophyData } from "@/data/corefallData";
import { toast } from "@/hooks/use-toast";

interface PlayerStats {
  name: string;
  careerPoints: number;
  careerKOs: number;
  majorWins: number;
  totalTrophies: number;
  seasonsPlayed: number;
  firstSeason: number;
}

type StatCategory = "careerPoints" | "careerKOs" | "majorWins" | "totalTrophies" | "seasonsPlayed";

interface StatGuesserSectionProps {
  onPlayerClick: (name: string) => void;
}

const categoryLabels: Record<StatCategory, string> = {
  careerPoints: "Career Points",
  careerKOs: "Career KOs",
  majorWins: "Major Wins",
  totalTrophies: "Total Trophies",
  seasonsPlayed: "Seasons Played"
};

// Calculate all player stats
function calculateAllPlayerStats(): PlayerStats[] {
  const playerMap = new Map<string, PlayerStats>();
  
  // Aggregate from pastStandings
  Object.entries(pastStandings).forEach(([season, standings]) => {
    const seasonNum = parseInt(season);
    standings.forEach(player => {
      const existing = playerMap.get(player.Name);
      if (existing) {
        existing.careerPoints += player.Points;
        existing.careerKOs += player.KOs;
        existing.seasonsPlayed += 1;
        existing.firstSeason = Math.min(existing.firstSeason, seasonNum);
      } else {
        playerMap.set(player.Name, {
          name: player.Name,
          careerPoints: player.Points,
          careerKOs: player.KOs,
          majorWins: 0,
          totalTrophies: 0,
          seasonsPlayed: 1,
          firstSeason: seasonNum
        });
      }
    });
  });
  
  // Add trophy data
  trophyData.forEach(td => {
    const player = playerMap.get(td.name);
    if (player) {
      player.majorWins = td.major;
      player.totalTrophies = td.total;
    }
  });
  
  // Filter to players with meaningful stats
  return Array.from(playerMap.values())
    .filter(p => p.careerPoints >= 1000 || p.totalTrophies > 0);
}

function getRandomCategory(): StatCategory {
  const categories: StatCategory[] = ["careerPoints", "careerKOs", "majorWins", "totalTrophies", "seasonsPlayed"];
  return categories[Math.floor(Math.random() * categories.length)];
}

export const StatGuesserSection = ({ onPlayerClick }: StatGuesserSectionProps) => {
  const allPlayers = useMemo(() => calculateAllPlayerStats(), []);
  
  const [currentPlayer, setCurrentPlayer] = useState<PlayerStats | null>(null);
  const [category, setCategory] = useState<StatCategory>("careerPoints");
  const [guess, setGuess] = useState("");
  const [guessHistory, setGuessHistory] = useState<{ value: number; hint: "higher" | "lower" | "correct" }[]>([]);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const startNewRound = useCallback(() => {
    const randomPlayer = allPlayers[Math.floor(Math.random() * allPlayers.length)];
    const randomCategory = getRandomCategory();
    
    // Make sure the stat is meaningful (not 0 for non-seasonal stats)
    let validCategory = randomCategory;
    if (randomPlayer[randomCategory] === 0 && randomCategory !== "seasonsPlayed") {
      validCategory = "careerPoints"; // Fallback
    }
    
    setCurrentPlayer(randomPlayer);
    setCategory(validCategory);
    setGuess("");
    setGuessHistory([]);
    setRevealed(false);
  }, [allPlayers]);

  useEffect(() => {
    if (allPlayers.length > 0) {
      startNewRound();
    }
  }, [allPlayers, startNewRound]);

  const handleGuess = () => {
    if (!currentPlayer || !guess || revealed) return;
    
    const guessValue = parseInt(guess);
    if (isNaN(guessValue) || guessValue < 0) {
      toast({ title: "Invalid guess", description: "Please enter a valid number", variant: "destructive" });
      return;
    }
    
    const actualValue = currentPlayer[category];
    
    if (guessValue === actualValue) {
      setGuessHistory(prev => [...prev, { value: guessValue, hint: "correct" }]);
      setRevealed(true);
      setScore(prev => prev + 3);
      toast({ title: "Exact match!", description: "+3 points" });
    } else {
      const hint: "higher" | "lower" = guessValue < actualValue ? "higher" : "lower";
      setGuessHistory(prev => [...prev, { value: guessValue, hint }]);
      
      if (guessHistory.length >= 2) {
        // Last guess - check for partial points
        const percentOff = Math.abs(guessValue - actualValue) / actualValue;
        if (percentOff <= 0.1) {
          setScore(prev => prev + 2);
          toast({ title: "Very close!", description: "Within 10% - +2 points" });
        } else if (percentOff <= 0.25) {
          setScore(prev => prev + 1);
          toast({ title: "Close!", description: "Within 25% - +1 point" });
        } else {
          toast({ title: "Not quite", description: "No points this round", variant: "destructive" });
        }
        setRevealed(true);
      } else {
        toast({ 
          title: hint === "higher" ? "Higher!" : "Lower!", 
          description: `${3 - guessHistory.length - 1} guesses remaining` 
        });
      }
    }
    
    setGuess("");
  };

  const handleNextRound = () => {
    if (round >= 5) {
      setGameOver(true);
    } else {
      setRound(prev => prev + 1);
      startNewRound();
    }
  };

  const handleReset = () => {
    setRound(1);
    setScore(0);
    setGameOver(false);
    startNewRound();
  };

  if (gameOver) {
    return (
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <BarChart3 className="h-5 w-5 text-primary" />
            Stat Guesser - Game Over
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-8">
            <div className="text-6xl font-bold text-primary mb-2">{score}/15</div>
            <p className="text-muted-foreground">
              {score >= 12 ? "Incredible! You know every stat!" :
               score >= 9 ? "Great job! You're a stats wizard!" :
               score >= 6 ? "Not bad! Keep studying those numbers." :
               "Keep practicing! The stats are waiting."}
            </p>
          </div>
          <Button onClick={handleReset} className="w-full">
            <RotateCcw className="h-4 w-4 mr-2" />
            Play Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!currentPlayer) {
    return (
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  const actualValue = currentPlayer[category];

  return (
    <Card className="bg-card/50 backdrop-blur border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <BarChart3 className="h-5 w-5 text-primary" />
            Stat Guesser
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline">Round {round}/5</Badge>
            <Badge variant="secondary">Score: {score}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center py-4">
          <button 
            onClick={() => onPlayerClick(currentPlayer.name)}
            className="text-2xl font-bold text-primary hover:underline cursor-pointer"
          >
            {currentPlayer.name}
          </button>
          <div className="mt-2 p-3 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground">Guess their</p>
            <p className="text-xl font-semibold text-foreground">{categoryLabels[category]}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Guesses: {guessHistory.length}/3
          </p>
          <div className="flex gap-2">
            {guessHistory.map((g, i) => (
              <Badge 
                key={i} 
                variant={g.hint === "correct" ? "default" : "outline"}
                className={`flex items-center gap-1 ${
                  g.hint === "correct" ? "bg-green-500" : ""
                }`}
              >
                {g.value.toLocaleString()}
                {g.hint === "higher" && <ArrowUp className="h-3 w-3" />}
                {g.hint === "lower" && <ArrowDown className="h-3 w-3" />}
                {g.hint === "correct" && <CheckCircle2 className="h-3 w-3" />}
              </Badge>
            ))}
          </div>
        </div>

        {!revealed ? (
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Enter your guess..."
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGuess()}
              className="flex-1"
              min={0}
            />
            <Button onClick={handleGuess} disabled={!guess}>
              Guess
            </Button>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">The answer was:</p>
            <p className="text-4xl font-bold text-primary">{actualValue.toLocaleString()}</p>
          </div>
        )}

        <div className="flex gap-2">
          {revealed && (
            <Button onClick={handleNextRound} className="flex-1">
              {round >= 5 ? "See Results" : "Next Round"}
            </Button>
          )}
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
