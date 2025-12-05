export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        APEX 707: Cascade Juner is the World Champion • Damage wins Team Title • Season 708 Begins.
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-damage mb-2 inline-block">Apex 707</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            CASCADE JUNER<br/>WORLD CHAMPION
          </h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-xl">
            The "Choker" narrative is dead. Cascade Juner defeats Wraith Cunelly (4-2, 2-4, 4-1) to claim the Apex 707 title.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Recent Activity</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Team Race</span>
          <h3 className="text-white mt-3">Damage Dominates</h3>
          <p className="text-foreground">
            With <span className="stat-highlight">4450 points</span>, Damage is chasing Engery (4800) for the top spot. Cascade and Bat Bornoil are firing on all cylinders.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-engery">The Chase</span>
          <h3 className="text-white mt-3">Zeus Ziki</h3>
          <p className="text-foreground">
            Zeus Ziki sits at #3 (1750 pts) with 7 KOs, leading the charge for the current team leaders.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Veteran Watch</span>
          <h3 className="text-white mt-3">Rain at #11</h3>
          <p className="text-foreground">
            Rain Lieryon (1500 pts) remains in the mix, proving the 32-year-old legend still has plenty left in the tank.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-juniper">Rising Star</span>
          <h3 className="text-white mt-3">Vampire Ortez</h3>
          <p className="text-foreground">
            Breaking into the top 10 with 1550 points, Vampire Ortez is having a breakout season for Juniper.
          </p>
        </div>
      </div>
    </div>
  );
}
