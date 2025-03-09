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
  const navigate = useNavigate();
  const location = useLocation();

  // Debug log for API URL
  useEffect(() => {
    console.log('Current API URL:', process.env.REACT_APP_API_URL);
  }, []);

  const fetchShayaris = useCallback(
    debounce(async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('API URL:', process.env.REACT_APP_API_URL); // Debug log
        const response = await fetch(`${process.env.REACT_APP_API_URL}/shayari?page=${currentPage}&limit=10`);
        if (!response.ok) {
          const errorData = await response.text();
          console.error('Server response:', errorData);
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (Array.isArray(data.shayaris)) {
          setShayaris(data.shayaris);
          setTotalPages(data.pagination.totalPages);  
          showNotification('Shayaris fetched successfully!');
        } else {
          console.error('Invalid data format:', data);
          setShayaris([]);
          setError('No shayaris found or invalid data format.');
        }
      } catch (error) {
        console.error('Error fetching shayaris:', error);
        setError(`Error fetching shayaris: ${error.message}`);
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
    <div className="container min-h-screen flex flex-col">
      <nav className="flex items-center justify-between mb-8 p-4">
        <Link to="/" className="no-underline hover:opacity-80 transition-opacity duration-300">
          <div className="logo text-3xl" style={{ 
            fontFamily: "'Cedarville Cursive', cursive",
            letterSpacing: '0.05em'
          }}>
            <span className="text-red-700">M</span>jay
            <span className="text-red-700">P</span>oetry
          </div>
        </Link>
        <ul className="flex space-x-6">
          <li><Link to="/" className="hover:text-red-600 transition-colors duration-300">Home</Link></li>
          <li><Link to="/about" className="hover:text-red-600 transition-colors duration-300">About</Link></li>
          <li><Link to="/shayari" className="hover:text-red-600 transition-colors duration-300">My Shayari</Link></li>
          {isAdmin && (
            <>
              <li><Link to="/shayari-management" className="hover:text-red-600 transition-colors duration-300">Shayari Management</Link></li>
              <li><button onClick={handleLogout} className="hover:text-red-600 transition-colors duration-300">Logout</button></li>
            </>
          )}
        </ul>
      </nav>

      <div className="flex-grow">
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
      </div>

      <footer className="mt-auto py-4 text-center border-t border-gray-200">
        <p className="text-gray-600" style={{ fontFamily: "'Angsana New', serif", fontSize: '1.1rem' }}>
          &copy; August 2024 MjayPoetry. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default App;
