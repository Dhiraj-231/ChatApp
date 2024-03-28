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
