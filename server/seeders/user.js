import { User } from "../models/User.model.js";
import { Chat } from "../models/Chat.model.js";
import { faker, simpleFaker } from "@faker-js/faker";
import { Message } from "../models/Message.model.js";
/**
 * This function is used to create a number of users
 * @param {number} numNumber The number of users to be created
 */
const createUser = async (numNumber) => {
    try {
        const usersPromise = []; // Array to store all the promises
        for (let i = 0; i < numNumber; i++) { // Loop to create a number of users
            usersPromise.push(
                User.create({ // Create a promise for creating a user
                    name: faker.person.fullName(), // Name of the user
                    username: faker.internet.userName(), // Username of the user
                    password: "password", // Password of the user
                    avatar: {
                        url: faker.image.avatar(), // Avatar url of the user
                        public_id: faker.system.fileName() // Public id of the user
                    }
                })
            );
        }

        await Promise.all(usersPromise); // Wait for all the promises to resolve

        console.log("User created..", numNumber); // Log the successful creation of users
        process.exit(1); // Exit the process with status 1
    } catch (error) { // Catch any error that occurs
        console.log(error); // Log the error
        process.exit(1); // Exit the process with status 1
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