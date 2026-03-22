'use client'

import { useState } from 'react'
import { Plus, Trash2, Settings } from 'lucide-react'
import Link from 'next/link'

export default function AdminProducts() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Rose Sharbat', category: 'Sharbat', price: 299, originalPrice: 399, stock: 15, image: '/images/rose-sharbat.jpg' },
    { id: 2, name: 'Kesar Sharbat', category: 'Sharbat', price: 449, originalPrice: 599, stock: 8, image: '/images/kesar-sharbat.jpg' },
    { id: 3, name: 'Khus Sharbat', category: 'Sharbat', price: 279, originalPrice: 349, stock: 25, image: '/images/khus-sharbat.jpg' },
    { id: 4, name: 'Mango Sharbat', category: 'Sharbat', price: 329, originalPrice: 429, stock: 12, image: '/images/mango-sharbat.jpg' },
    { id: 5, name: 'Thandai Sharbat', category: 'Sharbat', price: 399, originalPrice: 499, stock: 18, image: '/images/thandai-sharbat.jpg' },
    { id: 6, name: 'Jaljeera Sharbat', category: 'Sharbat', price: 199, originalPrice: 249, stock: 30, image: '/images/jaljeera-sharbat.jpg' },
    { id: 7, name: 'Aam Panna Sharbat', category: 'Sharbat', price: 249, originalPrice: 319, stock: 22, image: '/images/aam-panna-sharbat.jpg' },
    { id: 8, name: 'Bel Sharbat', category: 'Sharbat', price: 269, originalPrice: 339, stock: 16, image: '/images/bel-sharbat.jpg' },
    { id: 9, name: 'Phalsa Sharbat', category: 'Sharbat', price: 319, originalPrice: 399, stock: 10, image: '/images/phalsa-sharbat.jpg' },
    { id: 10, name: 'Sugarcane Sharbat', category: 'Sharbat', price: 179, originalPrice: 229, stock: 28, image: '/images/sugarcane-sharbat.jpg' },
    { id: 11, name: 'Coconut Sharbat', category: 'Sharbat', price: 289, originalPrice: 369, stock: 20, image: '/images/coconut-sharbat.jpg' },
    { id: 12, name: 'Mixed Fruit Sharbat', category: 'Sharbat', price: 349, originalPrice: 449, stock: 14, image: '/images/mixed-fruit-sharbat.jpg' }
  ])
  
  const [categories, setCategories] = useState(['Sharbat', 'Squash', 'Thandai', 'Crush'])
  const [editingProductId, setEditingProductId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    originalPrice: '',
    stock: '',
    image: '',
    description: '',
    ingredients: '',
    benefits: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const processedFormData = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      originalPrice: parseFloat(formData.originalPrice) || 0,
      stock: parseInt(formData.stock) || 0
    }
    if (editingProductId) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === editingProductId ? { ...p, ...processedFormData } : p
      ))
      setEditingProductId(null)
      setFormData({
        name: '',
        category: '',
        price: '',
        originalPrice: '',
        stock: '',
        image: '',
        description: '',
        ingredients: '',
        benefits: ''
      })
    } else {
      // Add new product
      const newProduct = {
        id: Date.now(),
        ...processedFormData
      }
      setProducts([...products, newProduct])
      setFormData({
        name: '',
        category: '',
        price: '',
        originalPrice: '',
        stock: '',
        image: '',
        description: '',
        ingredients: '',
        benefits: ''
      })
    }
  }

  const handleEdit = (product: any) => {
    setEditingProductId(product.id)
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      originalPrice: product.originalPrice.toString(),
      stock: product.stock.toString(),
      image: product.image,
      description: product.description || '',
      ingredients: product.ingredients || '',
      benefits: product.benefits || ''
    })
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Manage Products</h1>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => {
                setEditingProductId(null)
                setFormData({
                  name: '',
                  category: '',
                  price: '',
                  originalPrice: '',
                  stock: '',
                  image: '',
                  description: '',
                  ingredients: '',
                  benefits: ''
                })
              }}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Add New Product
            </button>
            <button 
              onClick={() => {
                // In a real app, this would clear the JWT token
                window.location.href = '/'
              }}
              className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Product Form */}
        <div className="bg-white rounded-lg shadow-md mb-8 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {editingProductId ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Price (₹) *
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ingredients (comma-separated)
                </label>
                <textarea
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Benefits (comma-separated)
                </label>
                <textarea
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setEditingProductId(null)
                  setFormData({
                    name: '',
                    category: '',
                    price: '',
                    originalPrice: '',
                    stock: '',
                    image: '',
                    description: '',
                    ingredients: '',
                    benefits: ''
                  })
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700"
              >
                {editingProductId ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center justify-between">
              <span>Product List</span>
              <span className="text-sm text-gray-600">{products.length} products</span>
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      ₹{product.price}
                      {product.originalPrice > product.price && (
                        <span className="ml-1 text-xs text-gray-500 line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.image ? (
                        <>
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="h-8 w-8 object-cover rounded"
                          />
                        </>
                      ) : (
                        <div className="h-8 w-8 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                          No Image
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Link 
                        href={`/admin/products/${product.id}/edit`} 
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Settings className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
