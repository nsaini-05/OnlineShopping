const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')


const APIFeatures = require('../utils/apiFeatures')

//Get all products => api/v1/products/keyword=apple
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 8;
    //total number of products in database
    const productsCount = await Product.countDocuments();
    const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().pagination(resPerPage)
    //const products = await apiFeatures
      const products = await apiFeatures.query
      res.status(200).json({
            success: true,
                productsCount,
                resPerPage,
                    products
                    })
  
})


exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product
  })
})

//Get Single product details => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
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
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
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


exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id)
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  await product.remove()
  res.status(200).json({
    success: true,
  })
})



//Create a new review => /api/v1/review
exports.createProductReview = catchAsyncErrors( async (req,res,next)=>{
  const{rating,comment,productId} = req.body;
  const newReview = {
    user : req.user._id,
    name : req.user.name,
    rating : Number (rating),
    comment
  }
  const product = await Product.findById(productId);  


  
  let isReviewed = product.reviews.find(review => String(review.user) === String(req.user._id));

  if(isReviewed)
  {    
      product.reviews.forEach(review =>{
        if(String(review.user) === String(req.user._id))
        {
          review.comment = comment;
          review.rating = rating
        }
      })
  }

  else
  {
    product.reviews.push(newReview);
    product.numOfReviews = product.reviews.length
  }
  const reducer = (accumulator, currentValue) => accumulator + currentValue.rating;
  product.ratings = product.reviews.reduce(reducer,0) / product.reviews.length


  product.save({validateBeforeSave: false})
  res.status(200).json({
  success: true,
  })
})


// Getting the Product reviews /api/v1/reviews
exports.getReviews = catchAsyncErrors( async(req,res,next)=>{
  const product = await Product.findById(req.query.id);
  console.log(product)
  res.status(200).json({
    success : true,
    reviews : product.reviews
  })
})


//Delteing the Product Review
exports.deleteReview = catchAsyncErrors(async (req,res,next)=>{
  const product = await Product.findById(req.query.productId);
  const reviews = product.reviews.filter(review => String(review._id) !== String(req.query.id));
  const reducer = (accumulator, currentValue) => accumulator + currentValue.rating;
  const ratings = reviews.reduce(reducer,0) / reviews.length
  const numOfReviews = reviews.length
  //console.log(reviews)
  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    ratings,
    numOfReviews
  },{
    new :true,
    runValidators : true,
    useFindAndModify : false
  });



  res.status(200).json({
    success : true,
  })

})