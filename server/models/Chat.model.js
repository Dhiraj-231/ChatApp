import mongoose, { Schema } from "mongoose";

/**
 * Schema for Chat collection.
 * @namespace Chat.schema
 */
const chatSchema = new Schema({
    /**
     * Name of the chat.
     * @instance
     * @member {string}
     * @required
     */
    name: {
        type: String,
        required: [true, "Chat name must be provided"]
    },
    /**
     * Indicates whether the chat is a group chat or not.
     * @instance
     * @member {boolean}
     * @default false
     */
    groupChat: {
        type: Boolean,
        default: false,
    },
    /**
     * ID of the user who created the chat.
     * @instance
     * @member {ObjectId}
     * @ref User.schema
     */
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    /**
     * Array of IDs of users who are members of the chat.
     * @instance
     * @member {ObjectId[]}
     * @ref User.schema
     */
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},
    /**
     * Options for the chat schema.
     * @namespace Chat.schema.options
     * @property {Object} timestamps - This option specifies whether to add
     *         createdAt and updatedAt fields to the schema. The createdAt field
     *         records the date and time when the document was first created,
     *         and the updatedAt field records the date and time when the
     *         document was last updated.
     */
    {
        timestamps: true
    });


/**
 * Model for Chat collection.
 * @class
 * @extends external:mongoose.Model
 */
export const Chat = mongoose.model("Chat", chatSchema);
