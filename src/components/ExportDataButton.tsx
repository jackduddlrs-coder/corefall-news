import { useState } from "react";
import { Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  pastTeamStandings,
  pastStandings,
  seasons,
  inactiveTeams,
  trophyData,
  apexDetailed,
  fullMatches,
  majorWinners,
} from "@/data/corefallData";
import { tournamentNames, playerTournamentResults } from "@/data/tournamentResults";
import { h2hRecords } from "@/data/h2hData";
import { rosterMoves } from "@/data/rosterMoves";
import { fighterBios, teamInfo, contractData, teamBios } from "@/data/wikiData";
import { teamLogos } from "@/data/teamLogos";

export function ExportDataButton() {
  const [busy, setBusy] = useState(false);

  const handleExport = async () => {
    setBusy(true);
    try {
      let fanLists: unknown[] = [];
      try {
        const { data } = await supabase.from("fan_lists").select("*");
        fanLists = data ?? [];
      } catch {
        fanLists = [];
      }

      const payload = {
        exportedAt: new Date().toISOString(),
        source: "Corefall News",
        seasons,
        teamStandings: pastTeamStandings,
        playerStandings: pastStandings,
        inactiveTeams,
        trophyData,
        majorWinners,
        apexFinals: apexDetailed,
        apexBrackets: fullMatches,
        tournamentNames,
        playerTournamentResults,
        headToHead: h2hRecords,
        rosterMoves,
        wiki: { fighterBios, teamInfo, contractData, teamBios },
        teamLogos,
        fanLists,
      };

      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `corefall-news-data-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      toast({ title: "Export ready", description: "All site data downloaded as a JSON file." });
    } catch (e) {
      toast({ title: "Export failed", description: "Something went wrong preparing the file.", variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={busy}
      title="Export all data"
      className="flex items-center gap-1.5 text-xs md:text-sm font-bold text-muted-foreground hover:text-primary transition-colors px-2 md:px-3 py-2 disabled:opacity-50"
    >
      <Download className="h-4 w-4" />
      <span className="hidden md:inline">{busy ? "Exporting…" : "Export Data"}</span>
    </button>
  );
}
