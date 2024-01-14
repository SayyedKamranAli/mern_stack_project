const express = require('express')
const { MusicVideoCreate, getAllVideos, MusicBackImageCreate, getAllMusicBackImages } = require('../controllers/musicPageController')
// const { MusicVideoCreate, getAllVideos} = require('../controllers/musicPageController')

const { isAuthenticatedUser } = require('../middleware/auth')

const router = express.Router()

const multer = require('multer')
const path = require('path')
//given by gpt
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/videos'); // Set your desired upload directory
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname));
//     },
// });

// const upload = multer({ storage });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        // cb(null, 'D:\\practice reacct\\Archika didi Project\\backend\\public\\images')
        const destinationPath = path.join(__dirname, '..', 'public', 'videos');
        cb(null, destinationPath);

    },


    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }

})


const storage1 = multer.diskStorage({
    destination: function (req, file, cb) {

        // cb(null, 'D:\\practice reacct\\Archika didi Project\\backend\\public\\images')
        const destinationPath = path.join(__dirname, '..', 'public', 'images');
        cb(null, destinationPath);

    },


    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }

})


const upload = multer({ storage: storage });
const upload1 = multer({ storage: storage1 });

// router.route('/musicVideoCreate').post(isAuthenticatedUser,upload.array('videos', 5),MusicVideoCreate)
router.route('/musicVideoCreate').post(isAuthenticatedUser, upload.single('videos'), MusicVideoCreate)
// router.route('/musicVideoCreate').post(isAuthenticatedUser, MusicVideoCreate)
router.route('/allvideos').get(isAuthenticatedUser, getAllVideos)
router.route('/musicPageBackgroundImageCreate').post(isAuthenticatedUser, upload1.single('file'), MusicBackImageCreate)
router.route('/allmusicbackImages').get(isAuthenticatedUser, getAllMusicBackImages)


module.exports = router
