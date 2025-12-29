import { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => Promise<boolean>;
  multiline?: boolean;
  className?: string;
  labelClassName?: string;
  placeholder?: string;
}

export const EditableField = ({
  value,
  onSave,
  multiline = false,
  className = '',
  labelClassName = '',
  placeholder = 'Enter value...'
}: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const success = await onSave(editValue);
    setSaving(false);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={`flex gap-2 items-start ${className}`}>
        {multiline ? (
          <Textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="min-h-[100px] bg-background border-border text-foreground"
            placeholder={placeholder}
          />
        ) : (
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="bg-background border-border text-foreground"
            placeholder={placeholder}
          />
        )}
        <div className="flex gap-1 shrink-0">
          <Button
            size="icon"
            variant="ghost"
            onClick={handleSave}
            disabled={saving}
            className="h-8 w-8 text-green-400 hover:text-green-300 hover:bg-green-400/10"
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleCancel}
            disabled={saving}
            className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`group relative ${className}`}>
      <span className={labelClassName}>{value || <span className="text-muted-foreground italic">Not set</span>}</span>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setIsEditing(true)}
        className="h-6 w-6 opacity-0 group-hover:opacity-100 absolute -right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
      >
        <Pencil className="h-3 w-3" />
      </Button>
    </div>
  );
};
