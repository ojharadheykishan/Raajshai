'use client'

import { useState, useEffect } from 'react'
import { Users, ShoppingCart, List, Settings, Check, Trash2, Plus } from 'lucide-react'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  category: string
  stock: number
  price: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    lowStock: 0
  })
  const [recentProducts, setRecentProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - in real app, this would come from API
    setStats({
      totalProducts: 24,
      totalCategories: 4,
      totalOrders: 156,
      lowStock: 3
    })
    
    setRecentProducts([
      { id: 1, name: 'Rose Sharbat', category: 'Sharbat', stock: 15, price: 299 },
      { id: 2, name: 'Kesar Sharbat', category: 'Sharbat', stock: 8, price: 449 },
      { id: 3, name: 'Mango Crush', category: 'Crush', stock: 25, price: 199 },
      { id: 4, name: 'Rose Syrup', category: 'Squash', stock: 5, price: 349 }
    ])
    
    setLoading(false)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, Admin</span>
            <div className="relative">
              <button className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1 text-sm hover:bg-gray-200">
                <Users className="w-4 h-4 text-gray-600" />
                <span className="font-medium">Admin User</span>
              </button>
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-20 hidden">
                <div className="px-4 py-2 text-sm text-gray-700">Profile</div>
                <div className="px-4 py-2 text-sm text-gray-700 border-t">Settings</div>
                <button 
                  onClick={() => {
                    // In a real app, this would clear the JWT token
                    window.location.href = '/'
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 border-t hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-500">Total Products</div>
              <ShoppingCart className="h-5 w-5 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.totalProducts}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-500">Total Categories</div>
              <List className="h-5 w-5 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.totalCategories}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-500">Total Orders</div>
              <Users className="h-5 w-5 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.totalOrders}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-500">Low Stock Alerts</div>
              <Trash2 className="h-5 w-5 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-red-600">{stats.lowStock}</p>
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center justify-between">
              <span>Recent Products</span>
              <Link href="/admin/products" className="text-sm text-red-600 hover:text-red-700">
                View All
              </Link>
            </h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-t-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        ₹{product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link 
                          href={`/admin/products/${product.id}/edit`} 
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          Edit
                        </Link>
                        <button 
                          onClick={() => alert('Delete product - would call API')}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
