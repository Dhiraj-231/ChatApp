import { userSocketIds } from "../index.js";

export const getOtherMember = async (members, userId) => {
    return members.find((members) => members._id.toString() !== userId.toString());
};

export const getSockets = (users = []) => users.map((user) => userSocketIds.get(user._id.toString()));
