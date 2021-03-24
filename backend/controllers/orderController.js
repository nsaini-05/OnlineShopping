const Order = require('../models/order');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const ErrorHandler = require('../utils/errorHandler')
const Product = require('../models/product')


//Create Order => api/v1/order/new
exports.createOrder = catchAsyncErrors(async (req,res,next) => {
const {
  orderItems ,
  shippingInfo,
  itemsPrice,
  taxPrice,
  shippingPrice,
  totalPrice,
  paymentInfo
} = req.body;

const order = await Order.create({
  orderItems ,
  shippingInfo,
  itemsPrice,
  taxPrice,
  shippingPrice,
  totalPrice,
  paymentInfo,
  paidAt : Date.now(),
  user  : req.user._id
})
  res.status(200).json({
    success: true,
    order
  })
})

//Get the single order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors( async (req,res,next)=>{
const order = await Order.findById(req.params.id);
//const order = await Order.findById(req.params.id).populate('user','name email');
//console.log(order._id)
if(!order)
{
  return next(new ErrorHandler("No order found with this ID" , 404))
}
res.status(200).json({
  success : true,
  order
})
})


//Get the LoggedIn user order => /api/v1/order/:id
exports.myOrders = catchAsyncErrors( async (req,res,next)=>{
const orders =  await Order.find({user : req.user.id})

res.status(200).json({
  success : true,
  orders
})
})



//Getting all the orders => /api/v1/admin/orders
exports.allOrders = catchAsyncErrors(async (req,res,next)=>{
 const orders = await Order.find();
let totalAmount = 0;
orders.forEach(order => {
 totalAmount += order.totalPrice
});

 res.status(200).json({
  success : true,
  totalAmount,
  orders
 })
})




//Updating the order => /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async (req,res,next)=>{
  const order = await Order.findById(req.params.id);

  if(order.orderStatus === 'Delivered'){
    return next(new ErrorHandler("You have already delivered this Order" , 400))
  }

    order.orderItems.forEach( async item =>{
      await updateStock(item.product , item.quantity)
    })

    //Updating these two fields by passing data in body
    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now(); 
    await order.save();  
 
  res.status(200).json({
   success : true,   
  })
 })
 async function updateStock(id , quantity){
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;
  await product.save({validateBeforeSave : false});

 }

//Deleting the Order => /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async(req,res,next) =>{
  const order = await Order.findById(req.params.id);
  if(!order)
  {
    return next(new("No order found" , 400))
  }
  await order.remove();   
  res.status(200).json({
    success : true,   
   })
})
