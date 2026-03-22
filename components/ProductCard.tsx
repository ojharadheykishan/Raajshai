'use client'

import { useState, type MouseEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  description: string
  category: string
}

interface ProductCardProps {
  product: Product
  onAddToCart: (productId: number) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  )
  const [clickedEffect, setClickedEffect] = useState(0)

  const isSharbatCategory = product.category.toLowerCase() === 'sharbat'

  const effectClass =
    clickedEffect === 1
      ? 'animate-spin'
      : clickedEffect === 2
      ? 'animate-bounce'
      : clickedEffect === 3
      ? 'animate-wiggle'
      : ''

  const triggerImageAnimation = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.preventDefault()
    setClickedEffect((prev) => (prev + 1) % 4)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <Link href={`/products/${product.id}`}>
        <div
          className={`relative h-64 bg-gray-100 overflow-hidden transition-transform duration-500 ${
            isSharbatCategory ? 'hover:-translate-y-1 hover:scale-105 animate-pulse' : 'hover:scale-105'
          } ${effectClass}`}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              {discount}% OFF
            </span>
          )}
          <button
            onClick={triggerImageAnimation}
            className="absolute bottom-2 right-2 bg-white bg-opacity-80 text-xs text-gray-700 px-2 py-1 rounded-lg shadow-sm hover:bg-opacity-100 transition-opacity"
          >
            Click for style {clickedEffect === 0 ? '➡️' : clickedEffect === 1 ? '🌀' : clickedEffect === 2 ? '⬆️' : '💫'}
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-red-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xl font-bold text-red-600">
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product.id)}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  )
}
