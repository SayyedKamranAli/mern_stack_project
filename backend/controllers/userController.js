const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ErrorHandler = require('../utils/errorhandler')
const User = require('../models/userModel')
const sendToken = require('../utils/jwtToken')



//Register User

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    console.log('check')
    const user = await User.create({
        name, email, password
    })

    // res.status(201).json({
    //     success: true,
    //     user
    // })
    sendToken(user, 201, res)
})

//Login User 

exports.loginUser = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;
    console.log('loginuser working', email, password);

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email and Password", 400))
    }
    const user = await User.findOne({ email }).select('+password')
    console.log('user in backend', user.isBlocked);

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }
    if(user.isBlocked){
        return next(new ErrorHandler("User is Blocked",401))
    }

    const isPasswordMatched = await user.comparePassword(password)
    console.log('ispasswordmatched', isPasswordMatched);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    sendToken(user, 200, res)

})

//logout

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", "null", {
        expire: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});


exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })

})



exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    console.log('test_getuserdetails');
    const user = await User.findById(req.user.id);

    // if(!user){ // not need here because it is not possible that user not get his details because this route only access to those who logged in

    // }

    res.status(200).json({
        success: true,
        user
    });

});


exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`User not exist with this id : ${req.params.id}`, 401))
    }

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        isBlocked:req.body.isBlocked
    }

    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success:true,
        message:"User Updated Successfully"
    })

})