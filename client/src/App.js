import React, { useState, useCallback, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import AddShayariForm from './components/AddShayariForm';
import ShayariList from './components/ShayariList';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import './styles.css';
import debounce from 'lodash.debounce';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const [notification, setNotification] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Debug log for API URL
  useEffect(() => {
    console.log('Current API URL:', process.env.REACT_APP_API_URL);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAdmin(true);
    }
  }, [location.pathname]);

  const showNotification = (message) => {
    if (!notification) {
      setNotification(message);
      setTimeout(() => {
        setNotification('');
      }, 3000);
    }
  };

  const handleLogout = () => {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
      setIsAdmin(false);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="bg-gray-900 shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-2">
          <div className="relative flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <div className="logo text-xl sm:text-2xl" style={{ 
                  fontFamily: "'Cedarville Cursive', cursive",
                  letterSpacing: '0.05em'
                }}>
                  <span className="text-red-500">M</span>
                  <span className="text-white">jay</span>
                  <span className="text-red-500">P</span>
                  <span className="text-white">oetry</span>
                </div>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="absolute right-0 flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex md:items-center md:ml-6 md:space-x-4">
              <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/about" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</Link>
              <Link to="/shayari" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">My Shayari</Link>
              {isAdmin && (
                <>
                  <Link to="/shayari-management" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Shayari Management</Link>
                  <button onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
              <Link to="/about" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</Link>
              <Link to="/shayari" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">My Shayari</Link>
              {isAdmin && (
                <>
                  <Link to="/shayari-management" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Shayari Management</Link>
                  <button onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">Logout</button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-grow pt-16">
        {notification && (
          <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
            {notification}
          </div>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginPage setIsAdmin={setIsAdmin} />} />
          <Route path="/shayari" element={<ShayariList isAdmin={isAdmin} />} />
          <Route
            path="/shayari-management"
            element={
              <ProtectedRoute isAdmin={isAdmin}>
                <AddShayariForm showNotification={showNotification} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} MjayPoetry. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
