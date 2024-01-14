const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ErrorHandler = require('../utils/errorhandler')
const BlockWords = require("../models/blockWordsModel")



exports.createBlockWords = catchAsyncErrors(async (req, res, next) => {

    const {words ,status} =req.body

    const wordsdata = await BlockWords.create({
        words,status
    })
    res.status(201).json({
        success: true,
        wordsdata,

    })

})

exports.getAllBlockWords = catchAsyncErrors(async (req, res, next) => {


    const getallblockwords = await BlockWords.find()

    res.status(200).json({
        success: true,
        getallblockwords
    })
})


exports.updateBlockWords = catchAsyncErrors(async (req, res, next) => {

    let data = await BlockWords.findById(req.params.id)

    if (!data) {
        return next(new ErrorHandler("Blog Words not found", 404))
    }

    data = await BlockWords.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: "Blog Words Updated Successfully",
        data
    })

})
