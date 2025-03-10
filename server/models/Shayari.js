import mongoose from 'mongoose';

// Define the categories for Shayari
export const SHAYARI_CATEGORIES = {
    ISHQ: 'Ishq', // Love
    DARD: 'Dard', // Pain/Sorrow
    DOSTI: 'Dosti', // Friendship
    ZINDAGI: 'Zindagi', // Life
    MOTIVATIONAL: 'Motivational', // Motivation
    ROMANTIC: 'Romantic', // Romantic
    BEWAFA: 'Bewafa', // Betrayal
    TANHAI: 'Tanhai', // Loneliness
    INTEZAAR: 'Intezaar', // Waiting
    MOHABBAT: 'Mohabbat', // Deep Love
    YAADEIN: 'Yaadein', // Memories
    GHAZAL: 'Ghazal', // Ghazal
    NATURE: 'Fitrat', // Nature
    SPIRITUAL: 'Roohani', // Spiritual
    OTHER: 'Other' // Other
};

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
    },
    category: {
        type: String,
        enum: Object.values(SHAYARI_CATEGORIES),
        required: true,
        default: SHAYARI_CATEGORIES.OTHER
    },
    tags: [{
        type: String,
        trim: true
    }],
    likes: {
        type: Number,
        default: 0
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    views: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false // This removes __v field
});

// Update timestamps on save
ShayariSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Virtual for favorite count
ShayariSchema.virtual('favoriteCount').get(function() {
    return this.favorites.length;
});

// Add indexes for better query performance
ShayariSchema.index({ createdAt: -1 });
ShayariSchema.index({ title: 'text', content: 'text' });
ShayariSchema.index({ category: 1 }); // Add index for category-based queries
ShayariSchema.index({ tags: 1 }); // Add index for tag-based queries

// Create the model
const Shayari = mongoose.model('Shayari', ShayariSchema);

export default Shayari;
