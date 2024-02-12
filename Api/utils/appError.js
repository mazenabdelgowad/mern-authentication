class AppError extends Error {
  constructor() {
    super();
  }

  create = (message, statusText, statusCode) => {
    this.message = message;
    this.statusText = statusText;
    this.statusCode = statusCode;
    return this;
  };
}

module.exports = new AppError();
