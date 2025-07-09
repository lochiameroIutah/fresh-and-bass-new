-- Fix RLS policies for subscribers table to allow anonymous inserts

-- Drop all existing policies
DROP POLICY IF EXISTS "Allow public inserts" ON public.subscribers;
DROP POLICY IF EXISTS "Allow authenticated reads" ON public.subscribers;

-- Disable RLS temporarily to clean up
ALTER TABLE public.subscribers DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Create new policy for anonymous and authenticated inserts
CREATE POLICY "Enable insert for anonymous and authenticated users" ON public.subscribers
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

-- Create policy for authenticated reads only
CREATE POLICY "Enable read for authenticated users only" ON public.subscribers
    FOR SELECT TO authenticated
    USING (true);

-- Grant necessary permissions to anon role
GRANT INSERT ON public.subscribers TO anon;
GRANT USAGE ON SCHEMA public TO anon;