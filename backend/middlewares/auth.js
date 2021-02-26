//Check if user is authenticated or // NOTE:

const jwt = require("jsonwebtoken")
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErros = require('./catchAsyncErrors')
const User = require('../models/user')


exports.isAuthenticatedUser = catchAsyncErros(async(req,res,next) => {
  const {token}  = req.cookies
  if(!token)
  {
    return next(new ErrorHandler('Login to access this resource'))
  }
  const decoded = jwt.verify(token , process.env.JWT_SECRET)
  //console.log(decoded)
  req.user = await User.findById(decoded.id)
  //console.log(req.user)
  next();
  //console.log(token)
})



exports.authorizeRoles = (...roles) =>
{
  return (req,res,next) => {
    if(!roles.includes(req.user.role))
    {
      return next(new ErrorHandler('Role ' + req.user.role + " is not allowed to access this resource" , 403));
    }
    next();
  }
}


/*
exports.sample = function(req,res,next)
{
  console.log("Reached here")
  next();
}
*/
