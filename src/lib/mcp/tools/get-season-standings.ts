import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { pastStandings, pastTeamStandings } from "@/data/corefallData";

export default defineTool({
  name: "get_season_standings",
  title: "Get season standings",
  description:
    "Return the player standings (rank, name, team, age, points, KOs) and the team standings for a given Corefall season year.",
  inputSchema: {
    year: z
      .union([z.string(), z.number()])
      .describe("Season year, e.g. 712. Modern seasons run from 700 onwards."),
    limit: z
      .number()
      .int()
      .min(1)
      .max(200)
      .optional()
      .describe("Max number of players to return. Defaults to 25."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ year, limit }) => {
    const key = String(year);
    const players = pastStandings[key];
    if (!players) {
      throw new ToolError(
        `No standings for season ${key}. Available seasons: ${Object.keys(pastStandings).sort().join(", ")}`,
      );
    }
    const teams = pastTeamStandings[key] ?? [];
    const top = players.slice(0, limit ?? 25);
    const payload = { year: Number(key), players: top, teamStandings: teams };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
