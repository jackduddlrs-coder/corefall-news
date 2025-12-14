export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        MALICE 708: Zeus Ziki Wins 3rd Major of Season • Cascade Juner Claims 12th Career Title • 2 Majors Remain
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-calhal mb-2 inline-block">Malice 708</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            ZEUS ZIKI<br/>MALICE CHAMPION
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The Cal Hal star dominates Malice 708, defeating Bat Bornoil in the final to claim his 3rd major of the season.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 708 Updates</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-calhal">Points Leader</span>
          <h3 className="text-white mt-3">Zeus Extends Lead</h3>
          <p className="text-foreground">
            Zeus leads with <span className="stat-highlight">2900 points</span> after 8 majors. 13 KOs on the season. 7 career major titles!
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Milestone</span>
          <h3 className="text-white mt-3">Cascade Juner: 12 Titles</h3>
          <p className="text-foreground">
            Runner-up at Malice earns Cascade a trophy anyway! With his Malice 708 title, he reaches <span className="stat-highlight">12 career championships</span>.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Runner-Up</span>
          <h3 className="text-white mt-3">Bat Bornoil Surges to 2nd</h3>
          <p className="text-foreground">
            The Damage fighter climbs to 2nd with <span className="stat-highlight">2350 points</span> after a finals appearance at Malice. 8 KOs this season.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Rising Star</span>
          <h3 className="text-white mt-3">Vampire Ortez Top 5</h3>
          <p className="text-foreground">
            The Dashlol fighter finishes 3rd at Malice, climbing to 5th with <span className="stat-highlight">2100 points</span>. 11 KOs leads the league!
          </p>
        </div>
      </div>
    </div>
  );
}
