import { useState } from "react";
import { FeedSection } from "@/components/sections/FeedSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { ArchiveHubSection } from "@/components/sections/ArchiveHubSection";
import { TeamsSection } from "@/components/sections/TeamsSection";
import { MajorsSection } from "@/components/sections/MajorsSection";
import { FullApexSection } from "@/components/sections/FullApexSection";
import { ApexFinalsSection } from "@/components/sections/ApexFinalsSection";
import { H2HSection } from "@/components/sections/PlayerComparisonSection";
import { TeamComparisonSection } from "@/components/sections/TeamComparisonSection";
import { DynastyAnalysisSection } from "@/components/sections/DynastyAnalysisSection";
import { PlayerModal } from "@/components/PlayerModal";
import { TeamModal } from "@/components/TeamModal";

type SectionId = "home" | "results" | "archive" | "teams" | "majors" | "full-apex" | "apex" | "compare" | "team-compare" | "dynasties";

const navItems: { id: SectionId; label: string }[] = [
  { id: "home", label: "Feed" },
  { id: "results", label: "708 Results" },
  { id: "archive", label: "Archive" },
  { id: "teams", label: "Team History" },
  { id: "majors", label: "Trophy Room" },
  { id: "full-apex", label: "Full Apex Results" },
  { id: "apex", label: "Finals History" },
  { id: "compare", label: "Player H2H" },
  { id: "team-compare", label: "Team H2H" },
  { id: "dynasties", label: "Dynasties" },
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
      <nav className="bg-header px-3 md:px-8 border-b-[3px] border-primary sticky top-0 z-50 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
        <div className="flex justify-between items-center h-[50px] md:h-[70px]">
          <div 
            className="text-lg md:text-3xl font-extrabold uppercase tracking-wider text-white cursor-pointer shrink-0"
            onClick={() => setActiveSection("home")}
          >
            Corefall<span className="text-primary">News</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-1">
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
        </div>
        
        {/* Mobile Navigation - Scrollable horizontal tabs */}
        <div className="lg:hidden flex gap-1 overflow-x-auto pb-2 -mx-3 px-3 scrollbar-hide">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`bg-transparent border-none text-[11px] px-2.5 py-1.5 cursor-pointer uppercase font-bold transition-colors whitespace-nowrap rounded-md ${
                activeSection === item.id 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto py-4 md:py-8 px-3 md:px-5">
        {activeSection === "home" && <FeedSection />}
        {activeSection === "results" && (
          <ResultsSection onPlayerClick={handlePlayerClick} onTeamClick={handleTeamClick} />
        )}
        {activeSection === "archive" && (
          <ArchiveHubSection onPlayerClick={handlePlayerClick} onTeamClick={handleTeamClick} />
        )}
        {activeSection === "teams" && <TeamsSection onTeamClick={handleTeamClick} onPlayerClick={handlePlayerClick} />}
        {activeSection === "majors" && <MajorsSection onPlayerClick={handlePlayerClick} />}
        {activeSection === "full-apex" && <FullApexSection />}
        {activeSection === "apex" && (
          <ApexFinalsSection onPlayerClick={handlePlayerClick} onTeamClick={handleTeamClick} />
        )}
        {activeSection === "compare" && (
          <H2HSection onPlayerClick={handlePlayerClick} onTeamClick={handleTeamClick} />
        )}
        {activeSection === "team-compare" && (
          <TeamComparisonSection onPlayerClick={handlePlayerClick} onTeamClick={handleTeamClick} />
        )}
        {activeSection === "dynasties" && (
          <DynastyAnalysisSection onPlayerClick={handlePlayerClick} onTeamClick={handleTeamClick} />
        )}
      </div>

      {/* Footer */}
      <footer className="text-center p-6 md:p-10 mt-8 md:mt-12 bg-header text-muted-foreground border-t border-border text-sm">
        <p>&copy; 707 Corefall News.</p>
        <p className="text-xs md:text-sm">This site is a fan creation based on the world of Zera.</p>
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
          onPlayerClick={handlePlayerClick}
        />
      )}
    </div>
  );
};

export default Index;
