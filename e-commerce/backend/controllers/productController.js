const Product = require('../models/productModel')
const ErrorHander = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ApiFeatures = require('../utils/apifeatures')
const cloudinary = require('cloudinary')

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = []

  if (typeof req.body.images === 'string') {
    images.push(req.body.images)
  } else {
    images = req.body.images
  }

  const imagesLinks = []
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: 'products',
    })

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    })
  }

  req.body.images = imagesLinks
  req.body.user = req.user.id

  const product = await Product.create(req.body)
  res.status(201).json({
    success: true,
    product,
  })
})
