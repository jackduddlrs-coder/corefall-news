export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        SEASON 709 LIVE: Wraith Cunelly Wins Chaos Reigns 709 • Damage Leads CTT Race • Mega Hawnnon Top Standings
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-engery mb-2 inline-block">Major Winner</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            WRAITH CUNELLY<br/>CHAOS REIGNS 709
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The Engery veteran claims his 5th career major, defeating Cascade Juner in the finals for Chaos Reigns 709.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 709 After Chaos Reigns</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-engery">Chaos Reigns Champion</span>
          <h3 className="text-white mt-3">Wraith Cunelly Wins Major #5</h3>
          <p className="text-foreground">
            Wraith defeats Cascade Juner to claim Chaos Reigns 709 with <span className="stat-highlight">650 total points</span>. His 5th career major!
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Points Leader</span>
          <h3 className="text-white mt-3">Mega Hawnnon Leads Standings</h3>
          <p className="text-foreground">
            Mega takes the lead with <span className="stat-highlight">700 points</span> after 3rd place Chaos finish. Daredevil Gaffe tied at 700.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">CTT Leaders</span>
          <h3 className="text-white mt-3">Damage Leads Team Race</h3>
          <p className="text-foreground">
            Damage leads CTT with <span className="stat-highlight">1800 points</span>. Dashlol 2nd (1250), Qalf 3rd (1200).
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-qalf">Top Performers</span>
          <h3 className="text-white mt-3">Season 709 Standouts</h3>
          <p className="text-foreground">
            Cascade Juner 3rd (650), Nothing Sawryr 4th (650), Wraith Cunelly 5th (650). Tight race at the top!
          </p>
        </div>
      </div>
    </div>
  );
}