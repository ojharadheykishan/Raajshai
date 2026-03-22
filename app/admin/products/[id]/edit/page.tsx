'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function EditProduct() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
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

  const categories = ['Sharbat', 'Squash', 'Thandai', 'Crush']

  useEffect(() => {
    // Mock data - in real app, this would come from API
    const mockProducts = [
      { id: 1, name: 'Rose Sharbat', category: 'Sharbat', price: '299', originalPrice: '399', stock: '15', image: '/images/rose-sharbat.jpg', description: 'Premium quality rose sharbat made from fresh rose petals.', ingredients: 'Rose Petals, Sugar, Water, Citric Acid', benefits: 'Cooling effect, Rich in antioxidants, Natural flavor' },
      { id: 2, name: 'Kesar Sharbat', category: 'Sharbat', price: '449', originalPrice: '599', stock: '8', image: '/images/kesar-sharbat.jpg', description: 'Luxurious saffron-infused sharbat with authentic Kashmiri kesar.', ingredients: 'Saffron, Sugar, Water, Cardamom', benefits: 'Boosts immunity, Enhances mood, Natural energy' },
      { id: 3, name: 'Khus Sharbat', category: 'Sharbat', price: '279', originalPrice: '349', stock: '25', image: '/images/khus-sharbat.jpg', description: 'Refreshing vetiver root sharbat with natural cooling properties.', ingredients: 'Vetiver Root, Sugar, Water, Lemon', benefits: 'Natural coolant, Aids digestion, Refreshing taste' },
      { id: 4, name: 'Mango Sharbat', category: 'Sharbat', price: '329', originalPrice: '429', stock: '12', image: '/images/mango-sharbat.jpg', description: 'Delicious mango-flavored sharbat made from Alphonso mangoes.', ingredients: 'Mango Pulp, Sugar, Water, Citric Acid', benefits: 'Rich in vitamins, Natural sweetness, Refreshing' },
      { id: 5, name: 'Thandai Sharbat', category: 'Sharbat', price: '399', originalPrice: '499', stock: '18', image: '/images/thandai-sharbat.jpg', description: 'Traditional Holi special thandai with mixed nuts and spices.', ingredients: 'Almonds, Fennel, Rose Petals, Sugar, Pepper', benefits: 'Cooling effect, Rich in nutrients, Festive special' },
      { id: 6, name: 'Jaljeera Sharbat', category: 'Sharbat', price: '199', originalPrice: '249', stock: '30', image: '/images/jaljeera-sharbat.jpg', description: 'Tangy and spicy jaljeera sharbat for instant refreshment.', ingredients: 'Cumin, Mint, Black Salt, Tamarind, Sugar', benefits: 'Aids digestion, Refreshing, Spicy flavor' },
      { id: 7, name: 'Aam Panna Sharbat', category: 'Sharbat', price: '249', originalPrice: '319', stock: '22', image: '/images/aam-panna-sharbat.jpg', description: 'Raw mango sharbat with mint and spices.', ingredients: 'Raw Mango, Mint, Black Salt, Sugar, Cumin', benefits: 'Prevents heat stroke, Rich in vitamins, Cooling' },
      { id: 8, name: 'Bel Sharbat', category: 'Sharbat', price: '269', originalPrice: '339', stock: '16', image: '/images/bel-sharbat.jpg', description: 'Wood apple sharbat with natural cooling properties.', ingredients: 'Wood Apple, Sugar, Water, Cardamom', benefits: 'Cooling effect, Aids digestion, Natural remedy' },
      { id: 9, name: 'Phalsa Sharbat', category: 'Sharbat', price: '319', originalPrice: '399', stock: '10', image: '/images/phalsa-sharbat.jpg', description: 'Rare phalsa berry sharbat with unique tangy-sweet flavor.', ingredients: 'Phalsa Berries, Sugar, Water, Black Salt', benefits: 'Rich in antioxidants, Cooling, Unique taste' },
      { id: 10, name: 'Sugarcane Sharbat', category: 'Sharbat', price: '179', originalPrice: '229', stock: '28', image: '/images/sugarcane-sharbat.jpg', description: 'Pure sugarcane juice sharbat with natural sweetness.', ingredients: 'Sugarcane Juice, Lemon, Ginger, Mint', benefits: 'Instant energy, Natural sweetener, Refreshing' },
      { id: 11, name: 'Coconut Sharbat', category: 'Sharbat', price: '289', originalPrice: '369', stock: '20', image: '/images/coconut-sharbat.jpg', description: 'Tender coconut water sharbat with natural electrolytes.', ingredients: 'Coconut Water, Sugar, Lemon, Mint', benefits: 'Natural electrolytes, Hydrating, Refreshing' },
      { id: 12, name: 'Mixed Fruit Sharbat', category: 'Sharbat', price: '349', originalPrice: '449', stock: '14', image: '/images/mixed-fruit-sharbat.jpg', description: 'Delightful blend of multiple fruits in one sharbat.', ingredients: 'Mixed Fruits, Sugar, Water, Citric Acid', benefits: 'Multiple vitamins, Natural flavors, Refreshing' }
    ]

    const product = mockProducts.find(p => p.id === Number(productId))
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        originalPrice: product.originalPrice,
        stock: product.stock,
        image: product.image,
        description: product.description,
        ingredients: product.ingredients,
        benefits: product.benefits
      })
    }
    setLoading(false)
  }, [productId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    alert('Product updated successfully!')
    setSaving(false)
    router.push('/admin/products')
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      alert('Product deleted successfully!')
      router.push('/admin/products')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center space-x-4">
            <Link href="/admin/products" className="text-gray-600 hover:text-gray-800">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
          </div>
          <button 
            onClick={handleDelete}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            <Trash2 className="w-4 h-4" />
            Delete Product
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
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
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Or Upload Image
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          // In a real app, this would upload to Cloudinary
                          // For now, we'll just show a preview
                          const reader = new FileReader()
                          reader.onloadend = () => {
                            setFormData({ ...formData, image: reader.result as string })
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 border border-gray-300"
                    >
                      Choose File
                    </label>
                    <span className="text-sm text-gray-500">
                      {formData.image ? 'Image selected' : 'No file chosen'}
                    </span>
                  </div>
                </div>
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
              <Link
                href="/admin/products"
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
