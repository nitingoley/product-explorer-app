'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Product } from '@/types';
import { gsap } from 'gsap';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [currentImage, setCurrentImage] = useState(0);

  const handleClose = useCallback(() => {
    // Animation on close
    gsap.to(modalRef.current, {
      opacity: 0,
      y: 50,
      scale: 0.9,
      duration: 0.3,
      onComplete: onClose
    });
    
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.3
    });
  }, [onClose]);

  useEffect(() => {
    // Animation on open
    gsap.fromTo(backdropRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );
    
    gsap.fromTo(modalRef.current, 
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
    );

    // Close on escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleEscape);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [handleClose]);

  const nextImage = () => {
    setCurrentImage(prev => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImage(prev => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <div className="h-64 md:h-80 overflow-hidden rounded-lg mb-4">
                <img
                  src={product.images[currentImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                  >
                    &lt;
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                  >
                    &gt;
                  </button>
                  
                  <div className="flex gap-2 justify-center mt-4">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`w-3 h-3 rounded-full ${
                          index === currentImage ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div>
              <p className="text-gray-700 mb-4">{product.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-600">Price</h3>
                  <p className="text-2xl font-bold text-green-600">${product.price}</p>
                  {product.discountPercentage > 0 && (
                    <p className="text-sm text-gray-500">
                      {product.discountPercentage}% off
                    </p>
                  )}
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-600">Rating</h3>
                  <p className="text-xl font-semibold">
                    {product.rating} ★
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-600">Brand</h3>
                  <p>{product.brand}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-600">Category</h3>
                  <p className="capitalize">{product.category}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-600">Stock</h3>
                  <p>{product.stock} available</p>
                </div>
              </div>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}