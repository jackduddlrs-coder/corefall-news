export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        🔄 712 SEASON UNDERWAY • Daredevil Gaffe Wins Descent Trials 712 • Cal Hal Extends Team Lead
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-qalf mb-2 inline-block">DESCENT TRIALS 712 CHAMPION</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            DAREDEVIL GAFFE<br/>WINS DESCENT TRIALS 712
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The Qalf veteran captures his 3rd career major and surges to the top of the 712 standings with 1600 points.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 712 Leaders</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-qalf">Descent Trials 712</span>
          <h3 className="text-white mt-3">Daredevil Gaffe Wins Descent Trials 712</h3>
          <p className="text-foreground">
            Daredevil Gaffe captures <span className="stat-highlight">Descent Trials 712</span> — his 3rd career major.
          </p>
        </div>
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-qalf">Season Leader</span>
          <h3 className="text-white mt-3">Daredevil Gaffe Tops 712 Standings</h3>
          <p className="text-foreground">
            The Qalf star leads the 712 individual race with <span className="stat-highlight">1600 points</span> and 6 KOs.
          </p>
        </div>
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-calhal">Team Leader</span>
          <h3 className="text-white mt-3">Cal Hal Extends Team Lead</h3>
          <p className="text-foreground">
            Cal Hal paces the league with <span className="stat-highlight">2850 points</span>, ahead of Qalf (2400) and Limium (2250).
          </p>
        </div>
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Chasing the Lead</span>
          <h3 className="text-white mt-3">Vampire Ortez Holds 2nd at 1500</h3>
          <p className="text-foreground">
            Vampire Ortez sits second with <span className="stat-highlight">1500 points</span>, just ahead of Ghost Mazze (1350).
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
