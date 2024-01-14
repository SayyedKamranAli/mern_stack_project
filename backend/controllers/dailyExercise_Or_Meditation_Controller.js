const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ErrorHandler = require('../utils/errorhandler')
const Exercise = require("../models/dailyExercise_Or_Meditation_Model")



exports.createExercise = catchAsyncErrors(async (req, res, next) => {
    const url = req.protocol + '://localhost:5500' 
    //+ req.get('host')
    console.log('blog  controller working_1', req)
    // let profile = req.file ? req.file.filename : null
    let profile = url + '/public/images/' + req.file.filename;
    const  profileName = req.file ? req.file.filename : null


    const { title, description } = req.body;

    const exercise = await Exercise.create({
        title, description, profile,
        // fileName:profileName
    })

    res.status(201).json({
        success: true,
        exercise,
        fileName:profileName

    })


})

exports.getAllExercise = catchAsyncErrors(async (req, res, next) => {
    const allexercise = await Exercise.find().sort({ _id: -1 })

    res.status(200).json({
        success: true,
        allexercise
    })
})

exports.updateExercise = catchAsyncErrors(async (req, res, next) => {

    let exercise = await Exercise.findById(req.params.id)

    if (!exercise) {
        return next(new ErrorHandler("Exercise Or Medtitation not found", 404))
    }

    exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: "Exercise Or Medtitation Updated Successfully",
        exercise
    })

})
