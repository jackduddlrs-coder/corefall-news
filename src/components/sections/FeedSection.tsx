export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        🏆 SEASON 710 • Jam Naze Wins Wind Breakers 710 • Gastro Takes Team Lead with 4750 Points
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-gastro mb-2 inline-block">WIND BREAKERS 710 CHAMPION</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            JAM NAZE<br/>WINS WIND BREAKERS 710
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            Gastro's rising star claims his 1st career major trophy, vaulting to 6th in season standings with 1650 points.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 710 Updates</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">Wind Breakers Champion</span>
          <h3 className="text-white mt-3">Jam Naze Claims 1st Career Major</h3>
          <p className="text-foreground">
            Jam Naze wins Wind Breakers 710, his <span className="stat-highlight">1st career trophy</span>. Now 6th with 1650 points and 7 KOs.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">Team Race</span>
          <h3 className="text-white mt-3">Gastro Takes Lead with 4750 Points</h3>
          <p className="text-foreground">
            Gastro surges ahead with <span className="stat-highlight">4750 points</span>. Damage trails at 4550, Dashlol at 4250.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Season Leader</span>
          <h3 className="text-white mt-3">Mega Hawnnon Leads with 2150 Points</h3>
          <p className="text-foreground">
            Dashlol's star takes the lead with <span className="stat-highlight">2150 points</span> and 5 KOs after 8 majors.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Strong Season</span>
          <h3 className="text-white mt-3">Vampire Ortez 2nd with 2100 Points</h3>
          <p className="text-foreground">
            Dashlol's other star sits 2nd with <span className="stat-highlight">2100 points</span> and 8 KOs.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Consistent</span>
          <h3 className="text-white mt-3">Bat Bornoil 3rd with 1850 Points</h3>
          <p className="text-foreground">
            The Damage veteran climbs to 3rd with <span className="stat-highlight">1850 points</span> and 6 KOs.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">Rising</span>
          <h3 className="text-white mt-3">Nothing Sawryr & Rem Asamtoy Tied 4th</h3>
          <p className="text-foreground">
            The Apex Champ and Qalf star tied at <span className="stat-highlight">1800 points</span> with 6 and 5 KOs respectively.
          </p>
        </div>
      </div>
    </div>
  );
}
