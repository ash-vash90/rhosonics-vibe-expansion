-- Make documents bucket public for thumbnail access
UPDATE storage.buckets SET public = true WHERE id = 'documents';

-- Add storage policies for thumbnail uploads
CREATE POLICY "Users can upload thumbnails"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'documents' 
  AND auth.uid() IS NOT NULL 
  AND (storage.foldername(name))[1] = 'thumbnails'
);

CREATE POLICY "Users can update their thumbnails"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'documents' 
  AND auth.uid() IS NOT NULL 
  AND (storage.foldername(name))[1] = 'thumbnails'
);

CREATE POLICY "Public read access for thumbnails"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'documents' 
  AND (storage.foldername(name))[1] = 'thumbnails'
);