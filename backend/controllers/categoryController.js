const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ErrorHandler = require('../utils/errorhandler')
const Category = require("../models/categoryModel")
const Subcategory = require("../models/subcategoryModel")



exports.categoryCreate = catchAsyncErrors(async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')

    console.log('category  controller working_1', req)
    console.log('category  controller working_2', req.file)
    console.log('category  controller working_3', req.file.filename)
    // let profile = req.file ? req.file.filename : null
    let profile = url + '/public/images/' + req.file.filename;

    const profileName = req.file ? req.file.filename : null


    const { name, description, status } = req.body;

    // const category = await Category.create({
    //     name, description, status, profile,

    // })
    const category = await Category.create({
        name, description, status, profile,
        profileName: profileName

    })
    // category.fileName =profileName

    res.status(201).json({
        success: true,
        category,
        // fileName:profileName

    })


})

exports.getAllCategory = catchAsyncErrors(async (req, res, next) => {
    const allcategory = await Category.find()

    res.status(200).json({
        success: true,
        allcategory
    })
})

exports.getCategoryEnumValues = catchAsyncErrors((req, res, next) => {
    const statusEnumValues = Category.schema.path('status').enumValues;
    // const statusEnumValues = Category.schema.path('status').enum;
    res.status(200).json({
        success: true,
        statusEnumValues
    });

})

//*****************Subcategory - section  ************************** */

exports.SubcategoryCreate = catchAsyncErrors(async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')

    
    
    let profile = url + '/public/images/' + req.file.filename;

    const profileName = req.file ? req.file.filename : null


    const { name, description, status, categoryId } = req.body;

    
    const category = await Subcategory.create({
        name, description, status, profile,categoryId,
        profileName: profileName 

    })
    
    console.log('category data checking', category);
    
    res.status(201).json({
        success: true,
        category: {
            categoryId: category._id, // Include the generated categoryId in the response
            ...category.toObject()    // Spread the rest of the category properties
        }
    });


})


exports.getAllSubCategory = catchAsyncErrors(async (req, res, next) => {
    const allcategory = await Subcategory.find()

    res.status(200).json({
        success: true,
        allcategory
    })
})


exports.getSubCategoryEnumValues = catchAsyncErrors((req, res, next) => {
    const statusEnumValues = Subcategory.schema.path('status').enumValues;
    // const statusEnumValues = Category.schema.path('status').enum;
    res.status(200).json({
        success: true,
        statusEnumValues
    });

})
