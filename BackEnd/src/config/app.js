import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDb from "./database.js";
import authRouter from "../routes/auth-routes.js";
import errorMiddleware from "../middleware/error-middleware.js";
import { userRouter } from "../routes/user-routes.js";

export const app = express();

connectDb();
const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use(errorMiddleware);
