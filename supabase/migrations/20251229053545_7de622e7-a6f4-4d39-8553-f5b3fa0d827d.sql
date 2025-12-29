-- Create wiki_edits table to store user edits for fighters and teams
CREATE TABLE public.wiki_edits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('fighter', 'team')),
  entity_name TEXT NOT NULL,
  field_name TEXT NOT NULL,
  field_value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (entity_type, entity_name, field_name)
);

-- Enable Row Level Security
ALTER TABLE public.wiki_edits ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read wiki edits (public wiki)
CREATE POLICY "Anyone can view wiki edits" 
ON public.wiki_edits 
FOR SELECT 
USING (true);

-- Allow anyone to insert wiki edits (public editing)
CREATE POLICY "Anyone can create wiki edits" 
ON public.wiki_edits 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to update wiki edits
CREATE POLICY "Anyone can update wiki edits" 
ON public.wiki_edits 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_wiki_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_wiki_edits_updated_at
BEFORE UPDATE ON public.wiki_edits
FOR EACH ROW
EXECUTE FUNCTION public.update_wiki_updated_at_column();