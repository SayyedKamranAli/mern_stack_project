const ErrorHandler = require('../utils/errorhandler')
const catchAsyncErrors = require('./catchAsyncErrors')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    console.log('test_tokenCookies working');
    // console.log('test_tokenCookies', req);

    const { token } = req.cookies;
    console.log('test_tokenCookiesafter', token);

    if (token == "null" || token == " ") {
        return next(new ErrorHandler('Please Login to access to this resource', 401))
    }

    const decodeddata = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decodeddata.id)
    next()

})