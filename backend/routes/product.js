
const express = require('express');
//Module for routes like get, post
const router = express.Router();
//Route Defination
const {getProducts , newProduct , getSingleProduct, updateProduct, deleteProduct,  createProductReview,getReviews,deleteReview ,getAdminProducts} = require('../controllers/productController')
const {isAuthenticatedUser ,authorizeRoles} = require('../middlewares/auth.js')
router.route('/products').get( getProducts);
router.route('/product/:id').get(getSingleProduct);


//Admin Routes
router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'), newProduct);
router.route('/admin/products').get(isAuthenticatedUser,authorizeRoles('admin'), getAdminProducts);
router.route('/admin/product/:id').put(isAuthenticatedUser ,authorizeRoles('admin'),updateProduct);
router.route('/admin/product/:id').delete(isAuthenticatedUser,authorizeRoles('admin') ,deleteProduct);
router.route('/')
router.route('/review').put(isAuthenticatedUser,createProductReview);
router.route('/reviews').get(isAuthenticatedUser,getReviews);
router.route('/reviews').delete(isAuthenticatedUser,deleteReview);


module.exports = router
