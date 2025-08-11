-- Create the harvested_counts table to track total harvested oysters
CREATE TABLE IF NOT EXISTS harvested_counts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  total_harvested INTEGER NOT NULL DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial record with 0 count
INSERT INTO harvested_counts (total_harvested) 
VALUES (0) 
ON CONFLICT DO NOTHING;

-- Create an index on the table for better performance
CREATE INDEX IF NOT EXISTS idx_harvested_counts_updated ON harvested_counts(last_updated);

-- Grant necessary permissions (adjust based on your Supabase setup)
-- ALTER TABLE harvested_counts ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow public read access" ON harvested_counts FOR SELECT USING (true);
-- CREATE POLICY "Allow authenticated users to update" ON harvested_counts FOR UPDATE USING (auth.role() = 'authenticated'); 