import express from "express";
import {
    Register,
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
const router = express.Router();

router.post("/register", validateRegisterInput, singleAvatar, Register);
router.post("/login", validateLoginInput, login);
router.get("/getMyDetail", isAuthenticated, getMyProfileDetail);
router.get("/logout", isAuthenticated, logout);
router.get("/search", isAuthenticated, searchUser);
router.put("/sendrequest", sendRequestValidator, isAuthenticated, sendFriendRequest);
router.put("/acceptRequest", acceptRequestValidator, isAuthenticated, sendFriendRequest);
export default router;