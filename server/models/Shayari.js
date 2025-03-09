import mongoose from 'mongoose';

// Define the schema
const ShayariSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: ''
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: '_ Mrityunjay Bhardwaj'
    }
}, {
    timestamps: true,
    versionKey: false // This removes __v field
});

// Add indexes for better query performance
ShayariSchema.index({ createdAt: -1 });
ShayariSchema.index({ title: 'text', content: 'text' });

// Create the model
const Shayari = mongoose.model('Shayari', ShayariSchema);

export default Shayari;
