CREATE TABLE public.fan_lists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.fan_lists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view fan lists"
ON public.fan_lists FOR SELECT
USING (true);

CREATE POLICY "Anyone can create fan lists"
ON public.fan_lists FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update fan lists"
ON public.fan_lists FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete fan lists"
ON public.fan_lists FOR DELETE
USING (true);

CREATE TRIGGER update_fan_lists_updated_at
BEFORE UPDATE ON public.fan_lists
FOR EACH ROW
EXECUTE FUNCTION public.update_wiki_updated_at_column();