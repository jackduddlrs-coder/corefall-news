export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        🏆 SEASON 710 • Vampire Ortez Wins Solar 710 • Damage Leads Team Standings
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-dashlol mb-2 inline-block">VAMPIRE SOLAR 710 CHAMPION</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            VAMPIRE ORTEZ<br/>WINS SOLAR 710
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            Dashlol's star claims his 4th career trophy, surging to 1st in season standings with 1750 points.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 710 Updates</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Solar Champion</span>
          <h3 className="text-white mt-3">Vampire Ortez Wins 4th Career Major</h3>
          <p className="text-foreground">
            Vampire Ortez claims Solar 710, his <span className="stat-highlight">4th career trophy</span>. Takes the lead with 1750 points.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Team Leader</span>
          <h3 className="text-white mt-3">Damage Leads Team Standings with 3150 Points</h3>
          <p className="text-foreground">
            Damage takes team lead with <span className="stat-highlight">3150 points</span>. Qalf (2950) and Dashlol (2900) chase.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">Strong Season</span>
          <h3 className="text-white mt-3">Nothing Sawryr at 1600 Points</h3>
          <p className="text-foreground">
            The reigning Apex Champion sits 2nd with <span className="stat-highlight">1600 points</span> and 6 KOs.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-qalf">Rising Star</span>
          <h3 className="text-white mt-3">Daredevil Gaffe Tied for 3rd with 1300 Points</h3>
          <p className="text-foreground">
            The Qalf star shares 3rd place with Sky Sunyer, both at <span className="stat-highlight">1300 points</span>.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-zemigamar">Breakout</span>
          <h3 className="text-white mt-3">Sky Sunyer at 1300 Points with 6 KOs</h3>
          <p className="text-foreground">
            The Zemiga-Mar star tied for 3rd with <span className="stat-highlight">6 KOs</span> through 5 majors.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Veteran</span>
          <h3 className="text-white mt-3">Cascade Juner 5th with 1200 Points</h3>
          <p className="text-foreground">
            The Damage veteran ranks 5th with <span className="stat-highlight">1200 points</span> and 4 KOs.
          </p>
        </div>
      </div>
    </div>
  );
}
