const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('../errors/')
const path = require('path')

const getAllProducts = async (req, res) => {
  const products = await Product.find({}).sort('createdAt _id')
  res.status(StatusCodes.OK).json({ products })
}

const getSingleProduct = async (req, res) => {
  const { id } = req.params

  const product = await Product.findOne({ _id: id })

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

  // fix here
  await product.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Product deleted' })
}

// (3)
const uploadImage = async (req, res) => {
  // (a) check existance
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded')
  }

  // (b) check mimetype
  const productImage = req.files.image
  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Not an image type ')
  }

  // (c) check maxsize
  const maxsize = 1024 * 1024
  if (productImage.size > maxsize) {
    throw new CustomError.BadRequestError(
      'Please upload image smaller than 1MB'
    )
  }

  // (d) use path module + mv() to move image to /uploads folder
  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  )

  // (e)
  await productImage.mv(imagePath)

  // (f)
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
