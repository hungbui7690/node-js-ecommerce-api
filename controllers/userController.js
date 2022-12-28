const User = require('../models/User')
const CustomAPIError = require('../errors/')
const { StatusCodes } = require('http-status-codes')
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require('../utils')

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: 'user' })
    .sort('createdAt _id')
    .select('-password')

  res.status(StatusCodes.OK).json({ users })
}

const getSingleUser = async (req, res) => {
  const { id } = req.params

  const user = await User.findOne({ _id: id }).select('-password')
  if (!user) {
    throw new CustomAPIError.NotFoundError(`No user with id ${id}`)
  }

  checkPermissions(req.user, id)

  res.status(StatusCodes.OK).json({ user })
}

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user })
}

const updateUser = async (req, res) => {
  const { email, name } = req.body

  if (!email || !name) {
    throw new CustomAPIError.BadRequestError('Please provide all values')
  }

  const user = await User.findOne({ _id: req.user.userID })

  if (!user)
    throw new CustomAPIError.UnauthenticatedError('Invalid Credentials')

  user.email = email
  user.name = name

  await user.save()

  const tokenUser = createTokenUser(user)
  attachCookiesToResponse({ res, tokenUser })

  res.status(StatusCodes.OK).json({ user: tokenUser })
}

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body

  if (!oldPassword || !newPassword) {
    throw new CustomAPIError.BadRequestError('Please provide both values')
  }

  const user = await User.findOne({ _id: req.user.userID })

  const isPasswordCorrect = await user.comparePassword(oldPassword)
  if (!isPasswordCorrect) {
    throw new CustomAPIError.UnauthenticatedError('Invalid Credentials')
  }

  user.password = newPassword

  await user.save()

  res.status(StatusCodes.OK).json({ msg: 'Successfully! Password updated.' })
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
