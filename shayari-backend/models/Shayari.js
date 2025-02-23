import mongoose from 'mongoose';

// Define the schema
const ShayariSchema = new mongoose.Schema({
    title: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: 'Mrityunjay Bhardwaj'  // Set default author name
    }
}, {
    timestamps: true
});

// Create the model
const Shayari = mongoose.model('Shayari', ShayariSchema);

export default Shayari;
