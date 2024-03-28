import { User } from "../models/User.model.js";
import { faker } from "@faker-js/faker";
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

export { createUser }