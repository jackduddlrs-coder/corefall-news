export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        🏆 SEASON 711 UNDERWAY • Jam Naze Wins Nightmare 711 • Mega Hawnnon Leads 2000
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-gastro mb-2 inline-block">NIGHTMARE 711 CHAMPION</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            JAM NAZE<br/>WINS NIGHTMARE 711
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The Gastro rising star claims his 3rd career major title, surging to 5th place with 1550 points.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 711 After Nightmare</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Points Leader</span>
          <h3 className="text-white mt-3">Mega Hawnnon Leads with 2000 Points</h3>
          <p className="text-foreground">
            The Apex champ extends his lead with <span className="stat-highlight">2000 points</span> and 6 KOs after Nightmare.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">Nightmare Champion</span>
          <h3 className="text-white mt-3">Jam Naze Claims 3rd Career Major</h3>
          <p className="text-foreground">
            The Gastro rising star wins Nightmare to surge to 5th with <span className="stat-highlight">1550 points</span> and 10 KOs.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">2nd Place</span>
          <h3 className="text-white mt-3">Vampire Ortez at 1850 Points</h3>
          <p className="text-foreground">
            The Dashlol star sits at 2nd with <span className="stat-highlight">1850 points</span> and 8 KOs.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">3rd Place</span>
          <h3 className="text-white mt-3">Nothing Sawryr at 1750 Points</h3>
          <p className="text-foreground">
            The reigning Apex champion holds 3rd with <span className="stat-highlight">1750 points</span> and 5 KOs.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">KO Leader</span>
          <h3 className="text-white mt-3">Jam Naze Leads with 10 KOs</h3>
          <p className="text-foreground">
            Jam takes the KO lead with <span className="stat-highlight">10 knockouts</span> through six tournaments.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Team Leaders</span>
          <h3 className="text-white mt-3">Dashlol Dominates with 4950 Points</h3>
          <p className="text-foreground">
            Dashlol extends team lead with <span className="stat-highlight">4950 points</span>, ahead of Limium (4200).
          </p>
        </div>
      </div>
    </div>
  );
}