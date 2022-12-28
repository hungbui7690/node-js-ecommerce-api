/*
  app.js
  controller
 */

// =====================================================
// IMPORT
// =====================================================

// packages
require('dotenv').config()
require('express-async-errors')
const morgan = require('morgan')
const express = require('express')

// (1)
const cookieParser = require('cookie-parser')

const app = express()

// local
const connectDB = require('./db/connect')
const authRouter = require('./routes/authRoutes')

// middlewares
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// =====================================================
// MIDDLEWARES & ROUTES
// =====================================================

// (2)
app.use(cookieParser(process.env.JWT_SECRET))

app.use(morgan('tiny'))
app.use(express.json())

app.get('/', (req, res) => {
  res.send(`
    Node JS - Ecommerce API
  `)
})

// (3) /utils/jwt.js
app.get('/api/v1', (req, res) => {
  console.log(req.signedCookies)
  res.send('/api/v1')
})

app.use('/api/v1/auth', authRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// =====================================================
// SERVER
// =====================================================

const PORT = process.env.PORT || 5000

const start = async () => {
  await connectDB(process.env.MONGO_URI)
  app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
}

start()
