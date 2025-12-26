import { useState } from "react";
import { Link } from "react-router-dom";
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
import { GamesSection } from "@/components/sections/GamesSection";
import { SplashfeedSection } from "@/components/sections/SplashfeedSection";
import { PlayerModal } from "@/components/PlayerModal";
import { TeamModal } from "@/components/TeamModal";
import { GlobalSearch } from "@/components/GlobalSearch";
import { BookOpen } from "lucide-react";

type SectionId = "home" | "results" | "archive" | "teams" | "majors" | "full-apex" | "apex" | "compare" | "team-compare" | "dynasties" | "games" | "splashfeed";

const navItems: { id: SectionId; label: string }[] = [
  { id: "home", label: "Feed" },
  { id: "results", label: "709 Results" },
  { id: "archive", label: "Archive" },
  { id: "teams", label: "Team History" },
  { id: "majors", label: "Trophy Room" },
  { id: "full-apex", label: "Full Apex Results" },
  { id: "apex", label: "Finals History" },
  { id: "compare", label: "Player H2H" },
  { id: "team-compare", label: "Team H2H" },
  { id: "dynasties", label: "Dynasties" },
  { id: "games", label: "Games" },
  { id: "splashfeed", label: "Splashfeed" },
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
        <div className="flex justify-between items-center h-[50px] md:h-[70px] gap-2">
          <div 
            className="text-lg md:text-3xl font-extrabold uppercase tracking-wider text-white cursor-pointer shrink-0"
            onClick={() => setActiveSection("home")}
          >
            Corefall<span className="text-primary">News</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-1 flex-1 justify-center">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`bg-transparent border-none text-sm px-3 py-2.5 cursor-pointer uppercase font-bold transition-colors whitespace-nowrap border-b-[3px] ${
                  activeSection === item.id 
                    ? "text-primary border-primary" 
                    : "text-muted-foreground border-transparent hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Wiki Link + Search */}
          <div className="flex items-center gap-2">
            <Link 
              to="/wiki" 
              className="hidden md:flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-primary transition-colors px-3 py-2"
            >
              <BookOpen className="h-4 w-4" />
              Wiki
            </Link>
            <GlobalSearch onPlayerClick={handlePlayerClick} onTeamClick={handleTeamClick} />
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
        {activeSection === "games" && (
          <GamesSection onPlayerClick={handlePlayerClick} />
        )}
        {activeSection === "splashfeed" && <SplashfeedSection />}
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
