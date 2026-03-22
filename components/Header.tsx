'use client'

import { ShoppingCart, Menu, X, Settings } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import Loader from './Loader'

interface HeaderProps {
  cartCount: number
}

export default function Header({ cartCount }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Loader */}
      <Loader />

      <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-red-600">राजशाही शर्बत</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 transition-colors">
              Home
            </Link>
            <Link href="/collections/sharbat" className="text-gray-700 hover:text-red-600 transition-colors">
              Sharbat
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-red-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-red-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Cart Icon */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-red-600 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Admin Icon */}
            <Link href="/admin/login" className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-gray-700 hover:text-red-600 transition-colors" />
              <span className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                Admin
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/collections/sharbat"
                className="text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sharbat
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
    </>
  )
}
