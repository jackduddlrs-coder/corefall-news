import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeaderboardsSection } from "./LeaderboardsSection";
import { ArchiveSection } from "./ArchiveSection";
import { SeasonsSection } from "./SeasonsSection";
import { HallOfImmortalsSection } from "./HallOfImmortalsSection";
import { RosterMovesSection } from "./RosterMovesSection";
import { RivalriesSection } from "./RivalriesSection";

interface ArchiveHubSectionProps {
  onPlayerClick: (name: string) => void;
  onTeamClick: (name: string) => void;
}

type ArchiveTab = "leaderboards" | "standings" | "seasons" | "immortals" | "moves" | "rivalries";

export const ArchiveHubSection = ({ onPlayerClick, onTeamClick }: ArchiveHubSectionProps) => {
  const [activeTab, setActiveTab] = useState<ArchiveTab>("leaderboards");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">Archive</h1>
        <p className="text-muted-foreground text-sm md:text-base">Historical data, leaderboards, and season records.</p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ArchiveTab)} className="w-full">
        <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
          <TabsTrigger value="leaderboards" className="flex-1 text-xs md:text-sm py-2.5">
            Leaderboards
          </TabsTrigger>
          <TabsTrigger value="standings" className="flex-1 text-xs md:text-sm py-2.5">
            Standings
          </TabsTrigger>
          <TabsTrigger value="seasons" className="flex-1 text-xs md:text-sm py-2.5">
            Seasons
          </TabsTrigger>
          <TabsTrigger value="moves" className="flex-1 text-xs md:text-sm py-2.5">
            Roster Moves
          </TabsTrigger>
          <TabsTrigger value="rivalries" className="flex-1 text-xs md:text-sm py-2.5">
            Rivalries
          </TabsTrigger>
          <TabsTrigger value="immortals" className="flex-1 text-xs md:text-sm py-2.5">
            Immortals
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="leaderboards" className="mt-0">
            <LeaderboardsSection onPlayerClick={onPlayerClick} onTeamClick={onTeamClick} />
          </TabsContent>
          <TabsContent value="standings" className="mt-0">
            <ArchiveSection onPlayerClick={onPlayerClick} onTeamClick={onTeamClick} />
          </TabsContent>
          <TabsContent value="seasons" className="mt-0">
            <SeasonsSection onPlayerClick={onPlayerClick} onTeamClick={onTeamClick} />
          </TabsContent>
          <TabsContent value="moves" className="mt-0">
            <RosterMovesSection onPlayerClick={onPlayerClick} onTeamClick={onTeamClick} />
          </TabsContent>
          <TabsContent value="rivalries" className="mt-0">
            <RivalriesSection onPlayerClick={onPlayerClick} onTeamClick={onTeamClick} />
          </TabsContent>
          <TabsContent value="immortals" className="mt-0">
            <HallOfImmortalsSection onPlayerClick={onPlayerClick} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
