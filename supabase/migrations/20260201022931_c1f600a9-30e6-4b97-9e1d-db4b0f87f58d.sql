-- Fix: Make documents bucket private so RLS policies are enforced
-- Currently public = true bypasses all RLS policies on storage.objects

UPDATE storage.buckets 
SET public = false 
WHERE id = 'documents';