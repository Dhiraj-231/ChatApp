/**
 * Database Connection
 *
 * This module connects the application to the MongoDB database
 * using mongoose library.
 */

import mongoose from "mongoose";

/**
 * Database Connection
 *
 * This function connects the application to the MongoDB database
 * using mongoose library. It returns a promise that resolves when
 * the connection is established successfully or rejects with an
 * error message.
 *
 * @returns {Promise} - A promise that resolves when the connection is
 * established or rejects with an error message
 */
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database is connected successfully..");
    } catch (error) {
        console.log(error.message);
    }
}

export default dbConnection;
