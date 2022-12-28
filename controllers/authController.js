const User = require('../models/User')
const CustomAPIError = require('../errors/')
const { StatusCodes } = require('http-status-codes')
const { attachCookiesToResponse } = require('../utils/')

const register = async (req, res) => {
  const { name, email, password } = req.body

  const isFirstAccount = (await User.countDocuments({})) === 0

  const role = isFirstAccount ? 'admin' : 'user'

  if (!name || !email || !password) {
    throw new CustomAPIError.BadRequestError('Please provide all values')
  }

  const userAlreadyExists = await User.findOne({ email })

  if (userAlreadyExists)
    throw new CustomAPIError.BadRequestError('Email already exists')

  const user = await User.create({ ...req.body, role })
  if (!user) throw new CustomAPIError.BadRequestError('User cannot be created')

  const tokenUser = { userID: user._id, name: user.name, role: user.role }

  attachCookiesToResponse({ res, tokenUser })

  res.status(StatusCodes.CREATED).json({ tokenUser })
}

// (2)
const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new CustomAPIError.BadRequestError('Please provide all values')
  }

  const user = await User.findOne({ email })
  if (!user) {
    throw new CustomAPIError.UnauthenticatedError('Invalid Credentials')
  }

  const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    throw new CustomAPIError.UnauthenticatedError('Invalid Credentials')
  }

  const tokenUser = {
    userID: user._id,
    name: user.name,
    role: user.role,
  }

  attachCookiesToResponse({ res, tokenUser })

  res.status(StatusCodes.OK).json({ user: tokenUser })
}

const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.status(StatusCodes.OK).json({ msg: 'User logged out!' })
}

module.exports = { register, login, logout }
