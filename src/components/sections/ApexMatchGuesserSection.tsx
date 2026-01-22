import { useState, useEffect, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, RotateCcw, Check, X } from "lucide-react";
import { fullMatches } from "@/data/corefallData";
import { toast } from "@/hooks/use-toast";

interface ApexMatch {
  season: string;
  round: string;
  player1: string;
  player2: string;
  winner: string;
  winnerScore: number;
  loserScore: number;
  isFinals: boolean;
}

interface ApexMatchGuesserSectionProps {
  onPlayerClick: (name: string) => void;
}

const parseMatches = (): ApexMatch[] => {
  const matches: ApexMatch[] = [];
  
  Object.entries(fullMatches).forEach(([season, matchList]) => {
    matchList.forEach(({ round, match }) => {
      // Skip group stage matches - only use bracket matches
      if (round.toLowerCase().includes("group")) return;
      
      // Parse match format: "Player1 (score) vs Player2" or finals format
      const isFinals = round.toLowerCase().includes("grand final") || round.toLowerCase().includes("championship");
      
      // Finals format: "Nothing Sawryr (2-1(4-1,3-4,4-2)) vs Mega Hawnnon"
      // Regular format: "Mega Hawnnon (4-2) vs Bat Bornoil"
      
      let winnerMatch;
      let winner: string;
      let loser: string;
      let winnerScore: number;
      let loserScore: number;
      
      if (isFinals) {
        // Finals Bo3 format
        winnerMatch = match.match(/^(.+?)\s*\((\d)-(\d)(?:\([^)]+\))?\)\s*vs\s*(.+)$/);
        if (winnerMatch) {
          winner = winnerMatch[1].trim();
          winnerScore = parseInt(winnerMatch[2]);
          loserScore = parseInt(winnerMatch[3]);
          loser = winnerMatch[4].trim();
        } else {
          return;
        }
      } else {
        // Regular Bo7 format
        winnerMatch = match.match(/^(.+?)\s*\((\d)-(\d)\)\s*vs\s*(.+)$/);
        if (winnerMatch) {
          winner = winnerMatch[1].trim();
          winnerScore = parseInt(winnerMatch[2]);
          loserScore = parseInt(winnerMatch[3]);
          loser = winnerMatch[4].trim();
        } else {
          return;
        }
      }
      
      // Randomize display order
      const showPlayer1First = Math.random() > 0.5;
      
      matches.push({
        season,
        round,
        player1: showPlayer1First ? winner : loser,
        player2: showPlayer1First ? loser : winner,
        winner,
        winnerScore,
        loserScore,
        isFinals,
      });
    });
  });
  
  return matches;
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const ApexMatchGuesserSection = ({ onPlayerClick }: ApexMatchGuesserSectionProps) => {
  const allMatches = useMemo(() => parseMatches(), []);
  
  const [currentMatch, setCurrentMatch] = useState<ApexMatch | null>(null);
  const [selectedWinner, setSelectedWinner] = useState<string | null>(null);
  const [selectedScore, setSelectedScore] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [usedMatches, setUsedMatches] = useState<Set<string>>(new Set());

  const getMatchKey = (match: ApexMatch) => `${match.season}-${match.round}-${match.winner}`;

  const startNewRound = useCallback(() => {
    const availableMatches = allMatches.filter(m => !usedMatches.has(getMatchKey(m)));
    if (availableMatches.length === 0) {
      setGameOver(true);
      return;
    }
    
    const shuffled = shuffleArray(availableMatches);
    const match = shuffled[0];
    
    // Re-randomize player order for display
    const showPlayer1First = Math.random() > 0.5;
    const displayMatch: ApexMatch = {
      ...match,
      player1: showPlayer1First ? match.winner : (match.player1 === match.winner ? match.player2 : match.player1),
      player2: showPlayer1First ? (match.player1 === match.winner ? match.player2 : match.player1) : match.winner,
    };
    
    setCurrentMatch(displayMatch);
    setSelectedWinner(null);
    setSelectedScore(null);
    setSubmitted(false);
    setUsedMatches(prev => new Set([...prev, getMatchKey(match)]));
  }, [allMatches, usedMatches]);

  useEffect(() => {
    if (allMatches.length > 0 && !currentMatch && !gameOver) {
      startNewRound();
    }
  }, [allMatches, currentMatch, gameOver, startNewRound]);

  const handleSubmit = () => {
    if (!currentMatch || !selectedWinner || !selectedScore) return;
    
    const correctWinner = selectedWinner === currentMatch.winner;
    const correctScoreStr = `${currentMatch.winnerScore}-${currentMatch.loserScore}`;
    const correctScore = selectedScore === correctScoreStr;
    
    let roundPoints = 0;
    if (correctWinner) roundPoints += 1;
    if (correctScore) roundPoints += 2;
    
    setScore(prev => prev + roundPoints);
    setSubmitted(true);
    
    if (roundPoints === 3) {
      toast({
        title: "Perfect! 🏆",
        description: "You got both the winner and score correct!",
      });
    } else if (roundPoints > 0) {
      toast({
        title: correctWinner ? "Winner correct!" : "Score correct!",
        description: `+${roundPoints} point${roundPoints > 1 ? 's' : ''}`,
      });
    } else {
      toast({
        title: "Not quite!",
        description: `The answer was ${currentMatch.winner} (${correctScoreStr})`,
        variant: "destructive",
      });
    }
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
    setUsedMatches(new Set());
    setCurrentMatch(null);
    setSelectedWinner(null);
    setSelectedScore(null);
    setSubmitted(false);
  };

  const getScoreOptions = () => {
    if (!currentMatch) return [];
    if (currentMatch.isFinals) {
      return ["2-0", "2-1"];
    }
    return ["4-0", "4-1", "4-2", "4-3"];
  };

  const isWinnerCorrect = submitted && selectedWinner === currentMatch?.winner;
  const isScoreCorrect = submitted && selectedScore === `${currentMatch?.winnerScore}-${currentMatch?.loserScore}`;

  if (gameOver) {
    const maxScore = 15;
    const percentage = Math.round((score / maxScore) * 100);
    
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Trophy className="h-6 w-6 text-primary" />
            Game Over!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-6xl font-bold text-primary">{score}/{maxScore}</div>
          <p className="text-xl text-muted-foreground">
            {percentage >= 80 ? "Apex Expert! 🏆" : 
             percentage >= 60 ? "Great job! 🎯" : 
             percentage >= 40 ? "Not bad! 📊" : 
             "Keep practicing! 💪"}
          </p>
          <Button onClick={handleReset} size="lg" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Play Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!currentMatch) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center text-muted-foreground">
          Loading matches...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Apex Match Guesser
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline">Round {round}/5</Badge>
            <Badge className="bg-primary">{score} pts</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Match Context */}
        <div className="text-center space-y-2">
          <Badge variant="secondary" className="text-sm">
            Season {currentMatch.season}
          </Badge>
          <p className="text-lg font-medium text-muted-foreground">
            {currentMatch.round}
          </p>
        </div>

        {/* Player Selection */}
        <div className="space-y-3">
          <p className="text-sm text-center text-muted-foreground">Who won this match?</p>
          <div className="grid grid-cols-2 gap-3">
            {[currentMatch.player1, currentMatch.player2].map((player) => {
              const isSelected = selectedWinner === player;
              const isCorrect = submitted && player === currentMatch.winner;
              const isWrong = submitted && isSelected && player !== currentMatch.winner;
              
              return (
                <Button
                  key={player}
                  variant={isSelected ? "default" : "outline"}
                  className={`h-auto py-4 px-3 text-base relative ${
                    isCorrect ? "bg-green-600 hover:bg-green-600 border-green-600" : 
                    isWrong ? "bg-red-600 hover:bg-red-600 border-red-600" : ""
                  }`}
                  onClick={() => !submitted && setSelectedWinner(player)}
                  disabled={submitted}
                >
                  <span 
                    className="cursor-pointer hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayerClick(player);
                    }}
                  >
                    {player}
                  </span>
                  {isCorrect && <Check className="absolute right-2 h-4 w-4" />}
                  {isWrong && <X className="absolute right-2 h-4 w-4" />}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Score Selection */}
        <div className="space-y-3">
          <p className="text-sm text-center text-muted-foreground">
            What was the score? {currentMatch.isFinals ? "(Best of 3 sets)" : "(Best of 7)"}
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            {getScoreOptions().map((scoreOption) => {
              const isSelected = selectedScore === scoreOption;
              const correctScoreStr = `${currentMatch.winnerScore}-${currentMatch.loserScore}`;
              const isCorrect = submitted && scoreOption === correctScoreStr;
              const isWrong = submitted && isSelected && scoreOption !== correctScoreStr;
              
              return (
                <Button
                  key={scoreOption}
                  variant={isSelected ? "default" : "outline"}
                  size="lg"
                  className={`min-w-[70px] ${
                    isCorrect ? "bg-green-600 hover:bg-green-600 border-green-600" : 
                    isWrong ? "bg-red-600 hover:bg-red-600 border-red-600" : ""
                  }`}
                  onClick={() => !submitted && setSelectedScore(scoreOption)}
                  disabled={submitted}
                >
                  {scoreOption}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3 pt-4">
          {!submitted ? (
            <Button
              onClick={handleSubmit}
              disabled={!selectedWinner || !selectedScore}
              size="lg"
              className="min-w-[150px]"
            >
              Submit Guess
            </Button>
          ) : (
            <Button onClick={handleNextRound} size="lg" className="min-w-[150px]">
              {round >= 5 ? "See Results" : "Next Match"}
            </Button>
          )}
        </div>

        {/* Result Summary */}
        {submitted && (
          <div className="text-center p-4 bg-muted/30 rounded-lg space-y-1">
            <p className="flex items-center justify-center gap-2">
              Winner: {currentMatch.winner}
              {isWinnerCorrect ? (
                <span className="text-green-500">✓ +1</span>
              ) : (
                <span className="text-red-500">✗</span>
              )}
            </p>
            <p className="flex items-center justify-center gap-2">
              Score: {currentMatch.winnerScore}-{currentMatch.loserScore}
              {isScoreCorrect ? (
                <span className="text-green-500">✓ +2</span>
              ) : (
                <span className="text-red-500">✗</span>
              )}
            </p>
          </div>
        )}

        {/* Legend */}
        <div className="text-xs text-center text-muted-foreground pt-2 border-t border-border">
          <p>Correct winner: +1 point | Correct score: +2 points</p>
        </div>
      </CardContent>
    </Card>
  );
};
