import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name must be Provided"]
    },
    username: {
        type: String,
        required: [true, "Please provide username"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minLength: [6, "Must must be greater than 6"],
        maxLength: [20, "must not exceed the length of 20"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: [true, "id must be provided"],
        },
        url: {
            type: String,
            required: [true, "Url must be provided"]
        }
    }
}, { timestamps: true });


export const user = mongoose.model("User", userSchema);