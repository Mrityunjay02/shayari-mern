import React, { useState, useEffect } from 'react';
import ShayariCard from './ShayariCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

const ShayariList = () => {
  const [shayaris, setShayaris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchShayaris();
  }, [searchTerm, selectedCategory]);

  const fetchShayaris = async () => {
    try {
      let url = `${process.env.REACT_APP_API_URL}/shayari?`;
      if (searchTerm) url += `search=${encodeURIComponent(searchTerm)}&`;
      if (selectedCategory) url += `category=${encodeURIComponent(selectedCategory)}`;

      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setShayaris(data.shayaris);
        setCategories(data.categories || []);
      } else {
        setError('Failed to fetch shayaris');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/shayari/${id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        fetchShayaris(); // Refresh the list to get updated likes
      }
    } catch (err) {
      console.error('Error liking shayari:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search shayaris..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faFilter} />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Category Filters */}
        {showFilters && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  !selectedCategory
                    ? 'bg-rose-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-rose-500 hover:text-white'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat.value
                      ? 'bg-rose-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-rose-500 hover:text-white'
                  }`}
                >
                  {cat.value} ({cat.count})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {(searchTerm || selectedCategory) && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Active Filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-sm">
                Search: {searchTerm}
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-sm">
                Category: {selectedCategory}
                <button
                  onClick={() => setSelectedCategory('')}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Shayari Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shayaris.map((shayari) => (
          <ShayariCard
            key={shayari._id}
            shayari={shayari}
            onLike={handleLike}
          />
        ))}
      </div>

      {/* Empty State */}
      {shayaris.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No shayaris found. Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default ShayariList;
