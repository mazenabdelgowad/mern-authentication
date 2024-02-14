const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");
const roles = require("../utils/roles");

router
  .route("/")
  .get(verifyToken, allowedTo(roles.ADMIN), userController.getAllUsers);

module.exports = router;
