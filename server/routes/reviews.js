const express = require('express');
const router = express.Router();
const {
  createReview,
  getReviewsForItem,
  getReviewStats,
  resetAllData
} = require('../controllers/reviewsController');

// Routes
router.post('/', createReview);
router.get('/item/:itemId', getReviewsForItem);
router.get('/stats', getReviewStats);
router.delete('/reset-all', resetAllData);

module.exports = router;