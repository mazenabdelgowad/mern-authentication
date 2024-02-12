const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.route("/").get(userController.getAllUsers);

module.exports = router;
