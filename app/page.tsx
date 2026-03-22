'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { products } from '@/data/products'

export default function Home() {
  const [cartItems, setCartItems] = useState<number[]>([])

  const addToCart = (productId: number) => {
    setCartItems([...cartItems, productId])
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header cartCount={cartItems.length} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Premium Sharbat Collection
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Discover the finest traditional beverages from राजशाही शर्बत
          </p>
          <button className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Shop Now
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 flex-grow">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Our Sharbat Collection
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-xl font-semibold mb-2">100% Natural</h3>
              <p className="text-gray-600">Made with natural ingredients and traditional recipes</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable shipping across India</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Highest quality standards maintained</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
