const express = require('express');
const router = express.Router();
const {
  createItem,
  getItems,
  getItemsDueToday,
  updateItemAfterReview,
  updateItemDates,
  deleteItem
} = require('../controllers/itemsController');

// Routes
router.post('/', createItem);
router.get('/', getItems);
router.get('/due-today', getItemsDueToday);
router.put('/:id/review', updateItemAfterReview);
router.put('/:id/update-dates', updateItemDates);
router.delete('/:id', deleteItem);

module.exports = router;