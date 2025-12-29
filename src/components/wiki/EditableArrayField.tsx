import { useState } from 'react';
import { Pencil, Check, X, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface EditableArrayFieldProps {
  values: string[];
  onSave: (values: string[]) => Promise<boolean>;
  className?: string;
  renderItem?: (item: string, index: number) => React.ReactNode;
  placeholder?: string;
}

export const EditableArrayField = ({
  values,
  onSave,
  className = '',
  renderItem,
  placeholder = 'Add item...'
}: EditableArrayFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState<string[]>(values);
  const [newItem, setNewItem] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const success = await onSave(editValues.filter(v => v.trim()));
    setSaving(false);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValues(values);
    setNewItem('');
    setIsEditing(false);
  };

  const addItem = () => {
    if (newItem.trim()) {
      setEditValues([...editValues, newItem.trim()]);
      setNewItem('');
    }
  };

  const removeItem = (index: number) => {
    setEditValues(editValues.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, value: string) => {
    const updated = [...editValues];
    updated[index] = value;
    setEditValues(updated);
  };

  if (isEditing) {
    return (
      <div className={`space-y-2 ${className}`}>
        {editValues.map((item, i) => (
          <div key={i} className="flex gap-2 items-center">
            <Input
              value={item}
              onChange={(e) => updateItem(i, e.target.value)}
              className="bg-background border-border text-foreground flex-1"
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={() => removeItem(i)}
              className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10 shrink-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <div className="flex gap-2 items-center">
          <Input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addItem()}
            placeholder={placeholder}
            className="bg-background border-border text-foreground flex-1"
          />
          <Button
            size="icon"
            variant="ghost"
            onClick={addItem}
            className="h-8 w-8 text-primary hover:text-primary/80 hover:bg-primary/10 shrink-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleSave}
            disabled={saving}
            className="text-green-400 border-green-400/30 hover:bg-green-400/10"
          >
            <Check className="h-4 w-4 mr-1" /> Save
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCancel}
            disabled={saving}
            className="text-muted-foreground"
          >
            <X className="h-4 w-4 mr-1" /> Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`group relative ${className}`}>
      <div className="flex flex-wrap gap-2">
        {values.length > 0 ? (
          values.map((item, i) => (
            renderItem ? renderItem(item, i) : (
              <span key={i} className="bg-muted/50 text-xs px-2 py-1 rounded text-muted-foreground">
                {item}
              </span>
            )
          ))
        ) : (
          <span className="text-muted-foreground italic text-sm">None listed</span>
        )}
      </div>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setIsEditing(true)}
        className="h-6 w-6 opacity-0 group-hover:opacity-100 absolute -right-1 top-0 text-muted-foreground hover:text-primary"
      >
        <Pencil className="h-3 w-3" />
      </Button>
    </div>
  );
};
