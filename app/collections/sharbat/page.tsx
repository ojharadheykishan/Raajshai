'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'

interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  description: string
  category: string
  ingredients: string[]
  benefits: string[]
  weight: string
  inStock: boolean
}

export default function SharbatCollection() {
  const [cartItems, setCartItems] = useState<number[]>([])
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState('all')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = (productId: number) => {
    setCartItems([...cartItems, productId])
  }

  const filteredProducts = products
    .filter((product) => {
      if (priceRange === 'all') return true
      if (priceRange === 'under300') return product.price < 300
      if (priceRange === '300-400') return product.price >= 300 && product.price <= 400
      if (priceRange === 'above400') return product.price > 400
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return 0
    })

  return (
    <main className="min-h-screen flex flex-col">
      <Header cartCount={cartItems.length} />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Sharbat Collection</h1>
          <p className="text-lg opacity-90">
            Discover our premium range of traditional sharbat beverages
          </p>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="py-8 flex-grow">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">Price:</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Prices</option>
                <option value="under300">Under ₹300</option>
                <option value="300-400">₹300 - ₹400</option>
                <option value="above400">Above ₹400</option>
              </select>
            </div>
          </div>

          {/* Products Count */}
          <p className="text-gray-600 mb-4">
            Showing {filteredProducts.length} products
          </p>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No products available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
