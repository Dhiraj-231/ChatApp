import express from "express";
import {
    addMembers,
    deleteChat,
    getChatDetail,
    getMessages,
    getMyChats,
    getMyGroups,
    leaveGroup,
    newGroupChat,
    removeMembers,
    renameGroup,
    sendAttachment
} from "../controllers/Chat.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { attachmentsMulter } from "../middlewares/multer.js";
import {
    addMemberValidater,
    deleteChatValidater,
    getChatDetailValidater,
    getMessageValidater,
    leaveGroupValidater,
    removeMemberValidater,
    renameChatValidater,
    sendAttachmentValidater,
    validateChatSchema
} from "../lib/validateInput.js"

const router = express.Router();

router.post("/newGroup", validateChatSchema, isAuthenticated, newGroupChat);
router.get("/my", isAuthenticated, getMyChats);
router.get("/my/group", isAuthenticated, getMyGroups);
router.put("/addMembers", addMemberValidater, isAuthenticated, addMembers);
router.put("/removeMembers", removeMemberValidater, isAuthenticated, removeMembers);
router.delete("/leave/:id", leaveGroupValidater, isAuthenticated, leaveGroup);
router.post("/message", isAuthenticated, attachmentsMulter, sendAttachmentValidater, sendAttachment);
router.get("/message/:id", getMessageValidater, isAuthenticated, getMessages);
router.get("/:id", getChatDetailValidater, isAuthenticated, getChatDetail);
router.put("/:id", renameChatValidater, isAuthenticated, renameGroup);
router.delete("/:id", deleteChatValidater, isAuthenticated, deleteChat);




export default router;