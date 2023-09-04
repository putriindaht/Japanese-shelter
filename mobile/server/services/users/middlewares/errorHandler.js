const errorHandler = (err, req, res, next) => {
  let message = "Internal server error";
  let code = 500;
  switch (err.name) {
    case "BSONTypeError":
      message = "Not found";
      code = 400;
      break;
    case "not found":
      message = err.message;
      code = 404;
      break;
  }
  res.status(code).json({
    message: message,
  });
};

module.exports = errorHandler;
