import { useState } from "react";
import { FeedSection } from "@/components/sections/FeedSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { ArchiveSection } from "@/components/sections/ArchiveSection";
import { TeamsSection } from "@/components/sections/TeamsSection";
import { SeasonsSection } from "@/components/sections/SeasonsSection";
import { MajorsSection } from "@/components/sections/MajorsSection";
import { FullApexSection } from "@/components/sections/FullApexSection";
import { ApexFinalsSection } from "@/components/sections/ApexFinalsSection";
import { PlayerModal } from "@/components/PlayerModal";
import { TeamModal } from "@/components/TeamModal";

type SectionId = "home" | "results" | "archive" | "teams" | "seasons" | "majors" | "full-apex" | "apex";

const navItems: { id: SectionId; label: string }[] = [
  { id: "home", label: "Feed" },
  { id: "results", label: "708 Results" },
  { id: "archive", label: "Standings Archive" },
  { id: "teams", label: "Team History" },
  { id: "seasons", label: "Season Archive" },
  { id: "majors", label: "Trophy Room" },
  { id: "full-apex", label: "Full Apex Results" },
  { id: "apex", label: "Finals History" },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const handlePlayerClick = (name: string) => setSelectedPlayer(name);
  const handleTeamClick = (name: string) => setSelectedTeam(name);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-header px-8 border-b-[3px] border-primary flex justify-between items-center h-[70px] sticky top-0 z-50 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
        <div 
          className="text-3xl font-extrabold uppercase tracking-wider text-white cursor-pointer"
          onClick={() => setActiveSection("home")}
        >
          Corefall<span className="text-primary">News</span>
        </div>
        
        <div className="flex gap-1 overflow-x-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`bg-transparent border-none text-sm px-4 py-2.5 cursor-pointer uppercase font-bold transition-colors whitespace-nowrap border-b-[3px] ${
                activeSection === item.id 
                  ? "text-primary border-primary" 
                  : "text-muted-foreground border-transparent hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto py-8 px-5">
        {activeSection === "home" && <FeedSection />}
        {activeSection === "results" && (
          <ResultsSection onPlayerClick={handlePlayerClick} onTeamClick={handleTeamClick} />
        )}
        {activeSection === "archive" && (
          <ArchiveSection onPlayerClick={handlePlayerClick} onTeamClick={handleTeamClick} />
        )}
        {activeSection === "teams" && <TeamsSection onTeamClick={handleTeamClick} />}
        {activeSection === "seasons" && (
          <SeasonsSection onPlayerClick={handlePlayerClick} onTeamClick={handleTeamClick} />
        )}
        {activeSection === "majors" && <MajorsSection onPlayerClick={handlePlayerClick} />}
        {activeSection === "full-apex" && <FullApexSection />}
        {activeSection === "apex" && (
          <ApexFinalsSection onPlayerClick={handlePlayerClick} onTeamClick={handleTeamClick} />
        )}
      </div>

      {/* Footer */}
      <footer className="text-center p-10 mt-12 bg-header text-muted-foreground border-t border-border">
        <p>&copy; 707 Corefall News.</p>
        <p>This site is a fan creation based on the world of Zera.</p>
      </footer>

      {/* Modals */}
      {selectedPlayer && (
        <PlayerModal 
          playerName={selectedPlayer} 
          onClose={() => setSelectedPlayer(null)} 
        />
      )}
      {selectedTeam && (
        <TeamModal 
          teamName={selectedTeam} 
          onClose={() => setSelectedTeam(null)} 
        />
      )}
    </div>
  );
};

export default Index;
