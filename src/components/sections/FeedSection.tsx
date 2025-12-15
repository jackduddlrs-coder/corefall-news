export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        SEASON 708 COMPLETE: Zeus Ziki Named Season Star • Damage Wins CTT • New Life 708 Wraps Season
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-calhal mb-2 inline-block">Season Star 708</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            ZEUS ZIKI<br/>SEASON STAR 708
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The Cal Hal star dominates Season 708 with 3300 points and 14 KOs to claim Season Star honors.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 708 Final Standings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-calhal">Season Star</span>
          <h3 className="text-white mt-3">Zeus Ziki: Season Star 708</h3>
          <p className="text-foreground">
            Zeus earns Season Star with <span className="stat-highlight">3300 points</span>. Led the season despite falling in the Apex Finals. 14 KOs!
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-limium">New Life Champion</span>
          <h3 className="text-white mt-3">Heal Wins New Life 708</h3>
          <p className="text-foreground">
            Heal Calofloure wins New Life 708, finishing 2nd overall with <span className="stat-highlight">2750 points</span>. Career 7 total championships!
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">CTT Champions</span>
          <h3 className="text-white mt-3">Damage Wins CTT</h3>
          <p className="text-foreground">
            Damage claims CTT with <span className="stat-highlight">7100 points</span>. Dashlol 2nd (6600), Gastro 3rd (6100).
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-qalf">Top Performers</span>
          <h3 className="text-white mt-3">Season 708 Standouts</h3>
          <p className="text-foreground">
            Cascade Juner 3rd (2700), Nothing Sawryr 4th (2700), Vampire Ortez 5th (2500). Competitive season throughout!
          </p>
        </div>
      </div>
    </div>
  );
}
