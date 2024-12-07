import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';

export function Favorites() {
  const { favorites } = useFavorites();
  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  if (favoriteProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Heart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h2 className="text-2xl font-bold mb-4">No Favorites Yet</h2>
        <p className="text-gray-600 mb-8">Start adding your favorite chips to this list!</p>
        <Link
          to="/products"
          className="inline-flex items-center bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700"
        >
          Explore Products <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}