/**
 * Validates input for register route
 */
import { body, param, validationResult } from "express-validator";
export const validateRegisterInput = [
    // Checking if name is not empty
    body("name").notEmpty().withMessage("Name cannot be empty").escape(),
    // checking if userName is not empty and is Alphanumeric
    body("username")
        .notEmpty()
        .withMessage("Username cannot be empty...")
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage("Username can only contain letters, numbers, and underscores")
        .escape(),
    //checking  if password is not empty and has minimum length of 6 characters
    body("password")
        .notEmpty()
        .withMessage("Password cannot be empty..")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

/**
 * Validates input for login route
 */
export const validateLoginInput = [
    body("username")
        .notEmpty()
        .withMessage("Username cannot be empty...")
        .matches(/^[a-zA-Z0-9_.]+$/)
        .withMessage("Username can only contain letters, numbers, and underscores")
        .escape(),

    body("password")
        .notEmpty()
        .withMessage("Password cannot be empty..")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

/**
 * Validates input for creating a new chat
 */
export const validateChatSchema = [
    // Check if name is provided and is a string
    body("name").isString().withMessage("Chat name must be a string").escape(),

    // Check if members is an array of valid ObjectIds
    body("members")
        .notEmpty()
        .withMessage("Members not be empty")
        .isArray({ min: 2, max: 100 })
        .withMessage("Members must be an array")
        .escape(),

    // Check for errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

/**
 * Validates input for adding members to a chat
 */
export const addMemberValidater = [
    body("chatId").notEmpty().withMessage("Chat Id must not be empty..").escape(),
    body("members")
        .isArray({ min: 1, max: 97 })
        .withMessage("Members must be a non-empty array")
        .escape(),
    //checking for errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

/**
 * Validates input for removing members from a chat
 */
export const removeMemberValidater = [
    body("userId").notEmpty().withMessage("User Id must not be Empty..").escape(),
    body("chatId").notEmpty().withMessage("Chat Id must not be Empty..").escape(),
    //checking for Error
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

/**
 * Validates input for leaving a chat
 */
export const leaveGroupValidater = [
    param("id").notEmpty().withMessage("Please Enter Chat ID").escape(),
    //CHECKING FOR ERRORR
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

/**
 * Validates input for sending an attachment
 */
export const sendAttachmentValidater = [
    body("chatId").notEmpty().withMessage("chatId must not be Empty..").escape(),
    //checking for Error
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

/**
 * Validates input for getting messages
 */
export const getMessageValidater = [
    param("id").notEmpty().withMessage("Please Enter Chat ID").escape(),
    //checking for Error
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

/**
 * Validates input for getting chat details
 */
export const getChatDetailValidater = [
    param("id").notEmpty().withMessage("Please Enter Chat ID").escape(),
    //checking for Error
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

/**
 * Validates input for renaming a chat
 */
export const renameChatValidater = [
    param("id").notEmpty().withMessage("Please Enter Chat ID").escape(),
    body("name").notEmpty().withMessage("Please enter the valid name").escape(),
    //checking for Error
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

/**
 * Validates input for deleting a chat
 */
export const deleteChatValidater = [
    param("id").notEmpty().withMessage("Please Enter Chat ID").escape(),
    //checking for Error
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

/**
 * Validates input for sending a friend request
 */
export const sendRequestValidator = [
    body("userId").notEmpty().withMessage("User Id must be provided").escape(),
    //checking for Error
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

/**
 * Validates input for accepting/rejecting a friend request
 */
export const acceptRequestValidator = [
    body("requestId")
        .notEmpty()
        .withMessage("Request Id must be provided")
        .escape(),
    body("accept")
        .notEmpty()
        .withMessage("Please add accept")
        .isBoolean()
        .withMessage("Accept must be a Boolean")
        .escape(),
    //checking for Error
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

/**
 * Validates input for admin login
 * **/
export const adminLoginValidater = [
    body("secretKey").notEmpty().withMessage("Please enter the secret key"),
    //checking for Error
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
