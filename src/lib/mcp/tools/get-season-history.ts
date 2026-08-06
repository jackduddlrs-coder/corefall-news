import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { seasons, apexDetailed, majorWinners } from "@/data/corefallData";

export default defineTool({
  name: "get_season_history",
  title: "Get season history",
  description:
    "Corefall season history: Apex champion, Apex finals matchup, CTT-winning team, Season Star, and every major winner for each season.",
  inputSchema: {
    fromYear: z.number().int().optional().describe("Earliest season year to include (inclusive)."),
    toYear: z.number().int().optional().describe("Latest season year to include (inclusive)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ fromYear, toYear }) => {
    const lo = fromYear ?? -Infinity;
    const hi = toYear ?? Infinity;

    const results = seasons
      .filter((s) => s.year >= lo && s.year <= hi)
      .map((s) => {
        const final = apexDetailed.find((a) => a.year === s.year);
        return {
          year: s.year,
          apexChampion: s.apex,
          apexChampionTeam: s.team,
          apexRunnerUp: final?.lose ?? null,
          apexRunnerUpTeam: final?.lTeam ?? null,
          cttChampionTeam: s.ctt,
          seasonStar: s.star,
          seasonStarTeam: s.starTeam,
          majorWinners: majorWinners
            .filter((m) => m.year === s.year)
            .map((m) => ({ tournament: m.tournament, winner: m.winner })),
        };
      })
      .sort((a, b) => b.year - a.year);

    const payload = { count: results.length, seasons: results };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
