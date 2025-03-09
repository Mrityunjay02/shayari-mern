import React, { useState, useCallback, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import AddShayariForm from './components/AddShayariForm';
import ShayariCard from './components/ShayariCard';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import './styles.css';
import debounce from 'lodash.debounce';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const [shayaris, setShayaris] = useState([]);
  const [notification, setNotification] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const fetchShayaris = useCallback(
    debounce(async () => {
      try {
        setLoading(true);
        setError(null);
        const apiUrl = `${process.env.REACT_APP_API_URL}/shayari?page=${currentPage}&limit=10`;
        console.log('Fetching from:', apiUrl);
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Received data:', data);
        
        if (data && data.shayaris) {
          setShayaris(data.shayaris);
          setTotalPages(data.pagination.totalPages);
          setError(null);
        } else {
          console.error('Invalid data format:', data);
          setShayaris([]);
          setError('No shayaris found or invalid data format.');
        }
      } catch (error) {
        console.error('Error fetching shayaris:', error);
        setError(`Error fetching shayaris: ${error.message}`);
        setShayaris([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    [currentPage]
  );

  useEffect(() => {
    fetchShayaris();
    const token = localStorage.getItem('token');
    if (token) {
      setIsAdmin(true);
    }
  }, [location.pathname, currentPage]);

  useEffect(() => {
    if (location.pathname === '/') {
      setCurrentPage(1);
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
      setShayaris([]);
      setCurrentPage(1);
      setTotalPages(0);
      navigate('/');
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/shayari/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete shayari');
      }

      showNotification('Shayari deleted successfully!');
      fetchShayaris();
    } catch (error) {
      console.error('Error deleting shayari:', error);
      showNotification('Error deleting shayari. Please try again.');
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
              <Link to="/" 
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >Home</Link>
              <Link to="/about" 
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >About</Link>
              <Link to="/shayari" 
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >My Shayari</Link>
              {isAdmin && (
                <>
                  <Link to="/shayari-management" 
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >Shayari Management</Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                  >Logout</button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content with proper spacing */}
      <main className="flex-1 mt-16 container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shayari" element={
            <div>
              <div className="text-center my-8">
                <h2 className="text-5xl inline-block pb-2" 
                    style={{ 
                      fontFamily: "'Angsana New', serif",
                      letterSpacing: '0.02em',
                      lineHeight: '1.4'
                    }}>
                  <span className="text-red-600 hover:text-red-700 transition-colors duration-300">M</span>
                  <span className="text-pink-500 hover:text-pink-600 transition-colors duration-300">y</span>
                  <span className="mx-3"></span>
                  <span className="text-purple-600 hover:text-purple-700 transition-colors duration-300">S</span>
                  <span className="text-blue-500 hover:text-blue-600 transition-colors duration-300">h</span>
                  <span className="text-indigo-500 hover:text-indigo-600 transition-colors duration-300">a</span>
                  <span className="text-cyan-500 hover:text-cyan-600 transition-colors duration-300">y</span>
                  <span className="text-teal-500 hover:text-teal-600 transition-colors duration-300">a</span>
                  <span className="text-green-500 hover:text-green-600 transition-colors duration-300">r</span>
                  <span className="text-emerald-500 hover:text-emerald-600 transition-colors duration-300">i</span>
                </h2>
                <div className="h-1 w-48 mx-auto mt-2 bg-gradient-to-r from-red-600 via-purple-600 to-emerald-500 rounded-full"></div>
              </div>
              {notification && <div className="notification">{notification}</div>}
              {error && <div className="error">{error}</div>}
              {loading ? (
                <div className="loading-spinner">Loading...</div>
              ) : Array.isArray(shayaris) && shayaris.length > 0 ? (
                <>
                  {shayaris.map((shayari, index) => (
                    <ShayariCard 
                      key={index} 
                      text={shayari.content} 
                      title={shayari.title}
                      author={shayari.author}
                      id={shayari._id} 
                      isAdmin={Boolean(localStorage.getItem('token'))} 
                      onDelete={handleDelete}
                      fetchShayaris={fetchShayaris}
                    />
                  ))}
                  {/* Pagination Buttons */}
                  <div className="pagination">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                  </div>
                </>
              ) : (
                <p>No shayaris available.</p>
              )}
            </div>
          } />
      
          <Route path="/login" element={<LoginPage />} />
          <Route path="/shayari-management" element={
            <ProtectedRoute isAdmin={isAdmin}>
              <AddShayariForm />
            </ProtectedRoute>
          } />
        </Routes>
      </main>

      {notification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          {notification}
        </div>
      )}
    </div>
  );
};

export default App;
