'use client'

import { useState } from 'react'
import { Eye, Package, Truck, CheckCircle, Clock, XCircle } from 'lucide-react'

interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  items: { name: string; quantity: number; price: number }[]
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  date: string
  address: string
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD001',
      customerName: 'Rahul Sharma',
      customerEmail: 'rahul@example.com',
      customerPhone: '+91 98765 43210',
      items: [
        { name: 'Rose Sharbat', quantity: 2, price: 299 },
        { name: 'Khus Sharbat', quantity: 1, price: 279 }
      ],
      total: 877,
      status: 'delivered',
      date: '2024-01-15',
      address: '123 Main Street, Mumbai, Maharashtra 400001'
    },
    {
      id: 'ORD002',
      customerName: 'Priya Patel',
      customerEmail: 'priya@example.com',
      customerPhone: '+91 98765 43211',
      items: [
        { name: 'Kesar Sharbat', quantity: 1, price: 449 }
      ],
      total: 449,
      status: 'shipped',
      date: '2024-01-16',
      address: '456 Park Avenue, Delhi, Delhi 110001'
    },
    {
      id: 'ORD003',
      customerName: 'Amit Kumar',
      customerEmail: 'amit@example.com',
      customerPhone: '+91 98765 43212',
      items: [
        { name: 'Mango Sharbat', quantity: 3, price: 329 },
        { name: 'Thandai Sharbat', quantity: 2, price: 399 }
      ],
      total: 1785,
      status: 'confirmed',
      date: '2024-01-17',
      address: '789 Garden Road, Bangalore, Karnataka 560001'
    },
    {
      id: 'ORD004',
      customerName: 'Sneha Reddy',
      customerEmail: 'sneha@example.com',
      customerPhone: '+91 98765 43213',
      items: [
        { name: 'Jaljeera Sharbat', quantity: 5, price: 199 }
      ],
      total: 995,
      status: 'pending',
      date: '2024-01-18',
      address: '321 Lake View, Chennai, Tamil Nadu 600001'
    },
    {
      id: 'ORD005',
      customerName: 'Vikram Singh',
      customerEmail: 'vikram@example.com',
      customerPhone: '+91 98765 43214',
      items: [
        { name: 'Aam Panna Sharbat', quantity: 2, price: 249 },
        { name: 'Bel Sharbat', quantity: 1, price: 269 }
      ],
      total: 767,
      status: 'cancelled',
      date: '2024-01-19',
      address: '567 River Side, Kolkata, West Bengal 700001'
    }
  ])

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [filterStatus, setFilterStatus] = useState('all')

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-blue-500" />
      case 'shipped':
        return <Truck className="w-4 h-4 text-purple-500" />
      case 'delivered':
        return <Package className="w-4 h-4 text-green-500" />
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }
  }

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
            <div className="flex items-center space-x-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Orders ({filteredOrders.length})
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedOrder?.id === order.id ? 'bg-red-50' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {order.id}
                        </h3>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Customer:</span> {order.customerName}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Items:</span> {order.items.length} product(s)
                      </p>
                      <p className="text-lg font-bold text-red-600">
                        ₹{order.total.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="lg:col-span-1">
            {selectedOrder ? (
              <div className="bg-white rounded-lg shadow overflow-hidden sticky top-8">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Order Details
                  </h2>
                </div>
                <div className="p-6 space-y-6">
                  {/* Order Info */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Order ID</h3>
                    <p className="text-lg font-semibold text-gray-900">{selectedOrder.id}</p>
                  </div>

                  {/* Customer Info */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Customer Information</h3>
                    <div className="space-y-1">
                      <p className="text-gray-900">{selectedOrder.customerName}</p>
                      <p className="text-gray-600">{selectedOrder.customerEmail}</p>
                      <p className="text-gray-600">{selectedOrder.customerPhone}</p>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Shipping Address</h3>
                    <p className="text-gray-900">{selectedOrder.address}</p>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Order Items</h3>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                          <div>
                            <p className="text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium text-gray-900">₹{item.price * item.quantity}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-red-600">
                        ₹{selectedOrder.total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Status Update */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Update Status</h3>
                    <div className="flex flex-wrap gap-2">
                      {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((status) => (
                        <button
                          key={status}
                          onClick={() => updateOrderStatus(selectedOrder.id, status as Order['status'])}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            selectedOrder.status === status
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Select an order to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
