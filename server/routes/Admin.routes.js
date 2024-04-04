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

const router = express.Router();
router.post("/verify", adminLoginValidater, adminLogin);
router.get("/logout", adminLogOut);
router.get("/", adminOnly, getAdminData);
router.get("/user", adminOnly, getAllUsers);
router.get("/chats", adminOnly, getAllChats);
router.get("/messages", adminOnly, getAllMessage);
router.get("/getStats", adminOnly, getDashBoardStats);





export default router;