const User = require("../models/user.model");
const httpStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError.js");

const getAllUsers = async (req, res, next) => {
  const users = await User.find({}, { __v: false, password: false });
  if (!users) {
    const error = appError.create("can't find users", 400, httpStatusText.FAIL);
    return next(error);
  }
  return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { users } });
};

const getSingleUser = (req, res, next) => {};

const updateUser = (req, res, next) => {};

const deleteUser = (req, res, next) => {};

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
