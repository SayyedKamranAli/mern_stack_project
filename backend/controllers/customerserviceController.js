const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");
const Queries = require("../models/customerservice");
const User = require("../models/userModel");

exports.addQueris = catchAsyncErrors(async (req, res, next) => {
  const { title, description } = req.body;

  req.body.user = req.user.id;
  console.log("req.user.id", req.user.id);
  // const tips = await DailyTips.create({
  //     title, description
  // })
  // req.body.name = req.user.name;

  const query = await Queries.create(req.body);

  res.status(201).json({
    success: true,
    query,
  });
});

// get customer service api
exports.getQueris = catchAsyncErrors(async (req, res, next) => {
  const query = await Queries.find();

  // const [random] = id;
  // console.log('random', random)
  req.body.user = req.user.id;

  const user = await User.find();
  // const id1 = []
  // user.map((item) => {
  //   const data = item?._id
  //   console.log('item?.name', item?.name)
  //   console.log('id', ...id)
  //  if (data === id[0]){
  //   console.log('item?.name', item?.name)
  //  }
  // }
  //   )
  // console.log('id1', id1)

  const user1 = await User.findById(req.user.id);
  console.log("user1", user1);

  res.status(200).json({
    success: true,


    query,
    user,
  });
});
