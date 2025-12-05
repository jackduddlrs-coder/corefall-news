import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Star, Crown } from "lucide-react";
import { pastStandings } from "@/data/corefallData";

interface HallOfImmortalsProps {
  onPlayerClick: (name: string) => void;
}

interface Immortal {
  name: string;
  primaryTeam: string;
  seasonsPlayed: number;
  careerPoints: number;
  careerKOs: number;
  apexTitles: number;
  championshipYears: number[];
  seasonStarYears: number[];
}

const inducteeNames = [
  "Pheonix Oliv",
  "Mountain Granton",
  "Snow Masogoto",
  "Soler Varo",
  "Spade Faxzin",
  "Prince Jonkan",
  "Vibrant Yaul",
  "Ring Hawlikaw",
  "Rolle Asikov"
];

// Historical Apex titles data with years
const apexTitlesData: Record<string, { count: number; years: number[] }> = {
  "Pheonix Oliv": { count: 4, years: [698, 699, 700, 701] },
  "Mountain Granton": { count: 1, years: [697] },
  "Snow Masogoto": { count: 3, years: [691, 692, 695] },
  "Soler Varo": { count: 2, years: [690, 693] },
  "Spade Faxzin": { count: 2, years: [683, 684] },
  "Prince Jonkan": { count: 2, years: [680, 681] },
  "Vibrant Yaul": { count: 1, years: [685] },
  "Ring Hawlikaw": { count: 1, years: [682] },
  "Rolle Asikov": { count: 1, years: [679] }
};

// Season Star awards data with years
const seasonStarData: Record<string, number[]> = {
  "Pheonix Oliv": [695, 696, 697, 698, 699, 700, 701],
  "Snow Masogoto": [691, 692],
  "Soler Varo": [689, 690],
  "Spade Faxzin": [682, 684],
  "Prince Jonkan": [680, 681],
  "Vibrant Yaul": [687],
  "Mountain Granton": [],
  "Ring Hawlikaw": [],
  "Rolle Asikov": []
};

// Override primary teams for immortals (historical affiliations)
const primaryTeamOverrides: Record<string, string> = {
  "Pheonix Oliv": "Varcity/Dashlol",
  "Snow Masogoto": "Engery",
  "Soler Varo": "Damage",
  "Prince Jonkan": "Damage",
  "Spade Faxzin": "Gastro",
  "Vibrant Yaul": "Ovest/Limium",
  "Rolle Asikov": "Limium",
  "Ring Hawlikaw": "Rass"
};

export const HallOfImmortalsSection = ({ onPlayerClick }: HallOfImmortalsProps) => {
  // Calculate stats for each inductee from available data
  const getPlayerStats = (playerName: string): Immortal => {
    const allPlayers: { name: string; team: string; points: number; kos: number }[] = [];
    
    Object.values(pastStandings).forEach(seasonStandings => {
      seasonStandings.forEach(p => {
        allPlayers.push({ name: p.Name, team: p.Team, points: p.Points, kos: p.KOs });
      });
    });

    const playerSeasons = allPlayers.filter(p => p.name === playerName);
    
    // Use override team if available, otherwise calculate from data
    const primaryTeam = primaryTeamOverrides[playerName] || (() => {
      const teamCounts: Record<string, number> = {};
      playerSeasons.forEach(p => {
        teamCounts[p.team] = (teamCounts[p.team] || 0) + 1;
      });
      return Object.entries(teamCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "Legacy";
    })();

    // Sum stats
    const careerPoints = playerSeasons.reduce((sum, p) => sum + p.points, 0);
    const careerKOs = playerSeasons.reduce((sum, p) => sum + p.kos, 0);

    const titleData = apexTitlesData[playerName] || { count: 0, years: [] };
    const starYears = seasonStarData[playerName] || [];

    return {
      name: playerName,
      primaryTeam,
      seasonsPlayed: playerSeasons.length,
      careerPoints,
      careerKOs,
      apexTitles: titleData.count,
      championshipYears: titleData.years,
      seasonStarYears: starYears
    };
  };

  const immortals = inducteeNames.map(getPlayerStats);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 pb-4 border-b border-border/50">
        <div className="flex items-center justify-center gap-2">
          <Crown className="h-6 w-6 md:h-8 md:w-8 text-amber-500" />
          <h2 className="text-xl md:text-3xl font-bold text-foreground">Hall of Immortals</h2>
          <Crown className="h-6 w-6 md:h-8 md:w-8 text-amber-500" />
        </div>
        <p className="text-muted-foreground text-sm md:text-base">
          Honoring the legends who defined Corefall history
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {immortals.map((immortal) => (
          <Card 
            key={immortal.name}
            className="group cursor-pointer hover:border-amber-500/50 transition-all duration-300 bg-gradient-to-br from-card to-card/80 hover:shadow-lg hover:shadow-amber-500/10"
            onClick={() => onPlayerClick(immortal.name)}
          >
            <CardContent className="p-4 md:p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-base md:text-lg text-foreground group-hover:text-amber-500 transition-colors">
                    {immortal.name}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{immortal.primaryTeam}</p>
                </div>
                <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded-full">
                  <Trophy className="h-3 w-3 md:h-4 md:w-4 text-amber-500" />
                  <span className="text-xs md:text-sm font-semibold text-amber-500">
                    {immortal.apexTitles}
                  </span>
                </div>
              </div>

              {immortal.championshipYears.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-muted-foreground mb-1">Apex Championships</p>
                  <p className="text-xs md:text-sm font-medium text-amber-500/90">
                    {immortal.championshipYears.join(", ")}
                  </p>
                </div>
              )}

              {immortal.seasonStarYears.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                    <Star className="h-3 w-3 text-sky-400" />
                    Season Star Awards
                  </p>
                  <p className="text-xs md:text-sm font-medium text-sky-400/90">
                    {immortal.seasonStarYears.join(", ")}
                  </p>
                </div>
              )}
              
              {immortal.seasonsPlayed > 0 && (
                <div className="grid grid-cols-3 gap-2 text-center mt-4 pt-3 border-t border-border/50">
                  <div>
                    <p className="text-xs text-muted-foreground">Seasons</p>
                    <p className="text-sm md:text-base font-semibold text-foreground">
                      {immortal.seasonsPlayed}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Points</p>
                    <p className="text-sm md:text-base font-semibold text-foreground">
                      {immortal.careerPoints.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">KOs</p>
                    <p className="text-sm md:text-base font-semibold text-foreground">
                      {immortal.careerKOs}
                    </p>
                  </div>
                </div>
              )}
              
              {immortal.seasonsPlayed === 0 && (
                <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                  <Star className="h-3 w-3" />
                  <span>Pre-700 Era Legend</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
