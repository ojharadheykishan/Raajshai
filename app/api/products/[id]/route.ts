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
  visible?: boolean
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    const products = readProducts()
    
    const productIndex = products.findIndex((p) => p.id === id)
    
    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
     products[productIndex] = {
       ...products[productIndex],
       name: body.name || products[productIndex].name,
       price: body.price !== undefined ? body.price : products[productIndex].price,
       originalPrice: body.originalPrice !== undefined ? body.originalPrice : products[productIndex].originalPrice,
       image: body.image || products[productIndex].image,
       description: body.description || products[productIndex].description,
       category: body.category || products[productIndex].category,
       ingredients: body.ingredients || products[productIndex].ingredients,
       benefits: body.benefits || products[productIndex].benefits,
       weight: body.weight || products[productIndex].weight,
       inStock: body.inStock !== undefined ? body.inStock : products[productIndex].inStock,
       visible: body.visible !== undefined ? body.visible : products[productIndex].visible
     }
    
    writeProducts(products)
    
    return NextResponse.json({ success: true, product: products[productIndex] })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const products = readProducts()
    
    const productIndex = products.findIndex((p) => p.id === id)
    
    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    products.splice(productIndex, 1)
    writeProducts(products)
    
    return NextResponse.json({ success: true, message: 'Product deleted' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
