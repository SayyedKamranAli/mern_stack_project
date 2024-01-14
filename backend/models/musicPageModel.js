const mongoose = require('mongoose')



const videoSchema = new mongoose.Schema({
    user: {
        // type: mongoose.Schema.Types.ObjectId,
        type: mongoose.Schema.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    videoTitle:{
        type: String,
        required: true,
    },

    videos: 
        {
            videoName: {
                type: String,
                required: true,
            },
           
            videoLink:{
                type:String,
                required:true,
            },
            createdAt: {
                type: Date,
                // default: Date.now,
                default: () => Math.floor(Date.now() / 1000),
            },
        }
    
    // videos: [
    //     {
    //         videoName: {
    //             type: String,
    //             required: true,
    //         },
    //         videoPath: {
    //             type: String,
    //             required: true,
    //         },
    //         videoLink:{
    //             type:String,
    //             required:true,
    //         },
    //         createdAt: {
    //             type: Date,
    //             // default: Date.now,
    //             default: () => Math.floor(Date.now() / 1000),
    //         },
    //     }
    // ],
});
const musicbackgroundImageSchema = new mongoose.Schema({
    profile:String,
    profileName:String

})

const VideoCollection = mongoose.model('VideoCollection', videoSchema);
const MusicBackImage = mongoose.model('MusicVideoBackImages',musicbackgroundImageSchema)



// module.exports = VideoCollection;
// module.exports = MusicBackImage;

module.exports = {
    VideoCollection: VideoCollection,
    MusicBackImage: MusicBackImage
  };
