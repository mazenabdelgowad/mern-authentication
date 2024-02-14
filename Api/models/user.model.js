const mongoose = require("mongoose");
const roles = require("../utils/roles");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [roles.ADMIN, roles.USER],
      default: roles.USER,
    },
  },
  { timestamps: true }
);

// timetamps == the time of creation account, and time of last update/modification

module.exports = mongoose.model("User", userSchema);
