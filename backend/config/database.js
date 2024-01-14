const mongoose = require('mongoose')

 const connectDatabase = async () => {
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
        dbName: "personal"
    })
    console.log(`mondodb connected on - ${connection.host}`)
}


module.exports = connectDatabase