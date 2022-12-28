const User = require('../models/User')
const CustomAPIError = require('../errors/')
const { StatusCodes } = require('http-status-codes')
const { attachCookiesToResponse } = require('../utils/')

// (1)
const getAllUsers = async (req, res) => {
  const users = await User.find({ role: 'user' })
    .sort('createdAt _id')
    .select('-password')

  res.status(StatusCodes.OK).json({ users })
}

// (2)
const getSingleUser = async (req, res) => {
  const { id } = req.params

  const user = await User.findOne({ _id: id }).select('-password')
  if (!user) {
    throw new CustomAPIError.NotFoundError(`No user with id ${id}`)
  }

  res.status(StatusCodes.OK).json({ user })
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
