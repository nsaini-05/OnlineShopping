const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')

//Register User  => /api/v1/Register


exports.registerUser = catchAsyncErrors(async (req,res,next)=>
{
  //console.log(req.body);
  const {name , email , password} = req.body;
  const user = await User.create({name,email,password,avatar :{
    public_id : 'avatars/2256',
    url : 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.pngkey.com%2Fpng%2Fdetail%2F114-1149878_setting-user-avatar-in-specific-size-without-breaking.png&imgrefurl=https%3A%2F%2Fwww.pngkey.com%2Fdetail%2Fu2q8u2w7e6t4q8t4_setting-user-avatar-in-specific-size-without-breaking%2F&tbnid=jBttVsXUaIpNEM&vet=12ahUKEwiO76SUjf7uAhUxoOAKHagmBRsQMygEegUIARDdAQ..i&docid=lzc0bcRlt2TRWM&w=820&h=606&q=user%20avatar&safe=strict&ved=2ahUKEwiO76SUjf7uAhUxoOAKHagmBRsQMygEegUIARDdAQ'
  }})
sendToken(user,200,res)
});




//login Use => /api/v1/login
exports.loginUser = catchAsyncErrors( async function (req,res,next){
  const {email , password} = req.body;
//Check if both email and password is entered by the user
if(!email || !password)
{
  return next((new ErrorHandler("Please enter email & password", 404)))
}  //Finding user in database
  const user = await User.findOne({ email}).select('+password')
  //If user exists or not
  if(!user)
{
  return next((new ErrorHandler("Invalid Email or Password", 401)))
}
//check if password is correct or not
const isPasswordMatched = await user.comparePassword(password)

if(!isPasswordMatched)
{
  return next(new ErrorHandler("Invalid Password" , 401))
}
sendToken(user,200,res)
})


//Forgot Password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email
  })

  if (!user) {
    return next(new ErrorHandler("User not found", 404))
  }

  //Get reset token

  const resetToken = user.getResetPasswordToken();
  await user.save({
    validationBeforeSave: false
  })

  //Create resetPassword url
  const resetUrl = req.protocol + "://" + req.get('host') + "/api/v1/password/reset/" + resetToken;

  const message = "Your password reset token is as follow :\n" + resetUrl + "\n\n If you have not requested this email, then ignore it"


  try {
    await sendEmail({
      email: user.email,
      subject: "ShopIt Password Recovery",
      message
    })

    res.status(200).json({
      success: true,
      message: "Email sent to user"
    });
  } catch (error) {

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({
      validationBeforeSave: false
    })
    return next(new ErrorHandler(error.message, 500))
  }
})


//Reset the Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {


//Hash the urlToken

const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

console.log(resetPasswordToken)

const user = await User.findOne({
  resetPasswordToken ,
  resetPasswordExpire : {$gt : Date.now()}
})

if(!user)
{
  return next(new ErrorHandler("Password Reset Token is invalid or has been expired" , 400));
}


if(req.body.password !== req.body.confirmPassword)
{
  return next(new ErrorHandler("Password does not match" , 400));
}



//Setup the new Password
user.password = req.body.password;
user.resetPasswordToken = undefined;
user.resetPasswordExpire = undefined;


await user.save();
sendToken(user , 200 , res )

})



//logout Use => /api/v1/logout
exports.logout = catchAsyncErrors( async function(req,res,next)
{
  res.cookie('token', null , {expires : new Date(Date.now()),httpOnly: true})
  res.status(200).json({
    success: true,
  })

})
