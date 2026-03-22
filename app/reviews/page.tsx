'use client'

import { useState } from 'react'
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Review {
  id: number
  productId: number
  productName: string
  userName: string
  rating: number
  comment: string
  date: string
  helpful: number
  notHelpful: number
}

export default function ReviewsPage() {
  const [cartItems, setCartItems] = useState<number[]>([])
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      productId: 1,
      productName: 'Rose Sharbat',
      userName: 'Rahul S.',
      rating: 5,
      comment: 'Excellent taste! Very refreshing and authentic rose flavor. Perfect for summer.',
      date: '2024-01-15',
      helpful: 24,
      notHelpful: 2
    },
    {
      id: 2,
      productId: 2,
      productName: 'Kesar Sharbat',
      userName: 'Priya M.',
      rating: 4,
      comment: 'Good quality saffron sharbat. Rich flavor but a bit expensive.',
      date: '2024-01-10',
      helpful: 18,
      notHelpful: 3
    },
    {
      id: 3,
      productId: 3,
      productName: 'Khus Sharbat',
      userName: 'Amit K.',
      rating: 5,
      comment: 'Best khus sharbat I have ever tasted! Natural cooling effect.',
      date: '2024-01-08',
      helpful: 32,
      notHelpful: 1
    },
    {
      id: 4,
      productId: 4,
      productName: 'Mango Sharbat',
      userName: 'Sneha R.',
      rating: 4,
      comment: 'Delicious mango flavor. My kids love it!',
      date: '2024-01-05',
      helpful: 15,
      notHelpful: 2
    }
  ])

  const [sortBy, setSortBy] = useState('recent')
  const [filterRating, setFilterRating] = useState('all')

  const filteredReviews = reviews
    .filter((review) => {
      if (filterRating === 'all') return true
      return review.rating === parseInt(filterRating)
    })
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortBy === 'helpful') {
        return b.helpful - a.helpful
      } else if (sortBy === 'rating-high') {
        return b.rating - a.rating
      } else if (sortBy === 'rating-low') {
        return a.rating - b.rating
      }
      return 0
    })

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage:
      (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100
  }))

  return (
    <main className="min-h-screen flex flex-col">
      <Header cartCount={cartItems.length} />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Customer Reviews</h1>
          <p className="text-lg opacity-90">
            See what our customers are saying about our products
          </p>
        </div>
      </section>

      {/* Reviews Content */}
      <section className="py-12 flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Rating Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Rating Summary</h2>
                
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-gray-800 mb-2">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="flex justify-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-6 h-6 ${
                          star <= Math.round(averageRating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">{reviews.length} reviews</p>
                </div>

                {/* Rating Bars */}
                <div className="space-y-3">
                  {ratingCounts.map(({ rating, count, percentage }) => (
                    <div key={rating} className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 w-8">{rating} ★</span>
                      <div className="flex-grow bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-8">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="lg:col-span-3">
              {/* Filters */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div>
                  <label className="text-sm text-gray-600 mr-2">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="helpful">Most Helpful</option>
                    <option value="rating-high">Highest Rating</option>
                    <option value="rating-low">Lowest Rating</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-600 mr-2">Filter by rating:</label>
                  <select
                    value={filterRating}
                    onChange={(e) => setFilterRating(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="all">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>
              </div>

              {/* Reviews */}
              <div className="space-y-6">
                {filteredReviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {review.productName}
                        </h3>
                        <p className="text-sm text-gray-600">by {review.userName}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{review.comment}</p>

                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">Was this helpful?</span>
                      <button className="flex items-center gap-1 text-gray-600 hover:text-green-600">
                        <ThumbsUp className="w-4 h-4" />
                        Yes ({review.helpful})
                      </button>
                      <button className="flex items-center gap-1 text-gray-600 hover:text-red-600">
                        <ThumbsDown className="w-4 h-4" />
                        No ({review.notHelpful})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
