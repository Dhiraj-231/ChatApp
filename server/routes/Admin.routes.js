import express from "express";
import {
    getAllChats,
    getAllMessage,
    getAllUsers,
    getDashBoardStats
} from "../controllers/Admin.controlles.js";

const router = express.Router();


router.get("/user", getAllUsers);
router.get("/chats", getAllChats);
router.get("/messages", getAllMessage);
router.get("/getStats", getDashBoardStats);





export default router;