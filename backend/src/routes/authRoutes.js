const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middleware/auth');
const supabase = require('../config/supabase');

// Mock users for demo (replace with Supabase in production)
let users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@guruji.com',
    phone: '9876543210',
    address: '123 Admin Street, Mumbai',
    password: '$2a$10$XQxBKqKqKqKqKqKqKqKqKqKqKqKqKqKqKqKqKqKqKqKqKqKqKq',
    role: 'admin',
    created_at: new Date().toISOString()
  }
];

// Initialize with hashed password
bcrypt.hash('admin123', 10).then(hash => {
  users[0].password = hash;
});

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;
    
    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const newUser = {
      id: users.length + 1,
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      role: 'user',
      created_at: new Date().toISOString()
    };
    
    users.push(newUser);
    
    // Generate token
    const token = generateToken(newUser);
    
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Generate token
    const token = generateToken(user);
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get current user
router.get('/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'guruji-clone-secret-key-2024');
    const user = users.find(u => u.id === decoded.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role
      }
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
