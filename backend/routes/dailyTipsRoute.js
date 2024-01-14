const express = require('express')
const {dailyTips, getdailyTips, updatedailyTips} = require("../controllers/dailyTipsController")
const {isAuthenticatedUser} = require('../middleware/auth')
const router = express.Router()

router.route('/dailytips').post(isAuthenticatedUser,dailyTips)
router.route('/alldailytips').get(isAuthenticatedUser,getdailyTips)
router.route('/updatedailyTips/:id').put(isAuthenticatedUser, updatedailyTips)

module.exports = router