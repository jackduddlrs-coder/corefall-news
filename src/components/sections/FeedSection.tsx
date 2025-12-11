export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        NIGHTMARE 708: Zeus Ziki Wins Major Title #5 • Zeus Extends Points Lead • Gastro & Damage Tied for Team Lead
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-calhal mb-2 inline-block">Nightmare 708</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            ZEUS ZIKI<br/>NIGHTMARE CHAMPION
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The Cal Hal star wins his 5th career major title, defeating Bat Bornoil in the Nightmare final.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 708 Updates</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">Team Leaders</span>
          <h3 className="text-white mt-3">Gastro & Damage Tied at Top</h3>
          <p className="text-foreground">
            Both teams have <span className="stat-highlight">4050 points</span>. Gastro led by Nothing Sawryr (3rd), Daredevil Gaffe (8th). Damage led by Cascade Juner (4th), Bat Bornoil (9th).
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-calhal">Points Leader</span>
          <h3 className="text-white mt-3">Zeus Ziki Extends Lead</h3>
          <p className="text-foreground">
            The Nightmare champ leads with <span className="stat-highlight">2150 points</span> after his dominant win. 9 KOs through 6 majors. 5 career major titles.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Rising Star</span>
          <h3 className="text-white mt-3">Bat Bornoil's Finals Run</h3>
          <p className="text-foreground">
            The Damage fighter surges to 9th with <span className="stat-highlight">1350 points</span> after a finals appearance at Nightmare. 6 KOs on the season.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Breakout</span>
          <h3 className="text-white mt-3">Vampire Ortez Surges</h3>
          <p className="text-foreground">
            The Dashlol fighter climbs to 5th with <span className="stat-highlight">1500 points</span> after a 3rd place finish at Nightmare. 8 KOs on the season.
          </p>
        </div>
      </div>
    </div>
  );
}
