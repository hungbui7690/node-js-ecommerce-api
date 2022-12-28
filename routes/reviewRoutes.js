const express = require('express')
const router = express.Router()
const { authenticateUser } = require('../middleware/authentication')

const {
  createReview,
  GetAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController')

// (3) app.js
router.route('/').get(GetAllReviews).post(authenticateUser, createReview)
router
  .route('/:id')
  .get(getSingleReview)
  .patch(authenticateUser, updateReview)
  .delete(authenticateUser, deleteReview)

module.exports = router
