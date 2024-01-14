const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const About = require("../models/aboutusModel")


exports.aboutUs = catchAsyncErrors(async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    console.log('aboutus  controller working_2', req.file)
    console.log('aboutus  controller working_3', req.file.filename)
    let profile = url + '/public/images/' + req.file.filename;

    const profileName = req.file ? req.file.filename : null


    const { title, content } = req.body;
    const aboutcontent = await About.create({
        title, content, profile,
        profileName: profileName
    })
    res.status(201).json({
        success: true,
        aboutcontent,
        message: "AboutUs Created Successfully",


    })

})

exports.updateAboutUs = catchAsyncErrors(async (req, res, next) => {

    console.log('data of about us req body',req);
    const { title, content } = req.body
    let aboutus = await About.findById(req.params.id);

    const datatosend = {
        title, content
    }

    aboutus = await About.findByIdAndUpdate(req.params.id, datatosend, {
        new: true,
        runValidators: true,
        useFindAndModify: false

    })
    res.status(200).json({
        success: true,
        message: "AboutUs Update Successfully",
        aboutus
    })


})