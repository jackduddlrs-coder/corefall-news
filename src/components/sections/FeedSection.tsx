export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        WIND BREAKERS 708: Bat Bornoil Wins 1st Major Title • Damage Takes Team Lead • Zeus Still Points Leader
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-damage mb-2 inline-block">Wind Breakers 708</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            BAT BORNOIL<br/>WIND BREAKERS CHAMPION
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The Damage star wins his 1st career major title, defeating Nothing Sawryr in the Wind Breakers final.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 708 Updates</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Team Leaders</span>
          <h3 className="text-white mt-3">Damage Takes the Lead</h3>
          <p className="text-foreground">
            Damage now leads with <span className="stat-highlight">5100 points</span>. Gastro 2nd (4700). Bat Bornoil's win pushes Damage to #1.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-calhal">Points Leader</span>
          <h3 className="text-white mt-3">Zeus Ziki Still Leads</h3>
          <p className="text-foreground">
            Zeus leads with <span className="stat-highlight">2350 points</span> after 7 majors. 10 KOs on the season. 5 career major titles.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Champion</span>
          <h3 className="text-white mt-3">Bat Bornoil's Breakthrough</h3>
          <p className="text-foreground">
            The Damage fighter surges to 3rd with <span className="stat-highlight">1900 points</span> after winning Wind Breakers. 1st career major title!
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">Runner-Up</span>
          <h3 className="text-white mt-3">Nothing Sawryr Close Behind</h3>
          <p className="text-foreground">
            The Gastro star climbs to 2nd with <span className="stat-highlight">2150 points</span> after a finals appearance at Wind Breakers.
          </p>
        </div>
      </div>
    </div>
  );
}
