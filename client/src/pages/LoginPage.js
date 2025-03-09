import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    try {
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/shayari/login`, { email, password });
      console.log(response);
      
      localStorage.setItem('token', response.data.accessToken); // Store JWT in local storage
      navigate('/'); // Redirect to home page
    } catch (err) {
      console.log(err);
      
      if (err.response && err.response.status === 401) {
        setError('Invalid credentials. Please check your email and password.');
      } else {
        setError('Login failed. Please try again later.');
      }
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-md w-full mx-4">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Top Decorative Bar */}
          <div className="h-2 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"></div>
          
          {/* Login Content */}
          <div className="px-8 py-10">
            {/* Header */}
            <h2 className="text-3xl font-semibold text-center mb-8" 
                style={{ fontFamily: "'Dancing Script', cursive" }}>
              Welcome Back
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2" 
                       htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors duration-200 outline-none"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2" 
                       htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors duration-200 outline-none"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-lg hover:opacity-90 transform hover:-translate-y-0.5 transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Sign In'}
              </button>
            </form>

            {/* Decorative Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Admin access only
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Elements */}
        <div className="mt-4 flex justify-center space-x-4 opacity-30">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
