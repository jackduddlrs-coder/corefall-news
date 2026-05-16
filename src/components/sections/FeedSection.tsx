export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        🔄 712 SEASON UNDERWAY • Rocket Wins Armageddon • Harsh Claims New Life • Daredevil Locks Season Star • Cal Hal Wins 712 CTT
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-calhal mb-2 inline-block">DOUBLEHEADER WEEKEND</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            ROCKET TAKES ARMAGEDDON<br/>HARSH WINS NEW LIFE
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            Rocket Dalbale grabs his 2nd career major while Harsh Raii breaks through for his first. Daredevil clinches the 712 Season Star and Cal Hal wraps the CTT crown.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 712 — Late Season Storylines</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-calhal">Armageddon 712</span>
          <h3 className="text-white mt-3">Rocket's Second Major</h3>
          <p className="text-foreground">
            Rocket Dalbale captures <span className="stat-highlight">Armageddon 712</span>, adding to his Heartland 711 crown for <span className="stat-highlight">2 career majors</span>.
          </p>
        </div>
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-afe">New Life 712</span>
          <h3 className="text-white mt-3">Harsh Raii Breaks Through</h3>
          <p className="text-foreground">
            Harsh Raii lifts his <span className="stat-highlight">first career major</span> at New Life 712, capping a 2300-point season for AFE.
          </p>
        </div>
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-qalf">Season Star</span>
          <h3 className="text-white mt-3">Daredevil Locks the 712 Star</h3>
          <p className="text-foreground">
            Daredevil Gaffe finishes the regular season at <span className="stat-highlight">3150 points</span> and <span className="stat-highlight">12 KOs</span> to claim the 712 Season Star.
          </p>
        </div>
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-calhal">CTT 712</span>
          <h3 className="text-white mt-3">Cal Hal Wins the Team Title</h3>
          <p className="text-foreground">
            Cal Hal closes the team race at <span className="stat-highlight">6650 points</span>, edging Limium (6150) and Qalf (5250) for the 712 CTT.
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
