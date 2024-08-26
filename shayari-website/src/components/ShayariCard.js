import React from 'react';
import PropTypes from 'prop-types';
import './ShayariCard.css'; // Import CSS for styling
import { useNavigate } from 'react-router-dom';

const ShayariCard = ({ text, isAdmin,id,fetchShayaris }) => {
    const navigate = useNavigate();
    const handleDelete=async()=>{
        try {
            let data = await fetch('http://localhost:8083/shayari/deleteShayari/'+id,{
                method:"DELETE",
            })
            data = await data.json()
            if(data.success){    
                fetchShayaris()
            }
        } catch (error) {
            
        }
    }
    const handleEdit = async()=>{
        navigate("/shayariManagement",{state:{text,id}})
    }
    return(
    <div className="shayari-card bg-white text-gray-800 p-4 rounded-lg shadow-md">
        <p className="text-gray-800">{text}</p>
        <p className="shayari-author font-extrabold">— Mjay</p>
        {
            isAdmin && (
                <div className='flex gap-4 justify-center items-center'>
                    <button onClick={handleEdit}>Edit</button>
                    <button className='bg-red-500' onClick={handleDelete}>Delete</button>
                </div>
            )
        }
    </div>
)};

ShayariCard.propTypes = {
    text: PropTypes.string.isRequired,
};

export default ShayariCard;
