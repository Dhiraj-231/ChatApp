import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../configs/.env" });
const userSchema = new Schema(
    {
        name: {
            type: String,
            require: [true, "Please provide name"],
            lowercase: true,
            minlength: [3, "Name should greater than 3"],
            default: null,
        },
        username: {
            type: String,
            require: [true, "Please provide username"],
            unique: true,
        },
        bio: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            Select: false,
            minlength: [6, "Password should greater or equal to 6"],
        },
        avatar: {
            public_id: {
                type: String,
                required: [true, "id must be provided"],
            },
            url: {
                type: String,
                required: [true, "Url must be provided"],
            },
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 8);
    next();
});
userSchema.methods.isPasswordCorrect = async function (Userpassword) {
    return await bcrypt.compare(Userpassword, this.password);
};

userSchema.methods.tokenGenerate = async function (id) {
    const Token = await jwt.sign({ _id: id }, process.env.JWT_SECRET, {
        expiresIn: "2d",
    });


    return Token;
};
export const User = mongoose.model("User", userSchema);
