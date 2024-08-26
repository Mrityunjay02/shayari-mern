import express from 'express';
import { getShayaris, addShayaris, deleteShayaris, editShayaris } from '../controllers/shayariController.js';
import { getFeedback, addFeedback, deleteFeedback, editFeedback } from '../controllers/feedbackController.js';

const router = express.Router();

// Shayari routes
router.get('/shayari', getShayaris);
router.post('/shayari', addShayaris);
router.delete('/shayari/:id', deleteShayaris);
router.put('/shayari/:id', editShayaris);

// Feedback routes
router.get('/feedback', getFeedback);
router.post('/feedback', addFeedback);
router.delete('/feedback/:id', deleteFeedback);
router.put('/feedback/:id', editFeedback);

export default router;
