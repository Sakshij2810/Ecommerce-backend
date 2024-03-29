// const ErrorHandler = require("../utils/errorHandler");

// module.exports = (err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   err.message = err.message || "Internal Server Error";

//   //Wrong mongoDB id error(CastError)
//   if (err.name === "CastError") {
//     const message = `Resource not found. Invaild ${err.path}`;
//     err = new ErrorHandler(message, 400);
//   }

//   // Mongoose duplicate key error
//   //"E11000 duplicate key error collection: Ecommerce.users index: email_1 dup key: { email: \"abhishek@gmail.com\"

//   if (err.code === 11000) {
//     //Object.keys(err.keyValue) ==> to find out because of what this error is coming(email,id,password,etc)
//     const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
//     err = new ErrorHandler(message, 400);
//   }

//   // Wrong JWT Error
//   if (err.name === "JsonWebTokenError") {
//     const message = `Json Web Token is invalid, Try again`;
//     err = new ErrorHandler(message, 400);
//   }

//   // JWT Expire error
//   if (err.name === "TokenExpiredError") {
//     const message = `Json Web Token is Expired, Try again`;
//     err = new ErrorHandler(message, 400);
//   }

//   res.status(err.statusCode).json({
//     success: false,
//     message: err.message,
//     //error: err.stack
//   });
// };

// //this code exports a middleware function for handling errors in an Express.js application.
// //It ensures that the error object has a status code and a message,
// // and then sends a JSON response with the appropriate status code and error information.

import ErrorHandler from "../utils/errorHandler.js";

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong mongoDB id error(CastError)
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose duplicate key error
  //"E11000 duplicate key error collection: Ecommerce.users index: email_1 dup key: { email: \"abhishek@gmail.com\"
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT Error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again`;
    err = new ErrorHandler(message, 400);
  }

  // JWT Expire error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    // error: err.stack
  });
};

export default errorHandler;
