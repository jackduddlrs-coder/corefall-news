export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        🏆 SEASON 711 UNDERWAY • Rem Asamtoy Wins Malice Cup 711 • Mega Hawnnon Leads 2700
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-qalf mb-2 inline-block">MALICE CUP 711 CHAMPION</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            REM ASAMTOY<br/>WINS MALICE CUP 711
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The Qalf veteran claims his 1st career major title, surging to 10th place with 1750 points.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 711 After Malice Cup</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Points Leader</span>
          <h3 className="text-white mt-3">Mega Hawnnon Leads with 2700 Points</h3>
          <p className="text-foreground">
            The Apex champ extends his lead with <span className="stat-highlight">2700 points</span> and 10 KOs after Malice Cup.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-qalf">Malice Cup Champion</span>
          <h3 className="text-white mt-3">Rem Asamtoy Claims 1st Career Major</h3>
          <p className="text-foreground">
            The Qalf veteran wins Malice Cup to surge to 10th with <span className="stat-highlight">1750 points</span> and 8 KOs.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">2nd Place</span>
          <h3 className="text-white mt-3">Vampire Ortez at 2350 Points</h3>
          <p className="text-foreground">
            The Dashlol star sits at 2nd with <span className="stat-highlight">2350 points</span> and 11 KOs.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">KO Leader</span>
          <h3 className="text-white mt-3">Jam Naze Leads with 12 KOs</h3>
          <p className="text-foreground">
            The Gastro slugger leads the KO race with <span className="stat-highlight">12 knockouts</span> through eight tournaments.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-limium">3rd/4th Place</span>
          <h3 className="text-white mt-3">Titan Aui & Sky Sunyer Tied at 2150</h3>
          <p className="text-foreground">
            Both fighters have <span className="stat-highlight">2150 points</span> — Titan leads in KOs (9 vs 8).
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Team Leaders</span>
          <h3 className="text-white mt-3">Dashlol Dominates with 6450 Points</h3>
          <p className="text-foreground">
            Dashlol extends team lead with <span className="stat-highlight">6450 points</span>, ahead of Limium (5900).
          </p>
        </div>
      </div>
    </div>
  );
}