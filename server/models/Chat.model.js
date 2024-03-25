import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema({
    name: {
        type: String,
        required: [true, "Chat name must be provided"]
    }
});


export const Chat = mongoose.model("Chat", chatSchema);