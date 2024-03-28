import { ALERT, REFETCH_CHATS } from "../constants/event.js";
import { getOtherMember } from "../lib/helper.js";
import { Chat } from "../models/Chat.model.js";
import { ApiError } from "../utils/ApiError.js"
import { emitEvent } from "../utils/feather.js";
import { User } from "../models/User.model.js";
export const newGroupChat = async (req, res) => {
    try {
        const { name, members } = req.body;

        if (members.length < 2) throw new ApiError(400, "Group chat must have atLeast 2 member");
        console.log(req.user)
        const allMembers = [...members, req.user];
        const chat = await Chat.create({
            name,
            groupChat: true,
            creator: req.user,
            members: allMembers
        });
        emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
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
}

export const getMyChats = async (req, res) => {
    try {
        const chats = await Chat.find({ members: req.user }).populate({ path: "members", select: "name avatar" })

        const transformChats = chats.map(({ _id, groupChat, members, name, lastMessage }) => {
            const otherMember = getOtherMember(members, req.user);
            return {
                _id,
                groupChat,
                avatar: groupChat ? members.slice(0, 3).map(({ avatar }) => avatar.url) : [otherMember.avatar.url],
                name: groupChat ? name : otherMember.name,
                members: members.reduce((prev, curr) => {
                    if (curr._id.toString() !== req.user.toString()) {
                        prev.push(curr._id);
                    }

                    return prev;
                }, []),
            }
        });

        res.status(200).json({
            success: true,
            chats: transformChats
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


export const getMyGroups = async (req, res) => {
    try {
        const chats = await Chat.find({
            members: req.user,
            groupChat: true,
            creator: req.user
        }).populate("members", "name avatar").select("-_id")
        const groups = chats.map(({ members, _id, groupChat, name }) => ({
            _id,
            groupChat,
            name,
            avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
        }))
        res.status(200).json({
            success: true,
            groups
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const addMembers = async (req, res) => {
    try {
        const { chatId, members } = req.body;
        if (!members || members.length < 1) throw new ApiError(400, "Please provide members")
        const chat = await Chat.findById(chatId);
        if (!chat) throw new ApiError(404, "Chat not found");
        if (!chat.groupChat) throw new ApiError(400, "This is not group chat");
        if (chat.creator.toString() !== req.user.toString()) throw new ApiError(403, "You are not allowed to add members");

        const allNewMembersPromise = members.map(i => User.findById(i, "name"));
        const allNewMembers = await Promise.all(allNewMembersPromise);
        const uniqueMembers = allNewMembers.filter((i) => !chat.members.includes(i._id.toString())).map((i) => i._id);

        if (uniqueMembers.length === 0) throw new ApiError(400, "Members already exists in the chat group")
        chat.members.push(...uniqueMembers);

        if (chat.members.length > 100) throw new ApiError(400, "Group members limit reached");

        await chat.save();

        const allUserName = allNewMembers.map((i) => i.name).join(",");
        emitEvent(req, ALERT, chat.members, `${allUserName} has been added in the group`);
        emitEvent(req, REFETCH_CHATS, chat.members);

        res.status(200).json({
            success: true,
            message: `${uniqueMembers.length} Members added successfully...`
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const removeMembers = async (req, res) => {
    try {
        const { userId, chatId } = req.body;
        const [chat, userThatWillBeRemoved] = await Promise.all([Chat.findById(chatId), User.findById(userId, "name")]);

        if (!chat) throw new ApiError(404, "Chat not found");
        if (!chat.groupChat) throw new ApiError(400, "This is not a group Chat");
        if (chat.creator.toString() !== req.user.toString()) throw new ApiError(403, "You are not allowed to add members");

        if (chat.members.length <= 3) throw new ApiError(400, "Group must have atleast 3 members");

        chat.members = chat.members.filter(member => member.toString() !== userId.toString());

        await chat.save();
        emitEvent(req, ALERT, chat.members, `${userThatWillBeRemoved.name} has been removed from this group`);
        emitEvent(req, REFETCH_CHATS, chat.members);
        res.status(200).json({
            success: true,
            message: `${userThatWillBeRemoved.name} is removed Successfully...`
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const leaveGroup = async (req, res) => {
    try {
        const chatId = req.params.id;

        const chat = await Chat.findById(chatId);
        if (!chat) throw new ApiError(404, "Chat not found");
        if (!chat.groupChat) throw new ApiError(400, "This is not group chat");
        const remainingMembers = chat.members.filter((member) => member.toString() !== req.user.toString());
        if (remainingMembers.length === chat.members.length) throw new ApiError(400, "User already leaved")
        if (remainingMembers.length < 3) throw new ApiError(400, "Group must have atleast 3 members");
        if (chat.creator.toString() === req.user.toString()) {
            const randomNumber = Math.floor(Math.random() * remainingMembers.length);
            const newCreator = remainingMembers[randomNumber];

            chat.creator = newCreator;
        }
        chat.members = remainingMembers;
        const [user] = await Promise.all([User.findById(req.user, "name"), await chat.save()]);
        emitEvent(req, ALERT, chat.members, `${user.name} has left the group..`);
        res.status(200).json({
            success: true,
            message: `${user.name.charAt(0).toUpperCase() + user.name.slice(1)} has left the group..`
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}