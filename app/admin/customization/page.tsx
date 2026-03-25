'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CustomizationOptionValue {
  id: string;
  value: string;
  label: string;
  color_code?: string;
  image_url?: string;
  price_adjustment: number;
  in_stock: boolean;
  sort_order: number;
}

interface CustomizationOption {
  id: string;
  product_id: string;
  name: string;
  type: 'text' | 'select' | 'color' | 'image' | 'number';
  required: boolean;
  description?: string;
  min_value?: number;
  max_value?: number;
  max_length?: number;
  price_adjustment: number;
  sort_order: number;
  values: CustomizationOptionValue[];
  created_at: string;
  updated_at: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function CustomizationAdminPage() {
  const [options, setOptions] = useState<CustomizationOption[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingOption, setEditingOption] = useState<CustomizationOption | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string>('all');
  const [formData, setFormData] = useState({
    product_id: '',
    name: '',
    type: 'select' as 'text' | 'select' | 'color' | 'image' | 'number',
    required: false,
    description: '',
    min_value: '',
    max_value: '',
    max_length: '',
    price_adjustment: '0',
    values: [] as CustomizationOptionValue[]
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch products
      const productsRes = await fetch('/api/products');
      const productsData = await productsRes.json();
      setProducts(productsData.products || []);

      // Fetch all customization options
      const customizationRes = await fetch('/api/customization?productId=all');
      const customizationData = await customizationRes.json();
      setOptions(customizationData.options || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const payload = {
        ...formData,
        min_value: formData.min_value ? parseFloat(formData.min_value) : undefined,
        max_value: formData.max_value ? parseFloat(formData.max_value) : undefined,
        max_length: formData.max_length ? parseInt(formData.max_length) : undefined,
        price_adjustment: parseFloat(formData.price_adjustment),
        values: formData.values.map((v, i) => ({
          ...v,
          sort_order: i
        }))
      };

      if (editingOption) {
        // Update existing option
        await fetch('/api/customization', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingOption.id, ...payload })
        });
      } else {
        // Create new option
        await fetch('/api/customization', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      setShowModal(false);
      setEditingOption(null);
      resetForm();
      fetchData();
    } catch (error) {
      console.error('Error saving customization option:', error);
    }
  };

  const handleEdit = (option: CustomizationOption) => {
    setEditingOption(option);
    setFormData({
      product_id: option.product_id,
      name: option.name,
      type: option.type,
      required: option.required,
      description: option.description || '',
      min_value: option.min_value?.toString() || '',
      max_value: option.max_value?.toString() || '',
      max_length: option.max_length?.toString() || '',
      price_adjustment: option.price_adjustment.toString(),
      values: option.values
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this customization option?')) return;
    
    try {
      await fetch(`/api/customization?id=${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Error deleting customization option:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      product_id: '',
      name: '',
      type: 'select',
      required: false,
      description: '',
      min_value: '',
      max_value: '',
      max_length: '',
      price_adjustment: '0',
      values: []
    });
  };

  const addValue = () => {
    setFormData({
      ...formData,
      values: [
        ...formData.values,
        {
          id: Date.now().toString(),
          value: '',
          label: '',
          color_code: '',
          image_url: '',
          price_adjustment: 0,
          in_stock: true,
          sort_order: formData.values.length
        }
      ]
    });
  };

  const updateValue = (index: number, field: string, value: any) => {
    const newValues = [...formData.values];
    newValues[index] = { ...newValues[index], [field]: value };
    setFormData({ ...formData, values: newValues });
  };

  const removeValue = (index: number) => {
    const newValues = formData.values.filter((_, i) => i !== index);
    setFormData({ ...formData, values: newValues });
  };

  const filteredOptions = selectedProductId === 'all' 
    ? options 
    : options.filter(opt => opt.product_id === selectedProductId);

  const getProductName = (productId: string) => {
    const product = products.find(p => p.id.toString() === productId);
    return product?.name || 'Unknown Product';
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      text: 'Text Input',
      select: 'Dropdown Select',
      color: 'Color Picker',
      image: 'Image Selection',
      number: 'Number Input'
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Customization</h1>
            <p className="text-gray-600 mt-2">Manage customization options for your products</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setEditingOption(null);
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Customization Option
          </button>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Filter by Product:</label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Products</option>
              {products.map(product => (
                <option key={product.id} value={product.id.toString()}>
                  {product.name}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-500">
              {filteredOptions.length} option(s) found
            </span>
          </div>
        </div>

        {/* Options List */}
        <div className="space-y-4">
          {filteredOptions.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No customization options</h3>
              <p className="text-gray-500 mb-4">Get started by creating your first customization option.</p>
              <button
                onClick={() => {
                  resetForm();
                  setEditingOption(null);
                  setShowModal(true);
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Create Option
              </button>
            </div>
          ) : (
            filteredOptions.map(option => (
              <div key={option.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{option.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        option.required 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {option.required ? 'Required' : 'Optional'}
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {getTypeLabel(option.type)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">
                      Product: {getProductName(option.product_id)}
                    </p>
                    
                    {option.description && (
                      <p className="text-sm text-gray-500 mb-3">{option.description}</p>
                    )}

                    {/* Option Values */}
                    {option.values.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Values:</h4>
                        <div className="flex flex-wrap gap-2">
                          {option.values.map(value => (
                            <div
                              key={value.id}
                              className={`px-3 py-1 rounded-full text-sm ${
                                value.in_stock
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-500 line-through'
                              }`}
                            >
                              {option.type === 'color' && value.color_code && (
                                <span
                                  className="inline-block w-3 h-3 rounded-full mr-1"
                                  style={{ backgroundColor: value.color_code }}
                                />
                              )}
                              {value.label}
                              {value.price_adjustment !== 0 && (
                                <span className="ml-1">
                                  ({value.price_adjustment > 0 ? '+' : ''}{value.price_adjustment})
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Text/Number Options */}
                    {(option.type === 'text' || option.type === 'number') && (
                      <div className="mt-4 text-sm text-gray-600">
                        {option.type === 'text' && option.max_length && (
                          <span>Max length: {option.max_length} characters</span>
                        )}
                        {option.type === 'number' && (
                          <span>
                            Range: {option.min_value || 0} - {option.max_value || '∞'}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Price Adjustment */}
                    {option.price_adjustment !== 0 && (
                      <div className="mt-2 text-sm">
                        <span className={`font-medium ${
                          option.price_adjustment > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          Base price adjustment: {option.price_adjustment > 0 ? '+' : ''}{option.price_adjustment}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(option)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Edit"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(option.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">
                  {editingOption ? 'Edit Customization Option' : 'Add Customization Option'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Product Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product *
                  </label>
                  <select
                    value={formData.product_id}
                    onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a product</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id.toString()}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Option Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Option Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="e.g., Bottle Color, Size, Engraving"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Option Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Option Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="select">Dropdown Select</option>
                    <option value="color">Color Picker</option>
                    <option value="image">Image Selection</option>
                    <option value="text">Text Input</option>
                    <option value="number">Number Input</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Help text for customers"
                    rows={2}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Required Toggle */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="required"
                    checked={formData.required}
                    onChange={(e) => setFormData({ ...formData, required: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="required" className="text-sm font-medium text-gray-700">
                    Required option
                  </label>
                </div>

                {/* Price Adjustment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Base Price Adjustment
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price_adjustment}
                    onChange={(e) => setFormData({ ...formData, price_adjustment: e.target.value })}
                    placeholder="0.00"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Additional cost for this option (can be negative for discounts)
                  </p>
                </div>

                {/* Text Type Options */}
                {formData.type === 'text' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Length
                    </label>
                    <input
                      type="number"
                      value={formData.max_length}
                      onChange={(e) => setFormData({ ...formData, max_length: e.target.value })}
                      placeholder="50"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}

                {/* Number Type Options */}
                {formData.type === 'number' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Min Value
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.min_value}
                        onChange={(e) => setFormData({ ...formData, min_value: e.target.value })}
                        placeholder="0"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Value
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.max_value}
                        onChange={(e) => setFormData({ ...formData, max_value: e.target.value })}
                        placeholder="100"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}

                {/* Values for select/color/image types */}
                {['select', 'color', 'image'].includes(formData.type) && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Option Values
                      </label>
                      <button
                        type="button"
                        onClick={addValue}
                        className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Value
                      </button>
                    </div>

                    <div className="space-y-3">
                      {formData.values.map((value, index) => (
                        <div key={value.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <span className="text-sm font-medium text-gray-700">Value {index + 1}</span>
                            <button
                              type="button"
                              onClick={() => removeValue(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Value *</label>
                              <input
                                type="text"
                                value={value.value}
                                onChange={(e) => updateValue(index, 'value', e.target.value)}
                                placeholder="e.g., red, large"
                                className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Label *</label>
                              <input
                                type="text"
                                value={value.label}
                                onChange={(e) => updateValue(index, 'label', e.target.value)}
                                placeholder="e.g., Red, Large"
                                className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                          </div>

                          {formData.type === 'color' && (
                            <div className="mt-3">
                              <label className="block text-xs text-gray-500 mb-1">Color Code</label>
                              <div className="flex gap-2">
                                <input
                                  type="color"
                                  value={value.color_code || '#000000'}
                                  onChange={(e) => updateValue(index, 'color_code', e.target.value)}
                                  className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                                />
                                <input
                                  type="text"
                                  value={value.color_code || ''}
                                  onChange={(e) => updateValue(index, 'color_code', e.target.value)}
                                  placeholder="#FF0000"
                                  className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>
                            </div>
                          )}

                          {formData.type === 'image' && (
                            <div className="mt-3">
                              <label className="block text-xs text-gray-500 mb-1">Image URL</label>
                              <input
                                type="url"
                                value={value.image_url || ''}
                                onChange={(e) => updateValue(index, 'image_url', e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-3 mt-3">
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Price Adjustment</label>
                              <input
                                type="number"
                                step="0.01"
                                value={value.price_adjustment}
                                onChange={(e) => updateValue(index, 'price_adjustment', parseFloat(e.target.value) || 0)}
                                placeholder="0.00"
                                className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id={`in_stock_${value.id}`}
                                checked={value.in_stock}
                                onChange={(e) => updateValue(index, 'in_stock', e.target.checked)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <label htmlFor={`in_stock_${value.id}`} className="ml-2 text-sm text-gray-700">
                                In Stock
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingOption(null);
                      resetForm();
                    }}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    {editingOption ? 'Update Option' : 'Create Option'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
