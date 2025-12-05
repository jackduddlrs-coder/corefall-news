import { useState } from "react";
import { fullMatches } from "@/data/corefallData";

export function FullApexSection() {
  const [openSeason, setOpenSeason] = useState<string | null>(null);

  const seasonKeys = Object.keys(fullMatches).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="animate-fadeIn">
      <h1 className="text-white">Full Apex Tournament Results (700-707)</h1>
      <p className="text-foreground">Complete match history for every Apex World Championship.</p>

      <div>
        {seasonKeys.map(season => (
          <div key={season}>
            <button
              className={`cursor-pointer p-4 w-full border-none text-left text-lg transition-colors bg-[#222] text-white border-b border-border flex justify-between items-center font-bold hover:bg-[#333] hover:text-primary ${openSeason === season ? "bg-[#333] text-primary" : ""}`}
              onClick={() => setOpenSeason(openSeason === season ? null : season)}
            >
              <span>Apex {season}</span>
              <span className="text-primary font-bold ml-1">{openSeason === season ? "−" : "+"}</span>
            </button>
            
            <div 
              className={`bg-panel overflow-hidden transition-all duration-200 ${openSeason === season ? "max-h-[1000px]" : "max-h-0"}`}
            >
              <div className="p-4">
                {fullMatches[season].map((m, idx) => (
                  <div 
                    key={idx} 
                    className="py-2 border-b border-border last:border-b-0 flex justify-between text-sm"
                  >
                    <span className="text-muted-foreground font-semibold min-w-[100px]">{m.round}</span>
                    <span className="text-white">{m.match}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
