const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ErrorHandler = require('../utils/errorhandler')
const Interest = require('../models/interestModel')


exports.interest = catchAsyncErrors(async (req, res, next) => {
    const { name, status } = req.body;

    // const interest1 = await Interest.create({
    //     name,status
    // })
    const interest1 = await Interest.create(req.body);

    res.status(201).json({
        success: true,
        message: "Interest Created Successfully",
        interest1
    })
})

exports.getInterest = catchAsyncErrors(async (req, res, next) => {
    const allInterests = await Interest.find()

    res.status(200).json({
        success: true,

        allInterests
    })
})

exports.updateInterest = catchAsyncErrors(async (req, res, next) => {

    let interest = await Interest.findById(req.params.id)

    if (!interest) {
        return next(new ErrorHandler("Interest not found", 404))
    }

    interest = await Interest.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: "Interest Updated Successfully",
        interest
    })

})