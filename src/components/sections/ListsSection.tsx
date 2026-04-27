import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit, Save, X, ArrowLeft, Download } from "lucide-react";
import { pastStandings, pastTeamStandings, getTeamClass, apexDetailed } from "@/data/corefallData";

// ---------- Player team color resolution ----------
// Returns the team that best represents a player. Priority:
//  1. If `year` is given AND the player appears in that season → that season's team.
//  2. If the player appears in pastStandings (700+) → team where they scored most points (sum across seasons).
//  3. If the player only appears in pre-700 finals history (apexDetailed) → team they appeared with most often in finals.
const resolvePlayerTeam = (name: string, year?: number): string | undefined => {
  // 1. Specific year match
  if (typeof year === "number") {
    const season = pastStandings[String(year)];
    if (season) {
      const row = season.find(p => p.Name === name);
      if (row) return row.Team;
    }
  }
  // 2. Most-points team across modern seasons
  const pointsByTeam = new Map<string, number>();
  Object.values(pastStandings).forEach(season => {
    season.forEach(p => {
      if (p.Name === name) {
        pointsByTeam.set(p.Team, (pointsByTeam.get(p.Team) || 0) + p.Points);
      }
    });
  });
  if (pointsByTeam.size > 0) {
    let bestTeam: string | undefined;
    let bestPts = -1;
    pointsByTeam.forEach((pts, team) => {
      if (pts > bestPts) { bestPts = pts; bestTeam = team; }
    });
    return bestTeam;
  }
  // 3. Pre-700: most-frequent team in finals appearances
  const finalsByTeam = new Map<string, number>();
  apexDetailed.forEach(f => {
    if (f.win === name) finalsByTeam.set(f.wTeam, (finalsByTeam.get(f.wTeam) || 0) + 1);
    if (f.lose === name) finalsByTeam.set(f.lTeam, (finalsByTeam.get(f.lTeam) || 0) + 1);
  });
  if (finalsByTeam.size > 0) {
    let bestTeam: string | undefined;
    let bestCount = -1;
    finalsByTeam.forEach((c, team) => {
      if (c > bestCount) { bestCount = c; bestTeam = team; }
    });
    return bestTeam;
  }
  return undefined;
};

// Build a unique, deduped index of every player and team across all seasons (active + inactive)
type SearchEntry = { name: string; type: "player" | "team"; team?: string };

