import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

/**
 * This middleware authenticates the user by verifying the JWT token
 * sent in the request cookies
 */
export const isAuthenticated = async (req, res, next) => {
    try {
        // Try to extract the token from the request cookies
        const token = req.cookies?.token;

        // If no token is found, return an error
        if (!token) {
            throw new ApiError(401, "Please Login first..");
        }

        // Verify the token with the JWT_SECRET environment variable
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        // Store the user's id in the request object
        req.user = decode._id;

        // Call the next middleware
        next();
    } catch (error) {
        // Return an error response if authentication fails
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

/**
 * This middleware authenticates the request as an admin
 * by verifying the admin token sent in the request cookies
 */
export const adminOnly = async (req, res, next) => {
    try {
        // Try to extract the admin token from the request cookies
        const token = req.cookies?.["admin-token"];

        // If no token is found, return an error
        if (!token) {
            throw new ApiError(401, "Please login first as admin");
        }

        // Verify the admin token with the JWT_SECRET environment variable
        const adminId = jwt.verify(token, process.env.JWT_SECRET);

        // Compare the admin secret key with the id in the token
        const adminSecretKey = process.env.ADMIN_SECRET_KEY || "DhirajRay";
        const idMatched = adminSecretKey === adminId;

        // If the id in the token doesn't match the secret key, return an error
        if (!idMatched) {
            throw new ApiError(401, "Please login first as admin");
        }

        // Call the next middleware if authentication is successful
        next();
    } catch (error) {
        // Return an error response if authentication fails
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

/**
 * This middleware authenticates the socket connection
 * by verifying the JWT token sent in the request cookies
 */
export const socketAuthenticator = async (err, socket, next) => {
    try {
        // Try to extract the token from the request cookies
        const authToken = socket?.request?.cookies?.token;

        // If no token is found, throw an error
        if (!authToken) throw new ApiError("No auth token found");

        // Verify the token with the JWT_SECRET environment variable
        const decode = jwt.verify(authToken, process.env.JWT_SECRET);

        // If the token is invalid, throw an error
        if (!decode?._id) throw new ApiError("Invalid token");

        // Find the user by their id in the token
        const user = await User.findById(decode._id).select("-password");

        // If the user is not found, throw an error
        if (!user) throw new ApiError("User not found");

        // Store the user in the socket object
        socket.user = user;

        // Call the next middleware if authentication is successful
        next();
    } catch (error) {
        // Log the error and return an error response
        console.log("Authentication error:", error.message);
        return next(new ApiError("Authentication error"));
    }
}