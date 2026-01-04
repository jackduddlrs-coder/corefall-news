export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        🏆 SEASON 711 UNDERWAY • Vampire Ortez Wins Chaos Reigns 711 • Dashlol Leads Team Standings
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-dashlol mb-2 inline-block">CHAOS REIGNS 711 CHAMPION</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            VAMPIRE ORTEZ<br/>WINS CHAOS REIGNS 711
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The Dashlol star claims his 5th career major title, taking the 711 standings lead with 850 points.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 711 After Chaos Reigns</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Chaos Reigns Champion</span>
          <h3 className="text-white mt-3">Vampire Ortez Wins 5th Career Major</h3>
          <p className="text-foreground">
            The Dashlol star claims Chaos Reigns 711 to lead the season with <span className="stat-highlight">850 points</span> and 1 KO.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">2nd Place</span>
          <h3 className="text-white mt-3">Mega Hawnnon Strong with 750 Points</h3>
          <p className="text-foreground">
            The reigning Apex 710 champion has <span className="stat-highlight">750 points</span> and 3 KOs, trailing teammate Vampire.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-calhal">3rd Place</span>
          <h3 className="text-white mt-3">Rocket Dalbale Holds at 700 Points</h3>
          <p className="text-foreground">
            The Heartland 711 champion sits 3rd with <span className="stat-highlight">700 points</span> after the first two majors.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Team Leaders</span>
          <h3 className="text-white mt-3">Dashlol Leads with 1850 Points</h3>
          <p className="text-foreground">
            Dashlol dominates team standings with <span className="stat-highlight">1850 points</span>, ahead of Limium (1400).
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">KO Leader</span>
          <h3 className="text-white mt-3">Bat Bornoil Leads with 5 KOs</h3>
          <p className="text-foreground">
            The Damage fighter leads the KO race with <span className="stat-highlight">5 knockouts</span> through two tournaments.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-engery">Rising Stars</span>
          <h3 className="text-white mt-3">Wraith Cunelly 5th with 550 Points</h3>
          <p className="text-foreground">
            The Engery veteran climbs to 5th with <span className="stat-highlight">550 points</span> after a strong Chaos Reigns showing.
          </p>
        </div>
      </div>
    </div>
  );
}