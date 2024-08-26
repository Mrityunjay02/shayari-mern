import mongoose from 'mongoose';

// Define the schema   title, content, category
const ShayariSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
});

// Create the model
const Shayari = mongoose.model('Shayari', ShayariSchema);

export default Shayari;
