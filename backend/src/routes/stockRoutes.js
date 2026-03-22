const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// Mock products with stock for demo
let products = [
  { id: 1, name: 'Rose Sharbat', category: 'Sharbat', price: 299, originalPrice: 399, stock: 15, image: '/images/rose-sharbat.jpg' },
  { id: 2, name: 'Kesar Sharbat', category: 'Sharbat', price: 449, originalPrice: 599, stock: 8, image: '/images/kesar-sharbat.jpg' },
  { id: 3, name: 'Khus Sharbat', category: 'Sharbat', price: 279, originalPrice: 349, stock: 25, image: '/images/khus-sharbat.jpg' },
  { id: 4, name: 'Mango Sharbat', category: 'Sharbat', price: 329, originalPrice: 429, stock: 12, image: '/images/mango-sharbat.jpg' },
  { id: 5, name: 'Thandai Sharbat', category: 'Sharbat', price: 399, originalPrice: 499, stock: 18, image: '/images/thandai-sharbat.jpg' },
  { id: 6, name: 'Jaljeera Sharbat', category: 'Sharbat', price: 199, originalPrice: 249, stock: 30, image: '/images/jaljeera-sharbat.jpg' },
  { id: 7, name: 'Aam Panna Sharbat', category: 'Sharbat', price: 249, originalPrice: 319, stock: 22, image: '/images/aam-panna-sharbat.jpg' },
  { id: 8, name: 'Bel Sharbat', category: 'Sharbat', price: 269, originalPrice: 339, stock: 16, image: '/images/bel-sharbat.jpg' },
  { id: 9, name: 'Phalsa Sharbat', category: 'Sharbat', price: 319, originalPrice: 399, stock: 10, image: '/images/phalsa-sharbat.jpg' },
  { id: 10, name: 'Sugarcane Sharbat', category: 'Sharbat', price: 179, originalPrice: 229, stock: 28, image: '/images/sugarcane-sharbat.jpg' },
  { id: 11, name: 'Coconut Sharbat', category: 'Sharbat', price: 289, originalPrice: 369, stock: 20, image: '/images/coconut-sharbat.jpg' },
  { id: 12, name: 'Mixed Fruit Sharbat', category: 'Sharbat', price: 349, originalPrice: 449, stock: 14, image: '/images/mixed-fruit-sharbat.jpg' }
];

// Get all products with stock
router.get('/', (req, res) => {
  try {
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get low stock products (admin only)
router.get('/low-stock', verifyToken, verifyAdmin, (req, res) => {
  try {
    const lowStockThreshold = 10;
    const lowStockProducts = products.filter(p => p.stock <= lowStockThreshold);
    
    res.json({ 
      products: lowStockProducts,
      threshold: lowStockThreshold
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update stock (admin only)
router.patch('/:id', verifyToken, verifyAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    
    const product = products.find(p => p.id === parseInt(id));
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    product.stock = stock;
    
    res.json({ 
      message: 'Stock updated successfully',
      product
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Decrease stock (called when order is placed)
router.post('/decrease', (req, res) => {
  try {
    const { items } = req.body;
    
    items.forEach(item => {
      const product = products.find(p => p.id === item.product_id);
      if (product) {
        product.stock = Math.max(0, product.stock - item.quantity);
      }
    });
    
    res.json({ message: 'Stock updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
