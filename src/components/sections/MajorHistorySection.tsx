import { majorWinners, pastStandings, getTeamClass } from "@/data/corefallData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface MajorHistorySectionProps {
  onPlayerClick: (name: string) => void;
  onTeamClick: (name: string) => void;
}

// Tournament order within a season (chronological)
const tournamentOrder = [
  "Heartland",
  "Chaos Reigns",
  "Heritage",
  "Descent",
  "Solar",
  "Nightmare",
  "Wind Breakers",
  "Malice",
  "Armageddon",
  "New Life",
  "Apex"
];

// Get team for a player in a given year from standings
const getTeamForYear = (playerName: string, year: number): string => {
  const yearStandings = pastStandings[year.toString()];
  if (yearStandings) {
    const player = yearStandings.find(p => p.Name === playerName);
    if (player) return player.Team;
  }
  // Fallback: search all years for most recent team
  const years = Object.keys(pastStandings).map(Number).sort((a, b) => b - a);
  for (const y of years) {
    const player = pastStandings[y.toString()]?.find(p => p.Name === playerName);
    if (player) return player.Team;
  }
  return "Unknown";
};

export const MajorHistorySection = ({ onPlayerClick, onTeamClick }: MajorHistorySectionProps) => {
  // Sort majors chronologically: by year, then by tournament order within year
  const sortedMajors = [...majorWinners].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return tournamentOrder.indexOf(a.tournament) - tournamentOrder.indexOf(b.tournament);
  });

  // Add team info to each major
  const majorsWithTeams = sortedMajors.map((major, index) => ({
    ...major,
    team: getTeamForYear(major.winner, major.year),
    index: index + 1
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">Major History</h2>
        <p className="text-muted-foreground text-sm">
          Complete chronological record of all major tournament winners.
        </p>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow className="border-b-2">
              <TableHead className="w-12 text-center font-bold">#</TableHead>
              <TableHead className="w-16 text-center font-bold">Year</TableHead>
              <TableHead className="font-bold">Tournament</TableHead>
              <TableHead className="font-bold">Winner</TableHead>
              <TableHead className="font-bold hidden sm:table-cell">Team</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {majorsWithTeams.map((major) => (
              <TableRow 
                key={`${major.year}-${major.tournament}`}
                className={major.tournament === "Apex" ? "bg-amber-500/10" : ""}
              >
                <TableCell className="text-center font-mono text-muted-foreground text-sm">
                  {major.index}
                </TableCell>
                <TableCell className="text-center font-semibold">{major.year}</TableCell>
                <TableCell>
                  <Badge
                    variant={major.tournament === "Apex" ? "default" : "outline"}
                    className={major.tournament === "Apex" ? "bg-amber-500 text-black font-bold" : ""}
                  >
                    {major.tournament}
                  </Badge>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => onPlayerClick(major.winner)}
                    className="text-primary hover:underline font-medium"
                  >
                    {major.winner}
                  </button>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <button
                    onClick={() => onTeamClick(major.team)}
                    className={`px-2 py-0.5 rounded text-xs font-medium hover:opacity-80 ${getTeamClass(major.team)}`}
                  >
                    {major.team}
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
