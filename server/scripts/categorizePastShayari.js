import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Shayari, { SHAYARI_CATEGORIES } from '../models/Shayari.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

// Setup environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Use production MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://your-production-uri';

// Keyword patterns for each category
const categoryPatterns = {
    [SHAYARI_CATEGORIES.ISHQ]: [
        /ishq|pyaar|love|इश्क़|عشق|محبت|dil|heart|prem|mohabbat/i,
        /dildar|lover|premi|محبوب|معشوق/i
    ],
    [SHAYARI_CATEGORIES.DARD]: [
        /dard|pain|dukh|gham|takleef|aansu|tear|rona/i,
        /gham|sorrow|dukh|andoh/i
    ],
    [SHAYARI_CATEGORIES.DOSTI]: [
        /dost|friend|yaar|friendship|mitra|rafiq|saathi/i,
        /dosti|yaari|bandhu|bhai/i
    ],
    [SHAYARI_CATEGORIES.ZINDAGI]: [
        /zindagi|life|jeevan|duniya|world/i,
        /jeena|zinda|insaan|human/i
    ],
    [SHAYARI_CATEGORIES.MOTIVATIONAL]: [
        /himmat|hosla|motivation|courage|sahas/i,
        /prerna|inspiration|umeed|hope|vishwas|faith/i
    ],
    [SHAYARI_CATEGORIES.ROMANTIC]: [
        /romantic|romance|pranay|love story|prem kahani/i,
        /ishq|pyaar|dil|heart/i
    ],
    [SHAYARI_CATEGORIES.BEWAFA]: [
        /bewafa|dhoka|betrayal|vishwasghat/i,
        /dard|pain|tootna|break|bichhadna/i
    ],
    [SHAYARI_CATEGORIES.TANHAI]: [
        /tanhai|alone|akela|lonely|ekant/i,
        /akelapan|solitude|ekaki|single/i
    ],
    [SHAYARI_CATEGORIES.INTEZAAR]: [
        /intezaar|wait|prateeksha|waiting|aas/i,
        /raah|path|marg|way|doori|distance/i
    ],
    [SHAYARI_CATEGORIES.MOHABBAT]: [
        /mohabbat|love|prem|pyaar|dil/i,
        /ishq|dildar|premi/i
    ],
    [SHAYARI_CATEGORIES.YAADEIN]: [
        /yaad|memory|smriti|memories|yaadein/i,
        /beeta hua|past|ateet|purana/i
    ],
    [SHAYARI_CATEGORIES.GHAZAL]: [
        /ghazal|shayari|poetry|kavya|nazm/i,
        /kavita|sher|verse|chhand|meter/i
    ],
    [SHAYARI_CATEGORIES.NATURE]: [
        /fitrat|nature|prakriti|chand|moon|suraj/i,
        /phool|flower|ped|tree|nadi|river/i
    ],
    [SHAYARI_CATEGORIES.SPIRITUAL]: [
        /khuda|god|rab|bhagwan|allah|ishwar/i,
        /aatma|soul|dharm|religion|moksh|salvation/i
    ]
};

// Function to determine category based on content
const determineCategory = (content, title = '') => {
    const text = (title + ' ' + content).toLowerCase();
    
    for (const [category, patterns] of Object.entries(categoryPatterns)) {
        if (patterns.some(pattern => pattern.test(text))) {
            return category;
        }
    }
    
    return SHAYARI_CATEGORIES.OTHER;
};

// Function to generate tags
const generateTags = (content, title = '') => {
    const text = (title + ' ' + content).toLowerCase();
    const tags = new Set();

    // Common emotions and themes in Hinglish
    const emotions = [
        'ishq', 'dard', 'dosti', 'zindagi', 'himmat',
        'pyaar', 'bewafa', 'tanhai', 'intezaar', 'yaadein',
        'fitrat', 'roohani', 'khushi', 'gham', 'umeed',
        'sukh', 'dukh', 'prem', 'virodh', 'sangharsh',
        'jeevan', 'mritu', 'satya', 'asatya', 'nishtha'
    ];

    emotions.forEach(emotion => {
        if (text.includes(emotion)) {
            tags.add(emotion);
        }
    });

    // Add common Hinglish words as tags
    const words = text.split(/\s+/);
    words.forEach(word => {
        if (word.length > 3) {  // Only add words longer than 3 characters
            tags.add(word);
        }
    });

    return Array.from(tags).slice(0, 5); // Limit to 5 tags
};

// Main function to categorize all Shayari
const categorizeAllShayari = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Get all Shayari
        const shayaris = await Shayari.find({});
        console.log(`Found ${shayaris.length} Shayari to categorize`);

        // Categorization stats
        const stats = {
            total: shayaris.length,
            categorized: 0,
            categories: {}
        };

        // Process each Shayari
        for (const shayari of shayaris) {
            const category = determineCategory(shayari.content, shayari.title);
            const tags = generateTags(shayari.content, shayari.title);

            // Update the Shayari
            await Shayari.findByIdAndUpdate(shayari._id, {
                category,
                tags,
                likes: shayari.likes || 0
            });

            // Update stats
            stats.categorized++;
            stats.categories[category] = (stats.categories[category] || 0) + 1;

            // Log progress
            if (stats.categorized % 10 === 0) {
                console.log(`Processed ${stats.categorized}/${stats.total} Shayari`);
            }
        }

        // Save stats to a file
        const statsFile = join(__dirname, 'categorization_stats.json');
        await fs.writeFile(statsFile, JSON.stringify(stats, null, 2));

        console.log('\nCategorization completed!');
        console.log('Statistics:', stats);
        console.log(`Detailed stats saved to ${statsFile}`);

    } catch (error) {
        console.error('Error during categorization:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

// Run the script
categorizeAllShayari();
