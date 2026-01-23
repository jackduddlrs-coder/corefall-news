export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        🏆 SEASON 711 UNDERWAY • Nothing Sawryr Wins Armageddon 711 • Mega Hawnnon Leads 3000
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-gastro mb-2 inline-block">ARMAGEDDON 711 CHAMPION</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            NOTHING SAWRYR<br/>WINS ARMAGEDDON 711
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The Gastro superstar claims his 9th career title, surging to 3rd place with 2450 points.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 711 After Armageddon</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">Armageddon Champion</span>
          <h3 className="text-white mt-3">Nothing Sawryr Claims 9th Career Title</h3>
          <p className="text-foreground">
            The Apex 709 champion adds Armageddon to his collection, climbing to 3rd with <span className="stat-highlight">2450 points</span>.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Points Leader</span>
          <h3 className="text-white mt-3">Mega Hawnnon Extends Lead to 3000 Points</h3>
          <p className="text-foreground">
            The Apex champ dominates with <span className="stat-highlight">3000 points</span> and 12 KOs after Armageddon.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">2nd Place</span>
          <h3 className="text-white mt-3">Vampire Ortez at 2550 Points</h3>
          <p className="text-foreground">
            The Dashlol star sits at 2nd with <span className="stat-highlight">2550 points</span> and 11 KOs.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">KO Leaders</span>
          <h3 className="text-white mt-3">Mega Hawnnon & Jam Naze Lead with 12 KOs</h3>
          <p className="text-foreground">
            The KO race is tied at <span className="stat-highlight">12 knockouts</span> between Dashlol and Gastro stars.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-zemigamar">4th Place</span>
          <h3 className="text-white mt-3">Sky Sunyer Climbs to 2300 Points</h3>
          <p className="text-foreground">
            The Zemiga-Mar star holds 4th place with <span className="stat-highlight">2300 points</span> and 9 KOs.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Team Leaders</span>
          <h3 className="text-white mt-3">Dashlol Dominates with 7050 Points</h3>
          <p className="text-foreground">
            Dashlol extends team lead with <span className="stat-highlight">7050 points</span>, ahead of Limium (6250).
          </p>
        </div>
      </div>
    </div>
  );
}
