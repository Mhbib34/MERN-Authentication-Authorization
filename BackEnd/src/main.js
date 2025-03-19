import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDb from "./config/database.js";
import authRouter from "./routes/auth-routes.js";
import errorMiddleware from "./middleware/error-middleware.js";

const app = express();
const port = process.env.PORT || 4000;
connectDb();

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use(errorMiddleware);

app.get("/", (req, res) => console.log("Working fine"));
app.listen(port, () => console.log(`Start at port ${port}`));
