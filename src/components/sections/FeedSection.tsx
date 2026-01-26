export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        🏆 SEASON 711 COMPLETE • Rem Asamtoy Wins New Life 711 • Mega Hawnnon Finishes 711 with 3250 Points
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-qalf mb-2 inline-block">NEW LIFE 711 CHAMPION</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            REM ASAMTOY<br/>WINS NEW LIFE 711
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The Qalf star claims his 2nd major of the season, surging to 6th place with 2400 points.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 711 Final Standings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-qalf">New Life Champion</span>
          <h3 className="text-white mt-3">Rem Asamtoy Claims 2nd Major of 711</h3>
          <p className="text-foreground">
            The Qalf star adds New Life to his Malice Cup title, climbing to 6th with <span className="stat-highlight">2400 points</span>.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Season Champion</span>
          <h3 className="text-white mt-3">Mega Hawnnon Finishes 711 with 3250 Points</h3>
          <p className="text-foreground">
            The Apex champ dominates the season with <span className="stat-highlight">3250 points</span> and 14 KOs.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">2nd Place</span>
          <h3 className="text-white mt-3">Vampire Ortez Finishes at 2650 Points</h3>
          <p className="text-foreground">
            The Dashlol star ends the season at 2nd with <span className="stat-highlight">2650 points</span> and 12 KOs.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">KO Leader</span>
          <h3 className="text-white mt-3">Mega Hawnnon Leads Season with 14 KOs</h3>
          <p className="text-foreground">
            The season star finishes with <span className="stat-highlight">14 knockouts</span>, ahead of Jam Naze (13).
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">3rd Place</span>
          <h3 className="text-white mt-3">Nothing Sawryr Finishes 711 at 2550 Points</h3>
          <p className="text-foreground">
            The Armageddon champion ends the season at 3rd with <span className="stat-highlight">2550 points</span> and 7 KOs.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Team Champions</span>
          <h3 className="text-white mt-3">Dashlol Wins Team Race with 7550 Points</h3>
          <p className="text-foreground">
            Dashlol finishes the season on top with <span className="stat-highlight">7550 points</span>, ahead of Limium (7000).
          </p>
        </div>
      </div>
    </div>
  );
}
