import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";
import { ApiError } from "./ApiError.js";
import { getBase64 } from "../lib/helper.js";
export const emitEvent = async (req, event, users, data) => {
    console.log("Emmiting event..", event);
};

export const deleteFilesFromCloudinary = async (public_ids) => { };

export const uploadFileToCloudinary = async (files = []) => {
    const uploadFilePromise = files.map((file) => {
        return new Promise((resolve, reject) => {
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
        const results = await Promise.all(uploadFilePromise);
        const formatedResult = results.map((result) => ({
            public_id: results[0].public_id,
            url: results[0].secure_url,
        }));
        return formatedResult;
    } catch (error) {
        throw new ApiError(404, error.message);
    }
};
