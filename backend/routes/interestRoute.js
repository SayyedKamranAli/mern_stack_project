const express = require('express')
const { interest, updateInterest, getInterest } = require('../controllers/interestController')
const { isAuthenticatedUser } = require('../middleware/auth')

const router = express.Router()


router.route('/interestAdd').post(isAuthenticatedUser, interest)
router.route('/allInterest').get( getInterest)
router.route('/updateInterest/:id').put(isAuthenticatedUser, updateInterest)

module.exports = router