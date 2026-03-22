# Guruji Clone Admin System - Project Structure

```
guruji-clone-admin/
├── frontend/                 # Next.js frontend
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── admin/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── products/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   └── categories/
│   │   │       ├── page.tsx
│   │   │       └── [id]/
│   │   │           └── page.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   └── route.ts
│   │   │   │   └── logout/
│   │   │   │       └── route.ts
│   │   │   ├── products/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   └── categories/
│   │   │       ├── route.ts
│   │   │       └── [id]/
│   │   │           └── route.ts
│   │   ├── components/
│   │   │   ├── layout.tsx
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── product-card.tsx
│   │   │   ├── admin-sidebar.tsx
│   │   │   ├── admin-header.tsx
│   │   │   └── upload-button.tsx
│   │   ├── lib/
│   │   │   ├── auth.ts
│   │   │   ├── api.ts
│   │   │   └── utils.ts
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── public/
│   │   └── package.json
├── backend/                  # Node.js + Express backend
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── productController.ts
│   │   │   └── categoryController.ts
│   │   ├── middleware/
│   │   │   ├── authMiddleware.ts
│   │   │   └── uploadMiddleware.ts
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   ├── productRoutes.ts
│   │   │   └── categoryRoutes.ts
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   └── cloudinary.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Product.ts
│   │   │   └── Category.ts
│   │   ├── utils/
│   │   │   └── jwtUtils.ts
│   │   ├── server.ts
│   │   └── package.json
├── database/
│   └── schema.sql
├── docs/
│   └── SETUP_GUIDE.md
├── .gitignore
└README.md