const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('../errors/')
const path = require('path')

// (3)
const getAllProducts = async (req, res) => {
  const products = await Product.find({})
    .sort('createdAt _id')
    .populate('review')
  res.status(StatusCodes.OK).json({ products })
}

// (4) end
const getSingleProduct = async (req, res) => {
  const { id } = req.params

  const product = await Product.findOne({ _id: id }).populate('review')

  if (!product)
    throw new CustomAPIError.NotFoundError(`No product with id ${id}`)

  res.status(StatusCodes.OK).json({ product })
}

const createProduct = async (req, res) => {
  req.body.user = req.user.userID

  const product = await Product.create(req.body)

  res.status(StatusCodes.CREATED).json({ product })
}

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

const deleteProduct = async (req, res) => {
  const { id } = req.params

  const product = await Product.findOne({ _id: id })

  if (!product)
    throw new CustomAPIError.NotFoundError(`No product with id ${id}`)

  await product.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Product deleted' })
}

const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded')
  }

  const productImage = req.files.image
  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Not an image type ')
  }

  const maxsize = 1024 * 1024
  if (productImage.size > maxsize) {
    throw new CustomError.BadRequestError(
      'Please upload image smaller than 1MB'
    )
  }

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  )

  await productImage.mv(imagePath)

  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` })
}

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
}
