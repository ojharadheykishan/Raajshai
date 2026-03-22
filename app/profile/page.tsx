'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User, Mail, Phone, MapPin, Edit2, Save } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    firstName: 'Raj',
    lastName: 'Kumar',
    email: 'raj@example.com',
    phone: '+91-98765-43210',
    address: '123 Main Street, Delhi',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110001',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile({ ...profile, [name]: value })
  }

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile))
    setIsEditing(false)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header cartCount={0} />

      <div className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {profile.firstName} {profile.lastName}
                  </h3>
                  <p className="text-gray-600 text-sm">{profile.email}</p>
                </div>

                <nav className="space-y-2">
                  <Link
                    href="/profile"
                    className="block w-full px-4 py-2 text-left bg-red-50 text-red-600 font-semibold rounded-lg"
                  >
                    👤 Profile
                  </Link>
                  <Link
                    href="/orders"
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition"
                  >
                    📦 My Orders
                  </Link>
                  <Link
                    href="/cart"
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition"
                  >
                    🛒 Cart
                  </Link>
                  <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition">
                    🚪 Logout
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2">
              {/* Profile Info */}
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
                  <button
                    onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit2 className="w-4 h-4" />
                        Edit Profile
                      </>
                    )}
                  </button>
                </div>

                {isEditing ? (
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={profile.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={profile.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={profile.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={profile.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={profile.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={profile.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pincode
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={profile.pincode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <User className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Full Name</p>
                        <p className="font-semibold text-gray-800">
                          {profile.firstName} {profile.lastName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pb-4 border-b">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Email Address</p>
                        <p className="font-semibold text-gray-800">{profile.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pb-4 border-b">
                      <Phone className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Phone Number</p>
                        <p className="font-semibold text-gray-800">{profile.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-600 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-semibold text-gray-800">{profile.address}</p>
                        <p className="text-gray-600">
                          {profile.city}, {profile.state} {profile.pincode}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <p className="text-3xl font-bold text-red-600 mb-2">12</p>
                  <p className="text-gray-600">Total Orders</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <p className="text-3xl font-bold text-green-600 mb-2">₹5,280</p>
                  <p className="text-gray-600">Total Spent</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <p className="text-3xl font-bold text-blue-600 mb-2">3</p>
                  <p className="text-gray-600">Pending Orders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
