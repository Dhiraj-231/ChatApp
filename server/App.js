import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import ChatRouter from "./routes/Chat.routes.js";
import UserRouter from "./routes/User.routes.js";
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express.json({ limit: "50Mb" }));
app.use(express.urlencoded({ extended: true, limit: '50Mb' }));
app.use(cookieParser());
app.use("/api/v1/auth", UserRouter);
app.use("/api/v1/chat", ChatRouter);

export default app;