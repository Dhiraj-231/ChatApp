import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../configs/.env" });

/**
 * User schema
 */
const userSchema = new Schema(
    {
        /**
         * User name
         */
        name: {
            type: String,
            required: [true, "Please provide name"],
            lowercase: true,
            minlength: [3, "Name should be at least 3 characters"],
            default: null,
        },
        /**
         * User username
         */
        username: {
            type: String,
            required: [true, "Please provide username"],
            unique: true,
        },
        /**
         * User bio
         */
        bio: {
            type: String,
            required: true,
        },
        /**
         * User password
         */
        password: {
            type: String,
            required: true,
            select: false,
            minlength: [6, "Password should be at least 6 characters"],
        },

        /**
         * User avatar
         */
        avatar: {
            /**
             * Avatar Cloudinary id
             */
            public_id: {
                type: String,
                required: [true, "id must be provided"],
            },

            /**
             * Avatar Cloudinary url
             */
            url: {
                type: String,
                required: [true, "Url must be provided"],
            },
        },
    },
    { timestamps: true }
);

/**
 * Hash password before save
 */
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 8);
    next();
});

/**
 * Compare user password
 *
 * @param {string} Userpassword user password
 *
 * @returns {Promise<boolean>} is password correct or not
 */
userSchema.methods.isPasswordCorrect = async function (Userpassword) {
    return await bcrypt.compare(Userpassword, this.password);
};

/**
 * Generate Token
 *
 * @param {string} id User id
 *
 * @returns {Promise<string>} Token
 */
userSchema.methods.tokenGenerate = async function (id) {
    const Token = await jwt.sign({ _id: id }, process.env.JWT_SECRET, {
        expiresIn: "2d",
    });

    return Token;
};

/**
 * User model
 */
export const User = mongoose.model("User", userSchema);

