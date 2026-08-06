import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { pastStandings, trophyData, apexDetailed, majorWinners } from "@/data/corefallData";
import { rosterMoves } from "@/data/rosterMoves";

export default defineTool({
  name: "get_player_profile",
  title: "Get player profile",
  description:
    "Full career profile for one Corefall fighter: season-by-season standings, trophy haul, Apex finals appearances, major wins, and roster moves.",
  inputSchema: {
    name: z.string().trim().min(1).describe("Fighter's full name, e.g. 'Daredevil Gaffe'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ name }) => {
    const q = name.toLowerCase();

    const seasonResults = Object.entries(pastStandings)
      .flatMap(([year, rows]) =>
        rows
          .filter((r) => r.Name.toLowerCase() === q || r.Name.toLowerCase().includes(q))
          .map((r) => ({ season: Number(year), rank: r.Rank, team: r.Team, age: r.Age, points: r.Points, kos: r.KOs })),
      )
      .sort((a, b) => b.season - a.season);

    const trophies = trophyData.find(
      (t) => t.name.toLowerCase() === q || t.name.toLowerCase().includes(q),
    );
    const apexFinals = apexDetailed
      .filter((a) => a.win?.toLowerCase().includes(q) || a.lose?.toLowerCase().includes(q))
      .map((a) => ({
        year: a.year,
        result: a.win?.toLowerCase().includes(q) ? "won" : "runner-up",
        opponent: a.win?.toLowerCase().includes(q) ? a.lose : a.win,
      }));
    const majors = majorWinners
      .filter((m) => m.winner.toLowerCase().includes(q))
      .map((m) => ({ year: m.year, tournament: m.tournament }));
    const moves = rosterMoves.filter((m) => m.player.toLowerCase().includes(q));

    if (!seasonResults.length && !trophies && !apexFinals.length && !majors.length) {
      throw new ToolError(`No Corefall fighter found matching "${name}". Try the search_players tool.`);
    }

    const payload = {
      name: trophies?.name ?? name,
      trophies: trophies ?? null,
      apexFinals,
      majorWins: majors,
      seasonResults,
      rosterMoves: moves,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
