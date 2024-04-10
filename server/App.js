import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createServer } from 'http'
import ChatRouter from "./routes/Chat.routes.js";
import UserRouter from "./routes/User.routes.js";
import AdminRouter from "./routes/Admin.routes.js"
import dotenv from "dotenv";
import { Server } from "socket.io";
import { v2 as cloudinary } from "cloudinary";
dotenv.config({ "path": "./configs/.env" })
const app = express();
const server = createServer(app);
const io = new Server(server, {});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:4173"],
    credentials: true,
}));
app.use(express.json({ limit: "50Mb" }));
app.use(express.urlencoded({ extended: true, limit: '50Mb' }));
app.use(cookieParser());
app.use("/api/v1/auth", UserRouter);
app.use("/api/v1/chat", ChatRouter);
app.use("/api/v1/admin", AdminRouter);

export { app, io, server };