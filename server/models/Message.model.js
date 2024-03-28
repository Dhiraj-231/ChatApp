import mongoose, { Schema } from "mongoose";


const messageSchema = new Schema({
    content: String,
    attachments: [
        {
            public_id: {
                type: String,
                required: [true, "id must be provided"],
            },
            url: {
                type: String,
                required: [true, "Url must be provided"]
            }
        }
    ],
    sender: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    chat: {
        type: mongoose.Types.ObjectId,
        ref: "Chat",
        required: true
    },
},
    {
        timestamps: true
    })

export const Message = mongoose.model("Message", messageSchema);