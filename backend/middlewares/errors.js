const ErrorHandler = require('../utils/errorHandler');
module.exports = (err,req,res,next) =>
{
  err.statusCode = err .statusCode || 500;
if(process.env.NODE_ENV === "DEVELOPMENT"){




  res.status(err.statusCode).json({
    success : false,
    Message : err.message,
    stack : err.stack,
    err

  })
}

if(process.env.NODE_ENV === "PRODUCTION")
{


  let error = {...err}

  error.message = err.message;

//Wrong Mongoose Object ID CastError
  if(err.name === 'CastError'){
    const message = 'Resouce not Found. Invalid :' + err.path;
    error = new ErrorHandler(message, 400)
  }



  if(err.name === 'ValidationError'){
    const message = Object.values(err.errors).map(value => value.message);
    error = new ErrorHandler(message, 400)
  }
//Handling mongoose Validation error




//Hnadling mongoose duplicate key error

if (err.code === 11000)
{
  const message = "Duplicate " + Object.keys(err.keyValue) + " entered"
  error = new ErrorHandler(message, 400)
}


//Handling wrong JWT error
if(err.name === 'jsonWebTokenError')
{
  const message  = 'Json Web Token is invalid. Try again!!!'
  error = new ErrorHandler(message , 400)
}


//Handling expired JWT error
if(err.name === 'TokenExpiredError')
{
  const message  = 'Json Web Token is expired. Try again!!!'
  error = new ErrorHandler(message , 400)
}


  res.status(err.statusCode).json({
    success : false,
    Message : error.message || "Internal Server Error",

  })
}
}
