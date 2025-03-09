import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const AddShayariForm = ({ shayariToEdit, onShayariUpdated }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  // Initialize editing mode and set content if editing
  useEffect(() => {
    if (state?.id || shayariToEdit) {
      setIsEditing(true);
      setFormData({
        title: state?.title || shayariToEdit.title,
        content: state?.text || shayariToEdit.content,
        author: state?.author || shayariToEdit.author,
      });
    }
  }, [state, shayariToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response;
      if (isEditing) {
        // Edit existing shayari
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}/shayari/editShayari/${state.id}`,
          formData
        );
      } else {
        // Add new shayari
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}/shayari/addShayari`,
          formData
        );
      }

      if (response.status === (isEditing ? 200 : 201)) {
        setMessage(
          isEditing
            ? "Shayari updated successfully!"
            : "Shayari added successfully!"
        );
        if (!isEditing) setFormData({ title: "", content: "", author: "" });
        else navigate("/shayari");
      } else {
        setMessage(
          `Failed to ${isEditing ? "update" : "add"} Shayari. Please try again.`
        );
      }
    } catch (error) {
      setMessage("An error occurred while processing the request.");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async () => {
    if (shayariToEdit && window.confirm("Are you sure you want to delete this shayari?")) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/shayari/delete/${shayariToEdit._id}`
        );
        if (response.status === 200) {
          setMessage("Shayari deleted successfully!");
          onShayariUpdated(); // Refresh the list in parent
        } else {
          setMessage("Failed to delete Shayari.");
        }
      } catch (error) {
        setMessage("An error occurred while deleting Shayari.");
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-2xl w-full">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Top Decorative Bar */}
          <div className="h-2 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"></div>

          {/* Form Content */}
          <div className="px-8 py-10">
            <h2
              className="text-3xl font-semibold text-center mb-8"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              {isEditing ? "Edit Shayari" : "Create New Shayari"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Field */}
              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors duration-200 outline-none"
                  placeholder="Enter shayari title"
                  style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: "1.1rem",
                  }}
                  required
                />
              </div>

              {/* Content Field */}
              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="content"
                >
                  Shayari Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors duration-200 outline-none resize-none"
                  placeholder="Write your shayari here..."
                  style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: "1.1rem",
                  }}
                  required
                />
              </div>

              {/* Author Field */}
              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="author"
                >
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors duration-200 outline-none"
                  placeholder="Enter author name"
                  style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: "1.1rem",
                  }}
                  required
                />
              </div>

              {/* Message Display */}
              {message && (
                <div
                  className={`text-center py-2 rounded-lg ${
                    message.includes("success")
                      ? "text-green-600 bg-green-50"
                      : "text-red-600 bg-red-50"
                  }`}
                >
                  {message}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-lg hover:opacity-90 transform hover:-translate-y-0.5 transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? "Adding Shayari..." : isEditing ? "Update Shayari" : "Add Shayari"}
              </button>
              {shayariToEdit && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="w-full py-3 px-4 bg-red-600 text-white rounded-lg hover:opacity-90 transform hover:-translate-y-0.5 transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Delete Shayari
                </button>
              )}
            </form>
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

export default AddShayariForm;
