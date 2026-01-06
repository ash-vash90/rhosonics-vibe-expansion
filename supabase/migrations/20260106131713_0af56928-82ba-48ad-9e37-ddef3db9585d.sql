-- Create function to update timestamps (if not exists)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create visual case studies table for the builder
CREATE TABLE public.visual_case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Untitled Case Study',
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.visual_case_studies ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own visual case studies"
ON public.visual_case_studies
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own visual case studies"
ON public.visual_case_studies
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own visual case studies"
ON public.visual_case_studies
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own visual case studies"
ON public.visual_case_studies
FOR DELETE
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_visual_case_studies_updated_at
BEFORE UPDATE ON public.visual_case_studies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();