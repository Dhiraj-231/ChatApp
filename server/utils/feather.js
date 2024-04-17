import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";
import { ApiError } from "./ApiError.js";
import { getBase64, getSockets } from "../lib/helper.js";
/**
 * Emit event to specific user
 * @param {object} req express request object
 * @param {string} event event name
 * @param {string|array} users user id or array of user ids
 * @param {object} data data to emit
 */
export const emitEvent = async (req, event, users, data) => {
    const io = req.app.get("io"); // get socket io instance
    const userSocket = getSockets(users); // get socket id of user
    io.to(userSocket).emit(event, data); // emit to user
};

export const deleteFilesFromCloudinary = async (public_ids) => { };

/**
 * Upload file to cloudinary
 * @param {FileList} files File list from input type file
 * @returns {Promise<Object[]>} An array of objects contains public_id and url of uploaded file
 */
export const uploadFileToCloudinary = async (files = []) => {
    /**
     * Create an array of Promise which contains upload request to cloudinary
     */
    const uploadFilePromise = files.map((file) => {
        return new Promise((resolve, reject) => {
            /**
             * Upload file to cloudinary with the following configurations:
             * - resource_type: auto - Automatic detection of the resource type
             * - public_id: uuid() - Unique id of the uploaded file
             */
            cloudinary.uploader.upload(
                getBase64(file),
                {
                    resource_type: "auto",
                    public_id: uuid(),
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
        });
    });

    try {
        /**
         * Wait for all upload request to finish and then return the result 
         */
        const results = await Promise.all(uploadFilePromise);
        /**
         * Format the result to the expected response
         */
        const formatedResult = results.map((result) => ({
            public_id: result.public_id,
            url: result.secure_url,
        }));
        return formatedResult;
    } catch (error) {
        /**
         * If there is error during the upload, throw ApiError with the error message
         */
        throw new ApiError(404, error.message);
    }
};
