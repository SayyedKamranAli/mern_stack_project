const express = require('express')
const { categoryCreate, getAllCategory, getCategoryEnumValues, SubcategoryCreate, getAllSubCategory, getSubCategoryEnumValues } = require('../controllers/categoryController')
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

router.route('/categoryCreate').post(isAuthenticatedUser, upload.single('file'), categoryCreate)
router.route("/getallcategory").get(isAuthenticatedUser, getAllCategory)
router.route('/getcategoryenumValues').get(isAuthenticatedUser, getCategoryEnumValues)


// ************************Sub-category routes **************//


router.route('/SubcategoryCreate').post(isAuthenticatedUser, upload.single('file'), SubcategoryCreate)

router.route("/getallSubcategory").get(isAuthenticatedUser, getAllSubCategory)

router.route('/getSubcategoryenumValues').get(isAuthenticatedUser, getSubCategoryEnumValues)

module.exports = router