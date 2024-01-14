const mongoose = require('mongoose')
 
const customerSchema =new mongoose.Schema({
   
    description: {
        type: String,
        required: [true, "Please enter description"],
        maxLength: [100, "Title cannot exceed 100 characters"],
        minLength: [4, "Title should have more than 8 characters"]
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'pending'],
        default: 'active',
    },
    resolve:{
        type: Boolean
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },

})

module.exports = mongoose.model('Queries', customerSchema)