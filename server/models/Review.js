const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  reviewDate: {
    type: Date,
    default: Date.now
  },
  success: {
    type: Boolean,
    required: true
  },
  difficulty: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);