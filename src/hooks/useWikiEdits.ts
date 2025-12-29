import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface WikiEdit {
  field_name: string;
  field_value: string;
}

export const useWikiEdits = (entityType: 'fighter' | 'team', entityName: string) => {
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  // Fetch existing edits
  useEffect(() => {
    const fetchEdits = async () => {
      if (!entityName) return;
      
      const { data, error } = await supabase
        .from('wiki_edits')
        .select('field_name, field_value')
        .eq('entity_type', entityType)
        .eq('entity_name', entityName);

      if (error) {
        console.error('Error fetching wiki edits:', error);
      } else if (data) {
        const editMap: Record<string, string> = {};
        data.forEach((edit: WikiEdit) => {
          editMap[edit.field_name] = edit.field_value;
        });
        setEdits(editMap);
      }
      setLoading(false);
    };

    fetchEdits();
  }, [entityType, entityName]);

  // Save an edit
  const saveEdit = useCallback(async (fieldName: string, fieldValue: string) => {
    const { error } = await supabase
      .from('wiki_edits')
      .upsert({
        entity_type: entityType,
        entity_name: entityName,
        field_name: fieldName,
        field_value: fieldValue,
      }, {
        onConflict: 'entity_type,entity_name,field_name'
      });

    if (error) {
      console.error('Error saving wiki edit:', error);
      toast({
        title: "Error",
        description: "Failed to save edit",
        variant: "destructive"
      });
      return false;
    }

    setEdits(prev => ({ ...prev, [fieldName]: fieldValue }));
    toast({
      title: "Saved",
      description: "Wiki entry updated successfully"
    });
    return true;
  }, [entityType, entityName]);

  // Get value with fallback to original
  const getValue = useCallback((fieldName: string, originalValue: string | undefined) => {
    return edits[fieldName] ?? originalValue ?? '';
  }, [edits]);

  // Get array value (stored as JSON)
  const getArrayValue = useCallback((fieldName: string, originalValue: string[] | undefined) => {
    if (edits[fieldName]) {
      try {
        return JSON.parse(edits[fieldName]);
      } catch {
        return originalValue ?? [];
      }
    }
    return originalValue ?? [];
  }, [edits]);

  // Save array value as JSON
  const saveArrayEdit = useCallback(async (fieldName: string, values: string[]) => {
    return saveEdit(fieldName, JSON.stringify(values));
  }, [saveEdit]);

  return {
    edits,
    loading,
    saveEdit,
    getValue,
    getArrayValue,
    saveArrayEdit
  };
};
