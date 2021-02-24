const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema =  new mongoose.Schema({
  name:{
    type:String,
    required : [true ,  'Please enter the your name'],
    maxLength  : [30 , 'Your name cannot exceed 30 characters']
  },
  email:{
    type : String,
    required : [true, ' Please enter your email'],
    unique : true,
    validate:{
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
      isAsync: false
    }

  },
  password : {
    type : String,
    required : [true , "Please enter your password"],
    minLength : [6 , 'Your password cannot ber less than 6 Characters'],
    select : false,

  } ,
  avatar : {
    public_id : {
      type : String,
      required : true
    },
    url :{
      type : String,
      required : true
    }
  },
  role : {
    type : String,
    default : 'user'
  },
  createdAt : {
    type : Date,
    deafult : Date.now
  } ,
  resetPasswordToken: String,
  resetPasswordExpire : Date
})


//Encrypting password before saving user

userSchema.pre('save', async function(next)
{
  if(!this.isModified('password'))
  {
    next()
  }
this.password = await bcrypt.hash(this.password , 10);
})


userSchema.methods.comparePassword =  async function (enteredPassword){
  return await bcrypt.compare(enteredPassword , this.password)
}

//Return JWT token
userSchema.methods.getJwtToken = function(){
  return jwt.sign({id : this._id } , process.env.JWT_SECRET, {
    expiresIn : process.env.JWT_EXPIRES_TIME
  })
}




module.exports = mongoose.model('user' , userSchema)
