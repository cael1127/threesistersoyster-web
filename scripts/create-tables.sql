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

-- Insert initial inventory data
INSERT INTO oyster_inventory (type, quantity) VALUES 
('market', 2847),
('seed', 15000)
ON CONFLICT DO NOTHING;
