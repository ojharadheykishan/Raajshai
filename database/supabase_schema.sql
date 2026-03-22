-- Guruji Clone Database Schema for Supabase/PostgreSQL
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category_id UUID REFERENCES categories(id),
  price DECIMAL(10, 2) NOT NULL,
  discount_price DECIMAL(10, 2),
  stock INTEGER DEFAULT 0,
  image_url TEXT,
  description TEXT,
  ingredients TEXT,
  benefits TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table (online orders)
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  total_price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  online_order BOOLEAN DEFAULT true,
  shipping_address TEXT,
  payment_method VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Offline orders table (admin created orders)
CREATE TABLE IF NOT EXISTS offline_orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  admin_id UUID REFERENCES users(id),
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  customer_address TEXT,
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Offline order items table
CREATE TABLE IF NOT EXISTS offline_order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  offline_order_id UUID REFERENCES offline_orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_offline_order_items_order ON offline_order_items(offline_order_id);

-- Insert default categories
INSERT INTO categories (name, description) VALUES
  ('Sharbat', 'Traditional Indian fruit-based beverages'),
  ('Squash', 'Concentrated fruit syrups'),
  ('Thandai', 'Cooling milk-based drink with nuts and spices'),
  ('Crush', 'Fruit crush beverages')
ON CONFLICT DO NOTHING;

-- Insert default admin user (password: admin123)
-- Note: In production, use proper password hashing
INSERT INTO users (name, email, phone, address, password_hash, role) VALUES
  ('Admin User', 'admin@guruji.com', '9876543210', '123 Admin Street, Mumbai', '$2a$10$XQxBKqKqKqKqKqKqKqKqKqKqKqKqKqKqKqKqKqKqKqKqKqKqKq', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, category_id, price, discount_price, stock, image_url, description) VALUES
  ('Rose Sharbat', (SELECT id FROM categories WHERE name = 'Sharbat'), 399, 299, 15, '/images/rose-sharbat.jpg', 'Premium quality rose sharbat made from fresh rose petals.'),
  ('Kesar Sharbat', (SELECT id FROM categories WHERE name = 'Sharbat'), 599, 449, 8, '/images/kesar-sharbat.jpg', 'Luxurious saffron-infused sharbat with authentic Kashmiri kesar.'),
  ('Khus Sharbat', (SELECT id FROM categories WHERE name = 'Sharbat'), 349, 279, 25, '/images/khus-sharbat.jpg', 'Refreshing vetiver root sharbat with natural cooling properties.'),
  ('Mango Sharbat', (SELECT id FROM categories WHERE name = 'Sharbat'), 429, 329, 12, '/images/mango-sharbat.jpg', 'Delicious mango-flavored sharbat made from Alphonso mangoes.'),
  ('Thandai Sharbat', (SELECT id FROM categories WHERE name = 'Sharbat'), 499, 399, 18, '/images/thandai-sharbat.jpg', 'Traditional Holi special thandai with mixed nuts and spices.'),
  ('Jaljeera Sharbat', (SELECT id FROM categories WHERE name = 'Sharbat'), 249, 199, 30, '/images/jaljeera-sharbat.jpg', 'Tangy and spicy jaljeera sharbat for instant refreshment.'),
  ('Aam Panna Sharbat', (SELECT id FROM categories WHERE name = 'Sharbat'), 319, 249, 22, '/images/aam-panna-sharbat.jpg', 'Raw mango sharbat with mint and spices.'),
  ('Bel Sharbat', (SELECT id FROM categories WHERE name = 'Sharbat'), 339, 269, 16, '/images/bel-sharbat.jpg', 'Wood apple sharbat with natural cooling properties.'),
  ('Phalsa Sharbat', (SELECT id FROM categories WHERE name = 'Sharbat'), 399, 319, 10, '/images/phalsa-sharbat.jpg', 'Rare phalsa berry sharbat with unique tangy-sweet flavor.'),
  ('Sugarcane Sharbat', (SELECT id FROM categories WHERE name = 'Sharbat'), 229, 179, 28, '/images/sugarcane-sharbat.jpg', 'Pure sugarcane juice sharbat with natural sweetness.'),
  ('Coconut Sharbat', (SELECT id FROM categories WHERE name = 'Sharbat'), 369, 289, 20, '/images/coconut-sharbat.jpg', 'Tender coconut water sharbat with natural electrolytes.'),
  ('Mixed Fruit Sharbat', (SELECT id FROM categories WHERE name = 'Sharbat'), 449, 349, 14, '/images/mixed-fruit-sharbat.jpg', 'Delightful blend of multiple fruits in one sharbat.')
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS) for Supabase
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE offline_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE offline_order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public access to products
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

-- Create policies for authenticated users
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policies for admin access
CREATE POLICY "Admins can view all orders" ON orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can manage products" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
