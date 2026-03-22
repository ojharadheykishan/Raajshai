'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function About() {
  const [cartItems] = useState<number[]>([])

  return (
    <main className="min-h-screen flex flex-col">
      <Header cartCount={cartItems.length} />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">About Us</h1>
          <p className="text-lg opacity-90">
            Learn more about राजशाही शर्बत and our story
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Our Story */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                राजशाही शर्बत was founded with a simple mission: to bring the authentic
                taste of traditional Indian sharbat to every household. Our journey
                began in the heart of Mumbai, where our founder discovered the magic
                of handcrafted beverages made from natural ingredients.
              </p>
              <p className="text-gray-600 mb-4">
                For over two decades, we have been perfecting our recipes, combining
                age-old traditions with modern quality standards. Each bottle of
                राजशाही शर्बत sharbat is a testament to our commitment to quality,
                taste, and authenticity.
              </p>
            </div>

            {/* Our Mission */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                We believe that great taste comes from great ingredients. That's why
                we source only the finest natural ingredients from trusted suppliers
                across India. From the rose petals of Pushkar to the saffron of
                Kashmir, every ingredient is carefully selected to ensure the highest
                quality.
              </p>
              <p className="text-gray-600">
                Our mission is to preserve the rich heritage of Indian beverages
                while making them accessible to everyone. We are committed to
                providing our customers with products that are not only delicious
                but also healthy and natural.
              </p>
            </div>

            {/* Our Values */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Quality
                  </h3>
                  <p className="text-gray-600">
                    We never compromise on quality. Every product undergoes strict
                    quality checks before reaching our customers.
                  </p>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Authenticity
                  </h3>
                  <p className="text-gray-600">
                    We stay true to traditional recipes while adapting to modern
                    tastes and preferences.
                  </p>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Customer First
                  </h3>
                  <p className="text-gray-600">
                    Our customers are at the heart of everything we do. We strive
                    to exceed their expectations.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-red-600 text-white p-8 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold mb-2">20+</div>
                  <div className="text-sm opacity-90">Years of Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">50+</div>
                  <div className="text-sm opacity-90">Products</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">1M+</div>
                  <div className="text-sm opacity-90">Happy Customers</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">100%</div>
                  <div className="text-sm opacity-90">Natural Ingredients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
