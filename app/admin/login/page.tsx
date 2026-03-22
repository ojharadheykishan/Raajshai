'use client'

import { useState } from 'react'
import { LogIn } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      // Simple mock authentication - in real app, this would call your backend API
      if (email === 'admin@guruji.com' && password === 'admin123') {
        // In a real app, you'd store the JWT token and redirect
        // For demo purposes, we'll redirect immediately
        router.push('/admin/dashboard')
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div>
          <LogIn className="h-12 w-12 text-red-600 mx-auto" />
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Admin Login
          </h2>
          <p className="text-center text-gray-600">
            Sign in to access the admin panel
          </p>
        </div>

        {error && (
          <div className={`px-4 py-3 rounded-lg text-sm ${
            error.includes('successful') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
              placeholder="admin@guruji.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">
          Demo Credentials:<br />
          <span className="font-medium">admin@guruji.com</span><br />
          <span className="font-medium">admin123</span>
        </div>

        <div className="text-center">
          <Link href="/" className="text-red-600 hover:text-red-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
