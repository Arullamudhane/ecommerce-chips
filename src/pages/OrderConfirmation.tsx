import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

export function OrderConfirmation() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle className="w-16 h-16 text-green-500" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
      <p className="text-gray-600 mb-8">
        Your order has been successfully placed. We'll send you an email with your order details
        and tracking information once your package ships.
      </p>
      <Link
        to="/products"
        className="inline-flex items-center bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700"
      >
        Continue Shopping <ArrowRight className="ml-2 w-4 h-4" />
      </Link>
    </div>
  );
}