export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        🏆 SEASON 710 UNDERWAY • Nothing Sawryr Wins Heartland Cup 710 • Defending Apex Champion Starts Strong
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-gastro mb-2 inline-block">HEARTLAND 710 CHAMPION</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            NOTHING SAWRYR<br/>WINS HEARTLAND 710
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The reigning Apex Champion opens Season 710 with a Heartland Cup victory, his 6th career trophy.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 710 Updates</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">Heartland Champion</span>
          <h3 className="text-white mt-3">Nothing Sawryr Opens 710 Strong</h3>
          <p className="text-foreground">
            The Apex 709 Champion wins Heartland 710 for his <span className="stat-highlight">6th career major</span>. Vampire Ortez finishes 2nd.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-limium">Rising Star</span>
          <h3 className="text-white mt-3">Titan Aui Finishes 3rd</h3>
          <p className="text-foreground">
            Limium's Titan Aui makes the podium at Heartland with <span className="stat-highlight">400 points and 2 KOs</span>.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">Team Dominance</span>
          <h3 className="text-white mt-3">Gastro Leads Team Standings</h3>
          <p className="text-foreground">
            Gastro starts 710 on top with <span className="stat-highlight">850 points</span>. Dashlol (750) and Limium (600) chase.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Slow Start</span>
          <h3 className="text-white mt-3">Cascade Juner Finishes 13th-16th</h3>
          <p className="text-foreground">
            The Season Star 709 has a rare early exit at Heartland with <span className="stat-highlight">150 points</span>. Room to climb.
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