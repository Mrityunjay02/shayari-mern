import Shayari from '../models/Shayari.js';

// Get all shayaris with pagination
const getShayaris = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const [shayaris, total] = await Promise.all([
      Shayari.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Shayari.countDocuments()
    ]);

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.status(200).json({
      success: true,
      shayaris,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit,
        hasNextPage,
        hasPrevPage
      }
    });
  } catch (error) {
    console.error('Error in getShayaris:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching shayaris',
      message: error.message
    });
  }
};

// Add a new shayari
const addShayaris = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        error: 'Content is required'
      });
    }

    const newShayari = new Shayari({
      title: title || '',
      content,
      author: author || '_ Mrityunjay Bhardwaj'
    });

    const savedShayari = await newShayari.save();

    res.status(201).json({
      success: true,
      shayari: savedShayari
    });
  } catch (error) {
    console.error('Error in addShayaris:', error);
    res.status(500).json({
      success: false,
      error: 'Error adding shayari',
      message: error.message
    });
  }
};

// Delete a shayari
const deleteShayaris = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedShayari = await Shayari.findByIdAndDelete(id);

    if (!deletedShayari) {
      return res.status(404).json({
        success: false,
        error: 'Shayari not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Shayari deleted successfully'
    });
  } catch (error) {
    console.error('Error in deleteShayaris:', error);
    res.status(500).json({
      success: false,
      error: 'Error deleting shayari',
      message: error.message
    });
  }
};

// Edit a shayari
const editShayaris = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        error: 'Content is required'
      });
    }

    const updatedShayari = await Shayari.findByIdAndUpdate(
      id,
      {
        title: title || '',
        content,
        author: author || '_ Mrityunjay Bhardwaj'
      },
      { new: true }
    );

    if (!updatedShayari) {
      return res.status(404).json({
        success: false,
        error: 'Shayari not found'
      });
    }

    res.status(200).json({
      success: true,
      shayari: updatedShayari
    });
  } catch (error) {
    console.error('Error in editShayaris:', error);
    res.status(500).json({
      success: false,
      error: 'Error updating shayari',
      message: error.message
    });
  }
};

export { getShayaris, addShayaris, deleteShayaris, editShayaris };
