const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");
const httpStatusText = require("../utils/httpStatusText");

const verifyToken = (req, res, next) => {
  const authHeaders =
    req.headers["Authorization"] || req.headers["authorization"];

  if (!authHeaders) {
    const error = appError.create(
      "token is required",
      httpStatusText.FAIL,
      401
    );
    return next(error);
  }

  const token = authHeaders.split(" ")[1];

  try {
    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentUser = currentUser;
    next();
  } catch (err) {
    const error = appError.create("invalid token", httpStatusText.ERROR, 401);
    next(error);
  }
};

module.exports = verifyToken;
