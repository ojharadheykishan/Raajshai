-- Product Customization Schema
-- This extends the existing schema to support product customization options

-- Customization options for products (e.g., "Color", "Size", "Engraving")
CREATE TABLE IF NOT EXISTS customization_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL, -- e.g., "Color", "Size", "Engraving Text"
    type VARCHAR(50) NOT NULL CHECK (type IN ('text', 'select', 'color', 'image', 'number')),
    required BOOLEAN DEFAULT false,
    description TEXT,
    min_value DECIMAL(10,2), -- For number type
    max_value DECIMAL(10,2), -- For number type
    max_length INTEGER, -- For text type
    price_adjustment DECIMAL(10,2) DEFAULT 0, -- Base price adjustment for this option
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customization option values (for select, color, image types)
CREATE TABLE IF NOT EXISTS customization_option_values (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    option_id UUID NOT NULL REFERENCES customization_options(id) ON DELETE CASCADE,
    value VARCHAR(255) NOT NULL, -- e.g., "Red", "Blue", "Large"
    label VARCHAR(255), -- Display label
    color_code VARCHAR(7), -- For color type (hex code)
    image_url TEXT, -- For image type
    price_adjustment DECIMAL(10,2) DEFAULT 0, -- Additional price for this value
    in_stock BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order item customizations (stores customization choices for each order item)
CREATE TABLE IF NOT EXISTS order_item_customizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_item_id UUID NOT NULL REFERENCES order_items(id) ON DELETE CASCADE,
    option_id UUID NOT NULL REFERENCES customization_options(id),
    option_value_id UUID REFERENCES customization_option_values(id), -- NULL for text/number types
    text_value TEXT, -- For text type
    number_value DECIMAL(10,2), -- For number type
    price_adjustment DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cart item customizations (stores customization choices for cart items)
CREATE TABLE IF NOT EXISTS cart_item_customizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cart_item_id UUID NOT NULL, -- References cart items (assuming cart is session-based)
    option_id UUID NOT NULL REFERENCES customization_options(id),
    option_value_id UUID REFERENCES customization_option_values(id),
    text_value TEXT,
    number_value DECIMAL(10,2),
    price_adjustment DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_customization_options_product_id ON customization_options(product_id);
CREATE INDEX IF NOT EXISTS idx_customization_option_values_option_id ON customization_option_values(option_id);
CREATE INDEX IF NOT EXISTS idx_order_item_customizations_order_item_id ON order_item_customizations(order_item_id);
CREATE INDEX IF NOT EXISTS idx_cart_item_customizations_cart_item_id ON cart_item_customizations(cart_item_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_customization_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for customization_options
CREATE TRIGGER update_customization_options_updated_at
    BEFORE UPDATE ON customization_options
    FOR EACH ROW
    EXECUTE FUNCTION update_customization_updated_at();
