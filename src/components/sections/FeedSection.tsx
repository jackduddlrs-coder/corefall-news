export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        ARMAGEDDON 708: Cascade Juner Wins 12th Career Title • Zeus Ziki Leads Points Race • 1 Major Remains
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-damage mb-2 inline-block">Armageddon 708</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            CASCADE JUNER<br/>ARMAGEDDON CHAMPION
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The Damage star captures his 12th career major title, defeating Vampire Ortez in the Armageddon 708 final.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 708 Updates</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-calhal">Points Leader</span>
          <h3 className="text-white mt-3">Zeus Ziki Leads the Race</h3>
          <p className="text-foreground">
            Zeus leads with <span className="stat-highlight">2650 points</span> after 9 majors. 11 KOs on the season. New Life 708 will decide the Season Star!
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Champion</span>
          <h3 className="text-white mt-3">Cascade Juner: 12 Titles</h3>
          <p className="text-foreground">
            The reigning Apex champion wins Armageddon, reaching <span className="stat-highlight">12 career championships</span>. Now 2nd with 2250 points.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Runner-Up</span>
          <h3 className="text-white mt-3">Vampire Ortez Rising</h3>
          <p className="text-foreground">
            The Dashlol fighter finishes 2nd at Armageddon, climbing to 4th with <span className="stat-highlight">2150 points</span>. 11 KOs leads the league!
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Team Race</span>
          <h3 className="text-white mt-3">Damage Extends Lead</h3>
          <p className="text-foreground">
            Damage leads with <span className="stat-highlight">5850 points</span>. Gastro 2nd (5250), Dashlol 3rd (5200). CTT title on the line!
          </p>
        </div>
      </div>
    </div>
  );
}
