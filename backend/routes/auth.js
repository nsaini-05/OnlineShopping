const express = require('express');
//Module for routes like get, post
const router = express.Router();

const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser
} = require('../controllers/authController')
const {
  isAuthenticatedUser,
  authorizeRoles
} = require('../middlewares/auth')

router.route('/user/register').post(registerUser)
router.route('/user/login').post(loginUser)

router.route('/user/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)

router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);
router.route('/user/logout').get(isAuthenticatedUser, logout)

router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers)
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers)
router.route('/admin/user/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
router.route('/admin/user/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)



module.exports = router
