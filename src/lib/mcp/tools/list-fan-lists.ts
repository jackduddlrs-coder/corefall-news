import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseAnon } from "../supabase";

export default defineTool({
  name: "list_fan_lists",
  title: "List fan-voted lists",
  description:
    "List the in-universe fan-voted Corefall lists published in the archive, with their ranked entries.",
  inputSchema: {
    search: z.string().trim().optional().describe("Filter lists whose name contains this text."),
    limit: z.number().int().min(1).max(50).optional().describe("Max lists to return, defaults to 20."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ search, limit }) => {
    const supabase = supabaseAnon();
    let query = supabase
      .from("fan_lists")
      .select("id, name, description, items, updated_at")
      .order("updated_at", { ascending: false })
      .limit(limit ?? 20);
    if (search) query = query.ilike("name", `%${search}%`);

    const { data, error } = await query;
    if (error) throw new ToolError(error.message);

    const payload = { count: data?.length ?? 0, lists: data ?? [] };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
