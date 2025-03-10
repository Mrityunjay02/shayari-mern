import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShare, faCopy, faEllipsisV, faStar } from '@fortawesome/free-solid-svg-icons';
import { toast, Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const categoryColors = {
  'Ishq': 'from-pink-500 to-red-500',
  'Dard': 'from-purple-500 to-indigo-500',
  'Dosti': 'from-green-500 to-teal-500',
  'Zindagi': 'from-yellow-500 to-orange-500',
  'Motivational': 'from-blue-500 to-indigo-500',
  'Romantic': 'from-red-400 to-pink-500',
  'Bewafa': 'from-gray-600 to-gray-800',
  'Tanhai': 'from-blue-400 to-purple-500',
  'Intezaar': 'from-amber-400 to-orange-500',
  'Mohabbat': 'from-rose-400 to-red-500',
  'Yaadein': 'from-violet-400 to-purple-500',
  'Ghazal': 'from-emerald-400 to-green-500',
  'Fitrat': 'from-cyan-400 to-blue-500',
  'Roohani': 'from-indigo-400 to-violet-500',
  'Other': 'from-gray-400 to-gray-600'
};

const ShayariCard = ({ shayari, onLike, onFavorite }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(shayari._id);
    toast.success('Shayari liked!');
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite(shayari._id);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: shayari.title,
        text: `${shayari.content}\n\n${shayari.author}`,
        url: window.location.href
      });
      toast.success('Shared successfully!');
    } catch (err) {
      toast.error('Sharing failed. Try copying instead.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${shayari.content}\n\n${shayari.author}`);
    toast.success('Copied to clipboard!');
  };

  const truncatedContent = shayari.content.length > 150 && !isExpanded 
    ? shayari.content.substring(0, 150) + '...' 
    : shayari.content;

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Toaster position="bottom-center" />
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <motion.h2 
          className="text-xl font-bold text-gray-800 dark:text-white"
          animate={{ scale: isHovered ? 1.05 : 1 }}
        >
          {shayari.title}
        </motion.h2>
        <div className="relative">
          <motion.button 
            onClick={() => setShowOptions(!showOptions)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faEllipsisV} className="text-gray-500 dark:text-gray-400" />
          </motion.button>
          
          <AnimatePresence>
            {showOptions && (
              <motion.div 
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <motion.button 
                  onClick={handleShare}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                  whileHover={{ x: 5 }}
                >
                  Share
                </motion.button>
                <motion.button 
                  onClick={handleCopy}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                  whileHover={{ x: 5 }}
                >
                  Copy
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Category Badge */}
      <motion.div 
        className="mb-4"
        animate={{ scale: isHovered ? 1.05 : 1 }}
      >
        <span className={`inline-block px-3 py-1 text-sm font-semibold text-white rounded-full bg-gradient-to-r ${categoryColors[shayari.category] || categoryColors['Other']}`}>
          {shayari.category}
        </span>
      </motion.div>

      {/* Content */}
      <motion.div 
        className="mb-4"
        animate={{ y: isExpanded ? 10 : 0 }}
      >
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
          {truncatedContent}
        </p>
        {shayari.content.length > 150 && (
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 mt-2 text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </motion.button>
        )}
      </motion.div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <motion.button 
            onClick={handleLike}
            className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'} hover:text-red-500 transition-colors`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon icon={faHeart} className={`text-xl ${isLiked ? 'animate-bounce' : ''}`} />
            <span>{shayari.likes || 0}</span>
          </motion.button>
          <motion.button 
            onClick={handleFavorite}
            className={`flex items-center space-x-1 ${isFavorite ? 'text-yellow-500' : 'text-gray-500 dark:text-gray-400'} hover:text-yellow-500 transition-colors`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon icon={faStar} className={`text-xl ${isFavorite ? 'animate-spin' : ''}`} />
          </motion.button>
          <motion.button 
            onClick={handleShare}
            className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon icon={faShare} className="text-xl" />
          </motion.button>
          <motion.button 
            onClick={handleCopy}
            className="text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon icon={faCopy} className="text-xl" />
          </motion.button>
        </div>
        <motion.p 
          className="text-gray-500 dark:text-gray-400 text-sm italic"
          animate={{ opacity: isHovered ? 1 : 0.8 }}
        >
          {shayari.author}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default ShayariCard;
