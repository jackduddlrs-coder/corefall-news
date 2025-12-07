export function FeedSection() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-panel p-3 border-l-4 border-secondary mb-6 font-mono text-secondary font-bold text-lg">
        HEARTLAND CUP 708: Zeus Ziki Claims Major Title • Season 708 Officially Underway • Gastro Leads Early Team Race
      </div>

      <div 
        className="bg-cover bg-center h-[350px] flex items-center pl-6 md:pl-12 rounded-xl mb-8 border border-border"
        style={{
          background: "linear-gradient(to right, #000000dd, #00000066), linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))"
        }}
      >
        <div>
          <span className="team-tag team-calhal mb-2 inline-block">Heartland Cup 708</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white m-0 leading-tight drop-shadow-[0_0_20px_hsl(var(--primary))]">
            ZEUS ZIKI<br/>HEARTLAND CHAMPION
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-xl">
            The Cal Hal star opens Season 708 with a dominant Heartland Cup victory, defeating Nothing Sawryr in the final.
          </p>
        </div>
      </div>

      <h2 className="text-white border-b-2 border-primary pb-2 mb-6">Season 708 Updates</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-gastro">Early Leader</span>
          <h3 className="text-white mt-3">Gastro Takes Team Lead</h3>
          <p className="text-foreground">
            With <span className="stat-highlight">800 points</span>, Gastro leads the early team standings thanks to Nothing Sawryr (2nd) and Daredevil Gaffe (T-5th).
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-calhal">Major Champion</span>
          <h3 className="text-white mt-3">Zeus Ziki's 5th Major</h3>
          <p className="text-foreground">
            Zeus Ziki adds the Heartland Cup to his trophy case, his 5th major overall. The 29-year-old is off to a hot start with Cal Hal.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-damage">Defending Champ</span>
          <h3 className="text-white mt-3">Cascade Juner 4th</h3>
          <p className="text-foreground">
            The reigning Apex champion finishes 4th with 350 points and 2 KOs. Still dangerous as ever entering the rest of 708.
          </p>
        </div>
        
        <div className="bg-panel p-6 rounded-xl border border-border transition-transform hover:-translate-y-1 hover:border-primary">
          <span className="team-tag team-dashlol">Rising Star</span>
          <h3 className="text-white mt-3">Vampire Ortez Tied 5th</h3>
          <p className="text-foreground">
            After moving to Dashlol, Vampire Ortez ties for 5th with 300 points and leads the tournament with 3 KOs.
          </p>
        </div>
      </div>
    </div>
  );
}