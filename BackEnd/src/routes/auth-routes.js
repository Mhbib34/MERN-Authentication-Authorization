import express from "express";
import { register } from "../controller/auth-controller.js";

const authRouter = express.Router();
authRouter.post("/register", register);

export default authRouter;
