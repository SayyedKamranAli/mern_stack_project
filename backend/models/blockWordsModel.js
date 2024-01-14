const mongoose = require('mongoose')


const BlockWords = new mongoose.Schema({


    words: {
        type: String,
        required: [true, "Please enter Words"],
        maxLength: [100, "Words cannot exceed 100 characters"],
        minLength: [4, "Words should have more than 8 characters"]
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
   
    status: {
        type: String,
        enum: ['active', 'inactive', 'pending'],
        default: 'active',
    },

})


module.exports = mongoose.model('BlockWords',BlockWords)