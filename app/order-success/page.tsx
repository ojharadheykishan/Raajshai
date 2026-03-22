'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle, Package, Truck, Home } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Invoice from '@/components/Invoice'
import { getProductById } from '@/data/products'

interface OrderData {
  orderNumber: string
  date: string
  customerName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  items: any[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  paymentMethod: string
}

export default function OrderSuccess() {
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [showInvoice, setShowInvoice] = useState(false)

  useEffect(() => {
    // Get order data from localStorage
    const savedOrder = localStorage.getItem('lastOrder')
    if (savedOrder) {
      setOrderData(JSON.parse(savedOrder))
    } else {
      // Default order for demo
      const demoOrder = {
        orderNumber: `ORD${Math.floor(Math.random() * 100000)}`,
        date: new Date().toLocaleDateString('en-IN'),
        customerName: 'Raj Kumar',
        email: 'raj@example.com',
        phone: '+91-98765-43210',
        address: '123 Main Street',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110001',
        items: [
          {
            id: 1,
            name: 'Rose Sharbat',
            quantity: 2,
            price: 299,
          },
          {
            id: 3,
            name: 'Khus Sharbat',
            quantity: 1,
            price: 279,
          },
        ],
        subtotal: 877,
        shipping: 0,
        tax: 43.85,
        total: 920.85,
        paymentMethod: 'cod',
      }
      setOrderData(demoOrder)
    }
  }, [])

  if (!orderData) {
    return <div>Loading...</div>
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header cartCount={0} />

      <div className="flex-grow bg-gradient-to-b from-green-50 to-white py-12">
        <div className="container mx-auto px-4">
          {!showInvoice ? (
            <>
              {/* Success Message */}
              <div className="max-w-2xl mx-auto text-center mb-12">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  ✨ Order Placed Successfully! ✨
                </h1>
                <p className="text-xl text-gray-600 mb-2">
                  Thank you for your order! We're excited to deliver your favorite शर्बत.
                </p>
                <p className="text-gray-600 mb-6">
                  Order ID: <span className="font-bold text-red-600">{orderData.orderNumber}</span>
                </p>
              </div>

              {/* Order Timeline */}
              <div className="max-w-3xl mx-auto mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-lg p-6 shadow-md border-2 border-green-200">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <h3 className="text-lg font-bold text-gray-800">Order Confirmed</h3>
                    </div>
                    <p className="text-gray-600">Your order has been confirmed</p>
                    <p className="text-sm text-gray-500 mt-2">{orderData.date}</p>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-md border-2 border-yellow-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Package className="w-6 h-6 text-yellow-600" />
                      <h3 className="text-lg font-bold text-gray-800">Processing</h3>
                    </div>
                    <p className="text-gray-600">We're preparing your order</p>
                    <p className="text-sm text-gray-500 mt-2">24-48 hours</p>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-md border-2 border-blue-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Truck className="w-6 h-6 text-blue-600" />
                      <h3 className="text-lg font-bold text-gray-800">Delivery</h3>
                    </div>
                    <p className="text-gray-600">On its way to you</p>
                    <p className="text-sm text-gray-500 mt-2">2-3 business days</p>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

                {/* Customer Info */}
                <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Delivery Address</h3>
                    <p className="text-gray-600">{orderData.customerName}</p>
                    <p className="text-gray-600">{orderData.address}</p>
                    <p className="text-gray-600">
                      {orderData.city}, {orderData.state} {orderData.pincode}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Contact Info</h3>
                    <p className="text-gray-600">
                      <span className="font-semibold">Email:</span> {orderData.email}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Phone:</span> {orderData.phone}
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-700 mb-4">Items Ordered</h3>
                  <div className="space-y-3">
                    {orderData.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center pb-3 border-b"
                      >
                        <div>
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-800">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Summary */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span>₹{orderData.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping:</span>
                    <span>{orderData.shipping === 0 ? 'FREE' : `₹${orderData.shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax (5%):</span>
                    <span>₹{orderData.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-red-600 border-t-2 pt-2">
                    <span>Total Amount:</span>
                    <span>₹{orderData.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Payment Method:</span>{' '}
                    {orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button
                  onClick={() => setShowInvoice(true)}
                  className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                >
                  📄 View & Download Invoice
                </button>
                <Link
                  href="/"
                  className="px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition text-center flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Back to Home
                </Link>
              </div>

              {/* Next Steps */}
              <div className="max-w-2xl mx-auto bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded">
                <h3 className="font-bold text-gray-800 mb-3">📋 What's Next?</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>✅ You'll receive a confirmation SMS shortly</li>
                  <li>✅ Order will be ready for pickup/delivery within 24-48 hours</li>
                  <li>✅ Track your order using the order ID above</li>
                  <li>✅ Contact us if you have any questions</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              {/* Invoice View */}
              <div className="max-w-4xl mx-auto mb-8">
                <Invoice
                  orderNumber={orderData.orderNumber}
                  date={orderData.date}
                  customerName={orderData.customerName}
                  email={orderData.email}
                  phone={orderData.phone}
                  address={orderData.address}
                  city={orderData.city}
                  state={orderData.state}
                  pincode={orderData.pincode}
                  items={orderData.items}
                  subtotal={orderData.subtotal}
                  shipping={orderData.shipping}
                  tax={orderData.tax}
                  total={orderData.total}
                  paymentMethod={orderData.paymentMethod}
                />
              </div>

              {/* Back Button */}
              <div className="max-w-4xl mx-auto">
                <button
                  onClick={() => setShowInvoice(false)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  ← Back to Order Details
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
