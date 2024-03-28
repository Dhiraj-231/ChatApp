import mongoose, { Schema } from "mongoose";

const requestSchema = new Schema({
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "accepted", "rejected"],

    },
    sender: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver: {
        type: mongoose.Types.ObjectId,
        ref: "Chat",
        required: true
    },
}, {
    timestamps: true
});


export const Request = mongoose.model("Request", requestSchema);