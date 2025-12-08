export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        CHAOS REIGNS 708: Pulse Farward Wins Major #1 • Zeus Ziki Leads Season Race • Gastro Dominates Team Standings
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-varcity mb-2 inline-block">Chaos Reigns 708</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            PULSE FARWARD<br/>CHAOS REIGNS CHAMPION
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The Varcity star claims his first career major title, defeating Heal Calofloure in the Chaos Reigns final.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 708 Updates</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">Team Leader</span>
          <h3 className="text-white mt-3">Gastro Commands the Race</h3>
          <p className="text-foreground">
            With <span className="stat-highlight">1700 points</span>, Gastro leads the team standings behind Nothing Sawryr (2nd), Daredevil Gaffe (6th), and Supernova Aloi (T-10th).
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-calhal">Points Leader</span>
          <h3 className="text-white mt-3">Zeus Ziki Leads Individual Race</h3>
          <p className="text-foreground">
            The Heartland champ stays atop with <span className="stat-highlight">850 points</span> after a 5th-6th finish at Chaos Reigns. 3 KOs through 2 majors.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-varcity">Breakthrough</span>
          <h3 className="text-white mt-3">Pulse Farward's First Major</h3>
          <p className="text-foreground">
            The 27-year-old Varcity fighter climbs to 3rd with <span className="stat-highlight">750 points</span> and leads the season with 6 KOs after his dominant Chaos Reigns run.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Defending Champ</span>
          <h3 className="text-white mt-3">Cascade Juner in Top 4</h3>
          <p className="text-foreground">
            The reigning Apex champion sits tied 3rd with 750 points after a 3rd place finish at Chaos Reigns. Still the favorite heading forward.
          </p>
        </div>
      </div>
    </div>
  );
}