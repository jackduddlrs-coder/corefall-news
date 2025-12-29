export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        🏆 SEASON 710 • Bat Bornoil Wins Bat Heritage 710 • Damage Surges to 2nd
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
            Damage's rising star claims his 4th career trophy, powering his team to 2nd in the standings.
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
          <span className="team-tag team-dashlol">Points Leader</span>
          <h3 className="text-white mt-3">Mega Hawnnon Takes 710 Lead with 1400</h3>
          <p className="text-foreground">
            Mega Hawnnon leads 710 standings with <span className="stat-highlight">1400 points</span>. Nothing Sawryr and Vampire Ortez tied at 1150.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Team Dominance</span>
          <h3 className="text-white mt-3">Dashlol Leads with 2900 Points</h3>
          <p className="text-foreground">
            Dashlol maintains team lead with <span className="stat-highlight">2900 points</span>. Damage surges to 2nd (2800), Gastro 3rd (2150).
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Rising Strong</span>
          <h3 className="text-white mt-3">Cascade Juner Climbs to 4th with 1000 Points</h3>
          <p className="text-foreground">
            The 2x Apex Champion rebounds with a Heritage runner-up finish, now 4th overall with <span className="stat-highlight">5 KOs</span>.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Hot Start</span>
          <h3 className="text-white mt-3">Damage Core Performing</h3>
          <p className="text-foreground">
            Cascade Juner (1000), Bat Bornoil (950), and Totality Tryoe (650) power Damage's strong season start.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-qalf">Contender</span>
          <h3 className="text-white mt-3">Daredevil Gaffe Sits 6th with 900</h3>
          <p className="text-foreground">
            The young Qalf star continues consistent play, accumulating <span className="stat-highlight">4 KOs</span> through 3 tournaments.
          </p>
        </div>
      </div>
    </div>
  );
}
