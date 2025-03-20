import express from "express";
import { getUserHandler } from "../controller/user-controller.js";
import userAuth from "../middleware/user-auth-middleware.js";

export const userRouter = express.Router();

userRouter.get("/profile", userAuth, getUserHandler);
