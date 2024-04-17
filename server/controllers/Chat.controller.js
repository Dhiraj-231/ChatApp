import { ALERT, NEW_MESSAGE, NEW_MESSAGE_ALERT, REFETCH_CHATS } from "../constants/event.js";
import { getOtherMember } from "../lib/helper.js";
import { Chat } from "../models/Chat.model.js";
import { Message } from "../models/Message.model.js";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { deleteFilesFromCloudinary, emitEvent, uploadFileToCloudinary } from "../utils/feather.js";
/**
 * Create new group chat
 * @param {*} req Express request object
 * @param {*} res Express response object
 */
export const newGroupChat = async (req, res) => {
    try {
        /**
         * Request body containing name and members
         * @type {{name: string, members: string[]}}
         */
        const { name, members } = req.body;
        /**
         * Array of all members including req.user
         * @type {string[]}
         */
        const allMembers = [...members, req.user];

        /**
         * Create chat document
         * @type {Chat}
         */
        const chat = await Chat.create({
            name, // Group chat name
            groupChat: true, // Indicates whether it is group chat
            creator: req.user, // Chat creator
            members: allMembers // Array of member ids
        });

        /**
         * Emit alert to all members of the group
         */
        emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
        /**
         * Emit refetch chats event only to members of the group
         */
        emitEvent(req, REFETCH_CHATS, members);

        res.status(201).json({
            success: true,
            message: 'Group created'
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
};

/**
 * Get all chats of the current user
 * @param {*} req Express request object
 * @param {*} res Express response object
 */
export const getMyChats = async (req, res) => {
    try {
        // Find all chats where current user is a member
        const chats = await Chat.find({ members: req.user }).populate(
            "members", // Populate members array
            "name avatar" // Select only name and avatar fields
        );

        // Map over each chat and transform it to a more compact structure
        const transformedChats = await Promise.all(chats.map(async (chat) => {
            // Get the other member of the chat (not the current user)
            const otherMember = await getOtherMember(chat.members, req.user);

            return {
                _id: chat._id, // Chat id
                groupChat: chat.groupChat, // Indicates whether the chat is a group chat
                avatar: chat.groupChat
                    ? chat.members.slice(0, 3).map(({ avatar }) => avatar.url) // If group chat, get avatars of first 3 members
                    : [otherMember.avatar.url], // If private chat, get the other member avatar
                name: chat.groupChat ? chat.name : otherMember.name, // If group chat, get chat name, else get other member name
                members: chat.members.reduce((prev, curr) => {
                    if (curr._id.toString() !== req.user.toString()) {
                        prev.push(curr._id);
                    }
                    return prev;
                }, []), // Filter members excluding the current user
            };
        }));

        res.status(200).json({
            success: true,
            chats: transformedChats,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
/**
 * Get all groups created by the current user
 * @param {*} req Express request object
 * @param {*} res Express response object
 */
export const getMyGroups = async (req, res) => {
    try {
        // Find all group chats created by the current user
        const chats = await Chat.find({
            members: req.user,
            groupChat: true,
            creator: req.user
        }).populate("members", "name avatar").select("-_id"); // Exclude _id from the response

        /**
         * Map over each group chat and transform it to a more compact structure
         * @param {Object} chat Mongoose document of the group chat
         */
        const groups = chats.map(({ members, _id, groupChat, name }) => ({
            _id, // Group id
            groupChat, // Indicates whether the chat is a group chat
            name, // Chat name
            avatar: members.slice(0, 3).map(({ avatar }) => avatar.url), // Avatars of first 3 members of the group
        }));
        res.status(200).json({
            success: true,
            groups,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

/**
 * Add new members to an existing group chat
 * @param {*} req Express request object
 * @param {*} res Express response object
 */
export const addMembers = async (req, res) => {
    try {
        // Get chat id and array of new member ids from request body
        const { chatId, members } = req.body;
        // Find the chat by id
        const chat = await Chat.findById(chatId);

        // If chat not found, throw error
        if (!chat) throw new ApiError(404, "Chat not found");

        // If chat is not group chat, throw error
        if (!chat.groupChat) throw new ApiError(400, "This is not group chat");

        // If current user is not the creator of the group chat, throw error
        if (chat.creator.toString() !== req.user.toString()) throw new ApiError(403, "You are not allowed to add members");

        // Find all new members by their ids
        const allNewMembersPromise = members.map(i => User.findById(i, "name"));
        // Convert the promise array to an array of user documents
        const allNewMembers = await Promise.all(allNewMembersPromise);

        // Filter out members that already exist in the chat
        const uniqueMembers = allNewMembers.filter((i) => !chat.members.includes(i._id.toString())).map((i) => i._id);

        // If all new members already exist in the chat, throw error
        if (uniqueMembers.length === 0) throw new ApiError(400, "Members already exists in the chat group")

        // Add new members to chat members array
        chat.members.push(...uniqueMembers);

        // If number of members exceeds 100, throw error
        if (chat.members.length > 100) throw new ApiError(400, "Group members limit reached");

        // Save the updated chat document
        await chat.save();

        // Get names of all new members joined the group
        const allUserName = allNewMembers.map((i) => i.name).join(",");

        // Emit alert event to all members of the chat and send message
        // that new members have been added to the group
        emitEvent(req, ALERT, chat.members, `${allUserName} has been added in the group`);

        // Emit refetch chats event to all members of the chat so that
        // they can see the updated chat members list
        emitEvent(req, REFETCH_CHATS, chat.members);

        // Send response with success message
        res.status(200).json({
            success: true,
            message: `${uniqueMembers.length} Members added successfully...`
        })

    } catch (error) {
        // Send error response
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
/**
 * Remove members from a group chat
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 */
export const removeMembers = async (req, res) => {
    try {
        // Get user id and chat id from request body
        const { userId, chatId } = req.body;

        // Find the chat and user that will be removed by their ids
        const [chat, userThatWillBeRemoved] = await Promise.all([
            Chat.findById(chatId),
            User.findById(userId, "name")
        ]);

        // If chat not found, throw error
        if (!chat) throw new ApiError(404, "Chat not found");

        // If chat is not group chat, throw error
        if (!chat.groupChat) throw new ApiError(400, "This is not a group Chat");

        // If current user is not the creator of the group chat, throw error
        if (chat.creator.toString() !== req.user.toString()) throw new ApiError(403, "You are not allowed to add members");

        // If number of members is less than or equals to 3, throw error
        if (chat.members.length <= 3) throw new ApiError(400, "Group must have atleast 3 members");

        // Filter out the member that will be removed from chat members array
        chat.members = chat.members.filter((member) => member.toString() !== userId.toString());

        // Save the updated chat document
        await chat.save();

        // Emit alert event to all members of the chat and send message
        // that a member has been removed from the group
        emitEvent(req, ALERT, chat.members, `${userThatWillBeRemoved.name} has been removed from this group`);

        // Emit refetch chats event to all members of the chat so that
        // they can see the updated chat members list
        emitEvent(req, REFETCH_CHATS, chat.members);

        // Send response with success message
        res.status(200).json({
            success: true,
            message: `${userThatWillBeRemoved.name} is removed Successfully...`
        });
    } catch (error) {
        // Send error response
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Leave a group chat
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 */
export const leaveGroup = async (req, res) => {
    try {
        // Get chat id from request params
        const chatId = req.params.id;
        // Find the chat by id
        const chat = await Chat.findById(chatId);
        // If chat not found, throw error
        if (!chat) throw new ApiError(404, "Chat not found");
        // If chat is not group chat, throw error
        if (!chat.groupChat) throw new ApiError(400, "This is not group chat");
        // Filter out the user from chat members array
        const remainingMembers = chat.members.filter((member) => member.toString() !== req.user.toString());
        // If user already leaved the group, throw error
        if (remainingMembers.length === chat.members.length) throw new ApiError(400, "User already leaved");
        // If number of remaining members is less than 3, throw error
        if (remainingMembers.length < 3) throw new ApiError(400, "Group must have atleast 3 members");
        // If current user is the creator of the group, set a new creator
        if (chat.creator.toString() === req.user.toString()) {
            // Get random number between 0 and length of remaining members - 1
            const randomNumber = Math.floor(Math.random() * remainingMembers.length);
            // Set new creator as one of the remaining members
            const newCreator = remainingMembers[randomNumber];
            chat.creator = newCreator;
        }
        // Update members array with remaining members
        chat.members = remainingMembers;
        // Find the user who will be leaving the group
        const [user] = await Promise.all([User.findById(req.user, "name"), await chat.save()]);
        // Emit alert event to all remaining members of the group and send message
        // that user has left the group
        emitEvent(req, ALERT, chat.members, `${user.name} has left the group..`);
        // Send response with success message
        res.status(200).json({
            success: true,
            message: `${user.name.charAt(0).toUpperCase() + user.name.slice(1)} has left the group..`
        })
    } catch (error) {
        // Send error response
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
};
/**
 * Send attachments to a chat
 * @param {*} req Express request object
 * @param {*} res Express response object
 */
export const sendAttachment = async (req, res) => {
    try {
        // Get chat id from request body
        const { chatId } = req.body;
        // Find the chat by id
        const [chat, me] = await Promise.all([Chat.findById(chatId), User.findById(req.user, "name")]);
        // If chat not found, throw error
        if (!chat) throw new ApiError(404, "Chat not found...");
        // Get uploaded files from request object
        const files = req.files || [];
        // If number of attachments is not between 1 to 5, throw error
        if (files.length < 1 || files.length > 5) throw new ApiError(400, "Please provide attachements between 1 to 5");
        // Upload attachments to cloudinary and get their urls
        const attachments = await uploadFileToCloudinary(files);
        // Create message object for realtime event
        const messageForRealTime = {
            content: "", // Attachments messages have empty content in realtime
            attachments, // Attachments
            sender: {
                _id: me._id, // Sender id
                name: me.name, // Sender name
            },
            chat: chatId // Chat id
        };
        // Create message object for database
        const messageForDb = {
            content: "", // Attachments messages have empty content in database
            attachments,
            sender: me._id,
            chat: chatId
        };
        // Create new message document in database
        const message = await Message.create(messageForDb);
        // Emit new message event to all members of the chat
        emitEvent(req, NEW_MESSAGE, chat.members, {
            message: messageForRealTime,
            chatId
        });
        // Emit new message alert event to all members of the chat
        emitEvent(req, NEW_MESSAGE_ALERT, chat.members, {
            chatId
        });
        // Send response with success message
        res.status(200).json({
            success: true,
            message
        });
    } catch (error) {
        // Send error response
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Get chat detail
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 */
export const getChatDetail = async (req, res) => {
    try {
        // Check if populate query param is true
        if (req.query.populate === "true") {
            // Find chat by id and populate members field with name and avatar fields
            const chat = await Chat.findById(req.params.id).populate("members", "name avatar").lean();

            // If chat not found, throw error
            if (!chat) throw new ApiError(404, "Chat is not found");

            // Map over members array and return only required fields
            chat.members = chat.members.map(({ _id, name, avatar }) => ({
                _id,
                name,
                // Return url of the avatar instead of Mongoose object
                avatar: avatar.url
            }))

            // Send response with chat document
            res.status(200).json({
                success: true,
                chat
            })

        } else {
            // Find chat by id without populating members field
            const chat = await Chat.findById(req.params.id);

            // If chat not found, throw error
            if (!chat) throw new ApiError(404, "Chat not found");

            // Send response with chat document
            res.status(200).json({
                success: true,
                chat
            })
        }

    } catch (error) {
        // Send error response
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
/**
 * Rename a group chat
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 */
export const renameGroup = async (req, res) => {
    try {
        // Get chat id and new name from request params and body
        const chatId = req.params.id;
        const { name } = req.body;

        // Find the chat by id
        const chat = await Chat.findById(chatId);

        // If chat not found, throw error
        if (!chat) throw new ApiError(404, "Chat not found..");

        // If chat is not group chat, throw error
        if (!chat.groupChat) throw new ApiError(400, "This is not a group Chat..");

        // If current user is not the creator of the group chat, throw error
        if (chat.creator.toString() !== req.user.toString()) throw new ApiError(403, "You are not allowed to rename the group");

        // Update the name of the group chat
        chat.name = name;

        // Save the updated chat document
        await chat.save();

        // Emit refetch chats event to all members of the chat so that
        // they can see the updated chat name
        emitEvent(req, REFETCH_CHATS, chat.members);

        // Send response with success message
        res.status(200).json({
            success: true,
            message: "Group renamed Successfully..."
        })
    } catch (error) {
        // Send error response
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}
/**
 * Delete chat from the database
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 */
export const deleteChat = async (req, res) => {
    try {
        // Get chat id from request params
        const chatId = req.params.id;

        // Find chat by id
        const chat = await Chat.findById(chatId);

        // If chat not found throw error
        if (!chat) throw new ApiError(404, "Chat not found..");

        // Get members of chat
        const members = chat.members;

        // If chat is group chat and current user is not the creator,
        // throw error
        if (chat.groupChat && chat.creator.toString() !== req.user.toString()) throw new ApiError(403, "You are not allowed to delete the group");

        // If chat is not group chat and current user is not a member of the chat,
        // throw error
        if (!chat.groupChat && !chat.members.includes(req.user.toString())) throw new ApiError(403, "You are not allowed to delete chat");

        // Find chat messages with attachments
        const messageWithAttachments = await Message.find({ chat: chatId, attachments: { $exists: true, $ne: [] } });

        // Get public ids of attachments
        const public_ids = [];
        messageWithAttachments.forEach(({ attachments }) => {
            attachments.forEach(({ public_id }) => {
                public_ids.push(public_id);
            });
        });

        // Delete files from cloudinary
        // and delete chat, messages and their attachments from the database
        await Promise.all([
            deleteFilesFromCloudinary(public_ids),
            chat.deleteOne(),
            Message.deleteMany({ chat: chatId }),
        ]);

        // Emit refetch chats event to all members of the chat so that
        // they can see the updated chats list
        emitEvent(req, REFETCH_CHATS, members);

        // Send response with success message
        res.status(200).json({
            succcess: true,
            message: "Chat deleted successfully...",
        });
    } catch (error) {
        // Send error response
        res.status(400).json({
            success: false,
            message: "Okay...",
        });
    }
};


/**
 * Get messages of a chat
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {Object} messages of a chat
 */
export const getMessages = async (req, res) => {
    try {
        // Get chat id and page number from request params and query
        const chatId = req.params.id;
        const { page = 1 } = req.query;

        // Set result per page and calculate skip
        const resultPerPages = 20;
        const skip = (page - 1) * resultPerPages;

        // Find messages of a chat, sort by createdAt in descending order,
        // skip and limit result, populate sender name,
        // and get lean message documents
        const [messages, totalMessagesCount] = await Promise.all([
            Message.find({ chat: chatId })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(resultPerPages)
                .populate("sender", "name")
                .lean(),

            // Count total messages of a chat
            Message.countDocuments({ chat: chatId }),
        ]);

        // Get total pages of messages
        const totalPages = Math.ceil(totalMessagesCount / resultPerPages) || 0;

        // Send response with messages and total pages
        res.status(200).json({
            succcess: true,
            message: messages.reverse(),
            totalPages,
        });
    } catch (error) {
        // Send error response
        res.status(400).json({
            succcess: false,
            message: error.message,
        });
    }
};
