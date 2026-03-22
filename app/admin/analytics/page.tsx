'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, ArrowUp, ArrowDown } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface AnalyticsData {
  totalRevenue: number
  totalOrders: number
  totalCustomers: number
  totalProducts: number
  revenueGrowth: number
  ordersGrowth: number
  customersGrowth: number
  productsGrowth: number
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
  monthlyRevenue: {
    month: string
    revenue: number
  }[]
}

export default function AdminAnalyticsPage() {
  const [cartItems, setCartItems] = useState<number[]>([])
  const [timeRange, setTimeRange] = useState('month')

  const analyticsData: AnalyticsData = {
    totalRevenue: 1250000,
    totalOrders: 1250,
    totalCustomers: 850,
    totalProducts: 48,
    revenueGrowth: 12.5,
    ordersGrowth: 8.3,
    customersGrowth: 15.2,
    productsGrowth: 4.2,
    recentOrders: [
      { id: 'ORD-2024-001', customer: 'Rahul Sharma', amount: 1299, status: 'Delivered', date: '2024-01-15' },
      { id: 'ORD-2024-002', customer: 'Priya Patel', amount: 899, status: 'Shipped', date: '2024-01-15' },
      { id: 'ORD-2024-003', customer: 'Amit Kumar', amount: 1599, status: 'Processing', date: '2024-01-14' },
      { id: 'ORD-2024-004', customer: 'Sneha Reddy', amount: 749, status: 'Pending', date: '2024-01-14' },
      { id: 'ORD-2024-005', customer: 'Vikram Singh', amount: 2199, status: 'Delivered', date: '2024-01-13' }
    ],
    topProducts: [
      { name: 'Rose Sharbat', sales: 245, revenue: 73255 },
      { name: 'Kesar Sharbat', sales: 189, revenue: 84961 },
      { name: 'Mango Sharbat', sales: 156, revenue: 51324 },
      { name: 'Thandai Sharbat', sales: 134, revenue: 53466 },
      { name: 'Khus Sharbat', sales: 98, revenue: 27342 }
    ],
    monthlyRevenue: [
      { month: 'Aug', revenue: 85000 },
      { month: 'Sep', revenue: 92000 },
      { month: 'Oct', revenue: 105000 },
      { month: 'Nov', revenue: 118000 },
      { month: 'Dec', revenue: 135000 },
      { month: 'Jan', revenue: 125000 }
    ]
  }

  const maxRevenue = Math.max(...analyticsData.monthlyRevenue.map(m => m.revenue))

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800'
      case 'Shipped': return 'bg-blue-100 text-blue-800'
      case 'Processing': return 'bg-yellow-100 text-yellow-800'
      case 'Pending': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header cartCount={cartItems.length} />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-lg opacity-90">
            Track your business performance and insights
          </p>
        </div>
      </section>

      {/* Analytics Content */}
      <section className="py-12 flex-grow">
        <div className="container mx-auto px-4">
          {/* Time Range Filter */}
          <div className="flex justify-end mb-8">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Revenue Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${analyticsData.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analyticsData.revenueGrowth >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  {Math.abs(analyticsData.revenueGrowth)}%
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">₹{analyticsData.totalRevenue.toLocaleString()}</h3>
              <p className="text-gray-600">Total Revenue</p>
            </div>

            {/* Orders Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${analyticsData.ordersGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analyticsData.ordersGrowth >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  {Math.abs(analyticsData.ordersGrowth)}%
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{analyticsData.totalOrders.toLocaleString()}</h3>
              <p className="text-gray-600">Total Orders</p>
            </div>

            {/* Customers Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${analyticsData.customersGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analyticsData.customersGrowth >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  {Math.abs(analyticsData.customersGrowth)}%
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{analyticsData.totalCustomers.toLocaleString()}</h3>
              <p className="text-gray-600">Total Customers</p>
            </div>

            {/* Products Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-full">
                  <Package className="w-6 h-6 text-orange-600" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${analyticsData.productsGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analyticsData.productsGrowth >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  {Math.abs(analyticsData.productsGrowth)}%
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{analyticsData.totalProducts}</h3>
              <p className="text-gray-600">Total Products</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Revenue Chart */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Monthly Revenue</h3>
              <div className="space-y-4">
                {analyticsData.monthlyRevenue.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="w-12 text-sm text-gray-600">{item.month}</span>
                    <div className="flex-grow bg-gray-200 rounded-full h-8 relative">
                      <div
                        className="bg-gradient-to-r from-red-500 to-red-600 h-8 rounded-full flex items-center justify-end pr-3"
                        style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                      >
                        <span className="text-white text-xs font-semibold">
                          ₹{(item.revenue / 1000).toFixed(0)}K
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Top Selling Products</h3>
              <div className="space-y-4">
                {analyticsData.topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-gray-800">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.sales} sales</p>
                      </div>
                    </div>
                    <p className="font-bold text-green-600">₹{product.revenue.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-gray-600 font-semibold">Order ID</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-semibold">Customer</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-semibold">Amount</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.recentOrders.map((order, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-sm">{order.id}</td>
                      <td className="py-3 px-4">{order.customer}</td>
                      <td className="py-3 px-4 font-semibold">₹{order.amount}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{new Date(order.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
