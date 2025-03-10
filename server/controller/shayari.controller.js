import Shayari, { SHAYARI_CATEGORIES } from '../models/Shayari.js';

// Get all shayaris with pagination and filtering
const getShayaris = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;
    const { category, search } = req.query;

    // Build query
    const query = {};
    if (category) {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }

    const [shayaris, total] = await Promise.all([
      Shayari.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Shayari.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    // Get category counts
    const categoryCounts = await Shayari.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      shayaris,
      categories: Object.entries(SHAYARI_CATEGORIES).map(([key, value]) => ({
        key,
        value,
        count: categoryCounts.find(c => c._id === value)?.count || 0
      })),
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

// Automatically determine category based on content
const determineCategory = (content, title = '') => {
  const text = (title + ' ' + content).toLowerCase();
  
  // Define keywords for each category
  const categoryKeywords = {
    [SHAYARI_CATEGORIES.ISHQ]: ['ishq', 'pyaar', 'love', 'इश्क़', 'प्यार', 'عشق', 'محبت'],
    [SHAYARI_CATEGORIES.DARD]: ['dard', 'दर्द', 'درد', 'pain', 'दुख', 'غم', 'takleef', 'तकलीफ'],
    [SHAYARI_CATEGORIES.DOSTI]: ['dost', 'friend', 'दोस्त', 'دوست', 'यार', 'یار', 'friendship'],
    [SHAYARI_CATEGORIES.ZINDAGI]: ['zindagi', 'life', 'जीवन', 'زندگی', 'जिंदगी'],
    [SHAYARI_CATEGORIES.MOTIVATIONAL]: ['himmat', 'hosla', 'motivation', 'हिम्मत', 'हौसला', 'حوصلہ'],
    [SHAYARI_CATEGORIES.ROMANTIC]: ['romantic', 'romance', 'रोमांस', 'رومانس'],
    [SHAYARI_CATEGORIES.BEWAFA]: ['bewafa', 'बेवफा', 'بےوفا', 'धोखा', 'دھوکہ'],
    [SHAYARI_CATEGORIES.TANHAI]: ['tanhai', 'alone', 'तनहाई', 'تنہائی', 'अकेला'],
    [SHAYARI_CATEGORIES.INTEZAAR]: ['intezaar', 'wait', 'इंतज़ार', 'انتظار'],
    [SHAYARI_CATEGORIES.MOHABBAT]: ['mohabbat', 'मोहब्बत', 'محبت'],
    [SHAYARI_CATEGORIES.YAADEIN]: ['yaad', 'memory', 'याद', 'یاد'],
    [SHAYARI_CATEGORIES.GHAZAL]: ['ghazal', 'ग़ज़ल', 'غزل'],
    [SHAYARI_CATEGORIES.NATURE]: ['nature', 'प्रकृति', 'قدرت', 'फितरत'],
    [SHAYARI_CATEGORIES.SPIRITUAL]: ['khuda', 'god', 'ख़ुदा', 'خدا', 'रब', 'رب']
  };

  // Check for category matches
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return category;
    }
  }

  return SHAYARI_CATEGORIES.OTHER;
};

// Generate tags based on content
const generateTags = (content, title = '') => {
  const text = (title + ' ' + content).toLowerCase();
  const tags = new Set();

  // Common emotions and themes
  const themes = [
    'love', 'pain', 'friendship', 'life', 'motivation',
    'romance', 'betrayal', 'loneliness', 'waiting', 'memories',
    'nature', 'spiritual', 'happiness', 'sadness', 'hope'
  ];

  themes.forEach(theme => {
    if (text.includes(theme)) {
      tags.add(theme);
    }
  });

  // Add Hindi/Urdu words as tags
  const hindiUrduWords = text.match(/[\u0900-\u097F\u0600-\u06FF]+/g) || [];
  hindiUrduWords.forEach(word => tags.add(word));

  return Array.from(tags).slice(0, 5); // Limit to 5 tags
};

// Add a new shayari
const addShayaris = async (req, res) => {
  try {
    const { title, content, author, category } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        error: 'Content is required'
      });
    }

    // Auto-determine category if not provided
    const determinedCategory = category || determineCategory(content, title);
    const tags = generateTags(content, title);

    const newShayari = new Shayari({
      title: title || '',
      content,
      author: author || '_ Mrityunjay Bhardwaj',
      category: determinedCategory,
      tags,
      likes: 0
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
    const { title, content, author, category } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        error: 'Content is required'
      });
    }

    // Auto-determine category if not provided
    const determinedCategory = category || determineCategory(content, title);
    const tags = generateTags(content, title);

    const updatedShayari = await Shayari.findByIdAndUpdate(
      id,
      {
        title: title || '',
        content,
        author: author || '_ Mrityunjay Bhardwaj',
        category: determinedCategory,
        tags
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

// Update likes for a shayari
const updateLikes = async (req, res) => {
  try {
    const { id } = req.params;
    const { increment } = req.body;

    const updatedShayari = await Shayari.findByIdAndUpdate(
      id,
      { $inc: { likes: increment ? 1 : -1 } },
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
      likes: updatedShayari.likes
    });
  } catch (error) {
    console.error('Error in updateLikes:', error);
    res.status(500).json({
      success: false,
      error: 'Error updating likes',
      message: error.message
    });
  }
};

// Get categories with counts
const getCategories = async (req, res) => {
  try {
    const categoryCounts = await Shayari.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    const categories = Object.entries(SHAYARI_CATEGORIES).map(([key, value]) => ({
      key,
      value,
      count: categoryCounts.find(c => c._id === value)?.count || 0
    }));

    res.status(200).json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Error in getCategories:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching categories',
      message: error.message
    });
  }
};

export { 
  getShayaris, 
  addShayaris, 
  deleteShayaris, 
  editShayaris, 
  updateLikes,
  getCategories 
};
