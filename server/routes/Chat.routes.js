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
} from "../lib/validateInput.js";

/**
 * Chat API routes
 */
const router = express.Router();

/**
 * Create new group chat
 * @route POST /api/chat/newGroup
 * @group Chat
 * @param {string} name.required - Group name
 * @param {array<string>} members.required - Group member's id
 * @returns {string} chatId 
 */
router.post("/newGroup", validateChatSchema, isAuthenticated, newGroupChat);

/**
 * Get all chats of current user
 * @route GET /api/chat/my
 * @group Chat
 * @returns {array<object>} chats
 */
router.get("/my", isAuthenticated, getMyChats);

/**
 * Get all group chats of current user
 * @route GET /api/chat/my/group
 * @group Chat
 * @returns {array<object>} groups
 */
router.get("/my/group", isAuthenticated, getMyGroups);

/**
 * Add members to group
 * @route PUT /api/chat/addMembers
 * @group Chat
 * @param {string} chatId.required - Chat id
 * @param {array<string>} members.required - Members' id
 * @returns {string} OK
 */
router.put("/addMembers", addMemberValidater, isAuthenticated, addMembers);

/**
 * Remove members from group
 * @route PUT /api/chat/removeMembers
 * @group Chat
 * @param {string} chatId.required - Chat id
 * @param {array<string>} members.required - Members' id
 * @returns {string} OK
 */
router.put("/removeMembers", removeMemberValidater, isAuthenticated, removeMembers);

/**
 * Leave group chat
 * @route DELETE /api/chat/leave/:id
 * @group Chat
 * @param {string} id.required - Chat id
 * @returns {string} OK
 */
router.delete("/leave/:id", leaveGroupValidater, isAuthenticated, leaveGroup);

/**
 * Send attachment to group chat
 * @route POST /api/chat/message
 * @group Chat
 * @param {string} chatId.required - Chat id
 * @param {File} attachment
 * @returns {string} attachmentId
 */
router.post("/message", isAuthenticated, attachmentsMulter, sendAttachmentValidater, sendAttachment);

/**
 * Get messages of a chat
 * @route GET /api/chat/message/:id
 * @group Chat
 * @param {string} id.required - Chat id
 * @returns {array<object>} messages
 */
router.get("/message/:id", getMessageValidater, isAuthenticated, getMessages);

/**
 * Get chat detail
 * @route GET /api/chat/:id
 * @group Chat
 * @param {string} id.required - Chat id
 * @returns {object} chat
 */
router.get("/:id", getChatDetailValidater, isAuthenticated, getChatDetail);

/**
 * Rename group chat
 * @route PUT /api/chat/:id
 * @group Chat
 * @param {string} id.required - Chat id
 * @param {string} name.required - New name
 * @returns {string} OK
 */
router.put("/:id", renameChatValidater, isAuthenticated, renameGroup);

/**
 * Delete group chat
 * @route DELETE /api/chat/:id
 * @group Chat
 * @param {string} id.required - Chat id
 * @returns {string} OK
 */
router.delete("/:id", deleteChatValidater, isAuthenticated, deleteChat);

export default router;
