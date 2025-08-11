-- Add inventory_count column to products table
-- This allows tracking of available stock for each product

-- Add the inventory_count column if it doesn't exist
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS inventory_count INTEGER DEFAULT 0;

-- Update existing products to have a default inventory count if they don't have one
UPDATE products 
SET inventory_count = COALESCE(inventory_count, 100) 
WHERE inventory_count IS NULL;

-- Create an index on inventory_count for better performance
CREATE INDEX IF NOT EXISTS idx_products_inventory_count ON products(inventory_count);

-- Grant necessary permissions (adjust based on your Supabase setup)
-- ALTER TABLE products ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow public read access" ON products FOR SELECT USING (true);
-- CREATE POLICY "Allow authenticated users to update inventory" ON products FOR UPDATE USING (auth.role() = 'authenticated'); 