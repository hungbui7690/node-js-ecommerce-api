const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Please provide rating value'],
    },
    title: {
      type: String,
      required: [true, 'Please provide review title'],
      trim: true,
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, 'Please provide review text'],
      maxlength: 100,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  { timestamps: true }
)

ReviewSchema.index({ product: 1, user: 1 }, { unique: true })

module.exports = mongoose.model('Review', ReviewSchema)
