"use client";

import { useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types";
import { gsap } from "gsap";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (gridRef.current && products.length > 0) {
      const cards = gridRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [products]);

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found.</p>
      </div>
    );
  }


  return (
    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
   {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
