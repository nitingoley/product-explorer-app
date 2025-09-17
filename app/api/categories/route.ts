import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://dummyjson.com/products/categories');
    
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }
    
    const data = await response.json();
    
    // The API returns an array of strings, but let's make sure we're handling it correctly
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}