
-- Replace overly-permissive thumbnail storage policies
DROP POLICY IF EXISTS "Public read access for thumbnails" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload thumbnails" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their thumbnails" ON storage.objects;

CREATE POLICY "Users can view own thumbnails"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'documents'
  AND (storage.foldername(name))[1] = 'thumbnails'
  AND (storage.foldername(name))[2] = auth.uid()::text
);

CREATE POLICY "Users can upload own thumbnails"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'documents'
  AND (storage.foldername(name))[1] = 'thumbnails'
  AND (storage.foldername(name))[2] = auth.uid()::text
);

CREATE POLICY "Users can update own thumbnails"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'documents'
  AND (storage.foldername(name))[1] = 'thumbnails'
  AND (storage.foldername(name))[2] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'documents'
  AND (storage.foldername(name))[1] = 'thumbnails'
  AND (storage.foldername(name))[2] = auth.uid()::text
);

CREATE POLICY "Users can delete own thumbnails"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'documents'
  AND (storage.foldername(name))[1] = 'thumbnails'
  AND (storage.foldername(name))[2] = auth.uid()::text
);

-- handle_new_user is a SECURITY DEFINER trigger function; it should not be callable via the API
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
