const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();
const { addUserValdiation } = require("../middlewares/validationSchema");

router.route("/signup").post(addUserValdiation(), authController.signup);
router.route("/signin").post(authController.signin);

module.exports = router;
