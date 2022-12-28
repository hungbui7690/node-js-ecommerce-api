const CustomError = require('../errors/')
const { isTokenValid } = require('../utils/index')

// (1) userRoutes.js
const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token

  if (!token)
    throw new CustomError.UnauthenticatedError('Authentication Invalid')

  try {
    const payload = isTokenValid({ token })

    req.user = payload
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid')
  }

  next()
}

module.exports = { authenticateUser }
