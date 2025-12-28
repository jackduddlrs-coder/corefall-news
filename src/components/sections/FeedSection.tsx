export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        🏆 SEASON 710 UNDERWAY • Mega Hawnnon Wins Chaos Reigns 710 • Dashlol Takes Team Lead
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-dashlol mb-2 inline-block">CHAOS REIGNS 710 CHAMPION</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            MEGA HAWNNON<br/>WINS CHAOS REIGNS 710
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            Dashlol's rising star claims his 3rd career major, propelling his team to the top of the standings.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 710 Updates</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Chaos Reigns Champion</span>
          <h3 className="text-white mt-3">Mega Hawnnon Wins 3rd Career Major</h3>
          <p className="text-foreground">
            Mega Hawnnon claims Chaos Reigns 710, his <span className="stat-highlight">3rd career trophy</span>. Daredevil Gaffe finishes 2nd.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Team Dominance</span>
          <h3 className="text-white mt-3">Dashlol Takes Lead with 1650 Points</h3>
          <p className="text-foreground">
            Dashlol surges to the top of team standings with <span className="stat-highlight">1650 points</span>. Gastro (1500) and Damage (1350) chase.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">Co-Leaders</span>
          <h3 className="text-white mt-3">Nothing Sawryr & Mega Hawnnon Tied at 850</h3>
          <p className="text-foreground">
            The reigning Apex Champion and Chaos Reigns winner share the lead with <span className="stat-highlight">850 points each</span>.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Rising Strong</span>
          <h3 className="text-white mt-3">Cascade Juner Climbs to 550</h3>
          <p className="text-foreground">
            After a slow Heartland start, Cascade Juner rebounds at Chaos Reigns with <span className="stat-highlight">3 KOs</span>. Tied 5th overall.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-fadee">Transfer News</span>
          <h3 className="text-white mt-3">Freeze Jagwiab Joins Fadee</h3>
          <p className="text-foreground">
            Freeze moves from Juniper to Fadee for Season 710. Killa Binbac moves to Juire.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">New Arrival</span>
          <h3 className="text-white mt-3">Club Faxzin Joins Gastro</h3>
          <p className="text-foreground">
            Club Faxzin leaves Juniper to join champions Gastro, reuniting with Nothing Sawryr.
          </p>
        </div>
      </div>
    </div>
  );
}