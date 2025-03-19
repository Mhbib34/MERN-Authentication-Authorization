import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDb from "./database.js";
import authRouter from "../routes/auth-routes.js";
import errorMiddleware from "../middleware/error-middleware.js";

export const app = express();

connectDb();

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use(errorMiddleware);
