
const express = require('express');
//Module for routes like get, post
const router = express.Router();
//Route Defination
const {getProducts , newProduct , getSingleProduct, updateProduct, deleteProduct} = require('../controllers/productController')
router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);


//Admin Routes
router.route('/admin/product/new').post(newProduct);
router.route('/admin/product/:id').put(updateProduct);
router.route('/admin/product/:id').delete(deleteProduct);


module.exports = router
