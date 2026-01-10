-- Add thumbnail_url column to visual_case_studies table
ALTER TABLE public.visual_case_studies 
ADD COLUMN thumbnail_url text DEFAULT NULL;