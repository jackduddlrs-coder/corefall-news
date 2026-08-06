import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { pastStandings, apexDetailed } from "@/data/corefallData";

export default defineTool({
  name: "search_players",
  title: "Search players",
  description:
    "Search Corefall fighters by (partial) name across every recorded season. Returns each match with their most recent team, age, seasons competed, and total career points.",
  inputSchema: {
    query: z.string().trim().min(1).describe("Full or partial fighter name."),
    limit: z.number().int().min(1).max(50).optional().describe("Max results, defaults to 15."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query, limit }) => {
    const q = query.toLowerCase();
    const acc = new Map<
      string,
      { name: string; latestTeam: string; latestAge: number; latestSeason: number; seasons: number[]; totalPoints: number }
    >();

    for (const [yearKey, rows] of Object.entries(pastStandings)) {
      const year = Number(yearKey);
      for (const row of rows) {
        if (!row.Name.toLowerCase().includes(q)) continue;
        const entry = acc.get(row.Name) ?? {
          name: row.Name,
          latestTeam: row.Team,
          latestAge: row.Age,
          latestSeason: year,
          seasons: [],
          totalPoints: 0,
        };
        entry.seasons.push(year);
        entry.totalPoints += row.Points ?? 0;
        if (year >= entry.latestSeason) {
          entry.latestSeason = year;
          entry.latestTeam = row.Team;
          entry.latestAge = row.Age;
        }
        acc.set(row.Name, entry);
      }
    }

    // Include pre-700 fighters that only appear in Apex finals history.
    for (const final of apexDetailed) {
      for (const [name, team] of [
        [final.win, final.wTeam],
        [final.lose, final.lTeam],
      ] as const) {
        if (!name?.toLowerCase().includes(q) || acc.has(name)) continue;
        acc.set(name, {
          name,
          latestTeam: team,
          latestAge: 0,
          latestSeason: final.year,
          seasons: [final.year],
          totalPoints: 0,
        });
      }
    }

    const results = [...acc.values()]
      .map((r) => ({ ...r, seasons: [...new Set(r.seasons)].sort((a, b) => b - a) }))
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, limit ?? 15);

    const payload = { query, count: results.length, results };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
