// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 py-16 sm:py-20">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 sm:top-0 left-0 w-20 sm:w-32 h-20 sm:h-32 -translate-x-1/2 -translate-y-1/2 opacity-30 sm:opacity-70">
        <svg viewBox="0 0 100 100" className="w-full h-full text-red-100">
          <circle cx="50" cy="50" r="40" className="fill-current opacity-50" />
          <path d="M50 10 Q 90 50 50 90 Q 10 50 50 10" className="stroke-red-200 fill-none stroke-2" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center w-full max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6" 
            style={{ 
              fontFamily: "'Dancing Script', cursive",
              color: '#2d3748',
              lineHeight: '1.3',
              letterSpacing: '0.02em'
            }}>
          Welcome to Mjay Poetry
        </h1>

        {/* Decorative Line */}
        <div className="w-20 sm:w-32 h-0.5 sm:h-1 mx-auto mb-6 sm:mb-8 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-full"></div>

        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-6 text-gray-600 px-3 sm:px-4"
           style={{ 
             fontFamily: "'Dancing Script', cursive",
             lineHeight: '1.5',
             letterSpacing: '0.02em'
           }}>
          Discover the beauty of words and immerse yourself in the world of shayari.
        </p>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-500 px-3 sm:px-4"
           style={{ 
             fontFamily: "'Dancing Script', cursive",
             lineHeight: '1.5',
             letterSpacing: '0.02em'
           }}>
          Explore our collection, and let each piece of poetry touch your soul.
        </p>

        {/* CTA Button */}
        <Link to="/shayari" 
              className="inline-block px-5 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium text-white bg-gradient-to-r from-red-600 to-purple-600 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
          Explore Shayaris
        </Link>
      </div>

      {/* Corner Flourishes */}
      <div className="absolute bottom-0 right-0 w-16 sm:w-24 h-16 sm:h-24 opacity-10 sm:opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M90 10 Q 50 50 90 90" className="stroke-gray-400 fill-none stroke-[1.5]"/>
          <path d="M70 10 Q 40 50 70 90" className="stroke-gray-400 fill-none stroke-[1.5]"/>
        </svg>
      </div>
    </div>
  );
};

export default Home;