const buildSearchIndex = (): SearchEntry[] => {
  const playerMap = new Map<string, SearchEntry>();
  const teamSet = new Set<string>();
  Object.values(pastStandings).forEach(season => {
    season.forEach(p => {
      if (!playerMap.has(p.Name)) {
        playerMap.set(p.Name, { name: p.Name, type: "player", team: p.Team });
      }
      teamSet.add(p.Team);
    });
  });
  Object.values(pastTeamStandings).forEach(season => {
    season.forEach(t => teamSet.add(t.team));
  });
  const teams: SearchEntry[] = Array.from(teamSet).sort().map(t => ({ name: t, type: "team" }));
  const players = Array.from(playerMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  return [...players, ...teams];
};

// ---------- MultiNameSelector ----------
// Holds a list of confirmed "chips" (names picked from dropdown, each with optional year)
// plus a search buffer. Typing only ever updates the search buffer — picking from the
// dropdown adds a new chip.
export interface NameEntry {
  name: string;
  year?: number;
  team?: string; // optional manual team override (for color)
}

interface MultiNameSelectorProps {
  values: NameEntry[];
  onChange: (vals: NameEntry[]) => void;
  index: SearchEntry[];
  placeholder?: string;
}

const MultiNameSelector = ({ values, onChange, index, placeholder }: MultiNameSelectorProps) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index
      .filter(e => e.name.toLowerCase().includes(q))
      .sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(q) ? 0 : 1;
        const bStarts = b.name.toLowerCase().startsWith(q) ? 0 : 1;
        if (aStarts !== bStarts) return aStarts - bStarts;
        return a.name.localeCompare(b.name);
      })
      .slice(0, 8);
  }, [query, index]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const addChip = (entry: SearchEntry) => {
    if (!values.some(v => v.name === entry.name)) {
      onChange([...values, { name: entry.name }]);
    }
    setQuery("");
    setOpen(false);
    setHighlight(0);
  };

  const removeChip = (idx: number) => {
    onChange(values.filter((_, i) => i !== idx));
  };

  const updateChipYear = (idx: number, yearStr: string) => {
    const next = [...values];
    const y = parseInt(yearStr, 10);
    next[idx] = { ...next[idx], year: Number.isFinite(y) ? y : undefined };
    onChange(next);
  };

  const lookupEntry = (name: string): SearchEntry | undefined =>
    index.find(e => e.name === name);

  return (
    <div ref={containerRef} className="relative">
      {/* Chips */}
      {values.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-1.5">
          {values.map((chip, i) => {
            const entry = lookupEntry(chip.name);
            const playerTeam = entry?.type === "player" ? resolvePlayerTeam(chip.name, chip.year) : undefined;
            const teamClass = entry?.type === "player" && playerTeam
              ? getTeamClass(playerTeam)
              : entry?.type === "team"
              ? getTeamClass(chip.name)
              : "";
            return (
              <span
                key={`${chip.name}-${i}`}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${teamClass || "bg-[#2c323d] text-white"}`}
              >
                <span>{chip.name}</span>
                <input
                  type="number"
                  inputMode="numeric"
                  value={chip.year ?? ""}
                  onChange={e => updateChipYear(i, e.target.value)}
                  placeholder="year"
                  className="w-14 h-5 px-1 text-[10px] rounded bg-black/30 text-white placeholder:text-white/50 border border-white/20 focus:outline-none focus:border-white/60"
                  title="Optional year"
                />
                <button
                  type="button"
                  onClick={() => removeChip(i)}
                  className="ml-1 opacity-70 hover:opacity-100"
                  title="Remove"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            );
          })}
        </div>
      )}
      <Input
        value={query}
        onChange={e => { setQuery(e.target.value); setOpen(true); setHighlight(0); }}
        onFocus={() => setOpen(true)}
        onKeyDown={e => {
          if (e.key === "Backspace" && !query && values.length > 0) {
            e.preventDefault();
            removeChip(values.length - 1);
            return;
          }
          if (!open || matches.length === 0) return;
          if (e.key === "ArrowDown") { e.preventDefault(); setHighlight(h => Math.min(h + 1, matches.length - 1)); }
          else if (e.key === "ArrowUp") { e.preventDefault(); setHighlight(h => Math.max(h - 1, 0)); }
          else if (e.key === "Enter") { e.preventDefault(); addChip(matches[highlight]); }
          else if (e.key === "Escape") { setOpen(false); }
        }}
        placeholder={values.length === 0 ? (placeholder || "Type to search players & teams...") : "Add another..."}
        className="bg-[#222] text-white border-border h-9"
      />
      {open && matches.length > 0 && (
        <div className="absolute z-50 left-0 right-0 top-full mt-1 bg-[#1a1f25] border border-[#2a2f38] rounded shadow-lg max-h-64 overflow-y-auto">
          {matches.map((m, i) => (
            <button
              key={`${m.type}-${m.name}`}
              type="button"
              onMouseDown={e => e.preventDefault()}
              onClick={() => addChip(m)}
              onMouseEnter={() => setHighlight(i)}
              className={`w-full text-left px-3 py-2 flex items-center justify-between gap-2 text-sm ${
                i === highlight ? "bg-[#2c323d]" : "hover:bg-[#2c323d]"
              }`}
            >
              <span className="text-white truncate">{m.name}</span>
              <span className="flex items-center gap-2 shrink-0">
                {m.type === "player" && (() => {
                  const t = resolvePlayerTeam(m.name);
                  return t ? <span className={`team-tag text-xs ${getTeamClass(t)}`}>{t}</span> : null;
                })()}
                <span className="text-xs text-muted-foreground uppercase">{m.type}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


interface ListItem {
  rank: number;
  entries: NameEntry[];
  separator?: "and" | "vs"; // how to render multi-entry items
  note?: string;
}

// Raw stored item shape supports legacy `name: string` and legacy `names: string[]`
interface StoredItem {
  rank: number;
  name?: string;
  names?: string[];
  entries?: NameEntry[];
  separator?: "and" | "vs";
  note?: string;
}

const normalizeItem = (raw: StoredItem, idx: number): ListItem => {
  let entries: NameEntry[] = [];
  if (Array.isArray(raw.entries) && raw.entries.length > 0) {
    entries = raw.entries.map(e => ({ name: e.name, year: typeof e.year === "number" ? e.year : undefined }));
  } else if (Array.isArray(raw.names) && raw.names.length > 0) {
    entries = raw.names.map(n => ({ name: n }));
  } else if (raw.name) {
    entries = [{ name: raw.name }];
  }
  return {
    rank: raw.rank ?? idx + 1,
    entries,
    separator: raw.separator === "vs" ? "vs" : "and",
    note: raw.note || "",
  };
};

interface FanList {
  id: string;
  name: string;
  description: string | null;
  items: ListItem[];
  created_at: string;
  updated_at: string;
}

interface ListsSectionProps {
  onPlayerClick?: (name: string) => void;
}

export function ListsSection({ onPlayerClick }: ListsSectionProps) {
  const { toast } = useToast();
  const [lists, setLists] = useState<FanList[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingList, setEditingList] = useState<FanList | null>(null);
  const [viewingList, setViewingList] = useState<FanList | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Search index of all players + teams (active and inactive)
  const searchIndex = useMemo(() => buildSearchIndex(), []);
  const lookupEntry = (name: string): SearchEntry | undefined =>
    searchIndex.find(e => e.name === name);

  // Edit form state
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editItems, setEditItems] = useState<ListItem[]>([]);

  const loadLists = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("fan_lists")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) {
      toast({ title: "Failed to load lists", description: error.message, variant: "destructive" });
    } else {
      setLists((data || []).map(d => ({
        ...d,
        items: Array.isArray(d.items)
          ? (d.items as unknown as StoredItem[]).map(normalizeItem)
          : [],
      })));
    }
    setLoading(false);
  };

  useEffect(() => { loadLists(); }, []);

  const startCreate = () => {
    setIsCreating(true);
    setEditingList(null);
    setEditName("");
    setEditDescription("");
    setEditItems([{ rank: 1, entries: [], separator: "and", note: "" }]);
  };

  const startEdit = (list: FanList) => {
    setIsCreating(false);
    setEditingList(list);
    setEditName(list.name);
    setEditDescription(list.description || "");
    setEditItems(list.items.length ? [...list.items] : [{ rank: 1, entries: [], separator: "and", note: "" }]);
  };

  const cancelEdit = () => {
    setEditingList(null);
    setIsCreating(false);
  };

  const addItem = () => {
    setEditItems([...editItems, { rank: editItems.length + 1, entries: [], separator: "and", note: "" }]);
  };

  const removeItem = (idx: number) => {
    const newItems = editItems.filter((_, i) => i !== idx).map((it, i) => ({ ...it, rank: i + 1 }));
    setEditItems(newItems);
  };

  const updateItemEntries = (idx: number, entries: NameEntry[]) => {
    const newItems = [...editItems];
    newItems[idx] = { ...newItems[idx], entries };
    setEditItems(newItems);
  };

  const updateItemSeparator = (idx: number, separator: "and" | "vs") => {
    const newItems = [...editItems];
    newItems[idx] = { ...newItems[idx], separator };
    setEditItems(newItems);
  };

  const updateItemNote = (idx: number, note: string) => {
    const newItems = [...editItems];
    newItems[idx] = { ...newItems[idx], note };
    setEditItems(newItems);
  };

  const moveItem = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= editItems.length) return;
    const newItems = [...editItems];
    [newItems[idx], newItems[target]] = [newItems[target], newItems[idx]];
    setEditItems(newItems.map((it, i) => ({ ...it, rank: i + 1 })));
  };

  const saveList = async () => {
    if (!editName.trim()) {
      toast({ title: "Name required", description: "Please give the list a name.", variant: "destructive" });
      return;
    }
    const cleanedItems = editItems
      .filter(it => it.entries.length > 0)
      .map((it, i) => ({
        rank: i + 1,
        entries: it.entries,
        separator: it.separator || "and",
        note: (it.note || "").trim(),
      }));

    if (isCreating) {
      const { error } = await supabase.from("fan_lists").insert({
        name: editName.trim(),
        description: editDescription.trim() || null,
        items: cleanedItems as any,
      });
      if (error) {
        toast({ title: "Save failed", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "List created" });
    } else if (editingList) {
      const { error } = await supabase
        .from("fan_lists")
        .update({
          name: editName.trim(),
          description: editDescription.trim() || null,
          items: cleanedItems as any,
        })
        .eq("id", editingList.id);
      if (error) {
        toast({ title: "Save failed", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "List updated" });
    }
    cancelEdit();
    loadLists();
  };

  const exportList = (list: FanList) => {
    const lines: string[] = [];
    lines.push(list.name);
    lines.push("=".repeat(list.name.length));
    if (list.description) {
      lines.push("");
      lines.push(list.description);
    }
    lines.push("");
    list.items.forEach(item => {
      const sep = item.separator === "vs" ? " VS " : " and ";
      const parts = item.entries.map(e => e.year ? `${e.name} (${e.year})` : e.name);
      lines.push(`#${item.rank}. ${parts.join(parts.length > 2 ? " / " : sep)}`);
      if (item.note) lines.push(`    ${item.note}`);
    });
    lines.push("");
    lines.push(`Exported ${new Date().toLocaleString()}`);

    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${list.name.replace(/[^a-z0-9]+/gi, "_").toLowerCase() || "list"}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "List exported" });
  };

  const deleteList = async (list: FanList) => {
    if (!confirm(`Delete list "${list.name}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("fan_lists").delete().eq("id", list.id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "List deleted" });
    if (viewingList?.id === list.id) setViewingList(null);
    loadLists();
  };

  // Renders one clickable name "card" (chip) — colored by team, with optional year
  const NameCard = ({ name, year }: { name: string; year?: number }) => {
    const entry = lookupEntry(name);
    const playerTeam = entry?.type === "player" ? resolvePlayerTeam(name, year) : undefined;
    const teamClass = entry?.type === "player" && playerTeam
      ? getTeamClass(playerTeam)
      : entry?.type === "team"
      ? getTeamClass(name)
      : "";
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm font-semibold ${teamClass || "bg-[#2c323d] text-white"} ${onPlayerClick ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}`}
        onClick={onPlayerClick ? (e) => { e.stopPropagation(); onPlayerClick(name); } : undefined}
      >
        <span>{name}</span>
        {typeof year === "number" && (
          <span className="text-[10px] font-normal opacity-80">({year})</span>
        )}
      </span>
    );
  };

  // ---------- VIEW MODE: viewing a single list ----------
  if (viewingList && !editingList && !isCreating) {
    return (
      <div className="animate-fadeIn space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => setViewingList(null)}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Lists
          </Button>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => exportList(viewingList)}>
              <Download className="h-4 w-4 mr-1" /> Export
            </Button>
            <Button size="sm" onClick={() => startEdit(viewingList)}>
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Button>
            <Button size="sm" variant="destructive" onClick={() => deleteList(viewingList)}>
              <Trash2 className="h-4 w-4 mr-1" /> Delete
            </Button>
          </div>
        </div>
        <div className="bg-panel rounded-lg p-6 shadow-lg">
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">{viewingList.name}</h1>
          {viewingList.description && (
            <p className="text-muted-foreground mb-4">{viewingList.description}</p>
          )}
          <p className="text-xs text-muted-foreground mb-4">
            Last updated: {new Date(viewingList.updated_at).toLocaleString()}
          </p>
          <ol className="space-y-2">
            {viewingList.items.map((item, idx) => {
              const entries = item.entries && item.entries.length > 0
                ? item.entries
                : ((item as any).names ? ((item as any).names as string[]).map(n => ({ name: n })) : ((item as any).name ? [{ name: (item as any).name as string }] : []));
              const sep = item.separator === "vs" ? "VS" : "and";
              return (
                <li key={idx} className="flex gap-3 p-3 bg-[#1f242b] rounded border border-[#2a2f38]">
                  <span className="text-primary font-bold text-lg w-10 text-right">#{item.rank}</span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {entries.map((e: NameEntry, i: number) => (
                        <span key={`${e.name}-${i}`} className="inline-flex items-center gap-1.5">
                          {i > 0 && (
                            <span className="text-xs text-muted-foreground font-semibold uppercase px-1">{sep}</span>
                          )}
                          <NameCard name={e.name} year={e.year} />
                        </span>
                      ))}
                    </div>
                    {item.note && <div className="text-sm text-muted-foreground mt-1.5">{item.note}</div>}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }

  // ---------- EDIT/CREATE MODE ----------
  if (editingList || isCreating) {
    return (
      <div className="animate-fadeIn space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h1 className="text-white text-xl md:text-2xl font-bold">
            {isCreating ? "Create New List" : `Edit: ${editingList?.name}`}
          </h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={cancelEdit}>
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
            <Button size="sm" onClick={saveList}>
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
          </div>
        </div>

        <div className="bg-panel rounded-lg p-4 md:p-6 shadow-lg space-y-4">
          <div>
            <label className="block text-sm text-muted-foreground mb-1">List Name</label>
            <Input
              value={editName}
              onChange={e => setEditName(e.target.value)}
              placeholder="e.g. Top 10 Fighters of All Time (Fan Voted)"
              className="bg-[#222] text-white border-border"
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Description (optional)</label>
            <Textarea
              value={editDescription}
              onChange={e => setEditDescription(e.target.value)}
              placeholder="Describe how the list was voted on, the criteria, etc."
              className="bg-[#222] text-white border-border min-h-[60px]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm text-muted-foreground">
                Items (in ranked order) — pick one or more players/teams per entry
              </label>
              <Button size="sm" variant="outline" onClick={addItem}>
                <Plus className="h-4 w-4 mr-1" /> Add Item
              </Button>
            </div>
            <div className="space-y-2">
              {editItems.map((item, idx) => (
                <div key={idx} className="flex gap-2 items-start p-2 bg-[#1f242b] rounded border border-[#2a2f38]">
                  <div className="flex flex-col items-center pt-1">
                    <button
                      onClick={() => moveItem(idx, -1)}
                      disabled={idx === 0}
                      className="text-muted-foreground hover:text-white disabled:opacity-30 text-xs"
                      title="Move up"
                    >▲</button>
                    <span className="text-primary font-bold text-sm">{item.rank}</span>
                    <button
                      onClick={() => moveItem(idx, 1)}
                      disabled={idx === editItems.length - 1}
                      className="text-muted-foreground hover:text-white disabled:opacity-30 text-xs"
                      title="Move down"
                    >▼</button>
                  </div>
                  <div className="flex-1 space-y-1">
                    <MultiNameSelector
                      values={item.entries ?? []}
                      onChange={vals => updateItemEntries(idx, vals)}
                      index={searchIndex}
                    />
                    {item.entries && item.entries.length >= 2 && (
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">Show as:</span>
                        <button
                          type="button"
                          onClick={() => updateItemSeparator(idx, "and")}
                          className={`px-2 py-0.5 rounded border ${item.separator !== "vs" ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-white"}`}
                        >Fighter 1 and Fighter 2</button>
                        <button
                          type="button"
                          onClick={() => updateItemSeparator(idx, "vs")}
                          className={`px-2 py-0.5 rounded border ${item.separator === "vs" ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-white"}`}
                        >Fighter 1 VS Fighter 2</button>
                      </div>
                    )}
                    <Input
                      value={item.note || ""}
                      onChange={e => updateItemNote(idx, e.target.value)}
                      placeholder="Optional note (vote %, reason, etc.)"
                      className="bg-[#222] text-white border-border h-9 text-sm"
                    />
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeItem(idx)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------- LIST INDEX ----------
  return (
    <div className="animate-fadeIn">
      <div className="flex items-start justify-between flex-wrap gap-3 mb-2">
        <div>
          <h1 className="text-white">Fan Voted Lists</h1>
          <p className="text-foreground">In-universe fan voted lists. Create, edit, and publish your own.</p>
        </div>
        <Button onClick={startCreate}>
          <Plus className="h-4 w-4 mr-1" /> New List
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground mt-6">Loading lists...</p>
      ) : lists.length === 0 ? (
        <div className="bg-panel rounded-lg p-8 text-center mt-6">
          <p className="text-muted-foreground mb-4">No lists yet. Create your first fan voted list!</p>
          <Button onClick={startCreate}>
            <Plus className="h-4 w-4 mr-1" /> Create First List
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {lists.map(list => (
            <div
              key={list.id}
              className="bg-panel rounded-lg p-4 shadow-lg border border-[#2a2f38] hover:border-primary cursor-pointer transition-colors"
              onClick={() => setViewingList(list)}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-white font-bold text-lg flex-1">{list.name}</h3>
              </div>
              {list.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{list.description}</p>
              )}
              <p className="text-xs text-muted-foreground mb-3">
                {list.items.length} item{list.items.length !== 1 ? "s" : ""} · Updated {new Date(list.updated_at).toLocaleDateString()}
              </p>
              <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                <Button size="sm" variant="outline" className="flex-1" onClick={() => startEdit(list)}>
                  <Edit className="h-3 w-3 mr-1" /> Edit
                </Button>
                <Button size="sm" variant="outline" onClick={() => exportList(list)} title="Export as .txt">
                  <Download className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => deleteList(list)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
