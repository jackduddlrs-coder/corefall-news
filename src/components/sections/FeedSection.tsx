export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        🏆 SEASON 710 • Mega Hawnnon Wins Nightmare 710 • Gastro & Damage Tied for Team Lead
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-dashlol mb-2 inline-block">MEGA NIGHTMARE 710 CHAMPION</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            MEGA HAWNNON<br/>WINS NIGHTMARE 710
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            Dashlol's star claims his 4th career major trophy, surging to 3rd in season standings with 1700 points.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 710 Updates</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Nightmare Champion</span>
          <h3 className="text-white mt-3">Mega Hawnnon Wins 4th Career Major</h3>
          <p className="text-foreground">
            Mega Hawnnon claims Nightmare 710, his <span className="stat-highlight">4th career trophy</span>. Now tied for 2nd with 1700 points.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">Team Race</span>
          <h3 className="text-white mt-3">Gastro & Damage Tied at 3850 Points</h3>
          <p className="text-foreground">
            Two teams locked at <span className="stat-highlight">3850 points</span>. Qalf and Dashlol chase at 3600 each.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Season Leader</span>
          <h3 className="text-white mt-3">Vampire Ortez Leads with 1900 Points</h3>
          <p className="text-foreground">
            Dashlol's star holds the lead with <span className="stat-highlight">1900 points</span> and 8 KOs after 7 majors.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">Strong Season</span>
          <h3 className="text-white mt-3">Nothing Sawryr Tied for 2nd at 1700 Points</h3>
          <p className="text-foreground">
            The reigning Apex Champion tied with Mega Hawnnon at <span className="stat-highlight">1700 points</span>.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Consistent</span>
          <h3 className="text-white mt-3">Bat Bornoil 4th with 1550 Points</h3>
          <p className="text-foreground">
            The Damage veteran sits 4th with <span className="stat-highlight">1550 points</span> and 4 KOs.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-qalf">Rising</span>
          <h3 className="text-white mt-3">Rem Asamtoy 5th with 1500 Points</h3>
          <p className="text-foreground">
            The Qalf star claims 5th with <span className="stat-highlight">1500 points</span> and 5 KOs.
          </p>
        </div>
      </div>
    </div>
  );
}
