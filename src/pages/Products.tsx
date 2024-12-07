import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import { Product } from '../types';

export function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter((product: Product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg"
        >
          <SlidersHorizontal className="w-5 h-5 mr-2" />
          Filters
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 space-y-6`}>
          <div>
            <h3 className="text-lg font-semibold mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`block w-full text-left px-3 py-2 rounded-lg ${
                    selectedCategory === category
                      ? 'bg-orange-100 text-orange-800'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Price Range</h3>
            <div className="px-3">
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${priceRange[0].toFixed(2)}</span>
                <span>${priceRange[1].toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}