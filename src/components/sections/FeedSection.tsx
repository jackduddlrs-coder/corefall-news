export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        SEASON 709 LIVE: Supernova Aloi Wins Nightmare 709 • 1st Career Major • Damage Leads CTT
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-gastro mb-2 inline-block">Major Winner</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            SUPERNOVA ALOI<br/>NIGHTMARE 709
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The Gastro star claims Nightmare 709 for his 1st career major, defeating Vampire Ortez in the finals.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 709 After Nightmare</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">Nightmare Champion</span>
          <h3 className="text-white mt-3">Supernova Aloi Wins Major #1</h3>
          <p className="text-foreground">
            Supernova defeats Vampire Ortez to claim Nightmare 709 with <span className="stat-highlight">1450 total points</span>. His 1st career major!
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Runner-Up</span>
          <h3 className="text-white mt-3">Vampire Ortez 2nd Place</h3>
          <p className="text-foreground">
            Vampire Ortez finishes runner-up at Nightmare with <span className="stat-highlight">1500 points</span>. Harsh Raii 3rd (1100), Cross Exzona 4th (950).
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">CTT Leaders</span>
          <h3 className="text-white mt-3">Damage Dominates Team Race</h3>
          <p className="text-foreground">
            Damage leads CTT with <span className="stat-highlight">4200 points</span>. Dashlol 2nd (3700), Gastro 3rd (3700).
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Season Leader</span>
          <h3 className="text-white mt-3">Cascade Juner Leads S709</h3>
          <p className="text-foreground">
            Cascade Juner leads with <span className="stat-highlight">1900 points</span>. Nothing Sawryr 2nd (1700), Mega Hawnnon 3rd (1550).
          </p>
        </div>
      </div>
    </div>
  );
}