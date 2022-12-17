const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const path = require('path')

const errorMiddleware = require('./middleware/error')
//Config
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({ path: 'backend/config/config.env' })
}

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())

const product = require('./routes/productRoute')
const user = require('./routes/userRoute')
app.use('/api/v1', product);
app.use('/api/v1', user);



app.get('/api/v1', (req, res, next) => {
  res.status(200).json({
    message: 'Welcome to E-Commerce Backend',
  })
})

// Middleware for Errors
app.use(errorMiddleware)

module.exports = app
