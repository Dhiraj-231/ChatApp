import { NEW_FRIEND_REQUEST, REFETCH_CHATS } from "../constants/event.js";
import { getOtherMember } from "../lib/helper.js";
import { Chat } from "../models/Chat.model.js";
import { Request } from "../models/Request.model.js";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { emitEvent, uploadFileToCloudinary } from "../utils/feather.js";
export const Register = async (req, res) => {
    try {
        const { name, username, password, bio } = req.body;
        const file = req.file;
        console.log(file);
        if (!file) throw new ApiError(400, "Please upload avatar");
        let user = await User.findOne({
            $or: [{ username }],
        });
        if (user) {
            throw new ApiError(409, "User already exist");
        }

        const result = await uploadFileToCloudinary([file]);
        console.warn(result);
        const avatar = {
            public_id: result[0].public_id,
            url: result[0].url,
        };
        console.log(avatar);
        user = await User.create({
            name,
            username,
            password,
            avatar,
            bio,
        });
        const token = await user.tokenGenerate(user._id);
        res
            .status(201)
            .cookie("token", token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure: true,
            })
            .json({
                success: true,
                message: "User register successfully..",
            });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({
            $or: [{ username }],
        }).select("+password");
        if (!user) throw new ApiError(400, "User not exist");
        const matchPassword = await user.isPasswordCorrect(password);
        if (!matchPassword) throw new ApiError(401, "User or password is wrong...");
        const token = await user.tokenGenerate(user._id);
        res
            .status(200)
            .cookie("token", token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure: true,
            })
            .json({
                success: true,
                message: `Welcome back ${user.name.charAt(0).toUpperCase() + user.name.slice(1)
                    }`,
            });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getMyProfileDetail = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user }).select(
            "-password -createdAt -updatedAt -__v"
        );
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const logout = async (req, res) => {
    try {
        res
            .status(200)
            .cookie("token", "", {
                expires: new Date(Date.now()),
                httpOnly: false,
                secure: false,
            })
            .json({
                success: true,
                message: "Logout Successfully....",
            });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const searchUser = async (req, res) => {
    try {
        const { name } = req.query;

        const myChat = await Chat.find({ groupChat: false, members: req.user });
        // get all Users from chats
        const allUsersFromMyChat = myChat.flatMap((chat) => chat.members);
        // get all Users from chats means friends or people i have chatted with
        const allUsersExceptsMeAndFriends = await User.find({
            _id: { $nin: allUsersFromMyChat },
            name: { $regex: name, $options: "i" },
        });
        const users = allUsersExceptsMeAndFriends.map(({ _id, name, avatar }) => ({
            _id,
            name,
            avatar: avatar.url,
        }));
        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
export const sendFriendRequest = async (req, res) => {
    try {
        const { userId } = req.body;
        if (userId.toString() === req.user.toString())
            throw new ApiError(400, "This Action is not allowed..");
        const request = await Request.findOne({
            $or: [
                { sender: req.user, receiver: userId },
                { sender: userId, receiver: req.user },
            ],
        });
        if (request) throw new ApiError(404, "Request already sent");

        await Request.create({
            sender: req.user,
            receiver: userId,
        });

        emitEvent(req, NEW_FRIEND_REQUEST, [userId]);

        res.status(200).json({
            success: true,
            message: "Friend request Sent..",
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const acceptFriendRequest = async (req, res) => {
    try {
        const { requestId, accept } = req.body;

        const request = await Request.findById(requestId).populate([
            {
                path: "sender",
                select: "name",
            },
            {
                path: "receiver",
                select: "name",
            },
        ]);
        if (!request) throw new ApiError(404, "Request not found");
        if (request.receiver._id.toString() !== req.user.toString())
            throw new ApiError(401, "UnAuthorized..");
        if (!accept) {
            await request.deleteOne();
            res.status(200).json({
                success: true,
                message: "Friend request rejected..",
            });
        }
        const members = [request.sender._id, request.receiver._id];
        const chatName = await Promise.all([
            Chat.create({
                members,
                name: `${request.sender.name}-${request.receiver.name}`,
            }),
            request.deleteOne(),
        ]);

        emitEvent(req, REFETCH_CHATS, "members");

        res.status(200).json({
            success: true,
            message: "Friend Request Accepted",
            senderId: request.sender.name,
            chatName,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
export const getMyNotification = async (req, res) => {
    try {
        const request = await Request.find({ receiver: req.user }).populate(
            "sender",
            "name avatar"
        );
        const allRequests = request.map(({ _id, sender }) => ({
            _id,
            sender: {
                _id: sender._id,
                name: sender.name,
                avatar: sender.avatar.url,
            },
        }));

        res.status(200).json({
            success: true,
            allRequests,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getMyFriends = async (req, res) => {
    try {
        const chatId = req.query.chatId;
        const chats = await Chat.find({
            members: req.user,
            groupChat: false,
        }).populate([{ path: "members", select: "name avatar" }]);
        const friendList = await Promise.all(
            chats.map(async ({ members }) => {
                const otherUser = await getOtherMember(members, req.user);
                return {
                    _id: otherUser._id,
                    name: otherUser.name,
                    avatar: otherUser.avatar.url,
                };
            })
        );
        if (chatId) {
            const chat = await Chat.findById(chatId);
            const availableFriends = friendList.filter(
                (friend) => !chat.members.includes(friend._id)
            );
            return res.status(200).json({
                success: true,
                friends: availableFriends,
            });
        } else {
            return res.status(200).json({
                success: true,
                friends: friendList,
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
