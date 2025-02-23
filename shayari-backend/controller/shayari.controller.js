import Shayari from '../models/Shayari.js';

// Get all shayaris with pagination
const getShayaris = async (req, res) => {
  try {
    const { page = 1, limit = 10, category = 'All' } = req.query;

    // Category filter
    const query = category === 'All' ? {} : { category };

    // Fetch shayaris with pagination
    const shayaris = await Shayari.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    // Total shayaris count for pagination
    const total = await Shayari.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({ shayaris, total, page, pages: totalPages });
  } catch (error) {
    console.error('Error fetching shayaris:', error);
    res.status(500).json({ error: 'Error fetching shayaris' });
  }
};

// Add a new shayari
const addShayaris = async (req, res) => {
  const { content, title, author } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }
  try {
    const newShayari = new Shayari({ content, title, author });
    await newShayari.save();
    res.status(201).json(newShayari);
  } catch (error) {
    console.error('Error adding shayari:', error);
    res.status(500).json({ error: 'Error adding shayari' });
  }
};

// Delete a shayari by ID
const deleteShayaris = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Shayari.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: 'Shayari not found' });
    }
    res.status(200).json({ success: true, message: 'Shayari deleted successfully' });
  } catch (error) {
    console.error('Error deleting shayari:', error);
    res.status(500).json({ error: 'Error deleting shayari' });
  }
};

// Edit an existing shayari
const editShayaris = async (req, res) => {
  const { id } = req.params;
  const { content, title, author } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }
  try {
    const updatedShayari = await Shayari.findByIdAndUpdate(
      id,
      { content, title, author },
      { new: true }
    );
    if (!updatedShayari) {
      return res.status(404).json({ error: 'Shayari not found' });
    }
    res.status(200).json(updatedShayari);
  } catch (error) {
    console.error('Error updating shayari:', error);
    res.status(500).json({ error: 'Error updating shayari' });
  }
};

export { getShayaris, addShayaris, deleteShayaris, editShayaris };
