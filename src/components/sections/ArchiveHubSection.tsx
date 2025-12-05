import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeaderboardsSection } from "./LeaderboardsSection";
import { ArchiveSection } from "./ArchiveSection";
import { SeasonsSection } from "./SeasonsSection";

interface ArchiveHubSectionProps {
  onPlayerClick: (name: string) => void;
  onTeamClick: (name: string) => void;
}

type ArchiveTab = "leaderboards" | "standings" | "seasons";

export const ArchiveHubSection = ({ onPlayerClick, onTeamClick }: ArchiveHubSectionProps) => {
  const [activeTab, setActiveTab] = useState<ArchiveTab>("leaderboards");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">Archive</h1>
        <p className="text-muted-foreground text-sm md:text-base">Historical data, leaderboards, and season records.</p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ArchiveTab)} className="w-full">
        <TabsList className="w-full flex h-auto gap-1 bg-muted/50 p-1">
          <TabsTrigger value="leaderboards" className="flex-1 text-sm md:text-base py-2.5">
            Leaderboards
          </TabsTrigger>
          <TabsTrigger value="standings" className="flex-1 text-sm md:text-base py-2.5">
            Standings
          </TabsTrigger>
          <TabsTrigger value="seasons" className="flex-1 text-sm md:text-base py-2.5">
            Seasons
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
        </div>
      </Tabs>
    </div>
  );
};
