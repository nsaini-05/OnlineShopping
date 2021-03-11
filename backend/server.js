const app = require('./app');

const cloudinary = require('cloudinary');


connectDatabase = require('./config/database')
const dotenv = require('dotenv');
//Handle the uncaught exceptions

process.on('uncaughtException' , err=>{
  console.log("Error: " + err.message);
  console.log('Shutting down the Server due to uncaught Exception');
  process.exit(1);
})

//Setting Up the configuration file
dotenv.config({path: '../ShopIt/backend/config/config.env'});

//Error Statement
//console.log(a);

//Connecting to Database
connectDatabase();




cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})


const server = app.listen(process.env.PORT , ()=>{
  console.log('Server started ' + process.env.PORT + " " + process.env.NODE_ENV)
})


//Handle Unhandled Promise rejection

process.on('unhandledRejection' , err => {
  console.log('Error: '  + err.message);
  console.log('Shutting down the Server due to Unhandled Promise Rejection');
  server.close(()=>{process.exit(1)})
})
