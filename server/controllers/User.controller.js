import { NEW_FRIEND_REQUEST, REFETCH_CHATS } from "../constants/event.js";
import { getOtherMember } from "../lib/helper.js";
import { Chat } from "../models/Chat.model.js";
import { Request } from "../models/Request.model.js";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { emitEvent, uploadFileToCloudinary } from "../utils/feather.js";
/**
 * Register new user
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {Object} Json data to client
 */
export const Register = async (req, res) => {
    try {
        // destructure request body
        const { name, username, password, bio } = req.body;
        // get file from request
        const file = req.file;

        // check if the file is not uploaded
        if (!file) {
            throw new ApiError(400, "Please upload avatar");
        }

        // find user by username in database
        let user = await User.findOne({
            $or: [{ username }],
        });

        // check if user already exist
        if (user) {
            throw new ApiError(409, "User already exist");
        }

        // upload file to cloudinary and get result
        const result = await uploadFileToCloudinary([file]);

        // destructure public_id and url from result
        const { public_id, url } = result[0];

        // create avatar object
        const avatar = {
            public_id,
            url,
        };

        // create user
        user = await User.create({
            name,
            username,
            password,
            avatar,
            bio,
        });

        // generate token
        const token = await user.tokenGenerate(user._id);

        // set cookie and send response to client
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
        // send error response to client
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Login user
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {Object} Json data to client
 */
export const login = async (req, res) => {
    try {
        // destructure request body
        const { username, password } = req.body;

        // find user by username in database
        const user = await User.findOne({
            $or: [{ username }],
        }).select("+password"); // select password to match

        // check if user is exist
        if (!user) throw new ApiError(400, "User not exist");

        // match password with hashed password
        const matchPassword = await user.isPasswordCorrect(password);

        // check if password is correct
        if (!matchPassword) throw new ApiError(401, "User or password is wrong...");

        // generate token
        const token = await user.tokenGenerate(user._id);

        // set cookie and send response to client
        res
            .status(200)
            .cookie("token", token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure: true,
            })
            .json({
                success: true,
                message: `Welcome back ${user.name.charAt(0).toUpperCase() + user.name.slice(1)}`,
            });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Get current user's profile detail
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {Object} Json data to client
 */
export const getMyProfileDetail = async (req, res) => {
    try {
        // find user by userId in database
        const user = await User.findOne({ _id: req.user }).select(
            "-password -updatedAt -__v" // exclude password, updatedAt and __v from response
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

/**
 * Logout user
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {Object} Json data to client
 */
export const logout = async (req, res) => {
    try {
        // Clear cookie and send response to client
        res
            .status(200) // Set status code to 200
            .cookie("token", "", { // Clear token cookie
                expires: new Date(Date.now()), // Set expiry date to now
                httpOnly: false, // Enable cookie to be accessible from JS
                secure: false, // Disable secure cookie
            })
            .json({ // Send json response
                success: true, // Set success to true
                message: "Logout Successfully....", // Set message
            });
    } catch (error) {
        res.status(400).json({ // Set status code to 400
            success: false, // Set success to false
            message: error.message, // Set message
        });
    }
};

/**
 * Search user by name
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {Object} Json data to client
 */
export const searchUser = async (req, res) => {
    try {
        // destructure query params
        const { name = "" } = req.query;
        // Get all chats that is not group chat and i am a member
        const myChat = await Chat.find({ groupChat: false, members: req.user });
        // Get all Users from chats
        const allUsersFromMyChat = myChat.flatMap((chat) => chat.members);
        // Get all Users from chats means friends or people i have chatted with
        const allUsersExceptsMeAndFriends = await User.find({
            // Exclude id of all users from my chat and all users that has my name
            _id: { $nin: allUsersFromMyChat },
            name: { $regex: name, $options: "i" },
        });
        // Map users to get only id, name and avatar
        const users = allUsersExceptsMeAndFriends.map(
            ({ _id, name, avatar }) => ({
                _id,
                name,
                avatar: avatar.url,
            })
        );
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
/**
 * Send friend request
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {Object} Json data to client
 */

export const sendFriendRequest = async (req, res) => {
    try {
        // destructure userId from request body
        const { userId } = req.body;

        // check if userId is not equal to logged in user id
        if (userId.toString() === req.user.toString())
            throw new ApiError(400, "This action is not allowed."); // return error if its the same user

        // find any request that has same sender and receiver
        const request = await Request.findOne({
            $or: [
                { sender: req.user, receiver: userId }, // if sender is logged in user and receiver is userId
                { sender: userId, receiver: req.user }, // or if sender is userId and receiver is logged in user
            ],
        });

        // throw error if request already exist
        if (request) throw new ApiError(404, "Request already sent");

        // create new request
        await Request.create({
            sender: req.user, // sender: logged in user
            receiver: userId, // receiver: userId
        });

        // emit event to notify the receiver about new request
        emitEvent(req, NEW_FRIEND_REQUEST, [userId]);

        // return success response
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

/**
 * Accept friend request
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {Object} Json data to client
 */
export const acceptFriendRequest = async (req, res) => {
    try {
        // destructure requestId and accept from request body
        const { requestId, accept } = req.body;

        // find request by requestId
        const request = await Request.findById(requestId).populate([
            {
                // populate request sender
                path: "sender",
                // select only name
                select: "name",
            },
            {
                // populate request receiver
                path: "receiver",
                // select only name
                select: "name",
            },
        ]);
        // throw error if request not found
        if (!request)
            throw new ApiError(404, "Request not found");
        // check if receiver is logged in user
        if (request.receiver._id.toString() !== req.user.toString())
            throw new ApiError(401, "UnAuthorized..");
        // if accept is false,
        if (!accept) {
            // delete request document
            await request.deleteOne();
            // return success response
            return res.status(200).json({
                success: true,
                message: "Friend request rejected..",
            });
        }

        // create chat members array
        const members = [request.sender._id, request.receiver._id];
        // create chat name by concatenating senders and receivers name
        const chatName = await Promise.all([
            // create chat document
            Chat.create({
                members,
                name: `${request.sender.name}-${request.receiver.name}`,
            }),
            // delete request document
            request.deleteOne(),
        ]);

        // emit event to notify client to refetch chats
        emitEvent(req, REFETCH_CHATS, "members");

        // return success response
        res.status(200).json({
            success: true,
            message: "Friend Request Accepted",
            // return sender's name
            senderId: request.sender.name,
            // return newly created chat name
            chatName,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
/**
 * Get all notification
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {Object} Json data to client
 */
export const getMyNotification = async (req, res) => {
    try {
        // find all request that receiver is logged in user
        const request = await Request.find({ receiver: req.user }).populate(
            // populate sender object from request
            "sender",
            // select only name and avatar from sender
            "name avatar"
        );
        // map over requests
        const allRequests = request.map(({ _id, sender }) => ({
            // return id and sender object
            _id,
            sender: {
                // return sender id, name and avatar url
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

/**
 * Get list of friends
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {Object} Json data to client
 */
export const getMyFriends = async (req, res) => {
    try {
        // get chat id from query params
        const chatId = req.query.chatId;

        // find all chats that has logged in user
        const chats = await Chat.find({
            members: req.user,
            groupChat: false,
        })
            .populate([{
                // populate members array from chat document
                path: "members",
                // select only name and avatar from members
                select: "name avatar",
            }]);

        // map over chats to get other member
        const friendList = await Promise.all(chats.map(
            async ({
                members,
            }) => {
                // get other member from members array
                const otherUser = await getOtherMember(members, req.user);
                // return id, name and avatar url of other user
                return {
                    _id: otherUser._id,
                    name: otherUser.name,
                    avatar: otherUser.avatar.url,
                };
            }
        ));

        // check if chat id is given
        if (chatId) {
            // find chat by chat id
            const chat = await Chat.findById(chatId);
            // filter friends that is not included in chat members
            const availableFriends = friendList.filter(
                (friend) => !chat.members.includes(friend._id)
            );
            // return json response with available friends
            return res.status(200).json({
                success: true,
                friends: availableFriends,
            });
        } else {
            // return json response with all friends
            return res.status(200).json({
                success: true,
                friends: friendList,
            });
        }
    } catch (error) {
        // return json error response
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

