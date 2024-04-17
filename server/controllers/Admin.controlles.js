import { Chat } from "../models/Chat.model.js";
import { User } from "../models/User.model.js";
import { Message } from "../models/Message.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
/**
 * Get all users with their basic info, groups and friends count.
 * @route   GET /api/admin/users
 * @access  Private (Admin)
 */
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password"); // Don't send password to client

        const transfromedUsers = await Promise.all(
            users.map(async (user) => { // Transform each user
                const { name, username, avatar, _id } = user;

                // Get groups and friends count
                const [groups, friends] = await Promise.all([
                    Chat.countDocuments({ groupChat: true, members: _id }),
                    Chat.countDocuments({ groupChat: false, members: _id }),
                ]);

                return {
                    name, // User name
                    username, // User username
                    avatar: avatar.url, // User avatar url
                    _id, // User id
                    groups, // User groups count
                    friends, // User friends count
                };
            })
        );

        res.status(200).json({
            success: true,
            users: transfromedUsers,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Get all chats with their details, members, messages count
 * @route   GET /api/admin/chats
 * @access  Private (Admin)
 */
export const getAllChats = async (req, res) => {
    try {
        const chats = await Chat.find().populate([
            {
                path: "members", // Chat members
                select: "name avatar", // Select fields from members
            },
            {
                path: "creator", // Chat creator
                select: "name avatar", // Select fields from creator
            },
        ]);

        const transformChats = await Promise.all(
            chats.map(async ({
                members, // Chat members
                _id, // Chat id
                groupChat, // Is groupChat
                name, // Chat name
                creator, // Chat creator
            }) => {
                const totalMessages = await Message.countDocuments({ chat: _id }); // Total messages count

                return {
                    _id, // Chat id
                    groupChat, // Is groupChat
                    name, // Chat name
                    avatar: members.slice(0, 3).map((members) => members.avatar.url), // Chat avatar(first 3 members avatar)
                    members: members.map(({ _id, name, avatar }) => ({ // Chat members
                        _id,
                        name,
                        avatar: avatar.url,
                    })),
                    creator: {
                        name: creator?.name || "None", // Chat creator name
                        avatar: creator?.avatar.url || " ", // Chat creator avatar
                    },
                    totalMembers: members.length, // Total members count
                    totalMessages, // Total messages count
                };
            })
        );

        res.status(200).json({
            success: true,
            chats: transformChats,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Get all messages with their details, sender, chat, attachments
 * @route   GET /api/admin/messages
 * @access  Private (Admin)
 */
export const getAllMessage = async (req, res) => {
    try {
        const messages = await Message.find({}).populate([ // Find all messages
            {
                path: "sender", // Message sender
                select: "name avatar", // Select fields from sender
            },
            {
                path: "chat", // Message chat
                select: "groupChat", // Select fields from chat
            }
        ]);

        const transformMessage = messages.map(({ // Map each message
            content, // Message content
            attachments, // Message attachments
            _id, // Message id
            sender, // Message sender
            createdAt, // Message createdAt
            chat, // Message chat
        }) => ({
            content, // Message content
            attachments, // Message attachments
            _id, // Message id
            sender: {
                _id: sender._id, // Message sender id
                name: sender.name, // Message sender name
                avatar: sender.avatar.url, // Message sender avatar
            },
            createdAt, // Message createdAt
            chat: chat._id, // Message chat id
            groupChat: chat.groupChat, // Message chat is groupChat
        }));

        res.status(200).json({ // Send response
            success: true,
            message: transformMessage,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Get Dashboard stats like group count, user count, total message count, total chats count, message count for last 7 days
 * @route   GET /api/admin/dashboard-stats
 * @access  Private (Admin)
 */
export const getDashBoardStats = async (req, res) => {
    try {
        /**
         * Get count of group chats, total users, total messages, total chats and
         * message count of last 7 days
         */
        const [groupCount, usersCount, messageCount, totalChatsCount, last7DaysMessage] =
            await Promise.all([
                Chat.countDocuments({ groupChat: true }),
                User.countDocuments(),
                Message.countDocuments(),
                Chat.countDocuments(),
                Message.find({
                    createdAt: {
                        $gte: new Date().setDate(new Date().getDate() - 7),
                        $lte: new Date()
                    }
                }).select("createdAt")
            ]);

        /**
         * Create an array of length 7 (for last 7 days) and fill it with 0,
         * then iterate through last 7 day's messages and increment the index
         * in messages array based on the date of message,
         * i.e message sent 2 days ago will have index 5 in messages array
         */
        const messages = new Array(7).fill(0);
        last7DaysMessage.forEach(message => {
            const indexApprox =
                (new Date().getTime() - message.createdAt.getTime()) /
                (1000 * 60 * 60 * 24);
            const index = Math.floor(indexApprox);
            messages[6 - index]++;
        });

        const stats = {
            groupCount,
            usersCount,
            messageCount,
            totalChatsCount,
            messageChart: messages
        }

        res.status(200).json({
            success: true,
            stats
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Login as admin by providing the correct secret key
 * @route   POST /api/admin/login
 * @access  Public
 */
export const adminLogin = async (req, res) => {
    try {
        // Get secret key from request body
        const { secretKey } = req.body;

        // Get admin secret key from environment variables
        const adminSecretKey = process.env.ADMIN_SECRET_KEY || "DhirajRay";

        // Check if secret key is correct
        const isMatched = secretKey === adminSecretKey;

        // If secret key is not correct then throw error
        if (!isMatched) throw new ApiError(401, "Invalid Admin Key..");

        // Create token using JWT
        const token = jwt.sign(secretKey, process.env.JWT_SECRET);

        // Set cookie for response with token and expiration time
        return res.status(200).cookie("admin-token", token, {
            expires: new Date(Date.now() + 15 * 60 * 1000),
            httpOnly: true, // Only accessible through HTTP requests
            secure: true,
        }).json({
            success: true,
            message: "Admin Login successfully..."
        });
    } catch (error) {
        // Send error response if any error occurs
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Logout admin by removing the admin-token cookie
 * @route   POST /api/admin/logout
 * @access  Private (Admin)
 */
export const adminLogOut = async (req, res) => {
    try {
        // Remove admin-token cookie and set expiration to past date
        return res.status(200).cookie("admin-token", "", {
            expires: new Date(Date.now()),
            httpOnly: true, // Only accessible through HTTP requests
            secure: true, // Only accessible through HTTPS requests
        }).json({
            success: true,
            message: "Admin Logout successfully...",
        });
    } catch (error) {
        // Send error response if any error occurs
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}


/**
 * Get admin data if admin is logged in
 * @route   GET /api/admin/data
 * @access  Private (Admin)
 * @returns {Object} Admin data
 */
export const getAdminData = async (req, res) => {
    try {
        // Send admin data to client
        res.status(200).json({
            admin: true, // Set admin to true
        });
    } catch (error) {
        // Send error response if any error occurs
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
