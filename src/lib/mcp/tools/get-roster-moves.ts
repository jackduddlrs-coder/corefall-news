import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { rosterMoves } from "@/data/rosterMoves";

export default defineTool({
  name: "get_roster_moves",
  title: "Get roster moves",
  description:
    "List Corefall transfers/roster moves, optionally filtered by season, player, or team (old or new).",
  inputSchema: {
    season: z.union([z.string(), z.number()]).optional().describe("Season year, e.g. 712."),
    player: z.string().trim().optional().describe("Filter by fighter name (partial match)."),
    team: z.string().trim().optional().describe("Filter by team, matching either the old or new team."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ season, player, team }) => {
    const p = player?.toLowerCase();
    const t = team?.toLowerCase();
    const s = season !== undefined ? String(season) : undefined;

    const results = rosterMoves.filter((m) => {
      if (s && String(m.season) !== s) return false;
      if (p && !m.player.toLowerCase().includes(p)) return false;
      if (t && !`${m.oldTeam} ${m.newTeam}`.toLowerCase().includes(t)) return false;
      return true;
    });

    const payload = { count: results.length, moves: results };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
