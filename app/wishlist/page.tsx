'use client'

import { useState } from 'react'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { products } from '@/data/products'

export default function WishlistPage() {
  const [cartItems, setCartItems] = useState<number[]>([])
  const [wishlistItems, setWishlistItems] = useState<number[]>([1, 3, 5]) // Demo wishlist items

  const addToCart = (productId: number) => {
    setCartItems([...cartItems, productId])
  }

  const removeFromWishlist = (productId: number) => {
    setWishlistItems(wishlistItems.filter((id) => id !== productId))
  }

  const wishlistProducts = products.filter((product) =>
    wishlistItems.includes(product.id)
  )

  return (
    <main className="min-h-screen flex flex-col">
      <Header cartCount={cartItems.length} />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">My Wishlist</h1>
          <p className="text-lg opacity-90">
            Your favorite products saved for later
          </p>
        </div>
      </section>

      {/* Wishlist Content */}
      <section className="py-12 flex-grow">
        <div className="container mx-auto px-4">
          {wishlistProducts.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-gray-600">
                  {wishlistProducts.length} items in your wishlist
                </p>
                <button
                  onClick={() => setWishlistItems([])}
                  className="text-red-600 hover:text-red-700 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {wishlistProducts.map((product) => (
                  <div key={product.id} className="relative">
                    <ProductCard
                      product={product}
                      onAddToCart={addToCart}
                    />
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors z-10"
                    >
                      <Heart className="w-5 h-5 text-red-600 fill-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-gray-600 mb-6">
                Start adding products to your wishlist by clicking the heart icon
              </p>
              <a
                href="/collections/sharbat"
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors inline-block"
              >
                Browse Products
              </a>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
