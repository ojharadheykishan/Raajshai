'use client'

import { useState } from 'react'
import { MessageCircle, Phone, Send, CheckCircle, Clock, User } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Message {
  id: number
  text: string
  sender: 'user' | 'support'
  timestamp: string
}

export default function WhatsAppPage() {
  const [cartItems, setCartItems] = useState<number[]>([])
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! Welcome to Rajshahi Sharbat. How can I help you today?',
      sender: 'support',
      timestamp: '10:30 AM'
    }
  ])
  const [isConnected, setIsConnected] = useState(false)

  const quickMessages = [
    'I want to place an order',
    'Track my order',
    'Product inquiry',
    'Return/Refund request',
    'Bulk order inquiry'
  ]

  const handleConnect = () => {
    if (phoneNumber.length >= 10) {
      setIsConnected(true)
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: `Connected with ${phoneNumber}`,
          sender: 'user',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
    }
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: message,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages([...messages, newMessage])
      setMessage('')

      // Simulate support response
      setTimeout(() => {
        const supportResponse: Message = {
          id: messages.length + 2,
          text: 'Thank you for your message. Our team will get back to you shortly.',
          sender: 'support',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        setMessages(prev => [...prev, supportResponse])
      }, 1000)
    }
  }

  const handleQuickMessage = (text: string) => {
    setMessage(text)
  }

  const handleWhatsAppRedirect = () => {
    const encodedMessage = encodeURIComponent('Hello! I am interested in your products.')
    window.open(`https://wa.me/919876543210?text=${encodedMessage}`, '_blank')
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header cartCount={cartItems.length} />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-green-500 to-green-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <MessageCircle className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold mb-2">WhatsApp Support</h1>
              <p className="text-lg opacity-90">
                Chat with us directly on WhatsApp for instant support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Content */}
      <section className="py-12 flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chat Interface */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Chat Header */}
              <div className="bg-green-500 text-white p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Rajshahi Sharbat Support</h3>
                    <p className="text-sm opacity-90 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-300 rounded-full"></span>
                      Online
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-4 bg-gray-50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.sender === 'user'
                          ? 'bg-green-500 text-white rounded-br-none'
                          : 'bg-white text-gray-800 shadow-md rounded-bl-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-green-100' : 'text-gray-500'}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Messages */}
              <div className="p-4 border-t bg-white">
                <p className="text-sm text-gray-600 mb-2">Quick Messages:</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {quickMessages.map((msg, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickMessage(msg)}
                      className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {msg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Options */}
            <div className="space-y-6">
              {/* Direct WhatsApp Button */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Chat on WhatsApp</h3>
                <p className="text-gray-600 mb-4">
                  Click the button below to start a conversation with us directly on WhatsApp
                </p>
                <button
                  onClick={handleWhatsAppRedirect}
                  className="w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 font-semibold"
                >
                  <MessageCircle className="w-5 h-5" />
                  Open WhatsApp
                </button>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-full">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Phone</p>
                      <p className="text-gray-600">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-full">
                      <MessageCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">WhatsApp</p>
                      <p className="text-gray-600">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-full">
                      <Clock className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Business Hours</p>
                      <p className="text-gray-600">Mon - Sat: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Why WhatsApp?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-600">Instant responses to your queries</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-600">Easy order tracking updates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-600">Share product images directly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-600">24/7 support availability</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
