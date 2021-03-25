const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')

const cloudinary = require('cloudinary')
const user = require('../models/user')

//Register User  => /api/v1/Register


exports.registerUser = catchAsyncErrors(async (req, res, next) => {

  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: 'avatars',
    width: 150,
    crop: "scale"
})

  const {
    name,
    email,
    password
  } = req.body;



  const user = await User.create({
    name,
    email,
    password,
    
    avatar: {
      public_id: result.public_id,
      url: result.secure_url
    }
    
  })
  sendToken(user, 200, res)
});




//login Use => /api/v1/login
exports.loginUser = catchAsyncErrors(async function(req, res, next) {
  const {
    email,
    password
  } = req.body;
  //Check if both email and password is entered by the user
  if (!email || !password) {
    return next((new ErrorHandler("Please enter email & password", 404)))
  } //Finding user in database
  const user = await User.findOne({
    email
  }).select('+password')
  //If user exists or not
  if (!user) {
    return next((new ErrorHandler("Invalid Email or Password", 401)))
  }
  //check if password is correct or not
  const isPasswordMatched = await user.comparePassword(password)

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Password", 401))
  }
  sendToken(user, 200, res)
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
  //const resetUrl = req.protocol + "://" + req.get('host') + "/api/v1/password/reset/" + resetToken;
  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;


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
  //console.log(resetPasswordToken)
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now()
    }
  })

  if (!user) {
    return next(new ErrorHandler("Password Reset Token is invalid or has been expired", 400));
  }


  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }



  //Setup the new Password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;


  await user.save();
  sendToken(user, 200, res)

})


//Get Currently logged in user details => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  //before this isauthenticated user is called which will set req.user to user found from db
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user
  })
})



//Update /Change password  => api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  //before this isauthenticated user is called which will set req.user to user found from db

  const user = await User.findById(req.user.id).select('+password');

  //Check previosu user password
  const isMatched = await user.comparePassword(req.body.oldPassword)

  if (!isMatched) {
    return next(new ErrorHandler("Old Password is incorrect", 400));
  }

  user.password = req.body.
  
  password;
  await user.save();
  sendToken(user, 200, res)
})




// Update User profile  => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async function(req, res, next) {
  const newuserData = {
    name: req.body.name,
    email: req.body.email,
    
  }


  if(req.body.avatar !== '')
  {
    const user = await User.findById(req.user.id)
    const image_id = user.avatar.public_id;
    const res = await cloudinary.v2.uploader.destroy(image_id);



    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
      width: 150,
      crop: "scale"
  })


  newuserData.avatar = { public_id : result.public_id , 
  url : result.secure_url}
  }


  const user = await User.findByIdAndUpdate(req.user.id, newuserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })


  res.status(200).json({
    success: true
  })
});



//logout Use => /api/v1/logout
exports.logout = catchAsyncErrors(async function(req, res, next) {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  })
  res.status(200).json({
    success: true,
  })
})


//Admin routes
//Get all users => api/v1/admin/users
exports.allUsers = catchAsyncErrors(async (req,res,next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users
  });
})


//Get User details => api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req,res,next) => {
  const user = await User.findById(req.params.id);
  if(!user)
  {
    return next(new ErrorHandler('User does not exist with id :  ' + req.params.id))
  }


res.status(200).json({
  success : "true",
  user
})
})


//Update user Profile => api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async function(req, res, next) {
  const newuserData = {
    name: req.body.name,
    email: req.body.email,
    role : req.body.role
  }
  const user = await User.findByIdAndUpdate(req.params.id, newuserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })
  res.status(200).json({
    success: true
  })
});



//Delete user => api/v1/admin/user/:id
exports.deleteUser= catchAsyncErrors(async (req,res,next) => {
  const user = await User.findById(req.params.id);

  const image_id = user.avatar.public_id;
   await cloudinary.v2.uploader.destroy(image_id);



  if(!user)
  {
    return next(new ErrorHandler('User does not exist with id :  ' + req.params.id))
  }


  await user.remove()

res.status(200).json({
  success : "true",
  })
})
