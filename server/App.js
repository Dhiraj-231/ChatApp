import cookieParser from "cookie-parser"; // Middleware to parse cookies
import cors from "cors"; // Middleware to enable CORS
import express from "express"; // Framework for building the server
import { createServer } from 'http'; // HTTP server
import ChatRouter from "./routes/Chat.routes.js"; // Route for chat endpoints
import UserRouter from "./routes/User.routes.js"; // Route for user endpoints
import AdminRouter from "./routes/Admin.routes.js"; // Route for admin endpoints
import dotenv from "dotenv"; // Library for accessing environment variables
import { Server } from "socket.io"; // Library for handling websockets
import { v2 as cloudinary } from "cloudinary"; // Library for interacting with cloudinary
import { corsOption } from "./constants/configs.js"; // Configuration for CORS

/**
 * Load environment variables from .env file into process.env
 */
dotenv.config({ "path": "./configs/.env" });

/**
 * Create express application and HTTP server
 */
const app = express();
const server = createServer(app);

/**
 * Set up websockets and attach them to server
 */
const io = new Server(server, { cors: corsOption });

/**
 * Attach websockets to application
 */
app.set("io", io);

/**
 * Configure cloudinary
 */
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Configure middleware
 */
app.use(cors(corsOption)); // Enable CORS
app.use(express.json({ limit: "50Mb" })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: '50Mb' })); // Parse urlencoded bodies
app.use(cookieParser()); // Parse cookies

/**
 * Set up routes
 */
app.use("/api/v1/auth", UserRouter); // Attach user routes
app.use("/api/v1/chat", ChatRouter); // Attach chat routes
app.use("/api/v1/admin", AdminRouter); // Attach admin routes

/**
 * Export application, server, and websockets for use in index.js
 */
export { app, io, server };
