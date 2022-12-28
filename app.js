/*

 */

// =====================================================
// IMPORT
// =====================================================

// packages
require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

// local
const connectDB = require('./db/connect')

// middlewares
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// =====================================================
// MIDDLEWARES & ROUTES
// =====================================================

app.use(express.json())

app.get('/', (req, res) => {
  res.send(`
    Node JS - Ecommerce API
  `)
})

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
