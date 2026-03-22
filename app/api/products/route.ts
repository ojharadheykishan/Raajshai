import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const productsFilePath = path.join(process.cwd(), 'data', 'products.json')

interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  description: string
  category: string
  ingredients: string[]
  benefits: string[]
  weight: string
  inStock: boolean
}

function readProducts(): Product[] {
  try {
    const fileContents = fs.readFileSync(productsFilePath, 'utf8')
    const data = JSON.parse(fileContents)
    return data.products || []
  } catch (error) {
    console.error('Error reading products:', error)
    return []
  }
}

function writeProducts(products: Product[]) {
  try {
    const data = { products }
    fs.writeFileSync(productsFilePath, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error('Error writing products:', error)
    return false
  }
}

export async function GET() {
  try {
    const products = readProducts()
    return NextResponse.json({ products })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const products = readProducts()
    
    const newProduct: Product = {
      id: Date.now(),
      name: body.name || '',
      price: body.price || 0,
      originalPrice: body.originalPrice || 0,
      image: body.image || '',
      description: body.description || '',
      category: body.category || 'Sharbat',
      ingredients: body.ingredients || [],
      benefits: body.benefits || [],
      weight: body.weight || '750ml',
      inStock: body.inStock !== undefined ? body.inStock : true
    }
    
    products.push(newProduct)
    writeProducts(products)
    
    return NextResponse.json({ success: true, product: newProduct })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
