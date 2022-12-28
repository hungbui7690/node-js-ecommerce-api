const getAllProducts = async (req, res) => {
  res.send('Get All Products')
}

const getSingleProduct = async (req, res) => {
  res.send('Get Single Product')
}

const createProduct = async (req, res) => {
  res.send('Create Product')
}

const updateProduct = async (req, res) => {
  res.send('Update Product')
}

const deleteProduct = async (req, res) => {
  res.send('Delete Product')
}
const uploadImage = async (req, res) => {
  res.send('Upload Image')
}

// (2) create productRoutes.js
module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
}
