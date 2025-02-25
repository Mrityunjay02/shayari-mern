import express from 'express';
import cors from 'cors';
import { MongoClient, ServerApiVersion } from 'mongodb';
import router from './routes/shayari.js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

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
app.use(cors());
app.use(express.json()); // JSON Middleware

// MongoDB connection
const mongoURI = process.env.MONGODB_URI; // Changed from MONGO_URI to MONGODB_URI
if (!mongoURI) {
  console.error('❌ MongoDB URI is missing! Set MONGODB_URI in .env file.');
  process.exit(1);
}

console.log('🚀 Attempting to connect to MongoDB...');
console.log('Connection string:', mongoURI);

// Global MongoDB Client
let mongoClient;

const connectDB = async () => {
  if (mongoClient) return mongoClient.db('shayariDB');

  try {
    console.log('Creating MongoDB client with options...');
    mongoClient = new MongoClient(mongoURI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    console.log('Attempting to connect...');
    await mongoClient.connect();
    console.log('✅ Connected to MongoDB successfully!');

    // Test the connection with a simple command
    const adminDb = mongoClient.db('admin');
    await adminDb.command({ ping: 1 });
    console.log('MongoDB server responded to ping!');

    return mongoClient.db('shayariDB');
  } catch (error) {
    console.error('❌ MongoDB Connection Error Details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack,
      // Additional error properties that might help diagnose the issue
      errorLabels: error.errorLabels,
      topologyVersion: error.topologyVersion,
      connectionGeneration: error.connectionGeneration
    });

    // Additional error analysis
    if (error.name === 'MongoServerSelectionError') {
      console.error('Server Selection Error - This usually means:');
      console.error('1. The MongoDB server is not reachable');
      console.error('2. Network connectivity issues');
      console.error('3. SSL/TLS certificate problems');
      console.error('4. IP address not whitelisted in MongoDB Atlas');
    }

    process.exit(1);
  }
};

// Initialize MongoDB Connection
await connectDB().then(() => {
  console.log('✅ Database connection established.');
}).catch(err => {
  console.error('❌ Failed to connect to the database:', err);
});

// API Routes
app.use('/shayari', router);

const DEFAULT_PORT = process.env.PORT || 8083;
let port = parseInt(DEFAULT_PORT, 10);

const startServer = (port) => {
  try {
    const server = app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });

    // Graceful Shutdown
    process.on('SIGINT', async () => {
      console.log('🛑 Shutting down server...');
      await mongoClient?.close();
      server.close(() => {
        console.log('✅ Server closed.');
        process.exit(0);
      });
    });

    process.on('SIGTERM', async () => {
      console.log('🛑 Received SIGTERM. Closing server...');
      await mongoClient?.close();
      server.close(() => {
        console.log('✅ Server closed.');
        process.exit(0);
      });
    });

  } catch (error) {
    if (error.code === 'EADDRINUSE') {
      console.log(`❌ Port ${port} is already in use. Trying next port...`);
      startServer(port + 1);
    } else {
      console.error('❌ Error starting server:', error);
      process.exit(1);
    }
  }
};

startServer(port);
