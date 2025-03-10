import React, { useState, useEffect } from 'react';
import ShayariCard from './ShayariCard';
import { toast } from 'react-hot-toast';

const ShayariList = ({ isAdmin }) => {
  const [shayaris, setShayaris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch shayaris from the API
  const fetchShayaris = async () => {
    try {
      let url = `${process.env.REACT_APP_API_URL}/shayari`;
      const queryParams = [];
      
      if (selectedCategory) {
        queryParams.push(`category=${selectedCategory}`);
      }
      if (searchTerm) {
        queryParams.push(`search=${encodeURIComponent(searchTerm)}`);
      }
      
      if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch shayaris');
      }
      
      const data = await response.json();
      setShayaris(data);
    } catch (error) {
      console.error('Error fetching shayaris:', error);
      toast.error('Failed to load shayaris');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShayaris();
  }, [selectedCategory, searchTerm]);

  const handleDelete = async (shayariId) => {
    try {
      setShayaris(prevShayaris => prevShayaris.filter(s => s._id !== shayariId));
      toast.success('Shayari deleted successfully');
    } catch (error) {
      console.error('Error deleting shayari:', error);
      toast.error('Failed to delete shayari');
      // Refresh the list to ensure consistency
      fetchShayaris();
    }
  };

  const handleEdit = (shayari) => {
    // Navigate to edit page or show edit modal
    // This will be implemented based on your routing setup
    console.log('Edit shayari:', shayari);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Section */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search shayaris..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div className="w-full sm:w-64">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            <option value="Ishq">Ishq</option>
            <option value="Dard">Dard</option>
            <option value="Dosti">Dosti</option>
            <option value="Zindagi">Zindagi</option>
            <option value="Motivational">Motivational</option>
            <option value="Romantic">Romantic</option>
            <option value="Bewafa">Bewafa</option>
            <option value="Tanhai">Tanhai</option>
            <option value="Intezaar">Intezaar</option>
            <option value="Mohabbat">Mohabbat</option>
            <option value="Yaadein">Yaadein</option>
            <option value="Ghazal">Ghazal</option>
            <option value="Fitrat">Fitrat</option>
            <option value="Roohani">Roohani</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Shayari Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shayaris.map((shayari) => (
          <ShayariCard
            key={shayari._id}
            shayari={shayari}
            isAdmin={isAdmin}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {/* Empty State */}
      {shayaris.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl text-gray-600">No shayaris found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default ShayariList;
