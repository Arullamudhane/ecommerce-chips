import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, ArrowLeft, Check, ThumbsUp } from 'lucide-react';
import { products } from '../data/products';
import { reviews } from '../data/reviews';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, items } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [helpfulClicks, setHelpfulClicks] = useState<Set<string>>(new Set());

  const product = products.find(p => p.id === id);
  const isInCart = items.some(item => item.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-xl text-gray-600">Product not found</p>
        <button
          onClick={() => navigate('/products')}
          className="mt-4 inline-flex items-center text-orange-600 hover:text-orange-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    toast.success('Added to cart');
    setTimeout(() => setIsAdding(false), 1500);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to submit a review');
      return;
    }
    toast.success('Review submitted successfully');
    setNewReview({ rating: 5, comment: '' });
  };

  const handleHelpfulClick = (reviewId: string) => {
    setHelpfulClicks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/products')}
        className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
          <button
            onClick={() => {
              toggleFavorite(product.id);
              toast.success(
                isFavorite(product.id)
                  ? 'Removed from favorites'
                  : 'Added to favorites'
              );
            }}
            className={`absolute top-4 right-4 p-3 rounded-full shadow-md transition-colors ${
              isFavorite(product.id)
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Heart
              className={`w-6 h-6 ${isFavorite(product.id) ? 'fill-current' : ''}`}
            />
          </button>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center mb-6">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-lg font-semibold">{product.rating}</span>
            </div>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-gray-600">{product.reviews} reviews</span>
          </div>

          <p className="text-gray-600 mb-8">{product.description}</p>

          <div className="mb-8">
            <span className="text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                isInCart
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-orange-600 text-white hover:bg-orange-700'
              }`}
            >
              {isInCart ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-8 border-t pt-8">
            <h3 className="text-lg font-semibold mb-4">Product Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Category:</span>
                <span className="ml-2 text-gray-900 capitalize">{product.category}</span>
              </div>
              <div>
                <span className="text-gray-600">Stock:</span>
                <span className="ml-2 text-gray-900">{product.stock} units</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t pt-12">
        <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>

        {/* Review Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= newReview.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Review
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                rows={4}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Share your thoughts about this product..."
              />
            </div>

            <button
              type="submit"
              className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <h4 className="font-semibold">{review.userName}</h4>
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <button
                  onClick={() => handleHelpfulClick(review.id)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full border ${
                    helpfulClicks.has(review.id)
                      ? 'border-orange-500 text-orange-600'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>
                    Helpful ({review.helpful + (helpfulClicks.has(review.id) ? 1 : 0)})
                  </span>
                </button>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}