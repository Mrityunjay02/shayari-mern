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

const App = () => {
  const [shayaris, setShayaris] = useState([]);
  const [notification, setNotification] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation()

  const fetchShayaris = useCallback(
    debounce(async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8083/shayari/getShayari?page=${currentPage}&category=${category}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data.shayaris)) {
          setShayaris(data.shayaris);
          setTotalPages(data.totalPages);
          showNotification('Shayaris fetched successfully!');
        } else {
          console.error('Response data is not an array:', data);
          setShayaris([]);
        }
      } catch (error) {
        console.log(error);
        
        console.error('Error fetching shayaris:', error);
        showNotification('Error fetching shayaris');
      } finally {
        setLoading(false);
      }
    }, 500),
    [currentPage, category]
  );

  useEffect(() => {
    fetchShayaris();
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
      setShayaris([]);
      setCategory('All');
      setCurrentPage(1);
      setTotalPages(1);
      navigate('/');
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container">
      <nav className='flex items-center justify-between'>
        <div className="logo">Mjay Poetry</div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/shayari">My Shayari</Link></li>
          {isAdmin && (
            <>
              <li><Link to="/shayariManagement">Shayari Management</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shayari" element={
          <div>
            <h2>My Shayari</h2>
            {notification && <div className="notification">{notification}</div>}
            {loading ? (
              <p>Loading shayaris...</p>
            ) : Array.isArray(shayaris) && shayaris.length > 0 ? (
              <>
                {shayaris.map((shayari, index) => (
                  <ShayariCard key={index} text={shayari.content} id={shayari._id} isAdmin={Boolean(localStorage.getItem('token'))} fetchShayaris={fetchShayaris}/>
                ))}
                <div>
                  <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                  <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                </div>
              </>
            ) : (
              <p>No shayaris available.</p>
            )}
          </div>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/shayariManagement" element={
          <ProtectedRoute isAdmin={isAdmin}>
            <AddShayariForm />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
};

export default App;
