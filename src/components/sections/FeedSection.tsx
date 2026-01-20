export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        🏆 SEASON 711 UNDERWAY • Titan Aui Wins Wind Breakers 711 • Mega Hawnnon Leads 2450
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-limium mb-2 inline-block">WIND BREAKERS 711 CHAMPION</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            TITAN AUI<br/>WINS WIND BREAKERS 711
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The Limium powerhouse claims his 2nd career major title, surging to 3rd place with 2050 points.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 711 After Wind Breakers</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Points Leader</span>
          <h3 className="text-white mt-3">Mega Hawnnon Leads with 2450 Points</h3>
          <p className="text-foreground">
            The Apex champ extends his lead with <span className="stat-highlight">2450 points</span> and 8 KOs after Wind Breakers.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-limium">Wind Breakers Champion</span>
          <h3 className="text-white mt-3">Titan Aui Claims 2nd Career Major</h3>
          <p className="text-foreground">
            The Limium powerhouse wins Wind Breakers to surge to 3rd with <span className="stat-highlight">2050 points</span> and 9 KOs.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">2nd Place</span>
          <h3 className="text-white mt-3">Vampire Ortez at 2050 Points</h3>
          <p className="text-foreground">
            The Dashlol star sits at 2nd with <span className="stat-highlight">2050 points</span> and 10 KOs (tied with Titan on points, leads KOs).
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">4th Place</span>
          <h3 className="text-white mt-3">Nothing Sawryr at 1850 Points</h3>
          <p className="text-foreground">
            The reigning Apex champion holds 4th with <span className="stat-highlight">1850 points</span> and 6 KOs.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">KO Leaders</span>
          <h3 className="text-white mt-3">Vampire Ortez & Jam Naze Lead with 10 KOs</h3>
          <p className="text-foreground">
            The KO race is tied at <span className="stat-highlight">10 knockouts</span> through seven tournaments.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Team Leaders</span>
          <h3 className="text-white mt-3">Dashlol Dominates with 5700 Points</h3>
          <p className="text-foreground">
            Dashlol extends team lead with <span className="stat-highlight">5700 points</span>, ahead of Limium (5300).
          </p>
        </div>
      </div>
    </div>
  );
}