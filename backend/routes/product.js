
const express = require('express');

//Module for routes like get, post
const router = express.Router();


//Route Defination
const {getProducts , newProduct} = require('../controllers/productController')

router.route('/product/new').post(newProduct);
router.route('/products').get(getProducts);



module.exports = router
