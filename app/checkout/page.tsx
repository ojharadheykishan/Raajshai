'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { CreditCard, Truck, Shield, Check, Lock } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getProductById } from '@/data/products'

interface CartItem {
  id: number
  quantity: number
}

export default function Checkout() {
  const router = useRouter()
  const [cartItems] = useState<CartItem[]>([
    { id: 1, quantity: 2 },
    { id: 3, quantity: 1 },
  ])

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod',
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

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
  const tax = Math.round((subtotal + shipping) * 0.05 * 100) / 100
  const total = subtotal + shipping + tax

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      // Save order to localStorage
      const orderData = {
        orderNumber: `ORD${Math.floor(Math.random() * 100000)}`,
        date: new Date().toLocaleDateString('en-IN'),
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        items: cartProducts.map((p) => ({
          id: p?.id,
          name: p?.name,
          quantity: p?.quantity,
          price: p?.price,
        })),
        subtotal,
        shipping,
        tax,
        total,
        paymentMethod: formData.paymentMethod,
      }

      localStorage.setItem('lastOrder', JSON.stringify(orderData))
      setOrderPlaced(true)
      setIsProcessing(false)

      // Redirect to order success page
      setTimeout(() => {
        router.push('/order-success')
      }, 500)
    }, 2000)
  }

  if (orderPlaced) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header cartCount={0} />
        <div className="flex-grow flex items-center justify-center py-16">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Processing Your Order
            </h1>
            <p className="text-gray-600">
              Please wait while we confirm your order...
            </p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header cartCount={cartItems.length} />

      <div className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Checkout</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Delivery Address */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Truck className="w-6 h-6" />
                    Delivery Address
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="+91-9876543210"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Delhi"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Delhi"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="110001"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <CreditCard className="w-6 h-6" />
                    Payment Method
                  </h2>

                  <div className="space-y-3">
                    <label className="flex items-center p-4 border-2 border-red-200 rounded-lg cursor-pointer bg-red-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span className="ml-3">
                        <span className="font-semibold text-gray-800">Cash on Delivery</span>
                        <p className="text-sm text-gray-600">Pay when you receive your order</p>
                      </span>
                    </label>

                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer opacity-50 hover:opacity-75">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        onChange={handleInputChange}
                        disabled
                        className="w-4 h-4"
                      />
                      <span className="ml-3">
                        <span className="font-semibold text-gray-800">Online Payment</span>
                        <p className="text-sm text-gray-600">Coming Soon</p>
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full px-8 py-4 bg-red-600 text-white font-bold text-lg rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                >
                  <Lock className="w-5 h-5" />
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

                {/* Items */}
                <div className="space-y-4 mb-6 pb-6 border-b">
                  {cartProducts.map((product) => (
                    <div key={product?.id} className="flex justify-between items-center">
                      <div className="flex-grow">
                        <p className="font-semibold text-gray-800">{product?.name}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {product?.quantity}
                        </p>
                      </div>
                      <p className="font-bold text-gray-800">
                        ₹{((product?.price || 0) * (product?.quantity || 0)).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping:</span>
                    <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                      {shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax (5%):</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-red-600 border-t-2 pt-3">
                    <span>Total:</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex gap-2 mb-3">
                    <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-800">Free Shipping</p>
                      <p className="text-sm text-gray-600">On orders above ₹500</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
