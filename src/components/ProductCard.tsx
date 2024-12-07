import React, { useState } from 'react';
import { Heart, Star, ShoppingCart, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, items } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [isAdding, setIsAdding] = useState(false);

  const isInCart = items.some(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);
    addToCart(product);
    toast.success('Added to cart');
    setTimeout(() => setIsAdding(false), 1500);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(product.id);
    toast.success(
      isFavorite(product.id)
        ? 'Removed from favorites'
        : 'Added to favorites'
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/product/${product.id}`} className="relative block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <button 
          onClick={handleToggleFavorite}
          className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition-colors ${
            isFavorite(product.id)
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Heart
            className={`w-5 h-5 ${isFavorite(product.id) ? 'fill-current' : ''}`}
          />
        </button>
      </Link>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-orange-600">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center mt-2">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm text-gray-600">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors ${
              isInCart
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-orange-600 text-white hover:bg-orange-700'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}