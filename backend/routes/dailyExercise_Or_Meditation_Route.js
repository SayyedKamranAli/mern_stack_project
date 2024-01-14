const express = require('express')
const { createExercise, getAllExercise, updateExercise} = require('../controllers/dailyExercise_Or_Meditation_Controller')
const { isAuthenticatedUser } = require('../middleware/auth')
const router = express.Router()
const multer = require('multer')
const path = require('path')
// const cooli = require('../public/images')

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

router.route('/createExercise').post(isAuthenticatedUser, upload.single('file'), createExercise)
router.route("/getAllExercise").get(isAuthenticatedUser, getAllExercise)

router.route('/updateExercise/:id').put(isAuthenticatedUser, updateExercise)
//router.route('/getcategoryenumValues').get(isAuthenticatedUser, getCategoryEnumValues)


module.exports = router