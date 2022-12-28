const CustomAPIError = require('../errors/')

const checkPermissions = (tokenPayload, userID) => {
  console.log(typeof tokenPayload.role, typeof userID)
  if (tokenPayload.role === 'admin') return

  if (tokenPayload.userID === userID) return

  throw new CustomAPIError.UnauthorizedError(
    'Unauthorized to access this route'
  )
}

// (1) userController
module.exports = { checkPermissions }
