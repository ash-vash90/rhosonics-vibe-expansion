-- Fix: Add missing INSERT and DELETE policies for profiles table
-- This ensures users can only create their own profile and can delete their data (GDPR compliance)

-- INSERT policy: Users can only create their own profile
CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- DELETE policy: Users can delete their own profile (GDPR compliance)
CREATE POLICY "Users can delete own profile"
ON public.profiles
FOR DELETE
USING (auth.uid() = id);