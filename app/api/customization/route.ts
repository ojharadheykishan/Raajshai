import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const customizationFilePath = path.join(process.cwd(), 'data', 'customization.json');

interface CustomizationOptionValue {
  id: string;
  value: string;
  label: string;
  color_code?: string;
  image_url?: string;
  price_adjustment: number;
  in_stock: boolean;
  sort_order: number;
}

interface CustomizationOption {
  id: string;
  product_id: string;
  name: string;
  type: 'text' | 'select' | 'color' | 'image' | 'number';
  required: boolean;
  description?: string;
  min_value?: number;
  max_value?: number;
  max_length?: number;
  price_adjustment: number;
  sort_order: number;
  values: CustomizationOptionValue[];
  created_at: string;
  updated_at: string;
}

interface CustomizationData {
  options: CustomizationOption[];
}

function readCustomization(): CustomizationData {
  try {
    if (!fs.existsSync(customizationFilePath)) {
      return { options: [] };
    }
    const fileContents = fs.readFileSync(customizationFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading customization data:', error);
    return { options: [] };
  }
}

function writeCustomization(data: CustomizationData): boolean {
  try {
    fs.writeFileSync(customizationFilePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing customization data:', error);
    return false;
  }
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// GET - Fetch customization options for a product
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const data = readCustomization();
    const productOptions = data.options
      .filter(opt => opt.product_id === productId)
      .sort((a, b) => a.sort_order - b.sort_order);

    // Sort values within each option
    const sortedOptions = productOptions.map(option => ({
      ...option,
      values: option.values.sort((a, b) => a.sort_order - b.sort_order)
    }));

    return NextResponse.json({ options: sortedOptions });
  } catch (error) {
    console.error('Error in customization GET:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new customization option (Admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      product_id,
      name,
      type,
      required,
      description,
      min_value,
      max_value,
      max_length,
      price_adjustment,
      sort_order,
      values
    } = body;

    // Validate required fields
    if (!product_id || !name || !type) {
      return NextResponse.json(
        { error: 'Product ID, name, and type are required' },
        { status: 400 }
      );
    }

    const data = readCustomization();
    
    const newOption: CustomizationOption = {
      id: generateId(),
      product_id,
      name,
      type,
      required: required || false,
      description,
      min_value,
      max_value,
      max_length,
      price_adjustment: price_adjustment || 0,
      sort_order: sort_order || data.options.filter(o => o.product_id === product_id).length,
      values: (values || []).map((val: any, index: number) => ({
        id: generateId(),
        value: val.value,
        label: val.label || val.value,
        color_code: val.color_code,
        image_url: val.image_url,
        price_adjustment: val.price_adjustment || 0,
        in_stock: val.in_stock !== false,
        sort_order: index
      })),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    data.options.push(newOption);
    writeCustomization(data);

    return NextResponse.json({ option: newOption }, { status: 201 });
  } catch (error) {
    console.error('Error in customization POST:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update a customization option (Admin only)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Option ID is required' },
        { status: 400 }
      );
    }

    const data = readCustomization();
    const optionIndex = data.options.findIndex(opt => opt.id === id);

    if (optionIndex === -1) {
      return NextResponse.json(
        { error: 'Customization option not found' },
        { status: 404 }
      );
    }

    data.options[optionIndex] = {
      ...data.options[optionIndex],
      ...updates,
      updated_at: new Date().toISOString()
    };

    writeCustomization(data);

    return NextResponse.json({ option: data.options[optionIndex] });
  } catch (error) {
    console.error('Error in customization PUT:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a customization option (Admin only)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Option ID is required' },
        { status: 400 }
      );
    }

    const data = readCustomization();
    const optionIndex = data.options.findIndex(opt => opt.id === id);

    if (optionIndex === -1) {
      return NextResponse.json(
        { error: 'Customization option not found' },
        { status: 404 }
      );
    }

    data.options.splice(optionIndex, 1);
    writeCustomization(data);

    return NextResponse.json({ message: 'Customization option deleted successfully' });
  } catch (error) {
    console.error('Error in customization DELETE:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
