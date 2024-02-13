const User = require("../models/user.model");
const appError = require("../utils/appError");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { generateJWT } = require("../utils/generateJWT");

const signup = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  const { username, email, password } = req.body;

  if (!errors.array()) {
    const error = appError.create(errors, httpStatusText.FAIL, 400);
    return next(error);
  }

  // check if user name is already used
  const oldUserByName = await User.findOne({ username });
  if (oldUserByName) {
    const error = appError.create(
      "user name already used",
      httpStatusText.FAIL,
      400
    );
    return next(error);
  }

  // check if the user email is already used
  const oldUserByEmail = await User.findOne({ email });
  if (oldUserByEmail) {
    const error = appError.create(
      "email already used",
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

const signin = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = appError.create(
      "email & password are required",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const user = await User.findOne({ email });
  //.select("+password");

  if (!user) {
    const error = appError.create(
      "can not find user by this email.",
      httpStatusText.FAIL,
      401
    );
    return next(error);
  }

  // Match passwords
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const { password, ...rest } = user._doc;

    const token = generateJWT({ email: user.email, id: user._id });
    const expiresMilliseconds = Date.now() + 365 * 24 * 60 * 60 * 1000;
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(expiresMilliseconds),
        path: "/",
      })
      .status(200)
      .json({
        status: httpStatusText.SUCCESS,
        data: { user: rest },
      });
  }

  const error = appError.create("wrong password!", httpStatusText.FAIL, 400);
  return next(error);
});

module.exports = {
  signup,
  signin,
};
