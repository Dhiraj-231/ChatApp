import express from "express";
import { addMembers, getChatDetail, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMembers, renameGroup, sendAttachment } from "../controllers/Chat.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { attachmentsMulter } from "../middlewares/multer.js";

const router = express.Router();

router.post("/newGroup", isAuthenticated, newGroupChat);
router.get("/my", isAuthenticated, getMyChats);
router.get("/my/group", isAuthenticated, getMyGroups);
router.put("/addMembers", isAuthenticated, addMembers);
router.put("/removeMembers", isAuthenticated, removeMembers);
router.delete("/leave/:id", isAuthenticated, leaveGroup);
router.post("/message", isAuthenticated, attachmentsMulter, sendAttachment);
router.get("/:id", isAuthenticated, getChatDetail);
router.put("/:id", isAuthenticated, renameGroup);




export default router;