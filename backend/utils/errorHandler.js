//Error Handler class


class ErrorHandler extends Error{

constructor(message,statusCode){
    super(message) //Constructor of the parent class
    this.statusCode = statusCode
    Error.captureStackTrace(this , this.constructor)
  }
}
module.exports = ErrorHandler;
