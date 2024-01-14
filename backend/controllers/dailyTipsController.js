const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");
const DailyTips = require("../models/dailyTipsModel");

exports.dailyTips = catchAsyncErrors(async (req, res, next) => {
  console.log("working dailytips", req.body);
  const { title, description } = req.body;

  req.body.user = req.user.id;
  console.log('req.user.id', req.user.id)
  // const tips = await DailyTips.create({
  //     title, description
  // })
  // req.body.name = req.user.name;

  const tips = await DailyTips.create(req.body);

  res.status(201).json({
    success: true,
    tips,
  });
});

// get daily tips api
exports.getdailyTips = catchAsyncErrors(async (req, res, next) => {
  const tips = await DailyTips.find();

  res.status(200).json({
    success: true,

    tips,
  });
});

// update daily tips api
exports.updatedailyTips = catchAsyncErrors(async (req, res, next) => {

    let tips = await DailyTips.findById(req.params.id)

    if (!tips) {
        return next(new ErrorHandler("Tips not found", 404))
    }

    tips = await DailyTips.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: "Tips Updated Successfully",
        tips
    })

})