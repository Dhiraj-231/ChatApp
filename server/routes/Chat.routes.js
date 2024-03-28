import express from "express";
import { addMembers, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMembers } from "../controllers/Chat.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/newGroup", isAuthenticated, newGroupChat);
router.get("/my", isAuthenticated, getMyChats);
router.get("/my/group", isAuthenticated, getMyGroups);
router.put("/addMembers", isAuthenticated, addMembers);
router.put("/removeMembers", isAuthenticated, removeMembers);
router.delete("/leave/:id", isAuthenticated, leaveGroup);




export default router;