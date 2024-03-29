import { User } from "../models/User.model.js";
import { Chat } from "../models/Chat.model.js";
import { faker, simpleFaker } from "@faker-js/faker";
import { Message } from "../models/Message.model.js";
const createUser = async (numNumber) => {
    try {
        const usersPromise = [];
        for (let i = 0; i < numNumber; i++) {
            usersPromise.push();
            const tempUser = User.create({
                name: faker.person.fullName(),
                username: faker.internet.userName(),
                password: "password",
                avatar: {
                    url: faker.image.avatar(),
                    public_id: faker.system.fileName()
                }
            });
            usersPromise.push(tempUser);
        }

        await Promise.all(usersPromise);

        console.log("User created..", numNumber);
        process.exit(1);
    } catch (error) {
        console.log(error);
        process.exist(1);
    }
}
export const createSingleChat = async (numberCount) => {
    try {
        const users = await User.find().select("_id");
        const chatPromise = [];
        for (let i = 0; i < users.length; i++) {
            for (let j = i + 1; j < users.length; j++) {
                chatPromise.push(
                    Chat.create({
                        name: faker.lorem.words(2),
                        members: [users[i], users[j]],
                    })
                )
            }
        }

        await Promise.all(chatPromise);
        console.log("Chats created successfully...");
        process.exit(1);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
export const createGroupChats = async (numberCount) => {
    try {
        const users = await User.find().select("_id");
        const chatPromise = [];
        for (let i = 0; i < numberCount; i++) {
            const numMembers = simpleFaker.number.int({ min: 3, max: users.length });
            const members = [];

            for (let i = 0; i < numMembers; i++) {
                const randomIndex = Math.floor(Math.random() * users.length);
                const randomUsers = users[randomIndex];

                if (!members.includes(randomUsers)) {
                    members.push(randomUsers)
                }
            }
            const chat = await Chat.create({
                groupChat: true,
                name: faker.lorem.words(1),
                members,
                creator: members[0],
            });

            chatPromise.push(chat)
        }

        await Promise.all(chatPromise);

        console.log("Chats created successfully..");
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export const createMessages = async (numMessage) => {
    try {
        const users = await User.find().select("_id");
        const chats = await Chat.find().select("_id");
        const messagesPromise = [];
        for (let i = 0; i < numMessage; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const randomChat = chats[Math.floor(Math.random() * chats.length)];

            messagesPromise.push(
                Message.create({
                    chat: randomChat,
                    sender: randomUser,
                    content: faker.lorem.sentence(),
                })
            );
        }

        await Promise.all(messagesPromise);
        console.log("Message created successfully..");
        process.exit(1);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export const createMessagesInChat = async (chatId, numMessage) => {
    try {
        const users = await User.find().select("_id");
        const chats = await Chat.find().select("_id");
        const messagesPromise = [];
        for (let i = 0; i < numMessage; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];

            messagesPromise.push(
                Message.create({
                    chat: chatId,
                    sender: randomUser,
                    content: faker.lorem.sentence(),
                })
            );
        }

        await Promise.all(messagesPromise);
        console.log("Message created successfully..");
        process.exit(1);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
export { createUser }