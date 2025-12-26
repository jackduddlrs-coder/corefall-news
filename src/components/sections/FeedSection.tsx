export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        SEASON 709 LIVE: Zeus Ziki Wins Armageddon 709 • Cascade Juner Leads Individual Race • Qalf Dominates CTT
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-qalf mb-2 inline-block">Major Winner</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            ZEUS ZIKI<br/>ARMAGEDDON 709
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The Qalf star claims Armageddon 709 for his 6th career major, continuing his legendary run.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 709 After Armageddon</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-qalf">Armageddon Champion</span>
          <h3 className="text-white mt-3">Zeus Ziki Wins Major #6</h3>
          <p className="text-foreground">
            Zeus claims Armageddon 709, his <span className="stat-highlight">6th career major</span>. Qalf continues their dominant season.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Malice Cup Champion</span>
          <h3 className="text-white mt-3">Mega Hawnnon Claims Malice Cup</h3>
          <p className="text-foreground">
            Mega wins Malice Cup 709 for his <span className="stat-highlight">3rd career major</span>. Damage stays in the hunt.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-qalf">Wind Breakers Champion</span>
          <h3 className="text-white mt-3">Sky Sunyer Wins Wind Breakers</h3>
          <p className="text-foreground">
            Sky takes Wind Breakers 709 for his <span className="stat-highlight">1st career major</span>. A breakthrough win!
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Season Leader</span>
          <h3 className="text-white mt-3">Cascade Juner Leads S709</h3>
          <p className="text-foreground">
            Cascade Juner leads with <span className="stat-highlight">2600 points</span>. Nothing Sawryr 2nd (2350), Zeus Ziki 3rd (2250).
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-qalf">CTT Leaders</span>
          <h3 className="text-white mt-3">Qalf Dominates Team Race</h3>
          <p className="text-foreground">
            Qalf leads CTT with <span className="stat-highlight">5800 points</span>. Damage 2nd (5600), Dashlol 3rd (5200).
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">Earlier This Season</span>
          <h3 className="text-white mt-3">Supernova Aloi Won Nightmare</h3>
          <p className="text-foreground">
            Supernova claimed Nightmare 709 for his <span className="stat-highlight">1st career major</span>, defeating Vampire Ortez in finals.
          </p>
        </div>
      </div>
    </div>
  );
}