const jwt = require('jsonwebtoken')

// (1)
const createToken = ({ payload }) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}

// (2) index.js
const isTokenValid = ({ token }) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { createToken, isTokenValid }
