const Item = require('../models/Item');

// Calculate next review date based on spaced repetition algorithm
const calculateNextReviewDate = (reviewCount) => {
  const intervals = [1, 3, 7, 15, 30]; // days
  const interval = intervals[reviewCount] || 60; // default to 60 days for subsequent reviews
  
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);
  return nextDate;
};

// Create a new item
const createItem = async (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const nextReviewDate = calculateNextReviewDate(0);
    
    const item = new Item({
      title,
      nextReviewDate
    });

    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all items
const getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ dateCreated: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get items due for review today
const getItemsDueToday = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(23, 59, 59, 999); // End of today
    
    const items = await Item.find({
      nextReviewDate: { $lte: today },
      isCompleted: false
    }).sort({ nextReviewDate: 1 });
    
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update item after review
const updateItemAfterReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { success } = req.body;
    
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (success) {
      item.reviewCount += 1;
      item.nextReviewDate = calculateNextReviewDate(item.reviewCount);
    } else {
      // Reset to first interval if review was unsuccessful
      item.reviewCount = 0;
      item.nextReviewDate = calculateNextReviewDate(0);
    }

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update item dates for testing
const updateItemDates = async (req, res) => {
  try {
    const { id } = req.params;
    const { dateCreated } = req.body;
    
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Update creation date and recalculate next review date
    const newCreationDate = new Date(dateCreated);
    item.dateCreated = newCreationDate;
    
    // Recalculate next review date based on new creation date
    const nextReviewDate = new Date(newCreationDate);
    nextReviewDate.setDate(nextReviewDate.getDate() + 1); // J+1 for first revision
    item.nextReviewDate = nextReviewDate;
    
    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an item
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    
    const item = await Item.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createItem,
  getItems,
  getItemsDueToday,
  updateItemAfterReview,
  updateItemDates,
  deleteItem
};