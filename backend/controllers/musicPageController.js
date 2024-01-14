const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ErrorHandler = require('../utils/errorhandler')
const models = require("../models/musicPageModel")
const VideoCollection = models.VideoCollection;
const MusicBackImage = models.MusicBackImage;

// const VideoCollection =require("../models/musicPageModel")

// const MusicBackImage = require('../models/musicPageModel')

// exports.MusicVideoCreate = catchAsyncErrors(async (req, res) => {

//     const url = req.protocol + '://' + req.get('host')

//     // let videoLink = url + '/public/videos/' + req.file.filename;

//     const userId = req.user._id; // Assuming you have user authentication
//     console.log('userId in music',userId , req.user.name)
//     const uploadedVideos = req.files.map((file) => ({
//         videoName: file.originalname,
//         videoPath: file.path,
//         // videoLink : url + '/public/videos/' + file.filename
//         videoLink : url + '/public/videos/' + file.filename
//     }));

//     // const videoCollection = await VideoCollection.findOneAndUpdate(
//     //     { userId },
//     //     { $push: { videos: { $each: uploadedVideos } } },
//     //     { upsert: true, new: true }
//     // );

//     // Find the video collection for the specific user
//     let videoCollection = await VideoCollection.findOne({ userId });
//     console.log('video collection *********',videoCollection)

//     // If no video collection exists, create a new one
//     if (!videoCollection) {
//         // videoCollection.user = userId
//         console.log('if condition video **************')
//         videoCollection = await VideoCollection.create({ user:userId, videos: uploadedVideos });
//     } else {
//         console.log('else condition video **************')
//         // If video collection exists, push the uploaded videos
//         videoCollection.videos.push(...uploadedVideos);

//         await videoCollection.save();
//     }

//     // videoCollection.user = req.user._id
//     // videoCollection.user = userId

//     res.status(200).json({
//         message: 'Videos uploaded successfully',
//         videoCollection
//     });




// })


exports.MusicVideoCreate = catchAsyncErrors(async (req, res) => {
console.log('only req *********',req)
    const url = req.protocol + '://' + req.get('host')

    const userId = req.user._id;

    const uploadedvideo = {
        videoLink: url + '/public/videos/' + req.file.filename,
        videoName: req.file.filename,
    }
    console.log('uploaded video *********',uploadedvideo)

    const { videoTitle } = req.body;
    console.log('uploaded title *********',videoTitle)

    const videocollection = await VideoCollection.create({ user: userId, videoTitle: videoTitle, videos: uploadedvideo });
    

    res.status(201).json({
        message: 'Videos uploaded successfully',
        videocollection
    });

})


exports.getAllVideos = catchAsyncErrors(async (req, res) => {

    const allvideos = await VideoCollection.find()

    res.status(200).json({
        message: "Videos get succesfully",
        allvideos
    })

})

exports.MusicBackImageCreate = catchAsyncErrors(async(req,res)=>{
    const url = req.protocol + '://' + req.get('host')
    let profile = url + '/public/images/' + req.file.filename;
    const profileName = req.file ? req.file.filename : null
    const category = await MusicBackImage.create({
         profile,
        profileName: profileName

    })
    res.status(201).json({
        success: true,
        category,
        

    })

})
exports.getAllMusicBackImages = catchAsyncErrors(async (req, res) => {

    const allImages = await MusicBackImage.find()

    res.status(200).json({
        message: "Images get succesfully",
        allImages
    })

})

