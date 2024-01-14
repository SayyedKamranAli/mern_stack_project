const mongoose = require('mongoose')

const interestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    // status: {
    //     type: String,
    //     enum: ['active', 'inactive', 'pending'],
    //     default: 'active',
    // },
    status: {
        type: Boolean,
        default: true, // You can set the default value to true if you prefer
      },
})

module.exports = mongoose.model('Interest',interestSchema)