import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid3X3, User, Link2, Calendar, BarChart3, Camera } from "lucide-react";
import { ImmaculateGridSection } from "./ImmaculateGridSection";
import { PlayerGuessSection } from "./PlayerGuessSection";
import { ConnectionsSection } from "./ConnectionsSection";
import { TimelineOrderSection } from "./TimelineOrderSection";
import { StatGuesserSection } from "./StatGuesserSection";
import { SeasonSnapshotSection } from "./SeasonSnapshotSection";

interface GamesSectionProps {
  onPlayerClick: (name: string) => void;
}

type GameType = "grid" | "guess" | "connections" | "timeline" | "stats" | "snapshot";

export const GamesSection = ({ onPlayerClick }: GamesSectionProps) => {
  const [activeGame, setActiveGame] = useState<GameType>("grid");

  return (
    <section>
      <Tabs value={activeGame} onValueChange={(v) => setActiveGame(v as GameType)} className="w-full">
        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 md:grid-cols-6 mb-6 h-auto">
          <TabsTrigger value="grid" className="flex items-center gap-1 text-xs md:text-sm px-2 py-2">
            <Grid3X3 className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Grid</span>
          </TabsTrigger>
          <TabsTrigger value="guess" className="flex items-center gap-1 text-xs md:text-sm px-2 py-2">
            <User className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Guess</span>
          </TabsTrigger>
          <TabsTrigger value="connections" className="flex items-center gap-1 text-xs md:text-sm px-2 py-2">
            <Link2 className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Links</span>
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-1 text-xs md:text-sm px-2 py-2">
            <Calendar className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Timeline</span>
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center gap-1 text-xs md:text-sm px-2 py-2">
            <BarChart3 className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Stats</span>
          </TabsTrigger>
          <TabsTrigger value="snapshot" className="flex items-center gap-1 text-xs md:text-sm px-2 py-2">
            <Camera className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Snapshot</span>
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
        
        <TabsContent value="timeline">
          <TimelineOrderSection onPlayerClick={onPlayerClick} />
        </TabsContent>
        
        <TabsContent value="stats">
          <StatGuesserSection onPlayerClick={onPlayerClick} />
        </TabsContent>
        
        <TabsContent value="snapshot">
          <SeasonSnapshotSection onPlayerClick={onPlayerClick} />
        </TabsContent>
      </Tabs>
    </section>
  );
};
