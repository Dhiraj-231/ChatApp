import { Chat } from "../models/Chat.model.js";
import { User } from "../models/User.model.js";
import { Message } from "../models/Message.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        const transfromedUsers = await Promise.all(
            users.map(async ({ name, username, avatar, _id }) => {
                const [groups, friends] = await Promise.all([
                    Chat.countDocuments({ groupChat: true, members: _id }),
                    Chat.countDocuments({ groupChat: false, members: _id }),
                ]);
                return {
                    name,
                    username,
                    avatar: avatar.url,
                    _id,
                    groups,
                    friends,
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

export const getAllChats = async (req, res) => {
    try {
        const chats = await Chat.find().populate([
            {
                path: "members",
                select: "name avatar",
            },
            {
                path: "creator",
                select: "name avatar",
            },
        ]);
        const transformChats = await Promise.all(
            chats.map(async ({ members, _id, groupChat, name, creator }) => {
                const totalMessages = await Message.countDocuments({ chat: _id })
                return {
                    _id,
                    groupChat,
                    name,
                    avatar: members.slice(0, 3).map((members) => members.avatar.url),
                    members: members.map(({ _id, name, avatar }) => ({
                        _id,
                        name,
                        avatar: avatar.url,
                    })),
                    creator: {
                        name: creator?.name || "None",
                        avatar: creator?.avatar.url || " ",
                    },
                    totalMembers: members.length,
                    totalMessages,
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

export const getAllMessage = async (req, res) => {
    try {
        const messages = await Message.find({}).populate([
            { path: 'sender', select: "name avatar" },
            { path: "chat", select: "groupChat" }
        ]);
        const transformMessage = messages.map(({ content, attachments, _id, sender, createdAt, chat }) => ({
            content,
            attachments,
            _id,
            sender,
            createdAt,
            chat: chat._id,
            groupChat: chat.groupChat,
            sender: {
                _id: sender._id,
                name: sender.name,
                avatar: sender.avatar.url
            }
        }));
        res.status(200).json({
            success: true,
            message: transformMessage
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

export const getDashBoardStats = async (req, res) => {
    try {
        const [groupCount, usersCount, messageCount, totalChatsCount] = await Promise.all([
            Chat.countDocuments({ groupChat: true }),
            User.countDocuments(),
            Message.countDocuments(),
            Chat.countDocuments(),
        ]);
        const today = new Date();
        const last7Days = new Date();
        last7Days.setDate(last7Days.getDate() - 7);
        const last7DaysMessage = await Message.find({
            createdAt: {
                $gte: last7Days,
                $lte: today
            }
        }).select("createdAt");
        const messages = new Array(7).fill(0);
        last7DaysMessage.forEach(message => {
            const indexApprox = (today.getTime() - message.createdAt.getTime()) / (1000 * 60 * 60 * 24);
            const index = Math.floor(indexApprox);
            messages[6 - index]++;
        })
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
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

export const adminLogin = async (req, res) => {
    try {
        const { secretKey } = req.body;
        const adminSecretKey = process.env.ADMIN_SECRET_KEY || "DhirajRay";

        const isMatched = secretKey === adminSecretKey;

        if (!isMatched) throw new ApiError(401, "Invalid Admin Key..");

        const token = jwt.sign(secretKey, process.env.JWT_SECRET);
        return res.status(200).cookie("admin-token", token, { expires: new Date(Date.now() + 15 * 60 * 1000), httpOnly: true, secure: true }).json({
            success: true,
            message: "Admin Login successfully..."
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

export const adminLogOut = async (req, res) => {
    try {
        return res.status(200).cookie("admin-token", "", { expires: new Date(Date.now()), httpOnly: true, secure: true }).json({
            success: true,
            message: "Admin Logout successfully..."
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const getAdminData = async (req, res) => {
    try {
        res.status(200).json({
            admin: true,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}