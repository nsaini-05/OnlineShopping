
const express = require('express');
//Module for routes like get, post
const router = express.Router();

const {registerUser , loginUser , logout, forgotPassword ,resetPassword} = require('../controllers/authController')
router.route('/user/register').post(registerUser)
router.route('/user/login').post(loginUser)
router.route('/user/logout').get(logout)
router.route('/user/password/forgot').post(forgotPassword)

router.route('/password/reset/:token').put(resetPassword)


module.exports = router
