

const sendToken = (user, statusCode, res) => {
    console.log('sendtoken entry')
    const token = user.getJWTToken()
    console.log('token', token)

    const options = {
        // from this we get to know when our cookie get expired or expiry timing
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            // Date.now() means whenever our cookie generate
            //here process.env.COOKIE_EXPIRE is days like 2,3,4 days 
            //and process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 means converting it into milliseconds
        ),
        httpOnly: true,
        // secure:true
    };
    console.log('options', options)

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token
    })

}

module.exports = sendToken