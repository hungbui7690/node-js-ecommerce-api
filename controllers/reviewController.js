const Review = require('../models/Review')
const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors/')
const { checkPermissions } = require('../utils/')

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

const GetAllReviews = async (req, res) => {
  const reviews = await Review.find({})
    .populate({
      path: 'product',
      select: 'name company price',
    })
    .populate({
      path: 'user',
      select: 'name',
    })
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length })
}

const getSingleReview = async (req, res) => {
  const { id } = req.params

  const review = await Review.findOne({ _id: id })
  if (!review) {
    throw new CustomError.NotFoundError(`No review with id ${id}`)
  }

  res.status(StatusCodes.OK).json({ review })
}

const updateReview = async (req, res) => {
  const { id } = req.params

  const { rating, title, comment } = req.body

  const review = await Review.findOne({ _id: id })
  if (!review) {
    throw new CustomError.NotFoundError(`No review with id ${id}`)
  }

  checkPermissions(req.user, review.user)

  review.rating = rating
  review.title = title
  review.comment = comment
  await review.save()

  res.status(StatusCodes.OK).json({ msg: `Success! Review updated.` })
}

const deleteReview = async (req, res) => {
  const { id } = req.params

  const review = await Review.findOne({ _id: id })
  if (!review) throw new CustomError.NotFoundError(`No review with id ${id}`)

  checkPermissions(req.user, review.user)

  await review.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Review removed.' })
}

// (1) productRoutes
const getSingleProductReviews = async (req, res) => {
  const { id: productID } = req.params
  const reviews = await Review.find({ product: productID })

  res.status(StatusCodes.OK).json({ reviews, count: reviews.length })
}

module.exports = {
  createReview,
  GetAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
}
