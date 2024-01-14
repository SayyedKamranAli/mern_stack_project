const mongoose = require('mongoose')


const dailytipsSchema = new mongoose.Schema({

    createdAt: {
        type: Date,
        default: Date.now()
    },
    title: {
        type: String,
        required: [true, "Please enter title"],
        maxLength: [30, "Title cannot exceed 30 characters"],
        minLength: [4, "Title should have more than 8 characters"]
    },
    description: {
        type: String,
        required: [true, "Please enter description"],
        maxLength: [100, "Title cannot exceed 100 characters"],
        minLength: [4, "Title should have more than 8 characters"]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    // createdBy: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "User",
    //     required: true,
    // },
   
})

module.exports = mongoose.model('DailyTips', dailytipsSchema)