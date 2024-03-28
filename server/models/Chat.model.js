import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema({
    name: {
        type: String,
        required: [true, "Chat name must be provided"]
    },
    groupChat: {
        type: Boolean,
        default: false,
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    members: [{
        Type: mongoose.Types.ObjectId,
        ref: "User"
    }]
},
    {
        timestamps: true
    });


export const Chat = mongoose.model("Chat", chatSchema);