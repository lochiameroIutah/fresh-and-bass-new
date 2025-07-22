-- Create admin_settings table
CREATE TABLE IF NOT EXISTS admin_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO admin_settings (setting_key, setting_value) VALUES 
('layout_mode', '{"value": "current", "description": "Layout mode: current or coming_soon"}'),
('instagram_embed_url', '{"value": "https://www.instagram.com/fresh_n_bass/embed", "description": "Instagram embed URL"}'),
('coming_soon_text', '{"value": "Scopri quando sarà il prossimo Fresh&Bass", "description": "Text for coming soon button"}');

-- Enable RLS
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access (for now, allow all authenticated users)
CREATE POLICY "Allow all operations for authenticated users" ON admin_settings
  FOR ALL USING (auth.role() = 'authenticated');

-- Create function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_admin_settings_updated_at BEFORE UPDATE
    ON admin_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();