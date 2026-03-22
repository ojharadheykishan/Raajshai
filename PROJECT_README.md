# Guruji Clone - Full-Stack eCommerce System

## 🎯 Project Overview

A complete full-stack eCommerce website similar to Shree Guruji with a powerful admin panel, real-time order alerts, stock management, and PDF bill generation.

---

## ✨ Features

### 🛒 User Features
- **Mandatory Login** - Users must signup/login before checkout
- **Product Browsing** - Browse products by category with search and filters
- **Shopping Cart** - Add/remove items, quantity management
- **Checkout** - Secure checkout with order confirmation
- **Order History** - View all past orders
- **User Profile** - Manage personal information

### 👨‍💼 Admin Features
- **Real-time Order Alerts** - Instant notifications for new online orders
- **Online Orders Management** - View and manage all online orders
- **Offline Orders** - Create manual orders for walk-in customers
- **Product Management** - Add, edit, delete products
- **Category Management** - Organize products by categories
- **Stock Management** - Track and update product stock
- **PDF Bill Generation** - Generate professional invoices
- **Low Stock Alerts** - Get notified when stock is low

---

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** - React framework
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animations
- **Socket.io Client** - Real-time notifications
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.io** - Real-time communication
- **JWT** - Authentication
- **PDFKit** - PDF generation
- **bcryptjs** - Password hashing

### Database
- **Supabase** - PostgreSQL database
- **Row Level Security** - Data protection
- **Real-time subscriptions** - Live updates

---

## 📁 Project Structure

```
guruji-clone/
├── app/                          # Next.js Frontend
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── admin/
│   │   ├── dashboard/page.tsx
│   │   ├── products/page.tsx
│   │   ├── categories/page.tsx
│   │   ├── orders/page.tsx
│   │   └── offline-orders/page.tsx
│   ├── collections/sharbat/page.tsx
│   ├── products/[id]/page.tsx
│   ├── cart/page.tsx
│   ├── checkout/page.tsx
│   ├── profile/page.tsx
│   ├── orders/page.tsx
│   ├── about/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── ...
├── backend/                      # Express.js Backend
│   ├── src/
│   │   ├── server.js
│   │   ├── config/
│   │   │   └── supabase.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   └── routes/
│   │       ├── authRoutes.js
│   │       ├── productRoutes.js
│   │       ├── orderRoutes.js
│   │       ├── offlineOrderRoutes.js
│   │       ├── stockRoutes.js
│   │       └── pdfRoutes.js
│   ├── package.json
│   └── .env.example
├── database/
│   └── supabase_schema.sql
├── docs/
│   └── SETUP_GUIDE.md
└── README.md
```

---

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone <repository-url>
cd guruji-clone
```

### 2. Setup Frontend
```bash
npm install
npm install framer-motion socket.io-client
```

### 3. Setup Backend
```bash
cd backend
npm install
```

### 4. Setup Database
1. Create Supabase project at [supabase.com](https://supabase.com)
2. Run `database/supabase_schema.sql` in SQL Editor
3. Copy credentials to `.env`

### 5. Configure Environment
**Backend `.env`:**
```env
PORT=5000
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-secret-key
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-key
```

**Frontend `.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

### 6. Run Application
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm run dev
```

### 7. Access Application
- **User Website**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
- **Credentials**: admin@guruji.com / admin123

---

## 📊 Database Schema

### Tables
- **users** - User accounts (id, name, email, phone, address, password_hash, role)
- **categories** - Product categories (id, name, description)
- **products** - Product catalog (id, name, category_id, price, discount_price, stock, image_url, description)
- **orders** - Online orders (id, user_id, total_price, status, shipping_address)
- **order_items** - Order line items (id, order_id, product_id, quantity, price)
- **offline_orders** - Admin-created orders (id, admin_id, customer_name, customer_phone, customer_address, total_price)
- **offline_order_items** - Offline order items (id, offline_order_id, product_id, quantity, price)

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/signup | User registration |
| POST | /api/auth/login | User login |
| GET | /api/auth/me | Get current user |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get single product |
| POST | /api/products | Create product (admin) |
| PUT | /api/products/:id | Update product (admin) |
| DELETE | /api/products/:id | Delete product (admin) |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/orders | Create online order |
| GET | /api/orders/my-orders | Get user orders |
| GET | /api/orders/all | Get all orders (admin) |
| PATCH | /api/orders/:id/status | Update order status |

### Offline Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/offline-orders | Create offline order (admin) |
| GET | /api/offline-orders | Get all offline orders (admin) |

### Stock
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/stock | Get all products with stock |
| GET | /api/stock/low-stock | Get low stock products (admin) |
| PATCH | /api/stock/:id | Update stock (admin) |

### PDF
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/pdf/generate | Generate PDF bill (admin) |

---

## 🔔 Real-time Features

### Socket.io Events
- **new-order** - Emitted when a new online order is placed
- **stock-update** - Emitted when stock is updated
- **low-stock-alert** - Emitted when stock falls below threshold

---

## 📄 PDF Bill Features

Professional invoices include:
- Company name and logo
- Customer details (name, phone, address)
- Order items with quantity and price
- Total amount
- Date and order ID
- Thank you message

---

## 🎨 UI Features

- **Modern Design** - Clean, professional eCommerce look
- **Responsive** - Works on all devices
- **Smooth Animations** - Framer Motion transitions
- **Loading States** - User-friendly loading indicators
- **Toast Notifications** - Success/error messages
- **Real-time Alerts** - Live order notifications

---

## 🔐 Security

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcryptjs for secure passwords
- **Row Level Security** - Supabase RLS policies
- **Protected Routes** - Admin-only endpoints
- **Input Validation** - Server-side validation

---

## 📱 Pages

### User Pages
1. **Home** - Featured products and categories
2. **Collection** - All products with filters
3. **Product Detail** - Single product view
4. **Cart** - Shopping cart
5. **Checkout** - Order placement (login required)
6. **Profile** - User information
7. **Orders** - Order history
8. **About** - Company information
9. **Contact** - Contact form

### Admin Pages
1. **Dashboard** - Overview with alerts
2. **Products** - Product management
3. **Categories** - Category management
4. **Orders** - Online orders list
5. **Offline Orders** - Create and manage offline orders
6. **Stock** - Stock management

---

## 🚀 Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

### Backend (Railway/Render)
1. Push to GitHub
2. Create project
3. Connect repo
4. Add environment variables
5. Deploy

### Database (Supabase)
- Already hosted
- No deployment needed

---

## 📞 Support

For issues or questions:
- Email: support@guruji-clone.com
- Documentation: docs/SETUP_GUIDE.md

---

## 📝 License

This project is for educational purposes.
