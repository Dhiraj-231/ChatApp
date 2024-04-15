import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) throw new ApiError(401, "Please Login first..");
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode._id;
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const adminOnly = async (req, res, next) => {
    try {
        const token = req.cookies?.["admin-token"];
        if (!token) throw new ApiError(401, "Please login first as admin");
        const adminId = jwt.verify(token, process.env.JWT_SECRET);
        const adminSecretKey = process.env.ADMIN_SECRET_KEY || "DhirajRay";
        const idMatched = adminSecretKey === adminId
        if (!idMatched) throw new ApiError(401, "Please login first...");

        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

export const socketAuthenticator = async (err, socket, next) => {
    try {
        const authToken = socket?.request?.cookies?.token;
        if (!authToken) throw new ApiError("No auth token found");

        const decode = jwt.verify(authToken, process.env.JWT_SECRET);
        if (!decode?._id) throw new ApiError("Invalid token");

        const user = await User.findById(decode._id).select("-password");
        if (!user) throw new ApiError("User not found");

        socket.user = user;
        next();
    } catch (error) {
        console.log("Authentication error:", error.message);
        // return next(new ApiError("Authentication error"));
    }
}