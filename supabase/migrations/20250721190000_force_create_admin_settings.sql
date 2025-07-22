-- Force create admin_settings table
DROP TABLE IF EXISTS admin_settings CASCADE;

CREATE TABLE admin_settings (
    id BIGSERIAL PRIMARY KEY,
    setting_key TEXT UNIQUE NOT NULL,
    setting_value JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON admin_settings FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON admin_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON admin_settings FOR UPDATE USING (true);

-- Create or replace the updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_admin_settings_updated_at
    BEFORE UPDATE ON admin_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default settings
INSERT INTO admin_settings (setting_key, setting_value) VALUES 
('layout_mode', '{"value": "current", "description": "Current layout mode"}'),
('instagram_embed_url', '{"value": "https://www.instagram.com/fresh_n_bass/embed", "description": "Instagram embed URL"}'),
('coming_soon_text', '{"value": "Scopri quando sarà il prossimo freshnbass", "description": "Coming soon button text"}');