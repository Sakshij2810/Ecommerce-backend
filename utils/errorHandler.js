// class ErrorHandler extends Error {
//   constructor(message, statusCode) {
//     super(message), (this.statusCode = statusCode);

//     Error.captureStackTrace(this, this.constructor);
//   }
// }

// module.exports = ErrorHandler;

// //In summary, this code defines a custom error handler class ErrorHandler that extends the built-in Error class.
// // Instances of ErrorHandler can be created with custom error messages and status codes,
// // and the class provides a standardized way to handle and represent errors within a Node.js application.

export default class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
