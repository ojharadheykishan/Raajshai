import { NextResponse } from 'next/server'
import { getProductById } from '@/data/products'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const productId = parseInt(params.id)
  const product = getProductById(productId)

  if (!product) {
    return NextResponse.json(
      {
        success: false,
        error: 'Product not found',
      },
      { status: 404 }
    )
  }

  return NextResponse.json({
    success: true,
    data: product,
  })
}
