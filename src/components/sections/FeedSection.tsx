export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        🏆 SEASON 710 • Bat Bornoil Wins Bat Heritage 710 • Damage Leads Team Standings
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-damage mb-2 inline-block">BAT HERITAGE 710 CHAMPION</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            BAT BORNOIL<br/>WINS HERITAGE 710
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            Damage's rising star claims his 4th career trophy, powering his team to the top of the standings.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 710 Updates</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Heritage Champion</span>
          <h3 className="text-white mt-3">Bat Bornoil Wins 4th Career Major</h3>
          <p className="text-foreground">
            Bat Bornoil claims Bat Heritage 710, his <span className="stat-highlight">4th career trophy</span>. Cascade Juner finishes 2nd.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">Points Leader</span>
          <h3 className="text-white mt-3">Nothing Sawryr Leads with 1100 Points</h3>
          <p className="text-foreground">
            The reigning Apex Champion leads 710 standings. Bat Bornoil and Mega Hawnnon tied at <span className="stat-highlight">950 points</span>.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Team Dominance</span>
          <h3 className="text-white mt-3">Damage Leads Teams with 2200 Points</h3>
          <p className="text-foreground">
            Damage takes team lead with <span className="stat-highlight">2200 points</span>. Gastro (2100) and Dashlol (1850) chase.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-calhall">Breakout</span>
          <h3 className="text-white mt-3">Cross Exzona Climbs to 5th with 800 Points</h3>
          <p className="text-foreground">
            The Cal Hal veteran is having a career season with <span className="stat-highlight">4 KOs</span> through the first majors.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Hot Start</span>
          <h3 className="text-white mt-3">Damage Core Performing</h3>
          <p className="text-foreground">
            Bat Bornoil (950), Cascade Juner (750), and Totality Tryoe (500) power Damage's strong season start.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-qalf">Contender</span>
          <h3 className="text-white mt-3">Daredevil Gaffe Sits 7th with 750</h3>
          <p className="text-foreground">
            The young Qalf star tied with Cascade Juner, accumulating <span className="stat-highlight">3 KOs</span> through the majors.
          </p>
        </div>
      </div>
    </div>
  );
}
