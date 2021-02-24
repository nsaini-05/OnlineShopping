const express = require('express');
const app = express();
app.use(express.json());



//Import all the routes
const errorMiddleWare = require('./middlewares/errors');



const products  = require('./routes/product.js');
const auth  = require('./routes/auth.js');

app.use('/api/v1',products)
app.use('/api/v1',auth)
app.use(errorMiddleWare);
module.exports = app;
