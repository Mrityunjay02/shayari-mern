import Shayari from "../models/Shayari.js";

// Get all shayaris with pagination
const getShayaris = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const shayaris = await Shayari.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await Shayari.countDocuments();
    res
      .status(200)
      .json({ shayaris, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Error fetching shayaris:", error);
    res.status(500).json({ error: "Error fetching shayaris" });
  }
};

// Add a new shayari
const addShayaris = async (req, res) => {
  const {  content} = req.body;
  if (!content) {
    return res
      .status(400)
      .json({ error: "Title, content, and category are required" });
  }
  try {
    const newShayari = new Shayari({  content });
    await newShayari.save();
    res.status(201).json(newShayari);
  } catch (error) {
    console.error("Error adding shayari:", error);
    res.status(500).json({ error: "Error adding shayari" });
  }
};

// Delete a shayari by ID
const deleteShayaris = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Shayari.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: "Shayari not found" });
    }
    res.status(200).json({ success: true, message: "Shayari deleted successfully" });
  } catch (error) {
    console.error("Error deleting shayari:", error);
    res.status(500).json({ error: "Error deleting shayari" });
  }
};

// Edit an existing shayari
const editShayaris = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  if (!content ) {
    return res
      .status(400)
      .json({ error: "Content is required" });
  }
  try {
    const updatedShayari = await Shayari.findByIdAndUpdate(
      id,
      {  content },
      { new: true }
    );
    if (!updatedShayari) {
      return res.status(404).json({ error: "Shayari not found" });
    }
    res.status(200).json(updatedShayari);
  } catch (error) {
    console.error("Error updating shayari:", error);
    res.status(500).json({ error: "Error updating shayari" });
  }
};


export { getShayaris, addShayaris, deleteShayaris, editShayaris, };
