import transporter from "../config/nodemailer.js";
import { ResponseError } from "../error/response-error.js";
import userModel from "../models/user-model.js";
import {
  loginUser,
  logoutUser,
  registerUser,
  userEmailVerification,
  verifyOtpUser,
} from "../services/auth-services.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await registerUser(name, email, password);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: `Welcome ${name}!`,
      text: `Welcome to our website,Your account has been created with email id: ${email}`,
    };
    await transporter.sendMail(mailOption);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      message: "User login successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.status(200).json(logoutUser());
  } catch (error) {
    next(error);
  }
};

export const sendVerifyOtp = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { otp, user } = await verifyOtpUser(userId);
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: `Account Verify OTP!`,
      text: `Your OTP is ${otp}. Verify your account using this OTP!`,
    };
    await transporter.sendMail(mailOption);

    res.status(200).json({
      success: true,
      message: "Verification OTP sent on email",
    });
  } catch (error) {
    next(error);
  }
};
