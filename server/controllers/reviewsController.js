const Review = require('../models/Review');
const Item = require('../models/Item');

// Create a new review
const createReview = async (req, res) => {
  try {
    const { itemId, success, difficulty } = req.body;
    
    if (!itemId || success === undefined) {
      return res.status(400).json({ message: 'ItemId and success are required' });
    }

    const review = new Review({
      itemId,
      success,
      difficulty: difficulty || 3
    });

    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reviews for an item
const getReviewsForItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    
    const reviews = await Review.find({ itemId }).sort({ reviewDate: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get review statistics
const getReviewStats = async (req, res) => {
  try {
    const totalReviews = await Review.countDocuments();
    const successfulReviews = await Review.countDocuments({ success: true });
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    
    const todayReviews = await Review.countDocuments({
      reviewDate: { $gte: todayStart, $lte: todayEnd }
    });

    const stats = {
      totalReviews,
      successfulReviews,
      successRate: totalReviews > 0 ? ((successfulReviews / totalReviews) * 100).toFixed(1) : 0,
      todayReviews
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset all data (delete all reviews and items)
const resetAllData = async (req, res) => {
  try {
    // Delete all reviews
    await Review.deleteMany({});
    
    // Delete all items
    await Item.deleteMany({});
    
    res.json({ 
      message: 'All data has been reset successfully',
      itemsDeleted: true,
      reviewsDeleted: true
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createReview,
  getReviewsForItem,
  getReviewStats,
  resetAllData
};