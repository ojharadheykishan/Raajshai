import { NextResponse } from 'next/server'
import { products } from '@/data/products'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const sortBy = searchParams.get('sortBy')
  const priceRange = searchParams.get('priceRange')

  let filteredProducts = [...products]

  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    )
  }

  // Filter by price range
  if (priceRange) {
    filteredProducts = filteredProducts.filter((product) => {
      if (priceRange === 'under300') return product.price < 300
      if (priceRange === '300-400') return product.price >= 300 && product.price <= 400
      if (priceRange === 'above400') return product.price > 400
      return true
    })
  }

  // Sort products
  if (sortBy) {
    filteredProducts.sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return 0
    })
  }

  return NextResponse.json({
    success: true,
    data: filteredProducts,
    count: filteredProducts.length,
  })
}
