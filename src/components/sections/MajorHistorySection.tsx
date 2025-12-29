import { majorWinners } from "@/data/corefallData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getTeamClass } from "@/data/corefallData";

interface MajorHistorySectionProps {
  onPlayerClick: (name: string) => void;
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

export const MajorHistorySection = ({ onPlayerClick }: MajorHistorySectionProps) => {
  // Sort majors chronologically: by year, then by tournament order within year
  const sortedMajors = [...majorWinners].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return tournamentOrder.indexOf(a.tournament) - tournamentOrder.indexOf(b.tournament);
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">Major History</h2>
        <p className="text-muted-foreground text-sm">
          Complete chronological record of all major tournament winners.
        </p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead className="w-16">#</TableHead>
              <TableHead className="w-20">Year</TableHead>
              <TableHead>Tournament</TableHead>
              <TableHead>Winner</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedMajors.map((major, index) => (
              <TableRow key={`${major.year}-${major.tournament}`}>
                <TableCell className="font-mono text-muted-foreground">
                  {index + 1}
                </TableCell>
                <TableCell className="font-semibold">{major.year}</TableCell>
                <TableCell>
                  <Badge
                    variant={major.tournament === "Apex" ? "default" : "secondary"}
                    className={major.tournament === "Apex" ? "bg-amber-500 text-black" : ""}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
