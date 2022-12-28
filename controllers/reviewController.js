const Review = require('../models/Review')
const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors/')

// (1)
const createReview = async (req, res) => {
  const { product: productID } = req.body

  const isValidProduct = await Product.findOne({ _id: productID })
  if (!isValidProduct) {
    throw new CustomError.NotFoundError(`No Product with id ${productID}`)
  }

  const alreadySubmit = await Review.findOne({
    product: productID,
    user: req.user.userID,
  })
  if (alreadySubmit) {
    throw new CustomError.BadRequestError(
      `Already submitted review for this product`
    )
  }

  req.body.user = req.user.userID

  const review = await Review.create(req.body)

  res.status(StatusCodes.CREATED).json({ review })
}

// (2)
const GetAllReviews = async (req, res) => {
  const reviews = await Review.find({})
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length })
}

// (3)
const getSingleReview = async (req, res) => {
  const { id } = req.params

  const review = await Review.findOne({ _id: id })

  if (!review) {
    throw new CustomError.NotFoundError(`No review with id ${id}`)
  }

  res.status(StatusCodes.OK).json({ review })
}

const updateReview = async (req, res) => {
  res.send('Update Review')
}

const deleteReview = async (req, res) => {
  res.send('Delete Review')
}

module.exports = {
  createReview,
  GetAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
}
