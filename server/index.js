import dotenv from "dotenv";
import { app, io, server } from "./App.js";
import dbConnection from "./configs/dbConnection.js";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/event.js";
import { v4 as uuid } from "uuid";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/Message.model.js";
import cookieParser from "cookie-parser";
import { socketAuthenticator } from "./middlewares/auth.js";
dotenv.config({ path: "./configs/.env" });
dbConnection();

export const userSocketIds = new Map();

app.get("/", (req, res) => {
    res.send("<h2>Hii, there </h2>");
});
io.use((socket, next) => {
    cookieParser()(
        socket.request,
        socket.request.res,
        async (err) => await socketAuthenticator(err, socket, next)
    );
});
io.on("connection", (socket) => {
    const user = socket.user;
    userSocketIds.set(user._id.toString(), socket.id);

    socket.on(NEW_MESSAGE, async ({ chatId, members, messages }) => {
        const messagesForRealTime = {
            content: message,
            _id: uuid(),
            sender: {
                _id: user._id,
                name: user.name,
            },
            chat: chatId,
            createdAt: new Date().toISOString(),
        };

        const messageForDB = {
            content: message,
            sender: user._id,
            chatId: chatId,
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
            console.error("Error saving message to database:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", user.name);
        userSocketIds.delete(user._id.toString());
    });
});
server.listen(process.env.PORT || 8500, () => {
    console.log(`Server is Started At port :${process.env.PORT || 8000}`);
});
