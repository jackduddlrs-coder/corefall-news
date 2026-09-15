export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        🔄 713 SEASON UNDERWAY • Rocket Dalbale Wins Heartland Cup 713 • Cal Hal Leads the Team Race • 712 Season Now Archived
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-calhal mb-2 inline-block">HEARTLAND CUP 713</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            ROCKET OPENS 713<br/>WITH HEARTLAND GOLD
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            Rocket Dalbale takes the first major of the new season, his third career title, and jumps straight to the top of the 713 standings with 550 points.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 713 — Early Storylines</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-calhal">Heartland Cup 713</span>
          <h3 className="text-white mt-3">Rocket's Third Trophy</h3>
          <p className="text-foreground">
            Rocket Dalbale adds <span className="stat-highlight">Heartland Cup 713</span> to Armageddon 712 and Heartland 711 for <span className="stat-highlight">3 career majors</span>.
          </p>
        </div>
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-calhal">713 Team Race</span>
          <h3 className="text-white mt-3">Cal Hal Out in Front</h3>
          <p className="text-foreground">
            Cal Hal opens 713 on <span className="stat-highlight">1000 points</span>, ahead of Qalf, Limium and Engery (650 apiece).
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6 mt-10">Looking Back: Season 712</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-qalf">Apex 712 Champion</span>
          <h3 className="text-white mt-3">Daredevil Gaffe Ruled 712</h3>
          <p className="text-foreground">
            Daredevil beat Vampire Ortez in the Apex Grand Finals and claimed the <span className="stat-highlight">712 Season Star</span> with 3150 points.
          </p>
        </div>
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-calhal">712 CTT</span>
          <h3 className="text-white mt-3">Cal Hal Took the Team Title</h3>
          <p className="text-foreground">
            Cal Hal closed 712 on <span className="stat-highlight">6650 points</span>, edging Limium (6150) and Qalf (5250).
          </p>
        </div>
      </div>
    </div>
  );
}
