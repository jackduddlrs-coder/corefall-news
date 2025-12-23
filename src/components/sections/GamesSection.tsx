import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid3X3, User } from "lucide-react";
import { ImmaculateGridSection } from "./ImmaculateGridSection";
import { PlayerGuessSection } from "./PlayerGuessSection";

interface GamesSectionProps {
  onPlayerClick: (name: string) => void;
}

export const GamesSection = ({ onPlayerClick }: GamesSectionProps) => {
  const [activeGame, setActiveGame] = useState<"grid" | "guess">("grid");

  return (
    <section>
      <Tabs value={activeGame} onValueChange={(v) => setActiveGame(v as "grid" | "guess")} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
          <TabsTrigger value="grid" className="flex items-center gap-2">
            <Grid3X3 className="h-4 w-4" />
            Grid Game
          </TabsTrigger>
          <TabsTrigger value="guess" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Guess Player
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="grid">
          <ImmaculateGridSection onPlayerClick={onPlayerClick} />
        </TabsContent>
        
        <TabsContent value="guess">
          <PlayerGuessSection onPlayerClick={onPlayerClick} />
        </TabsContent>
      </Tabs>
    </section>
  );
};
