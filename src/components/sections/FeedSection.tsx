export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        🏆 SEASON 710 • Sky Sunyer Wins Descent 710 • Gastro Leads Team Standings
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-zemigamar mb-2 inline-block">SKY DESCENT 710 CHAMPION</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            SKY SUNYER<br/>WINS DESCENT 710
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            Zemiga-Mar's star claims his 4th career trophy, surging to 3rd in season standings with 1100 points.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 710 Updates</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-zemigamar">Descent Champion</span>
          <h3 className="text-white mt-3">Sky Sunyer Wins 4th Career Major</h3>
          <p className="text-foreground">
            Sky Sunyer claims Descent 710, his <span className="stat-highlight">4th career trophy</span>. Rem Asamtoy finishes 2nd.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">Points Leader</span>
          <h3 className="text-white mt-3">Nothing Sawryr Leads with 1300 Points</h3>
          <p className="text-foreground">
            The reigning Apex Champion leads 710 standings. Vampire Ortez sits 2nd with <span className="stat-highlight">1200 points</span>.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">Team Dominance</span>
          <h3 className="text-white mt-3">Gastro Leads Teams with 2850 Points</h3>
          <p className="text-foreground">
            Gastro takes team lead with <span className="stat-highlight">2850 points</span>. Damage (2700) and Dashlol (2250) chase.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-zemigamar">Breakout</span>
          <h3 className="text-white mt-3">Sky Sunyer Surges to 3rd with 1100 Points</h3>
          <p className="text-foreground">
            The Zemiga-Mar star is having a career season with <span className="stat-highlight">4 KOs</span> through the first majors.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-qalf">Hot Start</span>
          <h3 className="text-white mt-3">Rem Asamtoy Climbs to 6th</h3>
          <p className="text-foreground">
            The Qalf veteran surges after Descent 2nd place finish, now at <span className="stat-highlight">1000 points</span>.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">Contender</span>
          <h3 className="text-white mt-3">Jam Naze Rises with 5 KOs</h3>
          <p className="text-foreground">
            The young Gastro star leads the season in KOs with <span className="stat-highlight">5 total</span> through 4 majors.
          </p>
        </div>
      </div>
    </div>
  );
}
