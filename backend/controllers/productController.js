const Product = require('../models/product');
const ErrorHandler =  require('../utils/errorHandler')
const catchAsyncErros = require('../middlewares/catchAsyncErrors')

exports.getProducts = catchAsyncErros(async(req,res,next)=>{
    const products = await Product.find();
    res.status(200).json({
      success : true,
      count : products.length,
      products
    })
})


exports.newProduct = catchAsyncErros(async(req,res,next)=>{
  const product = await Product.create(req.body);
  res.status(201).json({success : true, product })
})

//Get Single product details => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErros(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
     return next(new ErrorHandler("Product not found" , 404))
  }

  res.status(200).json({
    success: true,
    product
  })
})

//update product => /api/v1/product/:id
exports.updateProduct = catchAsyncErros(async(req,res,next) =>
{
  let product = await Product.findById(req.params.id)
  if (!product) {
    return next(new ErrorHandler("Product not found" , 404))

  }
 product = await Product.findByIdAndUpdate(req.params.id , req.body , {
  new : true,
  runValidators : true,
   useFindAndModify : false}
 );
res.status(200).json({
  success : true ,
  product
})
})


exports.deleteProduct = catchAsyncErros(async(req,res,next) =>
{
  let product = await Product.findById(req.params.id)
  if (!product) {
    return next(new ErrorHandler('Product not found' , 404));
  }
  await product.remove()
  res.status(200).json({
    success : true ,
  })
})
