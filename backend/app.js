const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')

app.use(cookieParser());
app.use(express.json());



//Import all the routes
const errorMiddleWare = require('./middlewares/errors');



const products  = require('./routes/product.js');
const auth  = require('./routes/auth.js');
const orders = require('./routes/order.js')

app.use('/api/v1',products)
app.use('/api/v1',auth)
app.use('/api/v1',orders)
app.use(errorMiddleWare);
module.exports = app;
