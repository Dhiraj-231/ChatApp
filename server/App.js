import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createServer } from 'http'
import ChatRouter from "./routes/Chat.routes.js";
import UserRouter from "./routes/User.routes.js";
import AdminRouter from "./routes/Admin.routes.js"
import { Server } from "socket.io";
const app = express();
const server = createServer(app);
const io = new Server(server, {});
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express.json({ limit: "50Mb" }));
app.use(express.urlencoded({ extended: true, limit: '50Mb' }));
app.use(cookieParser());
app.use("/api/v1/auth", UserRouter);
app.use("/api/v1/chat", ChatRouter);
app.use("/api/v1/admin", AdminRouter);

export { app, io, server };