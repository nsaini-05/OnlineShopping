const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const errorMiddleWare = require('./middlewares/errors');


app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());




//Import all the routes
const products  = require('./routes/product.js');
const auth  = require('./routes/auth.js');
const orders = require('./routes/order.js')

app.use('/api/v1',products)
app.use('/api/v1',auth)
app.use('/api/v1',orders)
app.use(errorMiddleWare);
module.exports = app;
