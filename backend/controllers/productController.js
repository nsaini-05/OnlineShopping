const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErros = require('../middlewares/catchAsyncErrors')


const APIFeatures = require('../utils/apiFeatures')

//Get all products => api/v1/products/keyword=apple
exports.getProducts = catchAsyncErros(async (req, res, next) => {

const resPerPage = 4;

//total number of products in database
const productCount = await Product.countDocuments();
const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().pagination(resPerPage)

  //const products = await apiFeatures
  const products = await apiFeatures.query
  res.status(200).json({
    success: true,
    count: products.length,
    productCount,
    products
  })
})


exports.newProduct = catchAsyncErros(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product
  })
})

//Get Single product details => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErros(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorHandler("Product not found", 404))
  }
  res.status(200).json({
    success: true,
    product
  })
})

//update product => /api/v1/product/:id
exports.updateProduct = catchAsyncErros(async (req, res, next) => {
  let product = await Product.findById(req.params.id)
  if (!product) {
    return next(new ErrorHandler("Product not found", 404))

  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });
  res.status(200).json({
    success: true,
    product
  })
})


exports.deleteProduct = catchAsyncErros(async (req, res, next) => {
  let product = await Product.findById(req.params.id)
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  await product.remove()
  res.status(200).json({
    success: true,
  })
})
