export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        🏆 SEASON 711 UNDERWAY • Mega Hawnnon Wins Heritage 711 • Dashlol Leads Team Standings
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-dashlol mb-2 inline-block">HERITAGE 711 CHAMPION</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            MEGA HAWNNON<br/>WINS HERITAGE 711
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The reigning Apex champion claims his 6th career major title, taking the 711 standings lead with 1300 points.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 711 After Heritage</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Heritage Champion</span>
          <h3 className="text-white mt-3">Mega Hawnnon Claims 6th Career Major</h3>
          <p className="text-foreground">
            The Dashlol star wins Heritage 711 to take the lead with <span className="stat-highlight">1300 points</span> and 3 KOs.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">2nd Place</span>
          <h3 className="text-white mt-3">Vampire Ortez Sits at 1050 Points</h3>
          <p className="text-foreground">
            The Chaos Reigns winner has <span className="stat-highlight">1050 points</span> and 3 KOs, trailing teammate Mega.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-limium">3rd Place</span>
          <h3 className="text-white mt-3">Titan Aui Rises to 900 Points</h3>
          <p className="text-foreground">
            The Limium star climbs to 3rd with <span className="stat-highlight">900 points</span> and 3 KOs after Heritage.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Team Leaders</span>
          <h3 className="text-white mt-3">Dashlol Dominates with 2900 Points</h3>
          <p className="text-foreground">
            Dashlol extends team lead with <span className="stat-highlight">2900 points</span>, ahead of Limium (1950).
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">KO Leader</span>
          <h3 className="text-white mt-3">Jam Naze Leads with 6 KOs</h3>
          <p className="text-foreground">
            The Gastro fighter leads the KO race with <span className="stat-highlight">6 knockouts</span> through three tournaments.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-engery">Rising Stars</span>
          <h3 className="text-white mt-3">Wraith Cunelly 4th with 800 Points</h3>
          <p className="text-foreground">
            The Engery veteran shares 4th with Sky Sunyer at <span className="stat-highlight">800 points</span> each.
          </p>
        </div>
      </div>
    </div>
  );
}
