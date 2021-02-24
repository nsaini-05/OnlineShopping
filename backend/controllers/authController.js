const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')


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
}
  //Finding user in database
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
