'use client'

import { useState } from 'react'
import { Globe, Check } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
}

export default function LanguagePage() {
  const [cartItems, setCartItems] = useState<number[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  const languages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' }
  ]

  const translations: Record<string, Record<string, string>> = {
    en: {
      welcome: 'Welcome to Rajshahi Sharbat',
      tagline: 'Premium Quality Traditional Beverages',
      shopNow: 'Shop Now',
      addToCart: 'Add to Cart',
      home: 'Home',
      products: 'Products',
      about: 'About',
      contact: 'Contact',
      cart: 'Cart',
      search: 'Search products...',
      filter: 'Filter',
      price: 'Price',
      category: 'Category',
      description: 'Description',
      ingredients: 'Ingredients',
      benefits: 'Benefits'
    },
    hi: {
      welcome: 'राजशाही शर्बत में आपका स्वागत है',
      tagline: 'प्रीमियम गुणवत्ता पारंपरिक पेय',
      shopNow: 'अभी खरीदें',
      addToCart: 'कार्ट में डालें',
      home: 'होम',
      products: 'उत्पाद',
      about: 'हमारे बारे में',
      contact: 'संपर्क',
      cart: 'कार्ट',
      search: 'उत्पाद खोजें...',
      filter: 'फ़िल्टर',
      price: 'कीमत',
      category: 'श्रेणी',
      description: 'विवरण',
      ingredients: 'सामग्री',
      benefits: 'फायदे'
    },
    mr: {
      welcome: 'राजशाही शर्बत मध्ये आपले स्वागत आहे',
      tagline: 'प्रीमियम गुणवत्ता पारंपारिक पेये',
      shopNow: 'आता खरेदी करा',
      addToCart: 'कार्टमध्ये टाका',
      home: 'मुख्यपृष्ठ',
      products: 'उत्पादने',
      about: 'आमच्याबद्दल',
      contact: 'संपर्क',
      cart: 'कार्ट',
      search: 'उत्पादने शोधा...',
      filter: 'फिल्टर',
      price: 'किंमत',
      category: 'श्रेणी',
      description: 'वर्णन',
      ingredients: 'साहित्य',
      benefits: 'फायदे'
    }
  }

  const t = (key: string) => {
    return translations[selectedLanguage]?.[key] || translations['en'][key] || key
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header cartCount={cartItems.length} />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Globe className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold mb-2">Language Settings</h1>
              <p className="text-lg opacity-90">
                Choose your preferred language
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Language Content */}
      <section className="py-12 flex-grow">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Language Selection */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Select Language</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
                    selectedLanguage === lang.code
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{lang.flag}</span>
                    <div className="text-left">
                      <p className="font-semibold text-gray-800">{lang.name}</p>
                      <p className="text-sm text-gray-600">{lang.nativeName}</p>
                    </div>
                  </div>
                  {selectedLanguage === lang.code && (
                    <Check className="w-6 h-6 text-red-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Preview</h2>
            
            {/* Hero Preview */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-8 rounded-lg mb-6">
              <h3 className="text-3xl font-bold mb-2">{t('welcome')}</h3>
              <p className="text-lg opacity-90 mb-4">{t('tagline')}</p>
              <button className="bg-white text-red-600 px-6 py-2 rounded-full font-semibold">
                {t('shopNow')}
              </button>
            </div>

            {/* Navigation Preview */}
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <div className="flex flex-wrap gap-4 justify-center">
                <span className="text-gray-700 font-medium">{t('home')}</span>
                <span className="text-gray-700 font-medium">{t('products')}</span>
                <span className="text-gray-700 font-medium">{t('about')}</span>
                <span className="text-gray-700 font-medium">{t('contact')}</span>
                <span className="text-gray-700 font-medium">{t('cart')}</span>
              </div>
            </div>

            {/* Product Card Preview */}
            <div className="border rounded-lg p-4 max-w-sm mx-auto">
              <div className="bg-gray-200 h-40 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-500">Product Image</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Rose Sharbat</h4>
              <p className="text-sm text-gray-600 mb-2">{t('description')}: Premium quality rose sharbat</p>
              <p className="text-sm text-gray-600 mb-2">{t('ingredients')}: Rose petals, Sugar, Water</p>
              <p className="text-sm text-gray-600 mb-4">{t('benefits')}: Cooling, Refreshing</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-red-600">₹299</span>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm">
                  {t('addToCart')}
                </button>
              </div>
            </div>

            {/* Search Preview */}
            <div className="mt-6">
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder={t('search')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Language Info */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-800 mb-2">About Multi-Language Support</h3>
            <p className="text-blue-700 text-sm">
              Our website supports multiple Indian languages to provide a better shopping experience.
              Select your preferred language from the options above, and the entire website will be
              displayed in that language. This feature helps customers from different regions to
              navigate and shop comfortably in their native language.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
