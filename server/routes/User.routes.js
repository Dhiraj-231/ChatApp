import express from "express";
import { Register, getMyProfileDetail, login, logout, searchUser } from "../controllers/User.controller.js"
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.post("/register", singleAvatar, Register);
router.post("/login", login);
router.get("/getMyDetail", isAuthenticated, getMyProfileDetail);
router.get("/logout", isAuthenticated, logout);
router.get("/search", searchUser);
export default router;