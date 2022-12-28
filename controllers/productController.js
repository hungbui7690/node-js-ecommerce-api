const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('../errors/')

// (1)
const getAllProducts = async (req, res) => {
  const products = await Product.find({}).sort('createdAt _id')
  res.status(StatusCodes.OK).json({ products })
}

// (2)
const getSingleProduct = async (req, res) => {
  const { id } = req.params

  const product = await Product.findOne({ _id: id })

  if (!product)
    throw new CustomAPIError.NotFoundError(`No product with id ${id}`)

  res.status(StatusCodes.OK).json({ product })
}

// (3)
const createProduct = async (req, res) => {
  req.body.user = req.user.userID

  const product = await Product.create(req.body)

  res.status(StatusCodes.CREATED).json({ product })
}

// (4)
const updateProduct = async (req, res) => {
  const { id } = req.params

  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!product)
    throw new CustomAPIError.NotFoundError(`No product with id ${id}`)

  res.status(StatusCodes.OK).json({ product })
}

// (5)
const deleteProduct = async (req, res) => {
  const { id } = req.params

  const product = await Product.findONe({ _id: id })

  if (!product)
    throw new CustomAPIError.NotFoundError(`No product with id ${id}`)

  res.status(StatusCodes.OK).json({ msg: 'Success! Product deleted' })
}

const uploadImage = async (req, res) => {
  res.send('Upload Image')
}

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
}
