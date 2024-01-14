const express = require('express')
const { registerUser, loginUser ,logout,getUserDetails , getAllUsers, updateUserRole} = require('../controllers/userController')
const { isAuthenticatedUser } = require('../middleware/auth')
const router = express.Router()



router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logout)
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route('/getAllUsers').get(isAuthenticatedUser,getAllUsers);
router.route('/user/:id').put(isAuthenticatedUser,updateUserRole)




module.exports = router