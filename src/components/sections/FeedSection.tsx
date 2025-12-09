export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        HERITAGE 708: Wraith Cunelly Wins Major #1 • Zeus Ziki Extends Points Lead • Damage Leads Team Race
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-engery mb-2 inline-block">Heritage 708</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            WRAITH CUNELLY<br/>HERITAGE CHAMPION
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The Engery star claims his first career major title, defeating Horse Queanlend in the Heritage final.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 708 Updates</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Team Leader</span>
          <h3 className="text-white mt-3">Damage Commands the Race</h3>
          <p className="text-foreground">
            With <span className="stat-highlight">2000 points</span>, Damage leads the team standings behind Cascade Juner (T-2nd), Bat Bornoil (12th), and Sky Sunyer (15th).
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-calhal">Points Leader</span>
          <h3 className="text-white mt-3">Zeus Ziki Extends Lead</h3>
          <p className="text-foreground">
            The Heartland champ stays atop with <span className="stat-highlight">1150 points</span> after a 5th-6th finish at Heritage. 5 KOs through 3 majors.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-engery">Breakthrough</span>
          <h3 className="text-white mt-3">Wraith Cunelly's First Major</h3>
          <p className="text-foreground">
            The 28-year-old Engery fighter climbs to T-4th with <span className="stat-highlight">850 points</span> after his dominant Heritage run. Now has 4 career titles.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-varcity">Hot Streak</span>
          <h3 className="text-white mt-3">Pulse Farward Stays Top 3</h3>
          <p className="text-foreground">
            The Chaos Reigns champ sits 2nd with <span className="stat-highlight">900 points</span> despite a 13th-16th finish at Heritage. Still leads season with 6 KOs.
          </p>
        </div>
      </div>
    </div>
  );
}