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
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},
    {
        timestamps: true
    });


export const Chat = mongoose.model("Chat", chatSchema);