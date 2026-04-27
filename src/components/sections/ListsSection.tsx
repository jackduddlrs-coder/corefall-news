import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit, Save, X, GripVertical, ArrowLeft } from "lucide-react";

interface ListItem {
  rank: number;
  name: string;
  note?: string;
}

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
        items: Array.isArray(d.items) ? d.items as unknown as ListItem[] : [],
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
    setEditItems([{ rank: 1, name: "", note: "" }]);
  };

  const startEdit = (list: FanList) => {
    setIsCreating(false);
    setEditingList(list);
    setEditName(list.name);
    setEditDescription(list.description || "");
    setEditItems(list.items.length ? [...list.items] : [{ rank: 1, name: "", note: "" }]);
  };

  const cancelEdit = () => {
    setEditingList(null);
    setIsCreating(false);
  };

  const addItem = () => {
    setEditItems([...editItems, { rank: editItems.length + 1, name: "", note: "" }]);
  };

  const removeItem = (idx: number) => {
    const newItems = editItems.filter((_, i) => i !== idx).map((it, i) => ({ ...it, rank: i + 1 }));
    setEditItems(newItems);
  };

  const updateItem = (idx: number, field: "name" | "note", value: string) => {
    const newItems = [...editItems];
    newItems[idx] = { ...newItems[idx], [field]: value };
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
      .filter(it => it.name.trim())
      .map((it, i) => ({ rank: i + 1, name: it.name.trim(), note: (it.note || "").trim() }));

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

  // ---------- VIEW MODE: viewing a single list ----------
  if (viewingList && !editingList && !isCreating) {
    return (
      <div className="animate-fadeIn space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => setViewingList(null)}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Lists
          </Button>
          <div className="flex gap-2">
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
            {viewingList.items.map((item, idx) => (
              <li key={idx} className="flex gap-3 p-3 bg-[#1f242b] rounded border border-[#2a2f38] hover:bg-[#2c323d] transition-colors">
                <span className="text-primary font-bold text-lg w-10 text-right">#{item.rank}</span>
                <div className="flex-1">
                  <div
                    className={onPlayerClick ? "clickable-name font-semibold text-white" : "font-semibold text-white"}
                    onClick={onPlayerClick ? () => onPlayerClick(item.name) : undefined}
                  >
                    {item.name}
                  </div>
                  {item.note && <div className="text-sm text-muted-foreground mt-1">{item.note}</div>}
                </div>
              </li>
            ))}
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
              <label className="block text-sm text-muted-foreground">Items (in ranked order)</label>
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
                    <Input
                      value={item.name}
                      onChange={e => updateItem(idx, "name", e.target.value)}
                      placeholder="Player / team / item name"
                      className="bg-[#222] text-white border-border h-9"
                    />
                    <Input
                      value={item.note || ""}
                      onChange={e => updateItem(idx, "note", e.target.value)}
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
