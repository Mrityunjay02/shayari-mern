import Feedback from '../models/Feedback.js';

// Get all feedback
const getFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find();
        res.status(200).json(feedback);
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ error: 'Error fetching feedback' });
    }
};

// Add new feedback
const addFeedback = async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    try {
        const newFeedback = new Feedback({ name, email, message });
        await newFeedback.save();
        res.status(201).json(newFeedback);
    } catch (error) {
        console.error('Error adding feedback:', error);
        res.status(500).json({ error: 'Error adding feedback' });
    }
};

// Delete feedback by ID
const deleteFeedback = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Feedback.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ error: 'Feedback not found' });
        }
        res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        console.error('Error deleting feedback:', error);
        res.status(500).json({ error: 'Error deleting feedback' });
    }
};

// Edit feedback by ID
const editFeedback = async (req, res) => {
    const { id } = req.params;
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    try {
        const updatedFeedback = await Feedback.findByIdAndUpdate(id, { name, email, message }, { new: true });
        if (!updatedFeedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }
        res.status(200).json(updatedFeedback);
    } catch (error) {
        console.error('Error updating feedback:', error);
        res.status(500).json({ error: 'Error updating feedback' });
    }
};

export { getFeedback, addFeedback, deleteFeedback, editFeedback };
