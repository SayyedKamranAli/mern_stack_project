const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express()
const errormiddleware = require('./middleware/error')

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
// app.use('/public', express.static('public'))
app.use(express.static(__dirname));
// app.use(express.static('public'));

//Route Imports
const user = require('./routes/userRoute')
const tips = require('./routes/dailyTipsRoute')
const interest = require('./routes/interestRoute')
const category = require('./routes/categoryRoute')
const dailyQuizRoute = require('./routes/dailyQuizRoute')
const blog = require('./routes/blogRoute')
const BlockWordsRoute = require('./routes/BlockWordsRoute')
const about = require('./routes/aboutUsRoute')
const dailyExercise_Or_Meditation = require('./routes/dailyExercise_Or_Meditation_Route')
const CustomerService = require('./routes/customerserviceRoute');
const musicVideo = require('./routes/musicVideoRoute')




app.use("/api/V1", user)
app.use("/api/V1", tips)
app.use("/api/V1", interest)
app.use("/api/V1", dailyQuizRoute)
app.use("/api/V1", category)
app.use("/api/V1", blog)
app.use("/api/V1", BlockWordsRoute)
app.use('/api/V1', about)
app.use('/api/V1', dailyExercise_Or_Meditation)
app.use('/api/V1', CustomerService)
app.use('/api/V1',musicVideo)


app.use(errormiddleware)

module.exports = app