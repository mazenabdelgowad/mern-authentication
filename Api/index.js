const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const url = process.env.MONGODB_URL;
const port = process.env.PORT || 5000;
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const httpStatusText = require("./utils/httpStatusText.js");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB Server Started");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

// User routes handler
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

// asyncWrapper error handler
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
    data: null,
    code: error.statusCode || 500,
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
