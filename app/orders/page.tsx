'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, Loader } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Order {
  id: string
  orderNumber: string
  date: string
  items: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  trackingId?: string
}

export default function OrderHistory() {
  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'ORD001234',
      date: '2024-03-20',
      items: 3,
      total: 920.85,
      status: 'delivered',
      trackingId: 'TRK123456789',
    },
    {
      id: '2',
      orderNumber: 'ORD001235',
      date: '2024-03-18',
      items: 2,
      total: 645.50,
      status: 'shipped',
      trackingId: 'TRK123456790',
    },
    {
      id: '3',
      orderNumber: 'ORD001236',
      date: '2024-03-15',
      items: 1,
      total: 299.00,
      status: 'processing',
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'pending':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'delivered':
        return '✓ Delivered'
      case 'shipped':
        return '🚚 Shipped'
      case 'processing':
        return '⏳ Processing'
      case 'pending':
        return '📋 Pending'
      default:
        return status
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header cartCount={0} />

      <div className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Orders</h1>
            <p className="text-gray-600">View and track all your orders in one place</p>
          </div>

          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Order Info */}
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
                        <h3 className="text-lg font-bold text-gray-800">
                          Order {order.orderNumber}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold w-fit ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <p className="font-semibold text-gray-700">Date</p>
                          <p>
                            {new Date(order.date).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">Items</p>
                          <p>{order.items} product(s)</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">Total</p>
                          <p className="font-bold text-red-600">₹{order.total.toFixed(2)}</p>
                        </div>
                        {order.trackingId && (
                          <div>
                            <p className="font-semibold text-gray-700">Tracking ID</p>
                            <p className="font-mono text-xs">{order.trackingId}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Link
                        href={`/order-success`}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <Loader className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No Orders Yet
              </h3>
              <p className="text-gray-600 mb-6">
                You haven't placed any orders yet. Start shopping!
              </p>
              <Link
                href="/collections/sharbat"
                className="inline-block px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
              >
                🛍️ Shop Now
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
