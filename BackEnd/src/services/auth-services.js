import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user-model.js";

export const registerUser = async (name, email, password) => {
  if (!name || !email || !password) {
    throw new ResponseError(400, "Missing Details");
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new ResponseError(400, "User already exist");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new userModel({ name, email, password: hashedPassword });
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return { user, token };
};

export const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new ResponseError(400, "Email and password are required");
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new ResponseError(404, "User is not found");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new ResponseError(401, "Incorrect password");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return { user, token };
};

export const logoutUser = () => {
  return { success: true, message: "User logged out successfully" };
};

export const verifyOtpUser = async (userId) => {
  const user = await userModel.findById(userId);
  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  if (user.isAccountVerified) {
    throw new ResponseError(400, "User already verified");
  }

  const otp = String(Math.floor(100000 + Math.random() * 900000));

  user.verifyOtp = otp;
  user.verifyOtpExpireAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await user.save();

  return { otp, user };
};

export const userEmailVerification = async (userId, otp) => {
  if (!userId || !otp) {
    throw new ResponseError(400, "Missing details!");
  }

  const user = await userModel.findById(userId);
  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  if (user.verifyOtpExpireAt < Date.now()) {
    throw new ResponseError(400, "OTP Expired");
  }

  if (user.verifyOtp !== otp.toString()) {
    throw new ResponseError(400, "Invalid OTP");
  }

  user.isAccountVerified = true;
  user.verifyOtp = "";
  user.verifyOtpExpireAt = null;
  await user.save();

  return { user };
};

export const userResetPasswordOtp = async (email) => {
  if (!email) throw new ResponseError(400, "Email is required!");

  const user = await userModel.findOne({ email });
  if (!user) throw new ResponseError(404, "User is not found");

  const otp = String(Math.floor(100000 + Math.random() * 900000));

  user.resetOtp = otp;
  user.resetOtpExpireAt = new Date(Date.now() + 15 * 60 * 1000);
  await user.save();

  return { user, otp };
};

export const userResetPassword = async (email, otp, newPassword) => {
  if (!email || !otp || !newPassword)
    throw new ResponseError(400, "Email, OTP and new password are required");

  const user = await userModel.findOne({ email });
  if (!user) throw new ResponseError(404, "User is not found");

  if (user.resetOtp === "" || user.resetOtp !== otp)
    throw new ResponseError(400, "Invalid OTP");

  if (user.resetOtpExpiredAt < Date.now())
    throw new ResponseError(400, "OTP expired!");

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  user.resetOtp = "";
  user.resetOtpExpiredAt = null;

  await user.save();

  return { user };
};
