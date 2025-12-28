import { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, RotateCcw, Trophy, Zap } from "lucide-react";
import { pastStandings } from "@/data/corefallData";
import { toast } from "@/hooks/use-toast";

interface SeasonSnapshotSectionProps {
  onPlayerClick: (name: string) => void;
}

interface Question {
  season: string;
  playerA: { name: string; rank: number; points: number; team: string };
  playerB: { name: string; rank: number; points: number; team: string };
}

function generateQuestion(): Question | null {
  const seasonKeys = Object.keys(pastStandings).filter(s => pastStandings[s].length >= 10);
  if (seasonKeys.length === 0) return null;
  
  const season = seasonKeys[Math.floor(Math.random() * seasonKeys.length)];
  const standings = pastStandings[season];
  
  // Pick two different players from top 20
  const top20 = standings.slice(0, Math.min(20, standings.length));
  if (top20.length < 2) return null;
  
  const indexA = Math.floor(Math.random() * top20.length);
  let indexB = Math.floor(Math.random() * top20.length);
  while (indexB === indexA) {
    indexB = Math.floor(Math.random() * top20.length);
  }
  
  const playerA = top20[indexA];
  const playerB = top20[indexB];
  
  return {
    season,
    playerA: { name: playerA.Name, rank: playerA.Rank, points: playerA.Points, team: playerA.Team },
    playerB: { name: playerB.Name, rank: playerB.Rank, points: playerB.Points, team: playerB.Team }
  };
}

export const SeasonSnapshotSection = ({ onPlayerClick }: SeasonSnapshotSectionProps) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [selected, setSelected] = useState<"A" | "B" | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const startNewRound = useCallback(() => {
    const newQuestion = generateQuestion();
    setQuestion(newQuestion);
    setSelected(null);
    setRevealed(false);
  }, []);

  useEffect(() => {
    startNewRound();
  }, [startNewRound]);

  const handleSelect = (choice: "A" | "B") => {
    if (revealed || !question) return;
    
    setSelected(choice);
    setRevealed(true);
    
    const chosenPlayer = choice === "A" ? question.playerA : question.playerB;
    const otherPlayer = choice === "A" ? question.playerB : question.playerA;
    
    // Lower rank = higher finish
    const isCorrect = chosenPlayer.rank < otherPlayer.rank;
    
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setBestStreak(prev => Math.max(prev, newStreak));
      
      // Bonus points for streaks
      const streakBonus = newStreak >= 5 ? 2 : newStreak >= 3 ? 1 : 0;
      setScore(prev => prev + 1 + streakBonus);
      
      if (streakBonus > 0) {
        toast({ title: "Correct! 🔥", description: `+${1 + streakBonus} points (streak bonus!)` });
      } else {
        toast({ title: "Correct!", description: "+1 point" });
      }
    } else {
      setStreak(0);
      toast({ title: "Wrong!", description: `${otherPlayer.name} finished higher.`, variant: "destructive" });
    }
  };

  const handleNextRound = () => {
    if (round >= 10) {
      setGameOver(true);
    } else {
      setRound(prev => prev + 1);
      startNewRound();
    }
  };

  const handleReset = () => {
    setRound(1);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setGameOver(false);
    startNewRound();
  };

  if (gameOver) {
    return (
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Camera className="h-5 w-5 text-primary" />
            Season Snapshot - Game Over
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-8">
            <div className="text-6xl font-bold text-primary mb-2">{score}</div>
            <p className="text-muted-foreground mb-4">
              Best Streak: {bestStreak} 🔥
            </p>
            <p className="text-muted-foreground">
              {score >= 15 ? "Incredible! Perfect seasonal memory!" :
               score >= 12 ? "Amazing! You really know your seasons!" :
               score >= 8 ? "Great job! Solid knowledge!" :
               "Keep practicing! Study those standings."}
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

  if (!question) {
    return (
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  const getResultClass = (player: "A" | "B") => {
    if (!revealed) return "";
    const chosen = player === selected;
    const playerData = player === "A" ? question.playerA : question.playerB;
    const otherData = player === "A" ? question.playerB : question.playerA;
    const isWinner = playerData.rank < otherData.rank;
    
    if (chosen && isWinner) return "border-green-500 bg-green-500/10";
    if (chosen && !isWinner) return "border-destructive bg-destructive/10";
    if (!chosen && isWinner) return "border-green-500/50 bg-green-500/5";
    return "border-border";
  };

  return (
    <Card className="bg-card/50 backdrop-blur border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Camera className="h-5 w-5 text-primary" />
            Season Snapshot
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline">Round {round}/10</Badge>
            {streak >= 2 && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                {streak}
              </Badge>
            )}
            <Badge variant="secondary">Score: {score}</Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Who finished higher in the standings?
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <Badge className="text-lg px-4 py-1">Season {question.season}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Player A */}
          <button
            onClick={() => handleSelect("A")}
            disabled={revealed}
            className={`p-4 rounded-lg border-2 transition-all text-center ${
              selected === "A" && !revealed
                ? "border-primary bg-primary/10"
                : getResultClass("A")
            } ${!revealed && "hover:border-primary/50 cursor-pointer"}`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPlayerClick(question.playerA.name);
              }}
              className="text-lg font-bold text-foreground hover:text-primary hover:underline"
            >
              {question.playerA.name}
            </button>
            <p className="text-sm text-muted-foreground mt-1">{question.playerA.team}</p>
            
            {revealed && (
              <div className="mt-3 space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span className="font-semibold">Rank #{question.playerA.rank}</span>
                </div>
                <p className="text-sm text-muted-foreground">{question.playerA.points.toLocaleString()} pts</p>
              </div>
            )}
          </button>

          {/* VS */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden">
            <Badge variant="outline" className="bg-background">VS</Badge>
          </div>

          {/* Player B */}
          <button
            onClick={() => handleSelect("B")}
            disabled={revealed}
            className={`p-4 rounded-lg border-2 transition-all text-center ${
              selected === "B" && !revealed
                ? "border-primary bg-primary/10"
                : getResultClass("B")
            } ${!revealed && "hover:border-primary/50 cursor-pointer"}`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPlayerClick(question.playerB.name);
              }}
              className="text-lg font-bold text-foreground hover:text-primary hover:underline"
            >
              {question.playerB.name}
            </button>
            <p className="text-sm text-muted-foreground mt-1">{question.playerB.team}</p>
            
            {revealed && (
              <div className="mt-3 space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span className="font-semibold">Rank #{question.playerB.rank}</span>
                </div>
                <p className="text-sm text-muted-foreground">{question.playerB.points.toLocaleString()} pts</p>
              </div>
            )}
          </button>
        </div>

        <div className="flex gap-2">
          {revealed && (
            <Button onClick={handleNextRound} className="flex-1">
              {round >= 10 ? "See Results" : "Next Round"}
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
