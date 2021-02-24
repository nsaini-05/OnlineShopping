
const express = require('express');
//Module for routes like get, post
const router = express.Router();

const {registerUser , loginUser} = require('../controllers/authController')
router.route('/user/register').post(registerUser)
router.route('/user/login').post(loginUser)
module.exports = router
