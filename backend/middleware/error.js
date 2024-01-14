const ErrorHandler = require('../utils/errorhandler')


module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal Server Error"


    // Wrong Mongodb Id error
    if (err.name === "CastError") {
        console.log('casterror1')
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
        console.log('casterror7');
    }
    //Mongoose duplicate key error
    if (err.code === 11000) {
        const message = ` Duplicate ${Object.keys(err.keyValue)} Entered`;
        // err = new ErrorHandler(message, 400);
        err = new ErrorHandler(err.stack, 400);
    }

    //wrong JWT error
    if (err.name === "JsonWebTokenError") {

        const message = ` Json Web Token is invalid, try again`;
        err = new ErrorHandler(message, 400);

    }

    //JWT expire error
    if (err.name === "TokenExpiredError") {
        const message = ` Json web Token is Expired , try again`;
        err = new ErrorHandler(message, 400);
    }

    console.log('error page called', err.statusCode, err.message)
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })

}