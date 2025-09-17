import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const limit = searchParams.get("limit") || "12";
  const skip = searchParams.get("skip") || "0";

  try {
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    if (category && category !== "all") {
      url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
