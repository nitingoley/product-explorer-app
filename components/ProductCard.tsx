'use client';

import { useState } from 'react';
import { Product } from '@/types';
import ProductModal from './ProductModal';
import { gsap } from 'gsap';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseEnter = () => {
    gsap.to(`#card-${product.id}`, {
      y: -5,
      duration: 0.3,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(`#card-${product.id}`, {
      y: 0,
      duration: 0.3,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
      ease: "power2.out"
    });
  };

  return (
    <>
      <div
        id={`card-${product.id}`}
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform"
        onClick={() => setIsModalOpen(true)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="h-48 overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.title}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">${product.price}</span>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {product.rating} ★
            </span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ProductModal product={product} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}