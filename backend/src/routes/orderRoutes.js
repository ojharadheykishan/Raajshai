const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

// Mock orders for demo
let orders = [];
let orderItems = [];

// Create order (online)
router.post('/', verifyToken, (req, res) => {
  try {
    const { items, shipping_address, payment_method } = req.body;
    const userId = req.user.id;
    
    // Calculate total
    let totalPrice = 0;
    const orderItemsData = items.map(item => {
      const itemTotal = item.price * item.quantity;
      totalPrice += itemTotal;
      return {
        id: orderItems.length + 1,
        order_id: orders.length + 1,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      };
    });
    
    // Create order
    const newOrder = {
      id: orders.length + 1,
      user_id: userId,
      total_price: totalPrice,
      status: 'pending',
      online_order: true,
      shipping_address,
      payment_method,
      created_at: new Date().toISOString()
    };
    
    orders.push(newOrder);
    orderItems.push(...orderItemsData);
    
    // Emit real-time notification to admin
    const io = req.app.get('io');
    if (io) {
      io.emit('new-order', {
        order: newOrder,
        items: orderItemsData,
        user: req.user
      });
    }
    
    res.status(201).json({
      message: 'Order created successfully',
      order: newOrder,
      items: orderItemsData
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user orders
router.get('/my-orders', verifyToken, (req, res) => {
  try {
    const userId = req.user.id;
    const userOrders = orders.filter(o => o.user_id === userId);
    
    const ordersWithItems = userOrders.map(order => {
      const items = orderItems.filter(item => item.order_id === order.id);
      return { ...order, items };
    });
    
    res.json({ orders: ordersWithItems });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all orders (admin)
router.get('/all', (req, res) => {
  try {
    const ordersWithItems = orders.map(order => {
      const items = orderItems.filter(item => item.order_id === order.id);
      return { ...order, items };
    });
    
    res.json({ orders: ordersWithItems });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update order status
router.patch('/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const order = orders.find(o => o.id === parseInt(id));
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    order.status = status;
    
    res.json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
