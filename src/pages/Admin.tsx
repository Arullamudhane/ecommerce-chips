import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Plus, Upload, Package, Search, Edit2, Trash2, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Product } from '../types';
import { products } from '../data/products';

export function Admin() {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'list' | 'add'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: 'classic',
    image: '',
    rating: 0,
    reviews: 0,
    stock: 0
  });

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(editingProduct ? 'Product updated successfully!' : 'Product added successfully!');
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      category: 'classic',
      image: '',
      rating: 0,
      reviews: 0,
      stock: 0
    });
    setEditingProduct(null);
    setActiveTab('list');
  };

  // Rest of the component remains the same...
  // (Previous implementation continues here)
}