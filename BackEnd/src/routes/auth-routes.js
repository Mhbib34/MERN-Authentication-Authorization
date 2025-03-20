import express from "express";
import {
  login,
  logout,
  register,
  sendVerifyOtp,
} from "../controller/auth-controller.js";
import userAuth from "../middleware/user-auth-middleware.js";

const authRouter = express.Router();
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);

export default authRouter;
