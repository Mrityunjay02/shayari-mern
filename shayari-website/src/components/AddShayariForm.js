import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const AddShayariForm = ({ shayariToEdit, onShayariUpdated }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditing, setIsEditing]=useState(false)
  const {state} = useLocation()
  const navigate = useNavigate()
  
  useEffect(()=>{
    if(state?.id){
      setIsEditing(true)
      setContent(state.text)
    }
  },[]
)

  useEffect(() => {
    if (shayariToEdit) {
      setContent(shayariToEdit.content);
    }
  }, [shayariToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        // Edit existing shayari
        const response = await axios.put(
          `http://localhost:8083/shayari/editShayari/${state.id}`,
          { content }
        );
        if (response.status === 200) {
          setSuccess("Shayari updated successfully!");
          navigate("/shayari")
        } else {
          setError("Failed to update Shayari.");
        }
      } else {
        // Add new shayari
        const response = await axios.post(
          "http://localhost:8083/shayari/addShayari",
          { content }
        );
        
        if (response.status === 201) {
          setSuccess("Shayari added successfully!");
          setContent("");
        } else {
          setError("Failed to add Shayari.");
        }
      }
    } catch (error) {
      setError("An error occurred while processing the request.");
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    if (shayariToEdit && window.confirm("Are you sure you want to delete this shayari?")) {
      try {
        const response = await axios.delete(
          `http://localhost:8083/shayari/delete/${shayariToEdit._id}`
        );
        if (response.status === 200) {
          setSuccess("Shayari deleted successfully!");
          onShayariUpdated(); // Notify parent to refresh the list
        } else {
          setError("Failed to delete Shayari.");
        }
      } catch (error) {
        setError("An error occurred while deleting Shayari.");
        console.error("Error:", error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        ></textarea>
        <button type="submit">{isEditing ? "Update Shayari" : "Add Shayari"}</button>
        {shayariToEdit && (
          <button type="button" onClick={handleDelete} style={{ backgroundColor: "red", color: "white" }}>
            Delete Shayari
          </button>
        )}
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default AddShayariForm;
