import mongoose, { Schema } from "mongoose";

/**
 * This is the schema for messages. It contains the message content,
 * an array of attachments, a reference to the sender and the chat it belongs to.
 */
const messageSchema = new Schema({
    /**
     * The content of the message.
     */
    content: {
        type: String,
        required: [true, "Content must be provided."],
    },
    /**
     * An array of attachments. Each attachment contains an object with two fields:
     * public_id and url.
     */
    attachments: [{
        /**
         * The public ID of the attachment.
         */
        public_id: {
            type: String,
            required: [true, "ID must be provided"],
        },
        /**
         * The URL of the attachment.
         */
        url: {
            type: String,
            required: [true, "Url must be provided"],
        }
    }],
    /**
     * A reference to the user that sent the message.
     */
    sender: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Sender must be provided"],
    },
    /**
     * A reference to the chat that the message belongs to.
     */
    chat: {
        type: mongoose.Types.ObjectId,
        ref: "Chat",
        required: [true, "Chat must be provided"],
    },
},
    /**
     * Timestamps enable createdAt and updatedAt fields to be added
     * to the schema.
     */
    {
        timestamps: true,
    });

/**
 * A Mongoose model for messages.
 */
export const Message = mongoose.model("Message", messageSchema);
