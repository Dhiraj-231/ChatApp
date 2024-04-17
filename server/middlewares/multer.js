import multer from "multer";

/**
 * Multer middleware for handling file uploads.
 */
export const multerUpload = multer({
    limits: {
        /**
         * Maximum file size (in bytes) for a single file upload.
         */
        fileSize: 1024 * 1024 * 5,
    }
});

/**
 * Multer middleware for a single file upload (e.g. user avatar).
 */
export const singleAvatar = multerUpload.single("avatar");

/**
 * Multer middleware for multiple file uploads (e.g. attachments).
 *
 * @param {number} numberOfFiles Maximum number of files to upload.
 */
export const attachmentsMulter = multerUpload.array("files", 5);
