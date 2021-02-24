//Create and send token and save in the cookie
const sendToken = (user,statusCode , res )=>
{
//Create jwt token
const token = user.getJwtToken();
//Option for cookie
const options = {
  expires : new Date(
    Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
  ),
  httpOnly : true
    //http cookie cannot be excessed by the js code so it this option is amandatory
}

res.status(statusCode).cookie('token' , token , options).json({
  success : true,
  token,
  user
})
}
module.exports = sendToken
