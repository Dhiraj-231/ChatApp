/**
 * Retrieves the other member from a conversation
 * @param {Array} members Array of members of the conversation
 * @param {ObjectId} userId The user who is NOT a member of the conversation
 * @returns {Object} The other member of the conversation
 */
export const getOtherMember = async (members, userId) => {
    return members.find((member) => member._id.toString() !== userId.toString());
};

/**
 * Retrieves the socket ids of the users in the array
 * @param {Array} users Array of users
 * @returns {Array} Array of socket ids
 */
export const getSockets = (users = []) => {
    try {
        return users.map((user) => userSocketIds.get(user.toString()));
    } catch (error) {
        throw new ApiError(400, error.message);
    }
};

/**
 * Returns a base64 string from a file buffer
 * @param {File} file The file to convert to base64
 * @returns {String} The base64 string of the file
 */
export const getBase64 = (file) =>
    `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

