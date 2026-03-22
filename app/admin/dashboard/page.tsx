'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Plus,
  Settings,
  LogOut
} from 'lucide-react'

interface DashboardStats {
  totalProducts: number
  totalOrders: number
  totalCustomers: number
  totalRevenue: number
  recentOrders: {
    id: string
    customer: string
    amount: number
    status: string
    date: string
  }[]
  topProducts: {
    name: string
    sales: number
    revenue: number
  }[]
}

export default function AdminDashboard() {
  const [stats] = useState<DashboardStats>({
    totalProducts: 24,
    totalOrders: 156,
    totalCustomers: 89,
    totalRevenue: 125000,
    recentOrders: [
      { id: 'ORD001', customer: 'Rahul Sharma', amount: 877, status: 'delivered', date: '2024-01-15' },
      { id: 'ORD002', customer: 'Priya Patel', amount: 449, status: 'shipped', date: '2024-01-16' },
      { id: 'ORD003', customer: 'Amit Kumar', amount: 1785, status: 'confirmed', date: '2024-01-17' },
      { id: 'ORD004', customer: 'Sneha Reddy', amount: 995, status: 'pending', date: '2024-01-18' },
      { id: 'ORD005', customer: 'Vikram Singh', amount: 767, status: 'cancelled', date: '2024-01-19' }
    ],
    topProducts: [
      { name: 'Rose Sharbat', sales: 45, revenue: 13455 },
      { name: 'Kesar Sharbat', sales: 38, revenue: 17062 },
      { name: 'Mango Sharbat', sales: 32, revenue: 10528 },
      { name: 'Khus Sharbat', sales: 28, revenue: 7812 },
      { name: 'Thandai Sharbat', sales: 25, revenue: 9975 }
    ]
  })

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/products"
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </Link>
              <Link
                href="/admin/settings"
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                <Settings className="w-5 h-5" />
              </Link>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <Package className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+12% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+8% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalCustomers}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+15% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">₹{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-red-600">
              <TrendingDown className="w-4 h-4 mr-1" />
              <span>-3% from last month</span>
            </div>
          </div>
        </div>

        {/* Recent Orders & Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              <Link
                href="/admin/orders"
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                View All
              </Link>
            </div>
            <div className="divide-y divide-gray-200">
              {stats.recentOrders.map((order) => (
                <div key={order.id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{order.id}</h3>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">₹{order.amount}</p>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Top Selling Products</h2>
              <Link
                href="/admin/products"
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                View All
              </Link>
            </div>
            <div className="divide-y divide-gray-200">
              {stats.topProducts.map((product, index) => (
                <div key={product.name} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center justify-center w-8 h-8 bg-red-100 text-red-600 rounded-full font-semibold text-sm">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-xs text-gray-500">{product.sales} sales</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">₹{product.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/admin/products"
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors"
            >
              <Package className="w-8 h-8 text-red-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Manage Products</span>
            </Link>
            <Link
              href="/admin/orders"
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors"
            >
              <ShoppingCart className="w-8 h-8 text-red-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">View Orders</span>
            </Link>
            <Link
              href="/admin/categories"
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors"
            >
              <Settings className="w-8 h-8 text-red-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Categories</span>
            </Link>
            <Link
              href="/admin/customers"
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors"
            >
              <Users className="w-8 h-8 text-red-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Customers</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
