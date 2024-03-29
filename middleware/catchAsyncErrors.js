// module.exports = theFunc = (req, res, next) => {
//   Promise.resolve(theFunc(req, res, next)).catch(next);
// };

//sakshi change
// const catchAsyncErrors = (func) => (req, res, next) => {
//   Promise.resolve(func(req, res, next)).catch(next);
// };

// module.exports = catchAsyncErrors;

const catchAsyncErrors = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch(next);
};

export default catchAsyncErrors;
