import express from "express";
import {
    Register,
    acceptFriendRequest,
    getMyFriends,
    getMyNotification,
    getMyProfileDetail,
    login,
    logout,
    searchUser,
    sendFriendRequest
} from "../controllers/User.controller.js";
import {
    acceptRequestValidator,
    sendRequestValidator,
    validateLoginInput,
    validateRegisterInput
} from "../lib/validateInput.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { singleAvatar } from "../middlewares/multer.js";

// User routes
const router = express.Router();

/**
 * Register a new user
 * POST /register
 * @body {username, email, password}
 * @return {token, user}
 */
router.post("/register", singleAvatar, validateRegisterInput, Register);

/**
 * Logs in a user
 * POST /login
 * @body {email, password}
 * @return {token, user}
 */
router.post("/login", validateLoginInput, login);

/**
 * Get the logged in user's profile
 * GET /getMyDetail
 * @return {user}
 */
router.get("/getMyDetail", isAuthenticated, getMyProfileDetail);

/**
 * Logout the user
 * GET /logout
 */
router.get("/logout", isAuthenticated, logout);

/**
 * Search users
 * GET /search?q=searchQuery
 * @return {users}
 */
router.get("/search", isAuthenticated, searchUser);

/**
 * Send a friend request
 * PUT /sendrequest
 * @body {username}
 */
router.put("/sendrequest", sendRequestValidator, isAuthenticated, sendFriendRequest);

/**
 * Accept a friend request
 * PUT /acceptRequest
 * @body {requestId}
 */
router.put("/acceptRequest", acceptRequestValidator, isAuthenticated, acceptFriendRequest);

/**
 * Get the logged in user's notifications
 * GET /notifications
 * @return {notifications}
 */
router.get("/notifications", isAuthenticated, getMyNotification);

/**
 * Get the logged in user's friends
 * GET /friends
 * @return {users}
 */
router.get("/friends", isAuthenticated, getMyFriends);

export default router;
