const app = require('./app');


connectDatabase = require('./config/database')

const dotenv = require('dotenv');

dotenv.config({path: '../ShopIt/backend/config/config.env'});





connectDatabase();







app.listen(process.env.PORT , ()=>{
  console.log('Server started ' + process.env.PORT + " " + process.env.NODE_ENV)
})
