# Guruji Clone - Complete Setup Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Frontend Setup](#frontend-setup)
3. [Backend Setup](#backend-setup)
4. [Database Setup (Supabase)](#database-setup)
5. [Environment Variables](#environment-variables)
6. [Running the Application](#running-the-application)
7. [Deployment](#deployment)

---

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier works)
- Git installed

---

## Frontend Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Install Additional Packages
```bash
npm install framer-motion socket.io-client
```

### 3. Frontend Structure
```
app/
├── (auth)/
│   ├── login/page.tsx
│   └── signup/page.tsx
├── admin/
│   ├── dashboard/page.tsx
│   ├── products/page.tsx
│   ├── categories/page.tsx
│   ├── orders/page.tsx
│   └── offline-orders/page.tsx
├── collections/sharbat/page.tsx
├── products/[id]/page.tsx
├── cart/page.tsx
├── checkout/page.tsx
├── profile/page.tsx
├── orders/page.tsx
├── about/page.tsx
└── contact/page.tsx
```

---

## Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Backend Structure
```
backend/
├── src/
│   ├── server.js
│   ├── config/
│   │   └── supabase.js
│   ├── middleware/
│   │   └── auth.js
│   └── routes/
│       ├── authRoutes.js
│       ├── productRoutes.js
│       ├── orderRoutes.js
│       ├── offlineOrderRoutes.js
│       ├── stockRoutes.js
│       └── pdfRoutes.js
├── package.json
└── .env
```

---

## Database Setup

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for database to be ready

### 2. Run SQL Schema
1. Go to SQL Editor in Supabase dashboard
2. Copy contents of `database/supabase_schema.sql`
3. Run the SQL query

### 3. Get Credentials
1. Go to Settings → API
2. Copy `Project URL` and `anon public` key
3. Add to `.env` file

---

## Environment Variables

### Backend `.env`
```env
PORT=5000
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-secret-key-here
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Frontend `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

---

## Running the Application

### 1. Start Backend
```bash
cd backend
npm run dev
```
Backend runs on http://localhost:5000

### 2. Start Frontend (in new terminal)
```bash
npm run dev
```
Frontend runs on http://localhost:3000

### 3. Access Application
- **User Website**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
- **Admin Credentials**: admin@guruji.com / admin123

---

## Features Overview

### User Features
- ✅ Browse products by category
- ✅ Search and filter products
- ✅ Add to cart
- ✅ User signup/login (mandatory for checkout)
- ✅ Place orders
- ✅ View order history
- ✅ User profile

### Admin Features
- ✅ Real-time order alerts
- ✅ View online orders
- ✅ Create offline orders
- ✅ Manage products (CRUD)
- ✅ Manage categories
- ✅ Stock management
- ✅ Generate PDF bills
- ✅ Low stock alerts

---

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `POST /api/orders` - Create online order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/all` - Get all orders (admin)
- `PATCH /api/orders/:id/status` - Update order status

### Offline Orders
- `POST /api/offline-orders` - Create offline order (admin)
- `GET /api/offline-orders` - Get all offline orders (admin)

### Stock
- `GET /api/stock` - Get all products with stock
- `GET /api/stock/low-stock` - Get low stock products (admin)
- `PATCH /api/stock/:id` - Update stock (admin)

### PDF
- `POST /api/pdf/generate` - Generate PDF bill (admin)

---

## Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

### Backend (Railway/Render)
1. Push code to GitHub
2. Create new project in Railway/Render
3. Connect GitHub repo
4. Add environment variables
5. Deploy

### Database (Supabase)
- Already hosted on Supabase
- No additional deployment needed

---

## Troubleshooting

### CORS Issues
- Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL

### Database Connection
- Verify Supabase credentials in `.env`
- Check if SQL schema was run successfully

### Socket.io Connection
- Ensure `NEXT_PUBLIC_SOCKET_URL` matches backend URL
- Check if backend is running

---

## Support
For issues or questions, contact: support@guruji-clone.com
