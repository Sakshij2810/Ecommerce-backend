// // Create token and saving in cookie
// //because we are repeating same lines so we made seperate file for saving space

// const sendToken = (user, statusCode, res) => {
//   //accessing token from user getJWTToken method, which is created in userModel
//   const token = user.getJWTToken();

//   // options for cookie
//   const options = {
//     expires: new Date(
//       Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//   };

//   res.status(statusCode).cookie("token", token, options).json({
//     success: true,
//     user,
//     token,
//   });
// };

// module.exports = sendToken;

export default function sendToken(user, statusCode, res) {
  const token = user.getJWTToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
}
