'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, ArrowLeft, Check, Minus, Plus } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import ProductCustomization from '@/components/ProductCustomization'

interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  description: string
  category: string
  ingredients: string[]
  benefits: string[]
  weight: string
  inStock: boolean
}

interface CustomizationSelection {
  optionId: string;
  optionName: string;
  type: string;
  valueId?: string;
  valueLabel?: string;
  textValue?: string;
  numberValue?: number;
  priceAdjustment: number;
}

export default function ProductDetail() {
  const params = useParams()
  const productId = Number(params.id)
  const [product, setProduct] = useState<Product | null>(null)
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [cartItems, setCartItems] = useState<number[]>([])
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [loading, setLoading] = useState(true)
  const [customizationSelections, setCustomizationSelections] = useState<CustomizationSelection[]>([])
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      const products = data.products || []
      setAllProducts(products)
      const foundProduct = products.find((p: Product) => p.id === productId)
      setProduct(foundProduct || null)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header cartCount={cartItems.length} />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!product) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header cartCount={cartItems.length} />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
            <Link href="/collections/sharbat" className="text-red-600 hover:underline">
              Back to Collection
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const handleCustomizationChange = (selections: CustomizationSelection[], total: number) => {
    setCustomizationSelections(selections)
    setTotalPrice(total)
  }

  const addToCart = () => {
    const newItems = []
    for (let i = 0; i < quantity; i++) {
      newItems.push({
        productId: product.id,
        customizations: customizationSelections,
        totalPrice: totalPrice
      })
    }
    setCartItems([...cartItems, ...newItems.map(item => item.productId)])
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  )

  return (
    <main className="min-h-screen flex flex-col">
      <Header cartCount={cartItems.length} />

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-red-600">Home</Link>
            <span>/</span>
            <Link href="/collections/sharbat" className="hover:text-red-600">Sharbat</Link>
            <span>/</span>
            <span className="text-gray-800">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-8 flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative">
              <Link
                href="/collections/sharbat"
                className="absolute top-4 left-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </Link>
              <div className="relative h-96 lg:h-[500px] bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {discount > 0 && (
                  <span className="absolute top-4 right-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded">
                    {discount}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-red-600">
                  ₹{totalPrice || product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-gray-500 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
                {customizationSelections.length > 0 && totalPrice > product.price && (
                  <span className="text-sm text-green-600 font-medium">
                    +₹{totalPrice - product.price} for customizations
                  </span>
                )}
              </div>

              {/* Weight */}
              <div className="mb-4">
                <span className="text-gray-700 font-medium">Weight: </span>
                <span className="text-gray-600">{product.weight}</span>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <span className="text-green-600 flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    In Stock
                  </span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-gray-700 font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Product Customization */}
              <div className="mb-6">
                <ProductCustomization
                  productId={product.id.toString()}
                  basePrice={product.price}
                  onCustomizationChange={handleCustomizationChange}
                />
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={addToCart}
                disabled={!product.inStock}
                className={`w-full py-3 px-6 rounded-lg flex items-center justify-center gap-2 font-semibold transition-colors ${
                  addedToCart
                    ? 'bg-green-600 text-white'
                    : product.inStock
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>

              {/* Ingredients */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Benefits</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {product.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={(id) => setCartItems([...cartItems, id])}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
