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
