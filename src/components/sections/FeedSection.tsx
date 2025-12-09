export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        DESCENT 708: Mega Hawnnon Wins Title #1 • Zeus Ziki Commands Points Lead • Dashlol Takes Team Race Lead
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-dashlol mb-2 inline-block">Descent 708</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            MEGA HAWNNON<br/>DESCENT CHAMPION
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The Dashlol star claims his first career major title, defeating Cross Exzona in the Descent final.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 708 Updates</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Team Leader</span>
          <h3 className="text-white mt-3">Dashlol Takes the Lead</h3>
          <p className="text-foreground">
            With <span className="stat-highlight">2650 points</span>, Dashlol leads the team standings powered by Mega Hawnnon (T-3rd), Vampire Ortez (T-5th), and Rain Lieryon (19th).
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-calhal">Points Leader</span>
          <h3 className="text-white mt-3">Zeus Ziki Extends Lead</h3>
          <p className="text-foreground">
            The Heartland champ leads with <span className="stat-highlight">1400 points</span> after a 7th-8th finish at Descent. 5 KOs through 4 majors.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Breakthrough</span>
          <h3 className="text-white mt-3">Mega Hawnnon's First Major</h3>
          <p className="text-foreground">
            The 26-year-old Dashlol fighter climbs to T-3rd with <span className="stat-highlight">1050 points</span> after his dominant Descent run. Now has 1 career title.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-juniper">Rising Star</span>
          <h3 className="text-white mt-3">Cross Exzona's Big Run</h3>
          <p className="text-foreground">
            The Juniper fighter surges to 17th with <span className="stat-highlight">700 points</span> after a finals appearance at Descent. 3 KOs in the tournament.
          </p>
        </div>
      </div>
    </div>
  );
}
