import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faInstagram, 
  faTwitter, 
  faLinkedin, 
  faSnapchat, 
  faPinterest, 
  faThreads 
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faShare } from '@fortawesome/free-solid-svg-icons';

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

  const socialLinks = [
    {
      icon: faInstagram,
      url: "https://instagram.com/mrityunjay2864",
      color: "bg-[#E4405F]",
      label: "Instagram"
    },
    {
      icon: faTwitter,
      url: "https://twitter.com/mrityunjay2864",
      color: "bg-[#1DA1F2]",
      label: "Twitter"
    },
    {
      icon: faLinkedin,
      url: "https://www.linkedin.com/in/mrityunjay-bhardwaj-8b4a04220",
      color: "bg-[#0077B5]",
      label: "LinkedIn"
    },
    {
      icon: faSnapchat,
      url: "https://www.snapchat.com/add/mrityunjay2864",
      color: "bg-[#FFFC00]",
      label: "Snapchat"
    },
    {
      icon: faEnvelope,
      url: "mailto:mjay.bhardwaj02@gmail.com",
      color: "bg-[#D44638]",
      label: "Email"
    },
    {
      icon: faPinterest,
      url: "https://www.pinterest.com/mrityunjay2864",
      color: "bg-[#BD081C]",
      label: "Pinterest"
    },
    {
      icon: faThreads,
      url: "https://www.threads.net/@mrityunjay2864",
      color: "bg-black",
      label: "Threads"
    }
  ];

  if (!text) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 mb-8 mx-auto max-w-4xl relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"></div>

      <div className="mb-6">
        {title && (
          <div className="text-center mb-6">
            <h3 className="text-gray-800 text-2xl sm:text-3xl md:text-4xl" style={{
              fontFamily: "'Bell MT', serif",
              letterSpacing: '0.02em'
            }}>
              {title}
            </h3>
          </div>
        )}
        <div className="px-4 sm:px-8 md:px-12">
          <p className="text-gray-700 text-lg sm:text-xl md:text-2xl leading-relaxed" style={{ 
            fontFamily: "'Bell MT', serif",
            lineHeight: '1.8',
            letterSpacing: '0.03em'
          }}>
            {text}
          </p>
        </div>
        <div className="text-center mt-6">
          <p className="shayari-author text-lg italic text-gray-600">
            {author}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-between mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          {isAdmin && (
            <>
              <button
                onClick={handleEdit}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Edit</span>
              </button>

              <button
                onClick={handleDelete}
                className="px-6 py-3 bg-red-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Delete</span>
              </button>
            </>
          )}
        </div>

        <div className="relative ml-auto">
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg flex items-center justify-center gap-3 hover:opacity-90 transition-all duration-200"
          >
            <FontAwesomeIcon icon={faShare} className="text-xl" />
            <span className="font-medium">Share</span>
          </button>

          {showShareMenu && (
            <div 
              className="absolute right-0 bottom-full mb-3 w-64 bg-white rounded-xl shadow-xl py-4 z-50 border border-gray-100 transform transition-all duration-200 ease-in-out animate-slideIn"
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 absolute top-0 left-0 right-0 rounded-t-xl"></div>
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full ${link.color}`}>
                    <FontAwesomeIcon icon={link.icon} className="text-white text-lg" />
                  </div>
                  <span className="ml-3 text-gray-700 font-medium">{link.label}</span>
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
