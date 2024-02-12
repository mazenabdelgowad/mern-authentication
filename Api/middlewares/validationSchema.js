const { body } = require("express-validator");

const addUserValdiation = () => {
  return [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("user name is required")
      .isLength({ min: 4 })
      .withMessage("user name has min length 4 characters"),
    body("email")
      .trim()
      .notEmpty()
      .whitelist("email is required")
      .isEmail()
      .withMessage("Enter a valid email address"),
    body("password").trim().notEmpty().withMessage("password is required"),
  ];
};

module.exports = {
  addUserValdiation,
};
