const createReview = async (req, res) => {
  res.send('Create Review')
}

const GetAllReviews = async (req, res) => {
  res.send('Get All Reviews')
}

const getSingleReview = async (req, res) => {
  res.send('Get Single Review')
}

const updateReview = async (req, res) => {
  res.send('Update Review')
}

const deleteReview = async (req, res) => {
  res.send('Delete Review')
}

// (2) create routes
module.exports = {
  createReview,
  GetAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
}
