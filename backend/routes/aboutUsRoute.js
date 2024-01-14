const express = require('express')
const {aboutUs ,updateAboutUs}= require('../controllers/aboutusController')
const { isAuthenticatedUser } = require('../middleware/auth')

const router = express.Router()

const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
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

router.route('/aboutUscreate').post(isAuthenticatedUser,upload.single('file'),aboutUs);

router.route('/updateAboutUs/:id').put(isAuthenticatedUser,updateAboutUs)


module.exports = router