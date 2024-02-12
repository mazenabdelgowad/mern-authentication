const User = require("../models/user.model");
const appError = require("../utils/appError");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const signup = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  const { username, email, password } = req.body;

  // TEMPORARY
  if (!errors.array()) {
    const error = appError.create(errors, httpStatusText.FAIL, 400);
    return next(error);
  }

  // check if user already exists
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    const error = appError.create(
      "user already exists",
      httpStatusText.FAIL,
      400
    );
    return next(error);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return res.status(201).json({ status: "success", data: { user: newUser } });
});

const signin = async (req, res, next) => {};

module.exports = {
  signup,
  signin,
};
