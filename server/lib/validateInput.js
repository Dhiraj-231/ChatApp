import { body, validationResult } from "express-validator";
export const validateRegisterInput = [
    // Checking if name is not empty
    body("name").notEmpty().withMessage("Name cannot be empty"),
    // checking if userName is not empty and is Alphanumeric
    body("username")
        .notEmpty().withMessage("Username cannot be empty...")
        .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),
    //checking  if password is not empty and has minimum length of 6 characters
    body("password")
        .notEmpty().withMessage("Password cannot be empty..")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    // Check if avatar public_id is provided
    body('avatar.public_id')
        .optional()
        .notEmpty()
        .withMessage('Avatar public_id cannot be empty'),

    // Check if avatar url is provided and is a valid URL
    body('avatar.url')
        .optional()
        .notEmpty()
        .isURL()
        .withMessage('Avatar URL must be a valid URL'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

export const validateLoginInput = [
    body("username")
        .notEmpty().withMessage("Username cannot be empty...")
        .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),

    body("password")
        .notEmpty().withMessage("Password cannot be empty..")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

export const validateChatSchema = [
    // Check if name is provided and is a string
    body('name').isString().withMessage('Chat name must be a string'),


    // Check if members is an array of valid ObjectIds
    body('members').isArray().withMessage('Members must be an array'),

    // Check for errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]