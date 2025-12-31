export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        🏆 SEASON 710 COMPLETE • Daredevil Gaffe Wins New Life 710 • Mega Hawnnon Crowned Season Star
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-qalf mb-2 inline-block">NEW LIFE 710 CHAMPION</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            DAREDEVIL GAFFE<br/>WINS NEW LIFE 710
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The Qalf star claims his 2nd career major title, finishing the season 4th overall with 2500 points.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 710 Final Standings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Season Star 710</span>
          <h3 className="text-white mt-3">Mega Hawnnon Crowned Season Star</h3>
          <p className="text-foreground">
            The Dashlol ace finishes atop the standings with <span className="stat-highlight">3200 points</span> and 7 KOs, earning his first Season Star award.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-qalf">New Life Champion</span>
          <h3 className="text-white mt-3">Daredevil Gaffe Claims 2nd Major</h3>
          <p className="text-foreground">
            The Qalf rising star wins New Life 710, adding to his Heartland 709 title with <span className="stat-highlight">2500 points</span> this season.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Runner-Up</span>
          <h3 className="text-white mt-3">Vampire Ortez Finishes 2nd with 2800 Points</h3>
          <p className="text-foreground">
            Dashlol's other star finishes 2nd overall with <span className="stat-highlight">2800 points</span> and 13 KOs after 7th-8th at New Life.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">3rd Place</span>
          <h3 className="text-white mt-3">Nothing Sawryr 3rd with 2750 Points</h3>
          <p className="text-foreground">
            The Apex 709 champ finishes 3rd with <span className="stat-highlight">2750 points</span> and 8 KOs after 3rd place at New Life.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">Team Champions</span>
          <h3 className="text-white mt-3">Gastro Wins Team Title with 6600 Points</h3>
          <p className="text-foreground">
            Gastro claims the team standings with <span className="stat-highlight">6600 points</span>, ahead of Damage and Dashlol tied at 6000.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-engery">Breakout Season</span>
          <h3 className="text-white mt-3">Wraith Cunelly Surges to 5th with 2450</h3>
          <p className="text-foreground">
            The Engery star caps a stellar season with <span className="stat-highlight">2450 points</span> after 4th place at New Life.
          </p>
        </div>
      </div>
    </div>
  );
}
