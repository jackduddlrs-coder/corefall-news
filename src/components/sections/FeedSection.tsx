export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        🔄 712 SEASON UNDERWAY • Sky Sunyer Wins Chaos Reigns 712 • Cal Hal Leads Team Race
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-zemigamar mb-2 inline-block">CHAOS REIGNS 712 CHAMPION</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            SKY SUNYER<br/>WINS CHAOS REIGNS 712
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The Zemiga-Mar star claims Chaos Reigns 712 — his 4th career major and 7th total title.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 712 Leaders</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-zemigamar">Chaos Reigns 712</span>
          <h3 className="text-white mt-3">Sky Sunyer Wins Chaos Reigns 712</h3>
          <p className="text-foreground">
            Sky Sunyer captures <span className="stat-highlight">Chaos Reigns 712</span>, his 4th career major and 7th total title.
          </p>
        </div>
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-zemigamar">Season Leader</span>
          <h3 className="text-white mt-3">Sky Sunyer Tops 712 Standings</h3>
          <p className="text-foreground">
            The Zemiga-Mar star leads the 712 individual race with <span className="stat-highlight">850 points</span> and 3 KOs.
          </p>
        </div>
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-calhal">Team Leader</span>
          <h3 className="text-white mt-3">Cal Hal Leads Team Race</h3>
          <p className="text-foreground">
            Cal Hal paces the league with <span className="stat-highlight">1300 points</span>, ahead of Dashlol (1250) and Gastro (1150).
          </p>
        </div>
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">2nd Place</span>
          <h3 className="text-white mt-3">Jam Naze Surges to 2nd</h3>
          <p className="text-foreground">
            The Gastro star sits 2nd in 712 standings with <span className="stat-highlight">800 points</span> and 4 KOs.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6 mt-10">Looking Back: Season 711</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-zemigamar">Apex 711 Champion</span>
          <h3 className="text-white mt-3">Sky Sunyer Won Apex 711</h3>
          <p className="text-foreground">
            The Zemiga-Mar star captured the Apex World Championship, sweeping Nothing Sawryr <span className="stat-highlight">2-0</span> in the Grand Finals.
          </p>
        </div>
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">711 Season Champion</span>
          <h3 className="text-white mt-3">Mega Hawnnon Topped 711 with 3250 Points</h3>
          <p className="text-foreground">
            Mega Hawnnon dominated 711 with <span className="stat-highlight">3250 points</span> and 14 KOs. Full standings available in the Archive.
          </p>
        </div>
      </div>
    </div>
  );
}
