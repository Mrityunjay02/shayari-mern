import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWhatsapp,
  faFacebook,
  faTwitter,
  faInstagram,
  faTelegram,
  faSnapchat
} from '@fortawesome/free-brands-svg-icons';
import { faShare, faHeart, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ShayariCard = ({ shayari, onEdit, onDelete, isAdmin }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(shayari.likes || 0);
  const navigate = useNavigate();

  const handleEdit = () => {
    if (onEdit) {
      onEdit(shayari);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this shayari?')) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/shayari/${shayari._id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.ok) {
          if (onDelete) {
            onDelete(shayari._id);
          }
          toast.success('Shayari deleted successfully!');
        } else {
          throw new Error('Failed to delete shayari');
        }
      } catch (error) {
        console.error('Error deleting shayari:', error);
        toast.error('Failed to delete shayari');
      }
    }
  };

  const handleLike = async () => {
    if (!isLiked) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/shayari/${shayari._id}/like`, {
          method: 'POST'
        });
        
        if (response.ok) {
          setIsLiked(true);
          setLikes(prev => prev + 1);
          toast.success('Shayari liked!');
        }
      } catch (error) {
        console.error('Error liking shayari:', error);
        toast.error('Failed to like shayari');
      }
    }
  };

  const socialLinks = [
    {
      label: 'WhatsApp',
      icon: faWhatsapp,
      url: `https://wa.me/?text=${encodeURIComponent(`${shayari.content}\n\n- ${shayari.author}`)}`,
      color: 'bg-green-500'
    },
    {
      label: 'Facebook',
      icon: faFacebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      color: 'bg-blue-600'
    },
    {
      label: 'Twitter',
      icon: faTwitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${shayari.content}\n\n- ${shayari.author}`)}`,
      color: 'bg-sky-500'
    },
    {
      label: 'Instagram',
      icon: faInstagram,
      url: `https://www.instagram.com/`,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      label: 'Telegram',
      icon: faTelegram,
      url: `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`${shayari.content}\n\n- ${shayari.author}`)}`,
      color: 'bg-blue-500'
    },
    {
      label: 'Snapchat',
      icon: faSnapchat,
      url: 'https://www.snapchat.com/',
      color: 'bg-yellow-400'
    }
  ];

  const getCategoryGradient = (category) => {
    const gradients = {
      'Ishq': 'from-rose-500 to-pink-500',
      'Dard': 'from-blue-600 to-indigo-600',
      'Dosti': 'from-green-500 to-emerald-500',
      'Zindagi': 'from-yellow-500 to-amber-500',
      'Motivational': 'from-purple-500 to-violet-500',
      'Romantic': 'from-red-500 to-rose-500',
      'Bewafa': 'from-gray-600 to-slate-600',
      'Tanhai': 'from-indigo-500 to-blue-500',
      'Intezaar': 'from-amber-500 to-orange-500',
      'Mohabbat': 'from-pink-500 to-rose-500',
      'Yaadein': 'from-violet-500 to-purple-500',
      'Ghazal': 'from-teal-500 to-emerald-500',
      'Fitrat': 'from-green-600 to-teal-600',
      'Roohani': 'from-indigo-400 to-purple-400',
      'Other': 'from-gray-500 to-gray-600'
    };
    return gradients[category] || gradients['Other'];
  };

  if (!shayari || !shayari.content) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-102 hover:shadow-xl">
      {/* Category Badge */}
      <div className={`absolute top-0 right-0 px-3 py-1 m-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r ${getCategoryGradient(shayari.category)}`}>
        {shayari.category}
      </div>

      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold mb-2 font-urdu">{shayari.title}</h3>

        {/* Content */}
        <p className="text-gray-700 mb-4 font-urdu whitespace-pre-line">{shayari.content}</p>

        {/* Author */}
        <p className="text-gray-500 italic mb-2">{shayari.author}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {shayari.tags && shayari.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-4">
            {/* Like Button */}
            <button
              onClick={handleLike}
              disabled={isLiked}
              className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors ${
                isLiked ? 'text-rose-500 bg-rose-50' : 'text-gray-500 hover:text-rose-500 hover:bg-rose-50'
              }`}
            >
              <FontAwesomeIcon icon={faHeart} className="text-lg" />
              <span>{likes}</span>
            </button>

            {/* Share Button */}
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="flex items-center gap-2 px-3 py-1 rounded-full text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-colors"
            >
              <FontAwesomeIcon icon={faShare} className="text-lg" />
              <span>Share</span>
            </button>
          </div>

          {/* Admin Actions */}
          {isAdmin && (
            <div className="flex gap-4">
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-3 py-1 rounded-full text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-colors"
              >
                <FontAwesomeIcon icon={faEdit} className="text-lg" />
                <span>Edit</span>
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-3 py-1 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <FontAwesomeIcon icon={faTrash} className="text-lg" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>

        {/* Share Menu */}
        {showShareMenu && (
          <div className="absolute right-0 bottom-full mb-2 bg-white rounded-lg shadow-xl p-4 z-50">
            <div className="grid grid-cols-3 gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full ${link.color}`}>
                    <FontAwesomeIcon icon={link.icon} className="text-white text-xl" />
                  </div>
                  <span className="text-sm text-gray-600">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShayariCard;
