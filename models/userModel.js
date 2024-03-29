// const mongoose = require("mongoose");
// const validator = require("validator");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const crypto = require("crypto");

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please Enter Your Name"],
//     maxLength: [30, "Name cannot exceed 30 charaters"],
//     minLength: [4, "Name should have more then 4 charaters"],
//   },
//   email: {
//     type: String,
//     required: [true, "Please Enter Your Email"],
//     unique: true,
//     validate: [validator.isEmail, "Please enter a valid Email"],
//   },
//   password: {
//     type: String,
//     required: [true, "Please Enter Your Password"],
//     minLength: [8, "Password should have more then 8 charaters"],
//     select: false, //dont show password to anyone , not even admin
//   },
//   avatar: {
//     public_id: {
//       type: String,
//       required: [true],
//     },
//     url: {
//       type: String,
//       required: [true],
//     },
//   },
//   role: {
//     type: String,
//     default: "user",
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now(),
//   },

//   resetPasswordToken: String,
//   resetPasswordExpire: Date,
// });

// //hashing password using brcypt
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     //checking if user is uupdating its data so, is password also modified or not, if not then next
//     next();
//   }
//   this.password = await bcrypt.hash(this.password, 10); //if password is modified or register first time then hash this.password
// });

// // JWT Token method
// userSchema.methods.getJWTToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRETE, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };

// //Compare Password method
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// // getResetPasswordToken METHOD => Generating password reset token
// userSchema.methods.getResetPasswordToken = function () {
//   //Generating token
//   const resetToken = crypto.randomBytes(20).toString("hex");

//   //Hashing and adding resetPassword to userSchema
//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   this.resetPasswordExpire = Date.now() + 15 * 60 * 100;

//   return resetToken;
// };

// module.exports = mongoose.model("User", userSchema);

import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 charaters"],
    minLength: [4, "Name should have more than 4 charaters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should have more than 8 charaters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: [true],
    },
    url: {
      type: String,
      required: [true],
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Hashing password using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT Token method
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRETE, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// getResetPasswordToken METHOD => Generating password reset token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
