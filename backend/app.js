const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

//Import all the routes

const products  = require('./routes/product.js');
app.use('/api/v1',products)
module.exports = app;
