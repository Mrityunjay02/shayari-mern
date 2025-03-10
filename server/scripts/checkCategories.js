import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Shayari from '../models/Shayari.js';

// Setup environment variables
dotenv.config();

const checkCategories = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Get all unique categories and their counts
        const categories = await Shayari.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);

        console.log('\nCurrent Categories in Database:');
        console.table(categories.map(c => ({ Category: c._id, Count: c.count })));

        // Get a sample shayari from each category
        for (const cat of categories) {
            const sample = await Shayari.findOne({ category: cat._id })
                .select('title content category tags')
                .lean();
            
            console.log(`\nSample from ${cat._id}:`);
            console.log('Title:', sample.title);
            console.log('Content:', sample.content.substring(0, 100) + '...');
            console.log('Tags:', sample.tags.join(', '));
            console.log('-'.repeat(80));
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\nDisconnected from MongoDB');
    }
};

// Run the script
checkCategories();
