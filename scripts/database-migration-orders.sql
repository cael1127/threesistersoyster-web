-- =====================================================
-- Orders Table Migration
-- Three Sisters Oyster Co.
-- =====================================================
-- This script adds new columns to the orders table for
-- payment status, order types, pickup codes, and pickup weeks
-- Run this in your Supabase SQL editor after the initial setup
-- 
-- NOTE: This script preserves the existing database structure
-- and only adds new columns that don't already exist.

-- Add new columns to orders table (only if they don't exist)
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'paid',
ADD COLUMN IF NOT EXISTS order_type TEXT DEFAULT 'online',
ADD COLUMN IF NOT EXISTS pickup_code TEXT,
ADD COLUMN IF NOT EXISTS pickup_week_start DATE;

-- Add CHECK constraint for payment_status if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'orders_payment_status_check'
  ) THEN
    ALTER TABLE orders 
    ADD CONSTRAINT orders_payment_status_check 
    CHECK (payment_status = ANY (ARRAY['paid'::text, 'reserved'::text, 'refunded'::text, 'pending'::text]));
  END IF;
END $$;

-- Add CHECK constraint for order_type if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'orders_order_type_check'
  ) THEN
    ALTER TABLE orders 
    ADD CONSTRAINT orders_order_type_check 
    CHECK (order_type = ANY (ARRAY['online'::text, 'reservation'::text]));
  END IF;
END $$;

-- Update existing orders to have default values for new columns
UPDATE orders 
SET 
  payment_status = COALESCE(payment_status, 'paid'),
  order_type = COALESCE(order_type, 'online')
WHERE 
  payment_status IS NULL 
  OR order_type IS NULL;

-- Create indexes for efficient queries (if they don't exist)
CREATE INDEX IF NOT EXISTS idx_orders_pickup_week_start ON orders(pickup_week_start);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_order_type ON orders(order_type);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_pickup_code ON orders(pickup_code) WHERE pickup_code IS NOT NULL;

-- Add comments to columns
COMMENT ON COLUMN orders.payment_status IS 'Status: paid, reserved, refunded, or pending';
COMMENT ON COLUMN orders.order_type IS 'Type: online (Stripe checkout) or reservation (pay in person)';
COMMENT ON COLUMN orders.pickup_code IS 'Unique code for customer pickup reference (for reservations)';
COMMENT ON COLUMN orders.pickup_week_start IS 'Date of Friday pickup (week cutoff is Thursday 11:59 PM)';

