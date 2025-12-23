import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid3X3, User, Link2 } from "lucide-react";
import { ImmaculateGridSection } from "./ImmaculateGridSection";
import { PlayerGuessSection } from "./PlayerGuessSection";
import { ConnectionsSection } from "./ConnectionsSection";

interface GamesSectionProps {
  onPlayerClick: (name: string) => void;
}

export const GamesSection = ({ onPlayerClick }: GamesSectionProps) => {
  const [activeGame, setActiveGame] = useState<"grid" | "guess" | "connections">("grid");

  return (
    <section>
      <Tabs value={activeGame} onValueChange={(v) => setActiveGame(v as "grid" | "guess" | "connections")} className="w-full">
        <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-6">
          <TabsTrigger value="grid" className="flex items-center gap-2">
            <Grid3X3 className="h-4 w-4" />
            Grid
          </TabsTrigger>
          <TabsTrigger value="guess" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Guess
          </TabsTrigger>
          <TabsTrigger value="connections" className="flex items-center gap-2">
            <Link2 className="h-4 w-4" />
            Connections
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="grid">
          <ImmaculateGridSection onPlayerClick={onPlayerClick} />
        </TabsContent>
        
        <TabsContent value="guess">
          <PlayerGuessSection onPlayerClick={onPlayerClick} />
        </TabsContent>
        
        <TabsContent value="connections">
          <ConnectionsSection onPlayerClick={onPlayerClick} />
        </TabsContent>
      </Tabs>
    </section>
  );
};
