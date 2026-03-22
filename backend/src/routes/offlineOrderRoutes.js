const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// Mock offline orders for demo
let offlineOrders = [];
let offlineOrderItems = [];

// Create offline order (admin only)
router.post('/', verifyToken, verifyAdmin, (req, res) => {
  try {
    const { customer_name, customer_phone, customer_address, items } = req.body;
    const adminId = req.user.id;
    
    // Calculate total
    let totalPrice = 0;
    const orderItemsData = items.map(item => {
      const itemTotal = item.price * item.quantity;
      totalPrice += itemTotal;
      return {
        id: offlineOrderItems.length + 1,
        offline_order_id: offlineOrders.length + 1,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      };
    });
    
    // Create offline order
    const newOrder = {
      id: offlineOrders.length + 1,
      admin_id: adminId,
      customer_name,
      customer_phone,
      customer_address,
      total_price: totalPrice,
      created_at: new Date().toISOString()
    };
    
    offlineOrders.push(newOrder);
    offlineOrderItems.push(...orderItemsData);
    
    res.status(201).json({
      message: 'Offline order created successfully',
      order: newOrder,
      items: orderItemsData
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all offline orders (admin only)
router.get('/', verifyToken, verifyAdmin, (req, res) => {
  try {
    const ordersWithItems = offlineOrders.map(order => {
      const items = offlineOrderItems.filter(item => item.offline_order_id === order.id);
      return { ...order, items };
    });
    
    res.json({ orders: ordersWithItems });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single offline order
router.get('/:id', verifyToken, verifyAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const order = offlineOrders.find(o => o.id === parseInt(id));
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    const items = offlineOrderItems.filter(item => item.offline_order_id === order.id);
    
    res.json({ order: { ...order, items } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
