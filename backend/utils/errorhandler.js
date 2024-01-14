
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        console.log('errorHandler called');
        this.statusCode = statusCode

        Error.captureStackTrace(this, this.constructor);

       
    }
}

module.exports = ErrorHandler