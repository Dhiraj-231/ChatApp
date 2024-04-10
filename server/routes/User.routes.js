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
    validateLoginInput
} from "../lib/validateInput.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { singleAvatar } from "../middlewares/multer.js";
const router = express.Router();

router.post("/register", singleAvatar, Register);
router.post("/login", validateLoginInput, login);
router.get("/getMyDetail", isAuthenticated, getMyProfileDetail);
router.get("/logout", isAuthenticated, logout);
router.get("/search", isAuthenticated, searchUser);
router.put("/sendrequest", sendRequestValidator, isAuthenticated, sendFriendRequest);
router.put("/acceptRequest", acceptRequestValidator, isAuthenticated, acceptFriendRequest);
router.get("/notifications", isAuthenticated, getMyNotification);
router.get("/friends", isAuthenticated, getMyFriends);
export default router;