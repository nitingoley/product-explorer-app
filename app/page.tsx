'use client';

import { useState, useEffect, useCallback } from 'react';
import ProductGrid from '@/components/ProductGrid';
import FilterBar from '@/components/FilterBar';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Product } from '@/types';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('default');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const limit = 12;

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const skip = (page - 1) * limit;
      let url = `/api/products?limit=${limit}&skip=${skip}`;
      
      if (selectedCategory !== 'all') {
        url += `&category=${selectedCategory}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      
      if (page === 1) {
        setProducts(data.products);
      } else {
        setProducts(prev => [...prev, ...data.products]);
      }
      
      setHasMore(data.products.length === limit);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, selectedCategory]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch('/api/categories');
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      
      const data = await response.json();
      
      // Make sure we're getting an array of strings
      if (Array.isArray(data)) {
        // Filter out any non-string values just in case
        const validCategories = data.filter(item => typeof item === 'string');
        setCategories(validCategories);
        
        if (validCategories.length === 0) {
          console.warn('No valid categories found in API response');
        }
      } else {
        console.error('Unexpected categories format:', data);
        setCategories([]);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setCategories([]);
    }
  }, []);

  const filterAndSortProducts = useCallback(() => {
    const filtered = [...products];

    // Sort products
    switch (sortOption) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'title-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // Default sorting (by id)
        break;
    }

    setFilteredProducts(filtered);
  }, [products, sortOption]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  useEffect(() => {
    filterAndSortProducts();
  }, [filterAndSortProducts]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPage(1); // Reset to first page when category changes
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Product Explorer</h1>
      
      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />
      
      <ProductGrid products={filteredProducts} />
      
      {loading && <LoadingSpinner />}
      
      {hasMore && !loading && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Load More
          </button>
        </div>
      )}
      
      {!hasMore && products.length > 0 && (
        <div className="text-center mt-8 text-gray-500">
          No more products to load
        </div>
      )}
    </div>
  );
}