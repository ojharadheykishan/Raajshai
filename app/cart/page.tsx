'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getProductById } from '@/data/products'

interface CartItem {
  id: number
  quantity: number
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, quantity: 2 },
    { id: 3, quantity: 1 },
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const cartProducts = cartItems
    .map((item) => {
      const product = getProductById(item.id)
      return product ? { ...product, quantity: item.quantity } : null
    })
    .filter(Boolean)

  const subtotal = cartProducts.reduce(
    (sum, item) => sum + (item?.price || 0) * (item?.quantity || 0),
    0
  )

  const shipping = subtotal > 500 ? 0 : 50
  const total = subtotal + shipping

  return (
    <main className="min-h-screen flex flex-col">
      <Header cartCount={cartItems.length} />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-8 flex-grow">
        <div className="container mx-auto px-4">
          {cartProducts.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-6">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link
                href="/collections/sharbat"
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Cart Items ({cartProducts.length})
                    </h2>
                  </div>

                  <div className="divide-y">
                    {cartProducts.map((item) => (
                      <div key={item?.id} className="p-4 flex gap-4">
                        {/* Product Image */}
                        <div className="relative w-24 h-24 flex-shrink-0">
                          <Image
                            src={item?.image || ''}
                            alt={item?.name || ''}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-grow">
                          <Link
                            href={`/products/${item?.id}`}
                            className="text-lg font-semibold text-gray-800 hover:text-red-600"
                          >
                            {item?.name}
                          </Link>
                          <p className="text-gray-600 text-sm mt-1">
                            {item?.weight}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-red-600 font-bold">
                              ₹{item?.price}
                            </span>
                            {item?.originalPrice && item.originalPrice > item.price && (
                              <span className="text-gray-500 line-through text-sm">
                                ₹{item.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col items-end justify-between">
                          <button
                            onClick={() => removeItem(item?.id || 0)}
                            className="text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>

                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(item?.id || 0, (item?.quantity || 1) - 1)
                              }
                              className="px-2 py-1 hover:bg-gray-100"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-3 py-1 border-x border-gray-300">
                              {item?.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item?.id || 0, (item?.quantity || 1) + 1)
                              }
                              className="px-2 py-1 hover:bg-gray-100"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                    </div>
                    {shipping === 0 && (
                      <p className="text-green-600 text-sm">
                        🎉 You've qualified for free shipping!
                      </p>
                    )}
                    {shipping > 0 && (
                      <p className="text-gray-500 text-sm">
                        Add ₹{500 - subtotal} more for free shipping
                      </p>
                    )}
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg font-bold text-gray-800">
                        <span>Total</span>
                        <span>₹{total}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 font-semibold"
                  >
                    Proceed to Checkout
                  </Link>

                  <Link
                    href="/collections/sharbat"
                    className="w-full text-center text-red-600 py-3 px-6 rounded-lg hover:bg-red-50 transition-colors mt-3 block"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
