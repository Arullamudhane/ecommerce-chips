import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[70vh]">
        <img
          src="https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&q=80&w=2000"
          alt="Delicious chips"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Crafted for Crunch</h1>
            <p className="text-xl mb-8">Discover our artisanal potato chips</p>
            <Link
              to="/products"
              className="inline-flex items-center bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Shop Now <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Since 1970, CrispyCo has been crafting the perfect potato chip. What started
              in a small kitchen in Idaho has grown into a beloved snack brand,
              known for our commitment to quality and innovative flavors.
            </p>
            <p className="text-gray-600 mb-4">
              We select only the finest potatoes, slice them to the perfect
              thickness, and cook them in small batches to ensure every chip
              meets our high standards.
            </p>
            <Link
              to="/about"
              className="text-orange-600 hover:text-orange-700 inline-flex items-center"
            >
              Learn more about our history <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&q=80&w=800"
              alt="Potato farm"
              className="rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1528751014936-863e6e7a319c?auto=format&fit=crop&q=80&w=800"
              alt="Chips production"
              className="rounded-lg mt-8"
            />
          </div>
        </div>
      </div>

      {/* Quality Promise */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Quality Promise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🥔</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Ingredients</h3>
              <p className="text-gray-600">
                Only the finest potatoes and natural seasonings make it into our chips.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍🍳</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Artisanal Process</h3>
              <p className="text-gray-600">
                Small-batch cooking ensures perfect crunch and flavor every time.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-gray-600">
                Committed to environmentally friendly farming and production.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}