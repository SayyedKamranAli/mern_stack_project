const express = require('express')
const { createBlog, getAllBlog, updateBlog } = require('../controllers/blogController')
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
console.log("category route page working")

router.route('/createBlog').post(isAuthenticatedUser, upload.single('file'), createBlog)
router.route("/getAllBlog").get(isAuthenticatedUser, getAllBlog)

router.route('/updateBlog/:id').put(isAuthenticatedUser, updateBlog)
//router.route('/getcategoryenumValues').get(isAuthenticatedUser, getCategoryEnumValues)


module.exports = router