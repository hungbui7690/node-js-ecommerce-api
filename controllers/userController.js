const getAllUsers = async (req, res) => {
  res.send('Get All Users')
}

const getSingleUser = async (req, res) => {
  res.send('Get User')
}

const showCurrentUser = async (req, res) => {
  res.send('Show Currrent User')
}

const updateUser = async (req, res) => {
  res.send('Update User')
}

const updateUserPassword = async (req, res) => {
  res.send('Update Password User')
}

const deleteUser = async (req, res) => {
  res.send('Delete User')
}

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
}
