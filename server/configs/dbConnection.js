import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database is connected successfully..");
    } catch (error) {
        console.log(error.message);
    }
}

export default dbConnection;