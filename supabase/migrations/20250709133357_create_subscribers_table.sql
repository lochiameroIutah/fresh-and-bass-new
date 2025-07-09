-- Create subscribers table
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    preferred_genre TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts for everyone (including anonymous users)
DROP POLICY IF EXISTS "Allow public inserts" ON public.subscribers;
CREATE POLICY "Allow public inserts" ON public.subscribers
    FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Create policy to allow reads for authenticated users only
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'subscribers' AND policyname = 'Allow authenticated reads'
    ) THEN
        CREATE POLICY "Allow authenticated reads" ON public.subscribers
            FOR SELECT USING (auth.role() = 'authenticated');
    END IF;
END $$;

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.subscribers(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_subscribers_created_at ON public.subscribers(created_at);