import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/shayari.js';

dotenv.config({path:".env"});

const app = express();

app.use(cors());
app.use(express.json()); // Make sure this is included

// MongoDB connection
const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error('MONGODB_URI is not defined in .env file');
    process.exit(1);
}
mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

app.use('/shayari', router);

const port = process.env.PORT || 8083;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
