'use client'

import { useState } from 'react'
import { Tag, Copy, Check, Clock, Percent, Gift } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Coupon {
  id: number
  code: string
  description: string
  discount: number
  type: 'percentage' | 'fixed'
  minOrder: number
  maxDiscount: number
  validUntil: string
  usageLimit: number
  usedCount: number
}

export default function CouponsPage() {
  const [cartItems, setCartItems] = useState<number[]>([])
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  
  const [coupons] = useState<Coupon[]>([
    {
      id: 1,
      code: 'WELCOME20',
      description: '20% off on your first order',
      discount: 20,
      type: 'percentage',
      minOrder: 500,
      maxDiscount: 200,
      validUntil: '2024-12-31',
      usageLimit: 1000,
      usedCount: 450
    },
    {
      id: 2,
      code: 'SUMMER50',
      description: '₹50 off on orders above ₹300',
      discount: 50,
      type: 'fixed',
      minOrder: 300,
      maxDiscount: 50,
      validUntil: '2024-06-30',
      usageLimit: 500,
      usedCount: 320
    },
    {
      id: 3,
      code: 'SHARBAT15',
      description: '15% off on all Sharbat products',
      discount: 15,
      type: 'percentage',
      minOrder: 400,
      maxDiscount: 150,
      validUntil: '2024-09-30',
      usageLimit: 2000,
      usedCount: 890
    },
    {
      id: 4,
      code: 'FREESHIP',
      description: 'Free shipping on orders above ₹500',
      discount: 0,
      type: 'fixed',
      minOrder: 500,
      maxDiscount: 100,
      validUntil: '2024-12-31',
      usageLimit: 5000,
      usedCount: 2100
    },
    {
      id: 5,
      code: 'FESTIVE100',
      description: '₹100 off on festive special products',
      discount: 100,
      type: 'fixed',
      minOrder: 800,
      maxDiscount: 100,
      validUntil: '2024-11-30',
      usageLimit: 300,
      usedCount: 150
    }
  ])

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const isExpired = (date: string) => {
    return new Date(date) < new Date()
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header cartCount={cartItems.length} />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Available Coupons</h1>
          <p className="text-lg opacity-90">
            Save more with our exclusive discount codes
          </p>
        </div>
      </section>

      {/* Coupons Content */}
      <section className="py-12 flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coupons.map((coupon) => {
              const expired = isExpired(coupon.validUntil)
              const usagePercentage = (coupon.usedCount / coupon.usageLimit) * 100

              return (
                <div
                  key={coupon.id}
                  className={`bg-white rounded-lg shadow-md overflow-hidden border-2 ${
                    expired ? 'border-gray-300 opacity-60' : 'border-red-200'
                  }`}
                >
                  {/* Coupon Header */}
                  <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {coupon.type === 'percentage' ? (
                          <Percent className="w-6 h-6" />
                        ) : (
                          <Gift className="w-6 h-6" />
                        )}
                        <span className="text-2xl font-bold">
                          {coupon.type === 'percentage'
                            ? `${coupon.discount}% OFF`
                            : `₹${coupon.discount} OFF`}
                        </span>
                      </div>
                      {expired && (
                        <span className="bg-gray-800 text-xs px-2 py-1 rounded">
                          EXPIRED
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Coupon Body */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {coupon.description}
                    </h3>

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <p>Min order: ₹{coupon.minOrder}</p>
                      {coupon.maxDiscount > 0 && (
                        <p>Max discount: ₹{coupon.maxDiscount}</p>
                      )}
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          Valid until: {new Date(coupon.validUntil).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Usage Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>{coupon.usedCount} used</span>
                        <span>{coupon.usageLimit} available</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-600 h-2 rounded-full"
                          style={{ width: `${usagePercentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Coupon Code */}
                    <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
                      <Tag className="w-5 h-5 text-red-600" />
                      <code className="flex-grow font-mono font-bold text-gray-800">
                        {coupon.code}
                      </code>
                      <button
                        onClick={() => copyToClipboard(coupon.code)}
                        disabled={expired}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {copiedCode === coupon.code ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <Copy className="w-5 h-5 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* How to Use Section */}
          <div className="mt-12 bg-gray-100 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              How to Use Coupons
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Copy Coupon Code</h3>
                <p className="text-gray-600 text-sm">
                  Click on the copy button to copy the coupon code
                </p>
              </div>
              <div className="text-center">
                <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">Add Products to Cart</h3>
                <p className="text-gray-600 text-sm">
                  Add products worth minimum order value
                </p>
              </div>
              <div className="text-center">
                <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Apply at Checkout</h3>
                <p className="text-gray-600 text-sm">
                  Paste the code at checkout to get discount
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
