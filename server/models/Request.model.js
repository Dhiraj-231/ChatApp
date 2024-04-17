import mongoose, { Schema } from "mongoose";

/**
 * Request schema
 */
const requestSchema = new Schema({
    /**
     * Status of the request. Can be "pending", "accepted" or "rejected".
     */
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "accepted", "rejected"],
        required: true
    },
    /**
     * The user who sent the request
     */
    sender: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    /**
     * The user who received the request
     */
    receiver: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
}, {
    /**
     * Automatically add createdAt and updatedAt fields
     */
    timestamps: true
});


/**
 * Request model
 */
export const Request = mongoose.model("Request", requestSchema);
