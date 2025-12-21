export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        SEASON 709 LIVE: Cascade Juner Wins Descent 709 • 11th Career Major • Damage Leads CTT
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-damage mb-2 inline-block">Major Winner</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            CASCADE JUNER<br/>DESCENT 709
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The Damage superstar claims Descent 709 for his 11th career major, defeating Daredevil Gaffe in the finals.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 709 After Descent</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Descent Champion</span>
          <h3 className="text-white mt-3">Cascade Juner Wins Major #11</h3>
          <p className="text-foreground">
            Cascade defeats Daredevil Gaffe to claim Descent 709 with <span className="stat-highlight">1500 total points</span>. His 11th career major!
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-qalf">Runner-Up</span>
          <h3 className="text-white mt-3">Daredevil Gaffe 2nd Place</h3>
          <p className="text-foreground">
            Daredevil finishes runner-up at Descent with <span className="stat-highlight">1300 points</span>. Sky Sunyer 3rd (1200), Wraith Cunelly 4th (1050).
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">CTT Leaders</span>
          <h3 className="text-white mt-3">Damage Dominates Team Race</h3>
          <p className="text-foreground">
            Damage leads CTT with <span className="stat-highlight">3300 points</span>. Qalf 2nd (2600), Dashlol 3rd (2350).
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Top Performers</span>
          <h3 className="text-white mt-3">Season 709 Standouts</h3>
          <p className="text-foreground">
            Vampire Ortez 5th (1000), Mega Hawnnon 6th (1000), Nothing Sawryr 7th (1000). Tight race behind the leaders!
          </p>
        </div>
      </div>
    </div>
  );
}