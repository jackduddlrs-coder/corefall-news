export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        🏆 SEASON 710 • Titan Aui Wins Armageddon 710 • 9th Major of Season • Limium Surges
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-limium mb-2 inline-block">ARMAGEDDON 710 CHAMPION</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            TITAN AUI<br/>WINS ARMAGEDDON 710
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The Limium star claims his first career major title, jumping to 9th in season standings with 2000 points.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 710 Updates</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-limium">Armageddon Champion</span>
          <h3 className="text-white mt-3">Titan Aui Claims First Career Major</h3>
          <p className="text-foreground">
            The Limium star wins Armageddon 710, his <span className="stat-highlight">1st career major</span>. Wraith Cunelly finished 2nd, Mega Hawnnon 3rd.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Season Leader</span>
          <h3 className="text-white mt-3">Mega Hawnnon Extends Lead to 2750 Points</h3>
          <p className="text-foreground">
            Dashlol's star extends his lead with <span className="stat-highlight">2750 points</span> and 7 KOs after 3rd place finish at Armageddon.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Strong Season</span>
          <h3 className="text-white mt-3">Vampire Ortez 2nd with 2550 Points</h3>
          <p className="text-foreground">
            Dashlol's other star holds 2nd with <span className="stat-highlight">2550 points</span> and 11 KOs after 5th-6th at Armageddon.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">3rd Place</span>
          <h3 className="text-white mt-3">Nothing Sawryr at 2450 Points</h3>
          <p className="text-foreground">
            The Apex champ holds 3rd with <span className="stat-highlight">2450 points</span> and 6 KOs despite 17th-24th at Armageddon.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-engery">Rising</span>
          <h3 className="text-white mt-3">Wraith Cunelly Surges to 6th with 2100</h3>
          <p className="text-foreground">
            The Engery star jumps up with <span className="stat-highlight">2100 points</span> after runner-up finish at Armageddon.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-limium">Breakout</span>
          <h3 className="text-white mt-3">Titan Aui Jumps to 9th with 2000 Points</h3>
          <p className="text-foreground">
            The Armageddon champ surges to top 10 with <span className="stat-highlight">2000 points</span> and 6 KOs after his first major win.
          </p>
        </div>
      </div>
    </div>
  );
}
