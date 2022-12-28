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

  const tokenUser = { userID: user._id, username: user.name, role: user.role }

  // (5)
  attachCookiesToResponse({ res, tokenUser })

  res.status(StatusCodes.CREATED).json({ tokenUser })
}

const login = (req, res) => {
  res.send('Login')
}

const logout = (req, res) => {
  res.send('Logout')
}

module.exports = { register, login, logout }
