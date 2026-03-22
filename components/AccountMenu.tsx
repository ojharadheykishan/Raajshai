'use client'

import Link from 'next/link'
import { User, Heart, Settings, LogOut } from 'lucide-react'
import { useState } from 'react'

export default function AccountMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-red-600 transition rounded-lg hover:bg-gray-100"
      >
        <User className="w-5 h-5" />
        <span className="text-sm font-medium">Account</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
          <Link
            href="/orders"
            className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition border-b"
          >
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>My Orders</span>
            </div>
          </Link>
          <Link
            href="/profile"
            className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition border-b"
          >
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span>Profile Settings</span>
            </div>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  )
}
