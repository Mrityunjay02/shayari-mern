// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-24 sm:w-32 h-24 sm:h-32 -translate-x-1/2 -translate-y-1/2 opacity-50 sm:opacity-70">
        <svg viewBox="0 0 100 100" className="w-full h-full text-red-100">
          <circle cx="50" cy="50" r="40" className="fill-current opacity-50" />
          <path d="M50 10 Q 90 50 50 90 Q 10 50 50 10" className="stroke-red-200 fill-none stroke-2" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 sm:mb-8" 
            style={{ 
              fontFamily: "'Dancing Script', cursive",
              color: '#2d3748',
              lineHeight: '1.4',
              letterSpacing: '0.02em'
            }}>
          Welcome to Mjay Poetry
        </h1>

        {/* Decorative Line */}
        <div className="w-24 sm:w-32 h-1 mx-auto mb-8 sm:mb-12 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-full"></div>

        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-6 sm:mb-8 text-gray-600 px-4"
           style={{ 
             fontFamily: "'Dancing Script', cursive",
             lineHeight: '1.6',
             letterSpacing: '0.02em'
           }}>
          Discover the beauty of words and immerse yourself in the world of shayari.
        </p>

        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 sm:mb-12 text-gray-500 px-4"
           style={{ 
             fontFamily: "'Dancing Script', cursive",
             lineHeight: '1.6',
             letterSpacing: '0.02em'
           }}>
          Explore our collection, and let each piece of poetry touch your soul.
        </p>

        {/* CTA Button */}
        <Link to="/shayari" 
              className="inline-block px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-medium text-white bg-gradient-to-r from-red-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          Explore Shayaris
        </Link>
      </div>

      {/* Corner Flourishes */}
      <div className="absolute bottom-0 right-0 w-20 sm:w-24 h-20 sm:h-24 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M90 10 Q 50 50 90 90" className="stroke-gray-400 fill-none stroke-2"/>
          <path d="M70 10 Q 40 50 70 90" className="stroke-gray-400 fill-none stroke-2"/>
        </svg>
      </div>
    </div>
  );
};

export default Home;
