export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        SEASON 709 LIVE: Vampire Ortez Wins Heritage 709 • Cascade Juner Leads Standings • Damage Dominates CTT
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-dashlol mb-2 inline-block">Major Winner</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            VAMPIRE ORTEZ<br/>HERITAGE 709
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The Dashlol star claims Heritage 709 for his 2nd career major, defeating Zeus Ziki in the finals.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 709 After Heritage</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Heritage Champion</span>
          <h3 className="text-white mt-3">Vampire Ortez Wins Major #2</h3>
          <p className="text-foreground">
            Vampire defeats Zeus Ziki to claim Heritage 709 with <span className="stat-highlight">900 total points</span>. His 2nd career major!
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Points Leader</span>
          <h3 className="text-white mt-3">Cascade Juner Leads Standings</h3>
          <p className="text-foreground">
            Cascade takes the lead with <span className="stat-highlight">950 points</span>. Vampire Ortez and Mega Hawnnon tied at 900.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">CTT Leaders</span>
          <h3 className="text-white mt-3">Damage Dominates Team Race</h3>
          <p className="text-foreground">
            Damage leads CTT with <span className="stat-highlight">2400 points</span>. Dashlol 2nd (2100), Qalf 3rd (1550).
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-engery">Top Performers</span>
          <h3 className="text-white mt-3">Season 709 Standouts</h3>
          <p className="text-foreground">
            Wraith Cunelly 4th (850), Daredevil Gaffe 5th (850), Sky Sunyer 6th (800). Tight race at the top!
          </p>
        </div>
      </div>
    </div>
  );
}