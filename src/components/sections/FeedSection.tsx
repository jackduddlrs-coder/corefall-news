export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        🏆 APEX 709 CHAMPION: NOTHING SAWRYR • Season 709 Complete • Cascade Juner & Vampire Ortez Tie for Season Leader • Qalf Wins CTT
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-gastro mb-2 inline-block">APEX 709 WORLD CHAMPION</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            NOTHING SAWRYR<br/>APEX 709 CHAMPION
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The Gastro star defeats Mega Hawnnon 2-1 in the Finals to claim his first Apex title and 5th career trophy.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 709 Final Standings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">New Life Champion</span>
          <h3 className="text-white mt-3">Vampire Ortez Wins Major #3</h3>
          <p className="text-foreground">
            Vampire claims New Life 709, his <span className="stat-highlight">3rd career major</span>. Supernova Aloi finishes 2nd.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Season Co-Leader</span>
          <h3 className="text-white mt-3">Cascade Juner Ties for S709 Lead</h3>
          <p className="text-foreground">
            Cascade Juner finishes with <span className="stat-highlight">2800 points</span>, tied with Vampire Ortez for the season lead.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-qalf">CTT Champions</span>
          <h3 className="text-white mt-3">Qalf Wins CTT 709</h3>
          <p className="text-foreground">
            Qalf dominates with <span className="stat-highlight">6650 points</span>. Dashlol 2nd (6400), Damage 3rd (5950).
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-qalf">Armageddon Champion</span>
          <h3 className="text-white mt-3">Zeus Ziki Won Armageddon</h3>
          <p className="text-foreground">
            Zeus claimed Armageddon 709 for his <span className="stat-highlight">6th career major</span>. Qalf dominated late season.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Malice Cup Champion</span>
          <h3 className="text-white mt-3">Mega Hawnnon Won Malice Cup</h3>
          <p className="text-foreground">
            Mega won Malice Cup 709 for his <span className="stat-highlight">3rd career major</span>. Finished 3rd in standings.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">Nightmare Champion</span>
          <h3 className="text-white mt-3">Supernova Aloi Won Nightmare</h3>
          <p className="text-foreground">
            Supernova claimed Nightmare 709 for his <span className="stat-highlight">1st career major</span>, defeating Vampire in finals.
          </p>
        </div>
      </div>
    </div>
  );
}