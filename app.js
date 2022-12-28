/*
  review Controller
 */

// =====================================================
// IMPORT
// =====================================================

// packages
require('dotenv').config()
require('express-async-errors')
const morgan = require('morgan')
const express = require('express')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const app = express()

// local
const connectDB = require('./db/connect')
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const reviewRouter = require('./routes/reviewRoutes')

// middlewares
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// =====================================================
// MIDDLEWARES & ROUTES
// =====================================================

app.use(cookieParser(process.env.JWT_SECRET))
app.use(morgan('tiny'))
app.use(express.json())
app.use(fileUpload())

app.get('/', (req, res) => {
  res.send(`
    Node JS - Ecommerce API
  `)
})

app.get('/api/v1', (req, res) => {
  res.send('/api/v1')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/reviews', reviewRouter)

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
