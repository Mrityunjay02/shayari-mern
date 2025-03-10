import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faInstagram,
  faFacebook, 
  faTwitter,
  faWhatsapp,
  faLinkedin,
  faSnapchat,
  faPinterest,
  faTelegram,
  faThreads
} from '@fortawesome/free-brands-svg-icons';
import { faShare, faHeart } from '@fortawesome/free-solid-svg-icons';

const ShayariCard = ({ text, author = "Unknown", title = "", isAdmin, id, onDelete }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/edit', { state: { text, id, title, author } });
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this shayari?')) {
      await onDelete(id);
    }
  };

  const getShareText = () => {
    let shareText = text;
    if (title) {
      shareText = `${title}\n\n${text}`;
    }
    if (author !== "Unknown") {
      shareText = `${shareText}\n\n- ${author}`;
    }
    return encodeURIComponent(shareText);
  };

  const socialLinks = [
    {
      icon: faWhatsapp,
      url: `https://wa.me/?text=${getShareText()}`,
      color: "bg-[#25D366]",
      label: "WhatsApp"
    },
    {
      icon: faInstagram,
      url: `https://www.instagram.com/share?text=${getShareText()}`,
      color: "bg-gradient-to-r from-[#405DE6] via-[#C13584] to-[#FD1D1D]",
      label: "Instagram"
    },
    {
      icon: faFacebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${getShareText()}`,
      color: "bg-[#3b5998]",
      label: "Facebook"
    },
    {
      icon: faTwitter,
      url: `https://twitter.com/intent/tweet?text=${getShareText()}`,
      color: "bg-[#1DA1F2]",
      label: "Twitter"
    },
    {
      icon: faLinkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(title || 'Shayari')}&summary=${getShareText()}`,
      color: "bg-[#0077B5]",
      label: "LinkedIn"
    },
    {
      icon: faSnapchat,
      url: `https://www.snapchat.com/share?text=${getShareText()}`,
      color: "bg-[#FFFC00]",
      label: "Snapchat"
    },
    {
      icon: faPinterest,
      url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&description=${getShareText()}`,
      color: "bg-[#E60023]",
      label: "Pinterest"
    },
    {
      icon: faTelegram,
      url: `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${getShareText()}`,
      color: "bg-[#0088cc]",
      label: "Telegram"
    },
    {
      icon: faThreads,
      url: `https://www.threads.net/share?text=${getShareText()}`,
      color: "bg-black",
      label: "Threads"
    }
  ];

  if (!text) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 mb-8 mx-4 sm:mx-auto max-w-4xl relative overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-400 via-rose-500 to-purple-500"></div>
      <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-orange-200 to-rose-200 rounded-full opacity-20 -z-1"></div>
      <div className="absolute bottom-4 left-4 w-32 h-32 bg-gradient-to-tr from-purple-200 to-rose-200 rounded-full opacity-20 -z-1"></div>

      <div className="relative z-10">
        {title && (
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-gray-900 text-2xl sm:text-3xl md:text-4xl font-semibold" style={{
              fontFamily: "'Noto Nastaliq Urdu', 'Amiri', serif",
              letterSpacing: '0.02em'
            }}>
              {title}
            </h3>
          </div>
        )}
        
        <div className="px-3 sm:px-8 md:px-12 relative">
          <div className="absolute left-0 top-0 text-6xl text-rose-200 opacity-50" style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}>"</div>
          <p className="text-gray-800 text-lg sm:text-xl md:text-2xl leading-relaxed relative z-10" style={{ 
            fontFamily: "'Noto Nastaliq Urdu', 'Amiri', serif",
            lineHeight: '2',
            letterSpacing: '0.03em'
          }}>
            {text}
          </p>
          <div className="absolute right-0 bottom-0 text-6xl text-rose-200 opacity-50 transform rotate-180" style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}>"</div>
        </div>

        <div className="text-center mt-6 sm:mt-8">
          <p className="shayari-author text-lg sm:text-xl italic text-gray-700" style={{
            fontFamily: "'Noto Nastaliq Urdu', 'Amiri', serif'",
            letterSpacing: '0.02em'
          }}>
            - {author}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-between mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-rose-100">
        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto justify-center sm:justify-start">
          {isAdmin && (
            <>
              <button
                onClick={handleEdit}
                className="px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center gap-3 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-base sm:text-lg font-medium shadow-md hover:shadow-lg w-full sm:w-auto"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Edit</span>
              </button>

              <button
                onClick={handleDelete}
                className="px-6 sm:px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl flex items-center justify-center gap-3 hover:from-red-600 hover:to-red-700 transition-all duration-300 text-base sm:text-lg font-medium shadow-md hover:shadow-lg w-full sm:w-auto"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Delete</span>
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto mt-4 sm:mt-0">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 text-base sm:text-lg font-medium shadow-md hover:shadow-lg ${
              isLiked 
                ? 'bg-rose-100 text-rose-500' 
                : 'bg-white text-gray-600 hover:bg-rose-50 hover:text-rose-500'
            }`}
          >
            <FontAwesomeIcon icon={faHeart} className={`text-xl ${isLiked ? 'text-rose-500' : ''}`} />
          </button>

          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-500 to-rose-500 text-white rounded-xl flex-1 sm:flex-none flex items-center justify-center gap-3 hover:from-purple-600 hover:to-rose-600 transition-all duration-300 text-base sm:text-lg font-medium shadow-md hover:shadow-lg"
          >
            <FontAwesomeIcon icon={faShare} className="text-xl" />
            <span className="font-medium">Share</span>
          </button>

          {showShareMenu && (
            <div className="absolute right-0 sm:right-0 bottom-full mb-4 w-full sm:w-72 bg-white rounded-2xl shadow-2xl py-4 z-50 border border-rose-100 transform transition-all duration-300 ease-in-out animate-slideIn">
              <div className="bg-gradient-to-r from-purple-500 to-rose-500 h-1 absolute top-0 left-0 right-0 rounded-t-2xl"></div>
              <div className="grid grid-cols-3 gap-3 p-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-2 hover:bg-gray-50 rounded-xl transition-all duration-300"
                  >
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl ${link.color} transform hover:scale-110 transition-transform duration-300`}>
                      <FontAwesomeIcon icon={link.icon} className={`text-white text-xl sm:text-2xl ${link.icon === faSnapchat ? 'text-black' : ''}`} />
                    </div>
                    <span className="mt-2 text-sm text-gray-700 font-medium">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShayariCard;
