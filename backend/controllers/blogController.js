const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ErrorHandler = require('../utils/errorhandler')
const Blog = require("../models/blogModel")



exports.createBlog = catchAsyncErrors(async (req, res, next) => {
    const url = req.protocol + '://localhost:5500' 
    //+ req.get('host')
    console.log('blog  controller working_1', req)
    // let profile = req.file ? req.file.filename : null
    let profile = url + '/public/images/' + req.file.filename;
    const  profileName = req.file ? req.file.filename : null


    const { title, description } = req.body;

    const blog = await Blog.create({
        title, description, profile,
        // fileName:profileName
    })

    res.status(201).json({
        success: true,
        blog,
        fileName:profileName

    })


})

exports.getAllBlog = catchAsyncErrors(async (req, res, next) => {
    const allblog = await Blog.find().sort({ _id: -1 })

    res.status(200).json({
        success: true,
        allblog
    })
})

exports.updateBlog = catchAsyncErrors(async (req, res, next) => {

    let blog = await Blog.findById(req.params.id)

    if (!blog) {
        return next(new ErrorHandler("Blog not found", 404))
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: "Blog Updated Successfully",
        blog
    })

})
