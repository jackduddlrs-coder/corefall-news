import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, RotateCcw, CheckCircle2, XCircle, ArrowUpDown } from "lucide-react";
import { majorWinners, seasons, apexDetailed } from "@/data/corefallData";
import { toast } from "@/hooks/use-toast";

interface TimelineEvent {
  id: string;
  text: string;
  year: number;
}

interface TimelineOrderSectionProps {
  onPlayerClick: (name: string) => void;
}

// Generate a random event from available data
function generateEvents(): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  
  // Add major wins
  majorWinners.forEach((mw, i) => {
    events.push({
      id: `major-${i}`,
      text: `${mw.winner} won the ${mw.tournament}`,
      year: mw.year
    });
  });
  
  // Add Apex Finals
  apexDetailed.forEach((af, i) => {
    events.push({
      id: `apex-${i}`,
      text: `${af.win} beat ${af.lose} in Apex Finals`,
      year: af.year
    });
  });
  
  // Add CTT wins
  seasons.forEach((s, i) => {
    events.push({
      id: `ctt-${i}`,
      text: `${s.ctt} won the CTT`,
      year: s.year
    });
  });
  
  // Add Season Stars
  seasons.filter(s => s.star).forEach((s, i) => {
    events.push({
      id: `star-${i}`,
      text: `${s.star} won Season Star`,
      year: s.year
    });
  });
  
  return events;
}

// Pick 5 random events ensuring variety in years
function pickRoundEvents(allEvents: TimelineEvent[]): TimelineEvent[] {
  const shuffled = [...allEvents].sort(() => Math.random() - 0.5);
  const picked: TimelineEvent[] = [];
  const usedYears = new Set<number>();
  
  for (const event of shuffled) {
    if (picked.length >= 5) break;
    // Allow some year overlap but prefer variety
    if (!usedYears.has(event.year) || picked.length < 3) {
      picked.push(event);
      usedYears.add(event.year);
    }
  }
  
  // Fill remaining slots if needed
  while (picked.length < 5) {
    const remaining = shuffled.find(e => !picked.includes(e));
    if (remaining) picked.push(remaining);
    else break;
  }
  
  return picked;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const TimelineOrderSection = ({ onPlayerClick }: TimelineOrderSectionProps) => {
  const [allEvents] = useState<TimelineEvent[]>(() => generateEvents());
  const [currentEvents, setCurrentEvents] = useState<TimelineEvent[]>([]);
  const [userOrder, setUserOrder] = useState<TimelineEvent[]>([]);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const startNewRound = useCallback(() => {
    const events = pickRoundEvents(allEvents);
    setCurrentEvents(events);
    setUserOrder(shuffleArray(events));
    setSubmitted(false);
    setSelectedIndex(null);
  }, [allEvents]);

  useEffect(() => {
    startNewRound();
  }, [startNewRound]);

  const handleSwap = (index: number) => {
    if (submitted) return;
    
    if (selectedIndex === null) {
      setSelectedIndex(index);
    } else if (selectedIndex === index) {
      setSelectedIndex(null);
    } else {
      const newOrder = [...userOrder];
      [newOrder[selectedIndex], newOrder[index]] = [newOrder[index], newOrder[selectedIndex]];
      setUserOrder(newOrder);
      setSelectedIndex(null);
    }
  };

  const handleSubmit = () => {
    const correctOrder = [...currentEvents].sort((a, b) => a.year - b.year);
    let roundScore = 0;
    
    userOrder.forEach((event, index) => {
      if (event.id === correctOrder[index].id) {
        roundScore++;
      }
    });
    
    setScore(prev => prev + roundScore);
    setSubmitted(true);
    
    if (roundScore === 5) {
      toast({ title: "Perfect!", description: "You got all 5 events in the correct order!" });
    } else if (roundScore >= 3) {
      toast({ title: "Nice!", description: `You got ${roundScore}/5 correct.` });
    } else {
      toast({ title: "Keep trying!", description: `You got ${roundScore}/5 correct.`, variant: "destructive" });
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
    startNewRound();
  };

  const getCorrectOrder = () => [...currentEvents].sort((a, b) => a.year - b.year);

  const isCorrectPosition = (event: TimelineEvent, index: number) => {
    const correctOrder = getCorrectOrder();
    return event.id === correctOrder[index].id;
  };

  const extractPlayerName = (text: string): string | null => {
    const patterns = [
      /^([A-Z][a-z]+ [A-Z][a-z-]+) won/,
      /^([A-Z][a-z]+ [A-Z][a-z-]+) beat/,
    ];
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  if (gameOver) {
    return (
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Calendar className="h-5 w-5 text-primary" />
            Timeline Order - Game Over
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-8">
            <div className="text-6xl font-bold text-primary mb-2">{score}/25</div>
            <p className="text-muted-foreground">
              {score >= 20 ? "Incredible! You're a Corefall historian!" :
               score >= 15 ? "Great job! You know your timeline!" :
               score >= 10 ? "Not bad! Keep studying the history." :
               "Keep practicing! The timeline awaits."}
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

  return (
    <Card className="bg-card/50 backdrop-blur border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Calendar className="h-5 w-5 text-primary" />
            Timeline Order
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline">Round {round}/5</Badge>
            <Badge variant="secondary">Score: {score}</Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {submitted 
            ? "Review the correct order below" 
            : "Arrange these events from earliest to latest. Click two events to swap them."}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-2">
          <ArrowUpDown className="h-3 w-3" />
          <span>Earliest</span>
          <span className="mx-4">→</span>
          <span>Latest</span>
        </div>
        
        <div className="space-y-2">
          {userOrder.map((event, index) => {
            const correct = submitted && isCorrectPosition(event, index);
            const incorrect = submitted && !isCorrectPosition(event, index);
            const playerName = extractPlayerName(event.text);
            
            return (
              <button
                key={event.id}
                onClick={() => !submitted && handleSwap(index)}
                disabled={submitted}
                className={`w-full p-3 rounded-lg border text-left transition-all ${
                  selectedIndex === index
                    ? "border-primary bg-primary/10 ring-2 ring-primary"
                    : correct
                    ? "border-green-500 bg-green-500/10"
                    : incorrect
                    ? "border-destructive bg-destructive/10"
                    : "border-border hover:border-primary/50 hover:bg-accent/50"
                } ${!submitted && "cursor-pointer"}`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </span>
                  <span 
                    className={`flex-1 text-sm ${playerName ? "cursor-pointer hover:underline" : ""}`}
                    onClick={(e) => {
                      if (playerName) {
                        e.stopPropagation();
                        onPlayerClick(playerName);
                      }
                    }}
                  >
                    {event.text}
                  </span>
                  {submitted && (
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {event.year}
                      </Badge>
                      {correct ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {submitted && (
          <div className="p-3 rounded-lg bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground mb-2">Correct order:</p>
            <div className="flex flex-wrap gap-2">
              {getCorrectOrder().map((event, index) => (
                <Badge key={event.id} variant="outline" className="text-xs">
                  {index + 1}. {event.year}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          {!submitted ? (
            <Button onClick={handleSubmit} className="flex-1">
              Submit Order
            </Button>
          ) : (
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
