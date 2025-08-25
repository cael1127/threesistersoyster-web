-- =====================================================
-- Three Sisters Oyster Co. Database Setup Script
-- =====================================================
-- This script sets up all necessary tables, functions, and initial data
-- Run this in your Supabase SQL editor to initialize the database

-- =====================================================
-- 1. CREATE TABLES
-- =====================================================

-- Create contacts table for contact form submissions
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table for oyster orders
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  order_type VARCHAR(50) NOT NULL, -- 'farm' or 'nursery'
  quantity INTEGER NOT NULL,
  notes TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create oyster_inventory table to track available oysters
CREATE TABLE IF NOT EXISTS oyster_inventory (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL, -- 'market' or 'seed'
  quantity INTEGER NOT NULL DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the harvested_counts table to track total harvested oysters
CREATE TABLE IF NOT EXISTS harvested_counts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  total_harvested INTEGER NOT NULL DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. ADD COLUMNS TO EXISTING TABLES
-- =====================================================

-- Add inventory_count column to products table if it doesn't exist
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS inventory_count INTEGER DEFAULT 0;

-- Add updated_at column to products table if it doesn't exist
ALTER TABLE products ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- =====================================================
-- 3. INSERT INITIAL DATA
-- =====================================================

-- Insert initial inventory data
INSERT INTO oyster_inventory (type, quantity) VALUES 
('market', 2847),
('seed', 15000)
ON CONFLICT DO NOTHING;

-- Insert initial harvested count record
INSERT INTO harvested_counts (total_harvested) 
VALUES (0) 
ON CONFLICT DO NOTHING;

-- Update existing products to have a default inventory count if they don't have one
UPDATE products 
SET inventory_count = COALESCE(inventory_count, 100) 
WHERE inventory_count IS NULL;

-- =====================================================
-- 4. CREATE INDEXES FOR PERFORMANCE
-- =====================================================

-- Create indexes on inventory_count for better performance
CREATE INDEX IF NOT EXISTS idx_products_inventory_count ON products(inventory_count);
CREATE INDEX IF NOT EXISTS idx_products_id ON products(id);
CREATE INDEX IF NOT EXISTS idx_harvested_counts_updated ON harvested_counts(last_updated);

-- =====================================================
-- 5. CREATE FUNCTIONS
-- =====================================================

-- Create a function to update product inventory counts
CREATE OR REPLACE FUNCTION update_product_inventory(
  product_id UUID,
  new_inventory_count INTEGER
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_count INTEGER;
  rows_affected INTEGER;
BEGIN
  -- Get current inventory count
  SELECT inventory_count INTO current_count
  FROM products
  WHERE id = product_id;
  
  -- Check if product exists
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Product with ID % not found', product_id;
  END IF;
  
  -- Update the inventory count
  UPDATE products
  SET 
    inventory_count = new_inventory_count,
    updated_at = NOW()
  WHERE id = product_id;
  
  -- Get the number of rows affected
  GET DIAGNOSTICS rows_affected = ROW_COUNT;
  
  -- Log the update
  RAISE NOTICE 'Updated product % inventory from % to % (rows affected: %)', 
    product_id, current_count, new_inventory_count, rows_affected;
  
  -- Return true if update was successful
  RETURN rows_affected > 0;
  
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Failed to update inventory: %', SQLERRM;
    RETURN FALSE;
END;
$$;

-- Create function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- =====================================================
-- 6. CREATE TRIGGERS
-- =====================================================

-- Create trigger to automatically update the updated_at column
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 7. GRANT PERMISSIONS
-- =====================================================

-- Grant execute permission to the update_product_inventory function
GRANT EXECUTE ON FUNCTION update_product_inventory(UUID, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION update_product_inventory(UUID, INTEGER) TO anon;

-- =====================================================
-- 8. VERIFICATION QUERIES
-- =====================================================

-- Check if all tables were created successfully
SELECT 'Tables created:' as status;
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('contacts', 'orders', 'oyster_inventory', 'harvested_counts', 'products')
ORDER BY table_name;

-- Check if the function was created
SELECT 'Function created:' as status;
SELECT routine_name FROM information_schema.routines 
WHERE routine_name = 'update_product_inventory';

-- Check initial data
SELECT 'Initial data inserted:' as status;
SELECT 'oyster_inventory' as table_name, COUNT(*) as count FROM oyster_inventory
UNION ALL
SELECT 'harvested_counts' as table_name, COUNT(*) as count FROM harvested_counts;

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================
-- Your database is now ready for the Three Sisters Oyster Co. website
-- 
-- Next steps:
-- 1. Configure Row Level Security (RLS) policies if needed
-- 2. Set up your Stripe webhook endpoints
-- 3. Test the inventory update functionality
-- 4. Verify all API endpoints are working correctly
