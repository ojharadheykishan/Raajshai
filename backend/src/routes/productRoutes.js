const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// Mock products for demo
let products = [
  { id: 1, name: 'Rose Sharbat', category: 'Sharbat', price: 299, originalPrice: 399, stock: 15, image: '/images/rose-sharbat.jpg', description: 'Premium quality rose sharbat made from fresh rose petals.' },
  { id: 2, name: 'Kesar Sharbat', category: 'Sharbat', price: 449, originalPrice: 599, stock: 8, image: '/images/kesar-sharbat.jpg', description: 'Luxurious saffron-infused sharbat with authentic Kashmiri kesar.' },
  { id: 3, name: 'Khus Sharbat', category: 'Sharbat', price: 279, originalPrice: 349, stock: 25, image: '/images/khus-sharbat.jpg', description: 'Refreshing vetiver root sharbat with natural cooling properties.' },
  { id: 4, name: 'Mango Sharbat', category: 'Sharbat', price: 329, originalPrice: 429, stock: 12, image: '/images/mango-sharbat.jpg', description: 'Delicious mango-flavored sharbat made from Alphonso mangoes.' },
  { id: 5, name: 'Thandai Sharbat', category: 'Sharbat', price: 399, originalPrice: 499, stock: 18, image: '/images/thandai-sharbat.jpg', description: 'Traditional Holi special thandai with mixed nuts and spices.' },
  { id: 6, name: 'Jaljeera Sharbat', category: 'Sharbat', price: 199, originalPrice: 249, stock: 30, image: '/images/jaljeera-sharbat.jpg', description: 'Tangy and spicy jaljeera sharbat for instant refreshment.' },
  { id: 7, name: 'Aam Panna Sharbat', category: 'Sharbat', price: 249, originalPrice: 319, stock: 22, image: '/images/aam-panna-sharbat.jpg', description: 'Raw mango sharbat with mint and spices.' },
  { id: 8, name: 'Bel Sharbat', category: 'Sharbat', price: 269, originalPrice: 339, stock: 16, image: '/images/bel-sharbat.jpg', description: 'Wood apple sharbat with natural cooling properties.' },
  { id: 9, name: 'Phalsa Sharbat', category: 'Sharbat', price: 319, originalPrice: 399, stock: 10, image: '/images/phalsa-sharbat.jpg', description: 'Rare phalsa berry sharbat with unique tangy-sweet flavor.' },
  { id: 10, name: 'Sugarcane Sharbat', category: 'Sharbat', price: 179, originalPrice: 229, stock: 28, image: '/images/sugarcane-sharbat.jpg', description: 'Pure sugarcane juice sharbat with natural sweetness.' },
  { id: 11, name: 'Coconut Sharbat', category: 'Sharbat', price: 289, originalPrice: 369, stock: 20, image: '/images/coconut-sharbat.jpg', description: 'Tender coconut water sharbat with natural electrolytes.' },
  { id: 12, name: 'Mixed Fruit Sharbat', category: 'Sharbat', price: 349, originalPrice: 449, stock: 14, image: '/images/mixed-fruit-sharbat.jpg', description: 'Delightful blend of multiple fruits in one sharbat.' }
];

// Get all products
router.get('/', (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, sortBy } = req.query;
    
    let filteredProducts = [...products];
    
    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    // Filter by search
    if (search) {
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Filter by price range
    if (minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= parseInt(minPrice));
    }
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= parseInt(maxPrice));
    }
    
    // Sort
    if (sortBy === 'price-low') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    res.json({ products: filteredProducts });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single product
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const product = products.find(p => p.id === parseInt(id));
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ product });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create product (admin only)
router.post('/', verifyToken, verifyAdmin, (req, res) => {
  try {
    const { name, category, price, originalPrice, stock, image, description } = req.body;
    
    const newProduct = {
      id: products.length + 1,
      name,
      category,
      price,
      originalPrice,
      stock,
      image,
      description
    };
    
    products.push(newProduct);
    
    res.status(201).json({ 
      message: 'Product created successfully',
      product: newProduct
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update product (admin only)
router.put('/:id', verifyToken, verifyAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, originalPrice, stock, image, description } = req.body;
    
    const productIndex = products.findIndex(p => p.id === parseInt(id));
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    products[productIndex] = {
      ...products[productIndex],
      name,
      category,
      price,
      originalPrice,
      stock,
      image,
      description
    };
    
    res.json({ 
      message: 'Product updated successfully',
      product: products[productIndex]
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete product (admin only)
router.delete('/:id', verifyToken, verifyAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const productIndex = products.findIndex(p => p.id === parseInt(id));
    
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    products.splice(productIndex, 1);
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
