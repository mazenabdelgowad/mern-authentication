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
      .isEmail()
      .custom(async (value) => {
        const existingUser = await Users.findByEmail(value);
        if (existingUser) {
          throw new Error("emil already used");
        }
      })
      .notEmpty()
      .withMessage("email is required"),
    body("password").trim().notEmpty().withMessage("password is required"),
  ];
};

module.exports = {
  addUserValdiation,
};
