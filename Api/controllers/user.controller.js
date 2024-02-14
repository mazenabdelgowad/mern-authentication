const User = require("../models/user.model");
const httpStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError.js");

const getAllUsers = async (req, res, next) => {
  const users = await User.find({}, { __v: false, password: false });
  if (!users) {
    const error = appError.create("can't find users", httpStatusText.FAIL, 400);
    return next(error);
  }
  return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { users } });
};

module.exports = {
  getAllUsers,
};
