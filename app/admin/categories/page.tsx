'use client'

import { useState } from 'react'
import { Plus, Trash2, Settings } from 'lucide-react'
import Link from 'next/link'

export default function AdminCategories() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Sharbat', description: 'Traditional Indian fruit-based beverages' },
    { id: 2, name: 'Squash', description: 'Concentrated fruit syrups' },
    { id: 3, name: 'Thandai', description: 'Cooling milk-based drink with nuts and spices' },
    { id: 4, name: 'Crush', description: 'Fruit crush beverages' }
  ])
  
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingCategoryId) {
      // Update existing category
      setCategories(categories.map(c => 
        c.id === editingCategoryId ? { ...c, ...formData } : c
      ))
      setEditingCategoryId(null)
      setFormData({ name: '', description: '' })
    } else {
      // Add new category
      const newCategory = {
        id: Date.now(),
        ...formData
      }
      setCategories([...categories, newCategory])
      setFormData({ name: '', description: '' })
    }
  }

  const handleEdit = (category: any) => {
    setEditingCategoryId(category.id)
    setFormData({
      name: category.name,
      description: category.description
    })
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(c => c.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Manage Categories</h1>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => {
                setEditingCategoryId(null)
                setFormData({ name: '', description: '' })
              }}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Add New Category
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
        {/* Category Form */}
        <div className="bg-white rounded-lg shadow-md mb-8 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {editingCategoryId ? 'Edit Category' : 'Add New Category'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name *
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
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setEditingCategoryId(null)
                  setFormData({ name: '', description: '' })
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700"
              >
                {editingCategoryId ? 'Update Category' : 'Add Category'}
              </button>
            </div>
          </form>
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center justify-between">
              <span>Category List</span>
              <span className="text-sm text-gray-600">{categories.length} categories</span>
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {category.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Link 
                        href={`/admin/categories/${category.id}/edit`} 
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Settings className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(category.id)}
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
