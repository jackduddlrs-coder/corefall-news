export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        🔄 712 SEASON UNDERWAY • Daredevil Gaffe Wins Malice Cup 712 • Cal Hal Surges to 5000 Team Points
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-qalf mb-2 inline-block">MALICE CUP 712 CHAMPION</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            DAREDEVIL GAFFE<br/>WINS MALICE CUP 712
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The Qalf phenom claims his 4th career major and pulls clear of the field at 2700 points on the season.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 712 Leaders</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-qalf">Malice Cup 712</span>
          <h3 className="text-white mt-3">Daredevil's 4th Major</h3>
          <p className="text-foreground">
            Daredevil Gaffe captures <span className="stat-highlight">Malice Cup 712</span> — his second trophy of the season after Descent Trials.
          </p>
        </div>
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-qalf">Runaway Lead</span>
          <h3 className="text-white mt-3">Daredevil Pulls Away at 2700</h3>
          <p className="text-foreground">
            Daredevil opens a <span className="stat-highlight">350-point gap</span> over Vampire Ortez (2350) and Jam Naze (2250) at the top of the season race.
          </p>
        </div>
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-calhal">Team Leader</span>
          <h3 className="text-white mt-3">Cal Hal Reclaims the Top Spot</h3>
          <p className="text-foreground">
            Cal Hal jumps to <span className="stat-highlight">5000 points</span>, edging Limium (4750) and Qalf (4600) for the team lead.
          </p>
        </div>
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">KO King</span>
          <h3 className="text-white mt-3">Daredevil Tops KOs at 10</h3>
          <p className="text-foreground">
            Daredevil also leads the KO race with <span className="stat-highlight">10 knockouts</span>, ahead of Pepper Teraa and Octane Danza (9).
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
