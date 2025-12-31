export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        🏆 SEASON 710 • Nothing Sawryr Wins Malice 710 • 2nd Major of Season • Gastro Dominates
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-gastro mb-2 inline-block">MALICE 710 CHAMPION</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            NOTHING SAWRYR<br/>WINS MALICE 710
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The reigning Apex champion claims his 2nd major of Season 710, bringing his career total to 7 trophies.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 710 Updates</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">Malice Champion</span>
          <h3 className="text-white mt-3">Nothing Sawryr Claims 7th Career Trophy</h3>
          <p className="text-foreground">
            The Apex Champ wins Malice 710, his <span className="stat-highlight">2nd major this season</span>. Vampire Ortez finished 2nd, Titan Aui 3rd.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Season Leader</span>
          <h3 className="text-white mt-3">Mega Hawnnon Still Leads After 8 Majors</h3>
          <p className="text-foreground">
            Dashlol's star holds the lead with <span className="stat-highlight">2450 points</span> and 6 KOs despite 5th-6th at Malice.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Strong Season</span>
          <h3 className="text-white mt-3">Vampire Ortez 2nd with 2550 Points</h3>
          <p className="text-foreground">
            Dashlol's other star climbs to 2nd with <span className="stat-highlight">2550 points</span> and 9 KOs after runner-up finish.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">Rising</span>
          <h3 className="text-white mt-3">Nothing Sawryr Surges to 3rd</h3>
          <p className="text-foreground">
            The Apex champ jumps to 3rd with <span className="stat-highlight">2250 points</span> and 8 KOs after Malice victory.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-qalf">Consistent</span>
          <h3 className="text-white mt-3">Rem Asamtoy 4th with 2050 Points</h3>
          <p className="text-foreground">
            Qalf's star stays in top 5 with <span className="stat-highlight">2050 points</span> and 6 KOs after 7th-8th at Malice.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Veteran</span>
          <h3 className="text-white mt-3">Bat Bornoil Stays 5th with 1950 Points</h3>
          <p className="text-foreground">
            The Damage veteran maintains position with <span className="stat-highlight">1950 points</span> and 7 KOs.
          </p>
        </div>
      </div>
    </div>
  );
}
