import { NextResponse } from 'next/server'

interface OrderItem {
  productId: number
  quantity: number
  price: number
}

interface Order {
  id: string
  items: OrderItem[]
  customerInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    pincode: string
  }
  paymentMethod: string
  subtotal: number
  shipping: number
  total: number
  status: string
  createdAt: Date
}

// In-memory storage for orders (in production, use a database)
const orders: Order[] = []

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      items,
      customerInfo,
      paymentMethod,
      subtotal,
      shipping,
      total,
    } = body

    // Validate required fields
    if (!items || !customerInfo || !paymentMethod) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
        },
        { status: 400 }
      )
    }

    // Create new order
    const newOrder: Order = {
      id: `SHR${Date.now()}`,
      items,
      customerInfo,
      paymentMethod,
      subtotal,
      shipping,
      total,
      status: 'pending',
      createdAt: new Date(),
    }

    orders.push(newOrder)

    return NextResponse.json({
      success: true,
      data: newOrder,
      message: 'Order placed successfully',
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process order',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    data: orders,
    count: orders.length,
  })
}
