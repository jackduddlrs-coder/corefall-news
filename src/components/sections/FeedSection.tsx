export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        🏆 SEASON 711 UNDERWAY • Sky Sunyer Wins Descent 711 • Mega Hawnnon Leads 1600
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-zemiga-mar mb-2 inline-block">DESCENT 711 CHAMPION</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            SKY SUNYER<br/>WINS DESCENT 711
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The Zemiga-Mar star claims his 5th career major title, surging to 2nd place with 1350 points.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 711 After Descent</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Points Leader</span>
          <h3 className="text-white mt-3">Mega Hawnnon Leads with 1600 Points</h3>
          <p className="text-foreground">
            The Apex champ extends his lead with <span className="stat-highlight">1600 points</span> and 4 KOs after Descent.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-zemiga-mar">Descent Champion</span>
          <h3 className="text-white mt-3">Sky Sunyer Claims 5th Career Major</h3>
          <p className="text-foreground">
            The Zemiga-Mar star wins Descent to surge to 2nd with <span className="stat-highlight">1350 points</span> and 6 KOs.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">3rd Place</span>
          <h3 className="text-white mt-3">Vampire Ortez at 1200 Points</h3>
          <p className="text-foreground">
            The Chaos Reigns winner sits tied for 3rd with <span className="stat-highlight">1200 points</span> and 5 KOs.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">4th Place</span>
          <h3 className="text-white mt-3">Nothing Sawryr Tied at 1200</h3>
          <p className="text-foreground">
            The reigning Apex finalist rises to 4th with <span className="stat-highlight">1200 points</span> and 3 KOs.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">KO Leader</span>
          <h3 className="text-white mt-3">Jam Naze Leads with 7 KOs</h3>
          <p className="text-foreground">
            The Gastro fighter extends the KO lead with <span className="stat-highlight">7 knockouts</span> through four tournaments.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Team Leaders</span>
          <h3 className="text-white mt-3">Dashlol Dominates with 3450 Points</h3>
          <p className="text-foreground">
            Dashlol extends team lead with <span className="stat-highlight">3450 points</span>, ahead of Limium (2600).
          </p>
        </div>
      </div>
    </div>
  );
}