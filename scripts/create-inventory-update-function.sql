-- Create a function to update product inventory counts
-- This function will be called directly from the webhook to ensure reliable updates

-- Create the function if it doesn't exist
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

-- Grant execute permission to the function
GRANT EXECUTE ON FUNCTION update_product_inventory(UUID, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION update_product_inventory(UUID, INTEGER) TO anon;

-- Create an index on inventory_count for better performance
CREATE INDEX IF NOT EXISTS idx_products_inventory_count ON products(inventory_count);

-- Create an index on id for faster lookups
CREATE INDEX IF NOT EXISTS idx_products_id ON products(id);

-- Add updated_at column if it doesn't exist
ALTER TABLE products ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create a trigger to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create the trigger if it doesn't exist
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Test the function with a sample call (commented out for safety)
-- SELECT update_product_inventory('00000000-0000-0000-0000-000000000000', 100);
