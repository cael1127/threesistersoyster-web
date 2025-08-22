-- Check database permissions and table structure
-- Run this in your Supabase SQL editor to diagnose permission issues

-- 1. Check if the products table exists and its structure
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'products'
ORDER BY ordinal_position;

-- 2. Check current RLS (Row Level Security) policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'products';

-- 3. Check if RLS is enabled on the products table
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'products';

-- 4. Check current user permissions
SELECT current_user, current_database();

-- 5. Check if we can read from the products table
SELECT COUNT(*) as product_count FROM products LIMIT 1;

-- 6. Check if we can update the products table (this will fail if no permissions)
-- Comment out this line if you get permission errors
-- UPDATE products SET inventory_count = inventory_count WHERE id = (SELECT id FROM products LIMIT 1);

-- 7. Check if the update_product_inventory function exists
SELECT 
    routine_name,
    routine_type,
    data_type,
    routine_definition
FROM information_schema.routines 
WHERE routine_name = 'update_product_inventory';

-- 8. Test the function if it exists (replace with actual product ID)
-- SELECT update_product_inventory('your-product-id-here', 99);

-- 9. Check for any triggers on the products table
SELECT 
    trigger_name,
    event_manipulation,
    event_object_table,
    action_statement
FROM information_schema.triggers 
WHERE event_object_table = 'products';
