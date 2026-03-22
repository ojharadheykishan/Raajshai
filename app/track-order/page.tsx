'use client'

import { useState } from 'react'
import { Package, Truck, CheckCircle, Clock, MapPin, Phone } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface OrderStatus {
  status: string
  date: string
  time: string
  location: string
  description: string
}

interface Order {
  id: string
  date: string
  items: { name: string; quantity: number; price: number }[]
  total: number
  status: string
  estimatedDelivery: string
  trackingHistory: OrderStatus[]
}

export default function TrackOrderPage() {
  const [cartItems, setCartItems] = useState<number[]>([])
  const [orderNumber, setOrderNumber] = useState('')
  const [order, setOrder] = useState<Order | null>(null)
  const [error, setError] = useState('')

  const mockOrders: Record<string, Order> = {
    'ORD-2024-001': {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      items: [
        { name: 'Rose Sharbat', quantity: 2, price: 299 },
        { name: 'Kesar Sharbat', quantity: 1, price: 449 }
      ],
      total: 1047,
      status: 'Out for Delivery',
      estimatedDelivery: '2024-01-18',
      trackingHistory: [
        {
          status: 'Order Placed',
          date: '2024-01-15',
          time: '10:30 AM',
          location: 'Mumbai',
          description: 'Your order has been placed successfully'
        },
        {
          status: 'Order Confirmed',
          date: '2024-01-15',
          time: '11:00 AM',
          location: 'Mumbai',
          description: 'Your order has been confirmed'
        },
        {
          status: 'Packed',
          date: '2024-01-16',
          time: '09:00 AM',
          location: 'Mumbai Warehouse',
          description: 'Your order has been packed'
        },
        {
          status: 'Shipped',
          date: '2024-01-16',
          time: '02:30 PM',
          location: 'Mumbai Hub',
          description: 'Your order has been shipped'
        },
        {
          status: 'Out for Delivery',
          date: '2024-01-18',
          time: '08:00 AM',
          location: 'Your City',
          description: 'Your order is out for delivery'
        }
      ]
    },
    'ORD-2024-002': {
      id: 'ORD-2024-002',
      date: '2024-01-10',
      items: [
        { name: 'Mango Sharbat', quantity: 3, price: 329 }
      ],
      total: 987,
      status: 'Delivered',
      estimatedDelivery: '2024-01-13',
      trackingHistory: [
        {
          status: 'Order Placed',
          date: '2024-01-10',
          time: '03:45 PM',
          location: 'Delhi',
          description: 'Your order has been placed successfully'
        },
        {
          status: 'Delivered',
          date: '2024-01-13',
          time: '11:30 AM',
          location: 'Your Address',
          description: 'Your order has been delivered'
        }
      ]
    }
  }

  const handleTrack = () => {
    setError('')
    setOrder(null)

    if (!orderNumber.trim()) {
      setError('Please enter an order number')
      return
    }

    const foundOrder = mockOrders[orderNumber.toUpperCase()]
    if (foundOrder) {
      setOrder(foundOrder)
    } else {
      setError('Order not found. Please check the order number.')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Order Placed':
        return <Package className="w-5 h-5" />
      case 'Order Confirmed':
        return <CheckCircle className="w-5 h-5" />
      case 'Packed':
        return <Package className="w-5 h-5" />
      case 'Shipped':
        return <Truck className="w-5 h-5" />
      case 'Out for Delivery':
        return <Truck className="w-5 h-5" />
      case 'Delivered':
        return <CheckCircle className="w-5 h-5" />
      default:
        return <Clock className="w-5 h-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'text-green-600 bg-green-100'
      case 'Out for Delivery':
        return 'text-blue-600 bg-blue-100'
      case 'Shipped':
        return 'text-purple-600 bg-purple-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header cartCount={cartItems.length} />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Track Your Order</h1>
          <p className="text-lg opacity-90">
            Enter your order number to track your delivery
          </p>
        </div>
      </section>

      {/* Track Order Content */}
      <section className="py-12 flex-grow">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Search Box */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Enter Order Number (e.g., ORD-2024-001)"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                onClick={handleTrack}
                className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                Track Order
              </button>
            </div>
            {error && (
              <p className="text-red-600 mt-3 text-sm">{error}</p>
            )}
          </div>

          {/* Order Details */}
          {order && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Order Header */}
              <div className="bg-gray-50 p-6 border-b">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      Order #{order.id}
                    </h2>
                    <p className="text-gray-600">
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6 border-b">
                <h3 className="font-semibold text-gray-800 mb-4">Order Items</h3>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-800">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                  <div className="border-t pt-3 flex justify-between items-center">
                    <p className="font-bold text-gray-800">Total</p>
                    <p className="font-bold text-red-600 text-xl">₹{order.total}</p>
                  </div>
                </div>
              </div>

              {/* Estimated Delivery */}
              <div className="p-6 border-b bg-blue-50">
                <div className="flex items-center gap-3">
                  <Truck className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Estimated Delivery</p>
                    <p className="text-blue-600 font-bold">
                      {new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tracking History */}
              <div className="p-6">
                <h3 className="font-semibold text-gray-800 mb-6">Tracking History</h3>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

                  {/* Timeline Items */}
                  <div className="space-y-6">
                    {order.trackingHistory.map((status, index) => (
                      <div key={index} className="relative flex gap-4">
                        {/* Icon */}
                        <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                          index === order.trackingHistory.length - 1
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {getStatusIcon(status.status)}
                        </div>

                        {/* Content */}
                        <div className="flex-grow pb-6">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="font-semibold text-gray-800">
                              {status.status}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {status.date} at {status.time}
                            </p>
                          </div>
                          <p className="text-gray-600 text-sm mt-1">
                            {status.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                            <MapPin className="w-4 h-4" />
                            <span>{status.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Support */}
              <div className="p-6 bg-gray-50 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-semibold text-gray-800">Need Help?</p>
                      <p className="text-sm text-gray-600">Contact our support team</p>
                    </div>
                  </div>
                  <a
                    href="tel:+919876543210"
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Call Support
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Sample Order Numbers */}
          {!order && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-3">Sample Order Numbers for Testing:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <code className="bg-white px-2 py-1 rounded border">ORD-2024-001</code>
                  <span className="ml-2 text-sm">- Out for Delivery</span>
                </li>
                <li>
                  <code className="bg-white px-2 py-1 rounded border">ORD-2024-002</code>
                  <span className="ml-2 text-sm">- Delivered</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
