import dotenv from "dotenv";
import { app, io, server } from "./App.js";
import dbConnection from "./configs/dbConnection.js";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/event.js";
import { v4 as uuid } from "uuid";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/Message.model.js";
import cookieParser from "cookie-parser";
import { socketAuthenticator } from "./middlewares/auth.js";
import { ApiError } from "./utils/ApiError.js";

/**
 * Environment variables
 */
dotenv.config({ path: "./configs/.env" });

/**
 * Database connection
 */
dbConnection();

/**
 * Map of userSocketIds for real-time communication
 */
export const userSocketIds = new Map();

/**
 * Main route
 */
app.get("/", (req, res) => {
    res.send("<h2>Hii, there </h2>");
});

/**
 * Socket.io middleware to authenticate the user
 */
io.use((socket, next) => {
    cookieParser()(
        socket.request,
        socket.request.res,
        async (err) => await socketAuthenticator(err, socket, next)
    );
});

/**
 * Socket.io connection event
 */
io.on("connection", (socket) => {
    const user = socket.user;
    userSocketIds.set(user._id.toString(), socket.id);
    console.log("Connected Successfully", user.name);

    /**
     * New message event
     */
    socket.on(NEW_MESSAGE, async ({ chatId, members, messages }) => {
        console.log({ chatId, members, messages });
        const messagesForRealTime = {
            content: messages,
            _id: uuid(),
            sender: {
                _id: user._id,
                name: user.name,
            },
            chat: chatId,
            createdAt: new Date().toISOString(),
        };
        const messageForDB = {
            content: messages,
            sender: user._id,
            chat: chatId,
        };
        const membersSockets = getSockets(members);
        io.to(membersSockets).emit(NEW_MESSAGE, {
            chatId,
            message: messagesForRealTime,
        });

        io.to(membersSockets).emit(NEW_MESSAGE_ALERT, { chatId });
        try {
            await Message.create(messageForDB);
        } catch (error) {
            throw new ApiError(400, "Error in saving message", error.message);
        }
    });

    /**
     * Socket disconnect event
     */
    socket.on("disconnect", () => {
        console.log("User disconnected:", user.name);
        userSocketIds.delete(user._id.toString());
    });
});

/**
 * Server start
 */
server.listen(process.env.PORT || 8500, () => {
    console.log(
        `Server is Started At port :${process.env.PORT || 8000}`
    );
});

