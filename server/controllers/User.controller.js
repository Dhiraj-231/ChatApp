import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";

export const Register = async (req, res) => {
    try {
        const { name, username, password, avatar } = req.body;

        let user = await User.findOne({
            $or: [{ username }],
        })
        if (user) {
            throw new ApiError(409, "User already exist")
        }
        user = await User.create({
            name,
            username,
            password,
            avatar
        });
        const token = await user.tokenGenerate(user._id);
        res.status(201).cookie("token", token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000), httpOnly: true, secure: true }).json({
            success: true,
            message: "User register successfully.."
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({
            $or: [{ username }]
        }).select("+password");
        if (!user) throw new ApiError(400, "User not exist");
        const matchPassword = await user.isPasswordCorrect(password);
        if (!matchPassword) throw new ApiError(401, "User or password is wrong...")
        const token = await user.tokenGenerate(user._id);
        res.status(200).cookie("token", token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000), httpOnly: true, secure: true }).json({
            success: true,
            message: `Welcome back ${(user.name).charAt(0).toUpperCase() + user.name.slice(1)}`
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const getMyProfileDetail = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user }).select("-password -createdAt -updatedAt -__v");
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

export const logout = async (req, res) => {
    try {
        res.status(200).cookie("token", "", { expires: new Date(Date.now()), httpOnly: false, secure: false }).json({
            success: true,
            message: "Logout Successfully...."
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const searchUser = async (req, res) => {
    try {
        const { name } = req.query;
        res.status(200).json({
            success: true,
            message: name
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}