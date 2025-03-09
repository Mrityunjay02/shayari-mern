import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const shayariSchema = new mongoose.Schema({
    title: String,
    text: String,
    author: String
});

const Shayari = mongoose.model('Shayari', shayariSchema);

const shayaris = [
  {
    "title": "Jo Tera Daaman Chhut Jayega",
    "text": "Jo tera daaman chhut jayega,\nToh main bhi kahaan sambhal paunga,\nSaanson mein teri khushboo hai,\nKaise main khud ko samjhaunga?\nTeri yaadon ka silsila jo toota,\nToh har lamha adhoora lagega,\nMere khwabon ka aashiyana bhi,\nBina tere adhura sa lagega.\nDil ka har ek kona pukaarega tujhe,\nAankhon se sirf ashq hi bahaunga,\nJo tera daaman chhut jayega,\nToh main bhi kahaan sambhal paunga...",
    "author": "Mrityunjay Bhardwaj"
  },
  // Add all other shayaris here...
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    try {
      await Shayari.insertMany(shayaris);
      console.log('All shayaris uploaded successfully');
    } catch (error) {
      console.error('Error uploading shayaris:', error);
    }
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
