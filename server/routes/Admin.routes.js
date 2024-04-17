import express from "express";
import {
    adminLogOut,
    adminLogin,
    getAdminData,
    getAllChats,
    getAllMessage,
    getAllUsers,
    getDashBoardStats
} from "../controllers/Admin.controlles.js";
import { adminLoginValidater } from "../lib/validateInput.js";
import { adminOnly } from "../middlewares/auth.js";

/**
 * @description This routers handles all the admin routes
 */
const router = express.Router();

/**
 * @description This route verifies if an admin is logged in
 * @param {Object} req the request object
 * @param {Object} res the response object
 * @returns {Object} returns response object
 */
router.post("/verify", adminLoginValidater, adminLogin);

/**
 * @description This route logs out an admin
 * @param {Object} req the request object
 * @param {Object} res the response object
 * @returns {Object} returns response object
 */
router.get("/logout", adminLogOut);

/**
 * @description This route gets the admin data
 * @param {Object} req the request object
 * @param {Object} res the response object
 * @returns {Object} returns response object
 */
router.get("/", adminOnly, getAdminData);

/**
 * @description This route gets all users
 * @param {Object} req the request object
 * @param {Object} res the response object
 * @returns {Object} returns response object
 */
router.get("/user", adminOnly, getAllUsers);

/**
 * @description This route gets all chats
 * @param {Object} req the request object
 * @param {Object} res the response object
 * @returns {Object} returns response object
 */
router.get("/chats", adminOnly, getAllChats);

/**
 * @description This route gets all messages
 * @param {Object} req the request object
 * @param {Object} res the response object
 * @returns {Object} returns response object
 */
router.get("/messages", adminOnly, getAllMessage);

/**
 * @description This route gets all dashboard stats
 * @param {Object} req the request object
 * @param {Object} res the response object
 * @returns {Object} returns response object
 */
router.get("/getStats", adminOnly, getDashBoardStats);

export default router;
