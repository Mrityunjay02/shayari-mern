import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebook, 
  faTwitter, 
  faWhatsapp, 
  faLinkedin 
} from '@fortawesome/free-brands-svg-icons';

const ShayariCard = ({ text, author = "Unknown", title = "", isAdmin, id, onDelete }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/edit', { state: { text, id, title, author } });
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this shayari?')) {
      await onDelete(id);
    }
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(text || '');

  const socialLinks = [
    {
      icon: faFacebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      color: 'text-blue-600',
      label: 'Facebook'
    },
    {
      icon: faTwitter,
      url: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
      color: 'text-blue-400',
      label: 'Twitter'
    },
    {
      icon: faWhatsapp,
      url: `https://wa.me/?text=${shareText} ${shareUrl}`,
      color: 'text-green-500',
      label: 'WhatsApp'
    },
    {
      icon: faLinkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      color: 'text-blue-700',
      label: 'LinkedIn'
    }
  ];

  if (!text) {
    return null; // Don't render anything if there's no content
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 mb-6 mx-auto max-w-3xl relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"></div>

      <div className="mb-4">
        {title && (
          <div className="text-center">
            <h3 className="text-gray-800 text-xl sm:text-2xl md:text-3xl mb-4" style={{
              fontFamily: "'Bell MT', serif",
              letterSpacing: '0.02em'
            }}>
              {title}
            </h3>
          </div>
        )}
        <div className="px-4 sm:px-6 md:px-8">
          <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed" style={{ 
            fontFamily: "'Bell MT', serif",
            lineHeight: '1.8',
            letterSpacing: '0.03em'
          }}>
            {text}
          </p>
        </div>
        <div className="text-center">
          <p className="shayari-author">
            {author}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 sm:justify-between mt-4 pt-4 border-t border-gray-100">
        {isAdmin && (
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleEdit}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm sm:text-base bg-blue-500 text-white rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-600 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Edit</span>
            </button>

            <button
              onClick={handleDelete}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm sm:text-base bg-red-500 text-white rounded-lg flex items-center justify-center space-x-2 hover:bg-red-600 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Delete</span>
            </button>
          </div>
        )}

        <div className="relative w-full sm:w-auto mt-3 sm:mt-0">
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg flex items-center justify-center space-x-2 hover:opacity-90 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span>Share</span>
          </button>

          {showShareMenu && (
            <div className="absolute left-0 sm:left-auto right-0 mt-2 w-full sm:w-48 bg-white rounded-lg shadow-xl py-2 z-10 border border-gray-100">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 space-x-3"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(link.url, '_blank', 'width=600,height=400');
                  }}
                >
                  <FontAwesomeIcon icon={link.icon} className={link.color} />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShayariCard;
