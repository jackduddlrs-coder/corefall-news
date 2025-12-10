export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        SOLAR 708: Nothing Sawryr Wins Major Title #1 • Zeus Ziki Leads Points Race • Gastro Takes Team Race Lead
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-gastro mb-2 inline-block">Solar 708</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            NOTHING SAWRYR<br/>SOLAR CHAMPION
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The Gastro star claims his first career major title, defeating Daredevil Gaffe in the Solar final.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 708 Updates</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">Team Leader</span>
          <h3 className="text-white mt-3">Gastro Takes the Lead</h3>
          <p className="text-foreground">
            With <span className="stat-highlight">3650 points</span>, Gastro leads the team standings powered by Nothing Sawryr (2nd), Daredevil Gaffe (7th), and Supernova Aloi (13th).
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-calhal">Points Leader</span>
          <h3 className="text-white mt-3">Zeus Ziki Extends Lead</h3>
          <p className="text-foreground">
            The Heartland champ leads with <span className="stat-highlight">1600 points</span> after a 9th-12th finish at Solar. 6 KOs through 5 majors.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">Breakthrough</span>
          <h3 className="text-white mt-3">Nothing Sawryr's First Major</h3>
          <p className="text-foreground">
            The 27-year-old Gastro fighter climbs to 2nd with <span className="stat-highlight">1500 points</span> after his dominant Solar run. Now has 1 career major title.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">Rising Star</span>
          <h3 className="text-white mt-3">Daredevil Gaffe's Big Run</h3>
          <p className="text-foreground">
            The Gastro fighter surges to 7th with <span className="stat-highlight">1200 points</span> after a finals appearance at Solar. 6 KOs on the season.
          </p>
        </div>
      </div>
    </div>
  );
}
