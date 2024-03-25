

export const sampleChats = [
    {
        avatar: ["https://gravatar.com/avatar/a96eb9e7a93952847ae1fb3c82b3230a?s=400&d=robohash&r=x"],
        name: "Dhiraj Ray",
        _id: "1",
        groupChat: false,
        members: ["1", "2"]
    },
    {
        avatar: ["https://gravatar.com/avatar/ad8370b515dbf4c739328fcb7ef156b0?s=400&d=robohash&r=x"],
        name: "Punit Ray",
        _id: "2",
        groupChat: false,
        members: ["1", "2"]
    },
]

export const SampleUser = [
    {
        avatar: "https://gravatar.com/avatar/1efa155286ab3bf1b3b48ed376defe0b?s=400&d=robohash&r=x",
        name: 'Akash kumar',
        _id: "1",
    },
    {
        avatar: "https://gravatar.com/avatar/0184235fafa80c6bad0ae400784d6a2c?s=400&d=robohash&r=x",
        name: 'Kulesh kumar',
        _id: "2",
    },
]

export const SampleNotification = [
    {
        sender: {
            avatar: "https://gravatar.com/avatar/0184235fafa80c6bad0ae400784d6a2c?s=400&d=robohash&r=x",
            name: 'Kulesh kumar',
        },
        _id: "1"
    },
    {
        sender: {
            avatar: "https://gravatar.com/avatar/8282ca32dc3a94607000db4f10ebd656?s=400&d=robohash&r=x",
            name: 'Komal kumari',
        },
        _id: "2"
    },
]

export const SampleMessage = [
    {
        attachments: [{
            public_id: "assad",
            url: "https://www.w3schools.com/howto/img avatar.png"
        }],
        content: "L*uda ka message hai",
        _id: "snskskajfsoi",
        sender: {
            _id: "sadakjdassds",
            name: "Chaman",
        },
        chat: "chatId",
        createdAt: "2024-03-20T09:02:01.865Z"
    },
    {
        attachments: [{
            public_id: "assad 2",
            url: "https://www.w3schools.com/howto/img avatar.png"
        }],
        content: "L*uda 2 ka message hai",
        _id: "snskskajfsoi",
        sender: {
            _id: "assds",
            name: "Chaman",
        },
        chat: "chatId",
        createdAt: "2024-03-20T09:02:01.865Z"
    }
]

export const AdmindashBoardData = {
    users: [
        {
            name: "John Doe",
            avatar: 'https://gravatar.com/avatar/c17c06d870c1105b3e562f5d2d239ed4?s=400&d=robohash&r=x',
            _id: 1,
            username: "john_doe",
            friends: 20,
            group: 5,
        },
        {
            name: "Koloky",
            avatar: 'https://gravatar.com/avatar/ce5a63914920c7f306e9b3ea6d73691e?s=400&d=robohash&r=x',
            _id: 2,
            username: "koloky_i",
            friends: 50,
            group: 15,
        },
    ],

    chats: [
        {
            name: "Labadbass Group",
            avatar: ["https://gravatar.com/avatar/ecbb9090e2fc21d01dfe4fa6c873ba2b?s=400&d=robohash&r=x"],
            _id: "1",
            groupChat: false,
            members: [{ _id: "1", avatar: "https://gravatar.com/avatar/f7262c14cb7d0c15706a87e05321848b?s=400&d=robohash&r=x" }, { _id: "2", avatar: "https://gravatar.com/avatar/f98acc4c166eb432f86756410046ece1?s=400&d=robohash&r=x" }],
            totalMembers: 20,
            creator: {
                name: "Jhon Doe",
                avatar: "https://gravatar.com/avatar/aac85c19c70e05f77b1ef5870d41b022?s=400&d=robohash&r=x"
            }
        },
        {
            name: "Bakchod Group",
            avatar: ["https://gravatar.com/avatar/adcd0f4c0516560116164f32f643820c?s=400&d=robohash&r=x"],
            _id: "2",
            groupChat: false,
            members: [{ _id: "1", avatar: "https://gravatar.com/avatar/078aab6a0de304e00650ec2baef3048a?s=400&d=robohash&r=x" }, { _id: "2", avatar: "https://gravatar.com/avatar/b502deb274da942ab02db7ae3fafb376?s=400&d=robohash&r=x" }],
            totalMembers: 20,
            creator: {
                name: "Salman Boi",
                avatar: "https://gravatar.com/avatar/1301a25256235cd925e45835c9fa8667?s=400&d=robohash&r=x"
            }
        },
    ],
    messages: [
        {
            attachments: [{
                public_id: "assad",
                url: "https://gravatar.com/avatar/f4e80234fc5c24962a71efed0d1c8deb?s=400&d=robohash&r=x"
            }],
            content: "L*uda ka Message hai",
            _id: "1",
            sender: {
                _id: "User._id",
                name: "Chaman",
                avatar: "https://gravatar.com/avatar/b0e7ed6b2c4eb6e1ba88de964d3246d3?s=400&d=robohash&r=x"
            },
            groupChat: false,
            chat: "ChatId",
            createdAt: "2024-02-12T10:41:30.630Z"
        },
        {
            attachments: [{
                public_id: "assad 2",
                url: "https://gravatar.com/avatar/1da9729da945c938d21545eb31b35532?s=400&d=robohash&r=x"
            }],
            content: "Apni m** chodwa",
            _id: "2",
            sender: {
                _id: "2",
                name: "Chaman 2",
                avatar: "https://gravatar.com/avatar/68831b9654228cf4baf51c6a722eebd4?s=400&d=robohash&r=x"
            },
            groupChat: true,
            chat: "ChatId",
            createdAt: "2024-02-12T10:41:30.630Z"
        },
    ]
}