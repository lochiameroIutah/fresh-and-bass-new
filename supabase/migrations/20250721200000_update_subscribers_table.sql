-- Update subscribers table: remove name column and add instagram column

-- Add instagram column (optional)
ALTER TABLE public.subscribers 
ADD COLUMN IF NOT EXISTS instagram TEXT;

-- Make name column nullable first, then drop it
ALTER TABLE public.subscribers 
ALTER COLUMN name DROP NOT NULL;

-- Drop name column
ALTER TABLE public.subscribers 
DROP COLUMN IF EXISTS name;

-- Create index on instagram for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_instagram ON public.subscribers(instagram) WHERE instagram IS NOT NULL;

-- Update the policy description to reflect the new structure
COMMENT ON TABLE public.subscribers IS 'Subscribers table for secret party access - stores email, preferred genre, and optional instagram';