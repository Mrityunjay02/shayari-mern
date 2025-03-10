import React, { useState, useEffect } from 'react';
import ShayariCard from './ShayariCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-hot-toast';

const CATEGORIES = {
  ALL: 'All',
  ISHQ: 'Ishq',
  DARD: 'Dard',
  DOSTI: 'Dosti',
  ZINDAGI: 'Zindagi',
  MOTIVATIONAL: 'Motivational',
  ROMANTIC: 'Romantic',
  BEWAFA: 'Bewafa',
  TANHAI: 'Tanhai',
  INTEZAAR: 'Intezaar',
  MOHABBAT: 'Mohabbat',
  YAADEIN: 'Yaadein',
  GHAZAL: 'Ghazal',
  NATURE: 'Fitrat',
  SPIRITUAL: 'Roohani',
  OTHER: 'Other'
};

const ShayariList = () => {
  const [shayaris, setShayaris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES.ALL);
  const [categoryCounts, setCategoryCounts] = useState({});
  const { isDark } = useTheme();

  useEffect(() => {
    fetchShayaris();
  }, [selectedCategory, searchTerm]);

  const fetchShayaris = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let url = `${process.env.REACT_APP_API_URL}/shayari`;
      const params = new URLSearchParams();
      
      if (selectedCategory !== CATEGORIES.ALL) {
        params.append('category', selectedCategory);
      }
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch shayaris');
      
      const data = await response.json();
      setShayaris(data);

      // Calculate category counts
      const counts = data.reduce((acc, shayari) => {
        acc[shayari.category] = (acc[shayari.category] || 0) + 1;
        return acc;
      }, {});
      setCategoryCounts(counts);

    } catch (err) {
      setError(err.message);
      toast.error('Failed to load shayaris');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/shayari/${id}/like`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to like shayari');
      fetchShayaris();
    } catch (err) {
      toast.error('Failed to like shayari');
    }
  };

  const handleFavorite = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/shayari/${id}/favorite`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to favorite shayari');
      fetchShayaris();
    } catch (err) {
      toast.error('Failed to favorite shayari');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search shayaris..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {Object.values(CATEGORIES).map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category} {categoryCounts[category] && `(${categoryCounts[category]})`}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <p className="text-red-500 dark:text-red-400">{error}</p>
          <button
            onClick={fetchShayaris}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && shayaris.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No shayaris found</p>
        </div>
      )}

      {/* Shayari Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {shayaris.map((shayari) => (
            <motion.div
              key={shayari._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ShayariCard
                shayari={shayari}
                onLike={handleLike}
                onFavorite={handleFavorite}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ShayariList;
