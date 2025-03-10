import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShare, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

// Category color mappings for gradient backgrounds
const categoryStyles = {
  Ishq: 'from-rose-500 to-pink-500',
  Dard: 'from-purple-500 to-indigo-500',
  Dosti: 'from-blue-500 to-cyan-500',
  Zindagi: 'from-teal-500 to-emerald-500',
  Motivational: 'from-green-500 to-lime-500',
  Romantic: 'from-pink-500 to-rose-500',
  Bewafa: 'from-violet-500 to-purple-500',
  Tanhai: 'from-indigo-500 to-blue-500',
  Intezaar: 'from-cyan-500 to-teal-500',
  Mohabbat: 'from-rose-500 to-pink-500',
  Yaadein: 'from-amber-500 to-yellow-500',
  Ghazal: 'from-emerald-500 to-green-500',
  Fitrat: 'from-lime-500 to-emerald-500',
  Roohani: 'from-blue-500 to-indigo-500',
  Other: 'from-gray-500 to-slate-500'
};

const ShayariCard = ({ shayari, isAdmin, onDelete, onEdit }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(shayari.likes || 0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleLike = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/shayari/${shayari._id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
      }
    } catch (error) {
      console.error('Error liking shayari:', error);
    }
  };

  const handleShare = async () => {
    const textToShare = `${shayari.title}\n\n${shayari.content}\n\n- ${shayari.author}`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: shayari.title,
          text: textToShare,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(textToShare);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this shayari?')) {
      onDelete(shayari._id);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 mb-6 transform hover:-translate-y-1">
      {/* Category Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${categoryStyles[shayari.category] || categoryStyles.Other} shadow-lg`}>
          {shayari.category}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white font-urdu">
          {shayari.title}
        </h3>

        {/* Content */}
        <div className={`relative ${isExpanded ? '' : 'max-h-32 overflow-hidden'}`}>
          <p className="text-lg text-gray-600 dark:text-gray-300 whitespace-pre-wrap font-urdu leading-relaxed">
            {shayari.content}
          </p>
          {!isExpanded && shayari.content.length > 150 && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-gray-800 to-transparent" />
          )}
        </div>

        {/* Read More Button */}
        {shayari.content.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-rose-500 hover:text-rose-600 font-medium text-sm focus:outline-none"
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        )}

        {/* Tags */}
        {shayari.tags && shayari.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {shayari.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author and Actions */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400 italic">
            {shayari.author}
          </div>

          <div className="flex items-center space-x-4">
            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 text-sm ${
                isLiked ? 'text-rose-500' : 'text-gray-500 dark:text-gray-400'
              } hover:text-rose-500 transition-colors duration-200`}
            >
              <FontAwesomeIcon icon={faHeart} className={`text-lg ${isLiked ? 'animate-bounce' : ''}`} />
              <span>{likeCount}</span>
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors duration-200"
              title={isCopied ? 'Copied!' : 'Share'}
            >
              <FontAwesomeIcon icon={faShare} className="text-lg" />
            </button>

            {/* Admin Actions */}
            {isAdmin && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onEdit(shayari)}
                  className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faEdit} className="text-lg" />
                </button>
                <button
                  onClick={handleDelete}
                  className="text-red-500 hover:text-red-600 transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faTrash} className="text-lg" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShayariCard;
