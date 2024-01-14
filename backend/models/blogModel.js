const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Please Enter your Title'],
        maxLength: [30, 'Name cannot exceed 30 characters'],
        minLength: [4, "Name should have more than 4 characters"]
    },
    description: {
        type: String,
        required: [true, "Please enter description"],
        maxLength: [100, "Title cannot exceed 100 characters"],
        minLength: [4, "Title should have more than 8 characters"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
        // default: () => moment().toDate(),
        // default: () => moment().format('DD-MM-YYYY, HH:mm')

    },
    profile:String
    
    // status: {
    //     type: Boolean,
    //     default: true, // You can set the default value to true if you prefer
    //   },


})


module.exports = mongoose.model('Blog',blogSchema)