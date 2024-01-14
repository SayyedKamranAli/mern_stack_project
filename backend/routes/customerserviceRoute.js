const express = require("express");
const {
  addQueris,
  getQueris,
} = require("../controllers/customerserviceController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/addquery").post(isAuthenticatedUser, addQueris);
router.route("/allquery").get(isAuthenticatedUser, getQueris);
// router.route('/updatedailyTips/:id').put(isAuthenticatedUser, updatedailyTips)

module.exports = router;