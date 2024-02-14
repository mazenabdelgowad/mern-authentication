const appError = require("../utils/appError");
const httpStatusText = require("../utils/httpStatusText");
module.exports = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.currentUser.role)) {
      return next();
    }

    const error = appError.create(
      "Role is not authorized to perform this action",
      httpStatusText.FAIL,
      403
    );
    return next(error);
  };
};
