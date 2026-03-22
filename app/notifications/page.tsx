'use client'

import { useState } from 'react'
import { Bell, BellOff, Check, X, Gift, Truck, Tag, AlertCircle } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Notification {
  id: number
  type: 'order' | 'promo' | 'delivery' | 'alert'
  title: string
  message: string
  time: string
  read: boolean
}

export default function NotificationsPage() {
  const [cartItems, setCartItems] = useState<number[]>([])
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'order',
      title: 'Order Confirmed',
      message: 'Your order #ORD-2024-001 has been confirmed and is being processed.',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'promo',
      title: 'Special Offer!',
      message: 'Get 20% off on all Sharbat products. Use code: SUMMER20',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'delivery',
      title: 'Out for Delivery',
      message: 'Your order #ORD-2024-002 is out for delivery. Expected by 6 PM today.',
      time: '3 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'alert',
      title: 'Price Drop Alert',
      message: 'Kesar Sharbat price dropped to ₹449! Grab it now.',
      time: '5 hours ago',
      read: true
    },
    {
      id: 5,
      type: 'promo',
      title: 'New Arrival',
      message: 'Check out our new Mango Crush! Limited stock available.',
      time: '1 day ago',
      read: true
    },
    {
      id: 6,
      type: 'order',
      title: 'Order Delivered',
      message: 'Your order #ORD-2024-003 has been delivered successfully.',
      time: '2 days ago',
      read: true
    }
  ])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Check className="w-5 h-5 text-green-600" />
      case 'promo':
        return <Gift className="w-5 h-5 text-purple-600" />
      case 'delivery':
        return <Truck className="w-5 h-5 text-blue-600" />
      case 'alert':
        return <Tag className="w-5 h-5 text-orange-600" />
      default:
        return <Bell className="w-5 h-5 text-gray-600" />
    }
  }

  const getNotificationBg = (type: string) => {
    switch (type) {
      case 'order':
        return 'bg-green-100'
      case 'promo':
        return 'bg-purple-100'
      case 'delivery':
        return 'bg-blue-100'
      case 'alert':
        return 'bg-orange-100'
      default:
        return 'bg-gray-100'
    }
  }

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notif) => ({ ...notif, read: true }))
    )
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <main className="min-h-screen flex flex-col">
      <Header cartCount={cartItems.length} />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Notifications</h1>
              <p className="text-lg opacity-90">
                Stay updated with your orders and offers
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`p-3 rounded-full ${notificationsEnabled ? 'bg-white text-red-600' : 'bg-red-700 text-white'}`}
              >
                {notificationsEnabled ? <Bell className="w-6 h-6" /> : <BellOff className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Notifications Content */}
      <section className="py-12 flex-grow">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Notification Settings */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">Push Notifications</h3>
                <p className="text-sm text-gray-600">
                  Receive notifications about orders, offers, and updates
                </p>
              </div>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notificationsEnabled ? 'bg-red-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">
                All Notifications ({notifications.length})
                {unreadCount > 0 && (
                  <span className="ml-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Mark all as read
                </button>
              )}
            </div>

            {notifications.length > 0 ? (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-full ${getNotificationBg(notification.type)}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </h4>
                            <p className="text-gray-600 text-sm mt-1">
                              {notification.message}
                            </p>
                            <p className="text-gray-400 text-xs mt-2">
                              {notification.time}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="p-1 hover:bg-gray-200 rounded"
                                title="Mark as read"
                              >
                                <Check className="w-4 h-4 text-gray-500" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="p-1 hover:bg-gray-200 rounded"
                              title="Delete"
                            >
                              <X className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No notifications
                </h3>
                <p className="text-gray-600">
                  You're all caught up! Check back later for updates.
                </p>
              </div>
            )}
          </div>

          {/* Notification Types Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-full">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Order Updates</h4>
              </div>
              <p className="text-sm text-gray-600">
                Get notified about order confirmations, shipping, and delivery
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Gift className="w-5 h-5 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Promotions</h4>
              </div>
              <p className="text-sm text-gray-600">
                Receive exclusive offers, discounts, and new product alerts
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Delivery Updates</h4>
              </div>
              <p className="text-sm text-gray-600">
                Track your delivery in real-time with instant updates
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-100 rounded-full">
                  <Tag className="w-5 h-5 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Price Alerts</h4>
              </div>
              <p className="text-sm text-gray-600">
                Get notified when prices drop on your favorite products
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
