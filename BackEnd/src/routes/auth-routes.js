import express from "express";
import {
  isAuthenticated,
  login,
  logout,
  register,
  resetUserPassword,
  sendResetPasswordOtp,
  sendVerifyOtp,
  verifyEmail,
} from "../controller/auth-controller.js";
import userAuth from "../middleware/user-auth-middleware.js";

const authRouter = express.Router();
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);
authRouter.post("/is-auth", userAuth, isAuthenticated);
authRouter.post("/send-reset-otp", sendResetPasswordOtp);
authRouter.post("/reset-password", resetUserPassword);

export default authRouter;
