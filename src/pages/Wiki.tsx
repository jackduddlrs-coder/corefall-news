import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Users, Shield, Star, Trophy, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { pastStandings, seasons, trophyData, getTeamClass } from "@/data/corefallData";
import { fighterBios, teamBios, getAllTeams } from "@/data/wikiData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Wiki = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"fighters" | "teams">("fighters");

  // Get all unique fighters from standings data
  const allFighters = useMemo(() => {
    const fighters = new Set<string>();
    Object.values(pastStandings).forEach(seasonData => {
      seasonData.forEach(p => fighters.add(p.Name));
    });
    return Array.from(fighters).sort();
  }, []);

  const allTeams = getAllTeams();

  // Filter based on search
  const filteredFighters = useMemo(() => {
    if (!searchQuery) return allFighters;
    return allFighters.filter(f => 
      f.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allFighters, searchQuery]);

  const filteredTeams = useMemo(() => {
    if (!searchQuery) return allTeams;
    return allTeams.filter(t => 
      t.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allTeams, searchQuery]);

  // Get featured fighters (Hall of Immortals + recent champions)
  const hallOfImmortals = [
    "Pheonix Oliv", "Mountain Granton", "Snow Masogoto", "Soler Varo", 
    "Spade Faxzin", "Prince Jonkan", "Vibrant Yaul", "Ring Hawlikaw", 
    "Rolle Asikov", "Rain Lieryon"
  ];

  const recentChampions = seasons.slice(0, 5).map(s => s.apex);

  // Get fighter stats for display
  const getFighterStats = (name: string) => {
    let totalPoints = 0;
    let seasons = 0;
    Object.values(pastStandings).forEach(data => {
      const found = data.find(p => p.Name === name);
      if (found) {
        totalPoints += found.Points;
        seasons++;
      }
    });
    const trophy = trophyData.find(t => t.name === name);
    return { totalPoints, seasons, titles: trophy?.total || 0 };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="bg-header px-3 md:px-8 border-b-[3px] border-primary sticky top-0 z-50 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
        <div className="flex justify-between items-center h-[50px] md:h-[70px] gap-2">
          <Link 
            to="/"
            className="text-lg md:text-3xl font-extrabold uppercase tracking-wider text-white shrink-0 hover:text-primary transition-colors"
          >
            Corefall<span className="text-primary">News</span>
          </Link>
          <div className="text-xl md:text-2xl font-bold text-primary">Wiki</div>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto py-6 md:py-10 px-3 md:px-5">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-wider text-white mb-3">
            Corefall <span className="text-primary">Encyclopedia</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the complete history of fighters and teams from the world of Corefall. Discover bios, stats, and legacies.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search fighters or teams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-panel border-border h-12 text-base"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "fighters" | "teams")} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="fighters" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Fighters
            </TabsTrigger>
            <TabsTrigger value="teams" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Teams
            </TabsTrigger>
          </TabsList>

          {/* Fighters Tab */}
          <TabsContent value="fighters">
            {!searchQuery && (
              <>
                {/* Featured: Hall of Immortals */}
                <section className="mb-10">
                  <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Hall of Immortals
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {hallOfImmortals.map(name => {
                      const stats = getFighterStats(name);
                      const bio = fighterBios[name];
                      return (
                        <Link
                          key={name}
                          to={`/wiki/player/${encodeURIComponent(name)}`}
                          className="bg-gradient-to-br from-amber-500/10 to-background border border-amber-500/30 p-4 rounded-xl hover:border-amber-500/60 transition-all group"
                        >
                          <div className="text-amber-400 text-xs font-bold mb-1">👑 Legend</div>
                          <div className="font-bold text-white group-hover:text-primary transition-colors truncate">
                            {name}
                          </div>
                          {bio?.nickname && (
                            <div className="text-xs text-muted-foreground italic">"{bio.nickname}"</div>
                          )}
                          <div className="text-[10px] text-muted-foreground mt-2">
                            {stats.titles} titles
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>

                {/* Recent Champions */}
                <section className="mb-10">
                  <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Recent Apex Champions
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {[...new Set(recentChampions)].map(name => {
                      const stats = getFighterStats(name);
                      const bio = fighterBios[name];
                      return (
                        <Link
                          key={name}
                          to={`/wiki/player/${encodeURIComponent(name)}`}
                          className="bg-panel border border-border p-4 rounded-xl hover:border-primary transition-all group flex-1 min-w-[200px] max-w-[300px]"
                        >
                          <div className="font-bold text-white group-hover:text-primary transition-colors">
                            {name}
                          </div>
                          {bio?.nickname && (
                            <div className="text-xs text-muted-foreground italic">"{bio.nickname}"</div>
                          )}
                          <div className="text-xs text-muted-foreground mt-1">
                            {stats.totalPoints.toLocaleString()} career pts • {stats.titles} titles
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              </>
            )}

            {/* All Fighters Directory */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">
                {searchQuery ? `Search Results (${filteredFighters.length})` : "All Fighters"}
              </h2>
              <div className="bg-panel rounded-xl border border-border overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
                  {filteredFighters.slice(0, 60).map(name => {
                    const stats = getFighterStats(name);
                    return (
                      <Link
                        key={name}
                        to={`/wiki/player/${encodeURIComponent(name)}`}
                        className="flex items-center justify-between p-3 hover:bg-muted/50 transition-colors group"
                      >
                        <div>
                          <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {name}
                          </span>
                          <span className="text-xs text-muted-foreground ml-2">
                            {stats.totalPoints.toLocaleString()} pts
                          </span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </Link>
                    );
                  })}
                </div>
                {filteredFighters.length > 60 && (
                  <div className="text-center py-3 text-muted-foreground text-sm border-t border-border">
                    And {filteredFighters.length - 60} more fighters...
                  </div>
                )}
              </div>
            </section>
          </TabsContent>

          {/* Teams Tab */}
          <TabsContent value="teams">
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">
                {searchQuery ? `Search Results (${filteredTeams.length})` : "All Teams"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTeams.map(team => {
                  const bio = teamBios[team];
                  return (
                    <Link
                      key={team}
                      to={`/wiki/team/${encodeURIComponent(team)}`}
                      className="bg-panel border border-border p-5 rounded-xl hover:border-primary transition-all group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`team-tag ${getTeamClass(team)} text-sm font-bold`}>
                          {team}
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      {bio?.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {bio.description}
                        </p>
                      )}
                      {bio?.founded && (
                        <div className="text-[10px] text-muted-foreground mt-2">
                          Est. {bio.founded}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="text-center p-6 md:p-10 mt-8 md:mt-12 bg-header text-muted-foreground border-t border-border text-sm">
        <p>&copy; 707 Corefall News.</p>
        <Link to="/" className="text-primary hover:underline text-xs">← Back to Home</Link>
      </footer>
    </div>
  );
};

export default Wiki;
