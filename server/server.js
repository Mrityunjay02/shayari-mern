import express from 'express';
import cors from 'cors';
import router from './routes/shayari.js';
import authRouter from './routes/auth.js'; // Import auth router
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from 'mongoose';

// Get __dirname equivalent in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config({ path: join(__dirname, '.env'), override: true });

// Debug: Print all environment variables
console.log('Environment Variables:', {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV
});

const app = express();
app.use(cors({
  origin: [
    'https://shayari-mern.vercel.app',
    'https://shayari-mern-bw1w-lwlled0q3-mjays-projects.vercel.app',
    'https://mjaypoetry.onrender.com',
    /^https:\/\/shayari-mern.*\.vercel\.app$/  // Allow all Vercel preview and production deployments
  ],
  credentials: true
}));
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error('❌ MongoDB URI is missing! Set MONGODB_URI in .env file.');
  process.exit(1);
}

console.log('🚀 Attempting to connect to MongoDB...');

// Connect using Mongoose
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 30000,
})
.then(() => {
  console.log('✅ Connected to MongoDB successfully!');
})
.catch((err) => {
  console.error('❌ MongoDB Connection Error:', err);
  process.exit(1);
});

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('🎉 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('💔 Mongoose disconnected');
});

// API Routes
app.use('/api/auth', authRouter); // Mount auth routes first
app.use('/api/shayari', router);

const DEFAULT_PORT = process.env.PORT || 8083;
let port = parseInt(DEFAULT_PORT, 10);

const startServer = (port) => {
  const server = app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Server is running on port ${port}`);
    console.log(`📝 API endpoints available at /api/shayari`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️ Port ${port} is busy, trying ${port + 1}`);
      startServer(port + 1);
    } else {
      console.error('❌ Server error:', err);
      process.exit(1);
    }
  });

  // Handle server shutdown
  process.on('SIGTERM', () => {
    console.log('Received SIGTERM signal. Closing server...');
    server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  });
};

startServer(port);
