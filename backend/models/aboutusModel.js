const mongoose = require('mongoose')

const aboutSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Number, // Store timestamp as a number
        default: () => Math.floor(Date.now() / 1000), // Unix timestamp in seconds
    },
    profile:String,
    profileName:String

})

module.exports = mongoose.model('AboutPage', aboutSchema)