const express = require('express');

//Module for routes like get, post
const router = express.Router();


//Route Defination

const { getProducts } = require('../controllers/productController')


//router.route('/products').get(getProducts);




router.get('/products', getProducts)


module.exports = router
