import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config.js";

const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
    tagTypes: ["Chat", "User", "Message"],
    /**
     * Endpoints for getting the current user's chats
     */
    endpoints: (builder) => ({
        /**
         * Gets the chats of the current user
         * @returns {Chat[]} The chats of the current user
         */
        myChat: builder.query({
            query: () => ({
                url: "chat/my",
                credentials: "include",
            }),
            /**
             * @returns {Chat[]} The chats of the current user
             */
            providesTags: ["Chat"],
        }),

        /**
         * Searches for users with the given name
         * @param {string} name The name to search for
         * @returns {User[]} The users found
         */
        searchUser: builder.query({
            query: (name) => ({
                url: `auth/search?name=${name}`,
                credentials: "include",
            }),
            /**
             * @returns {User[]} The users found
             */
            providesTags: ["User"],
        }),
        /**
         * Sends a friend request to the given user
         * @param {Object} data The data to send in the request
         * @param {string} data.friendId The id of the user to send the request to
         * @returns {void}
         */
        sendFriendRequest: builder.mutation({
            query: (data) => ({
                url: "auth/sendrequest",
                method: "PUT",
                credentials: "include",
                body: data,
            }),
            /**
             * @returns {User[]} The list of users, including the one who was just requested
             */
            invalidatesTags: ["User"],
        }),
        /**
         * Gets the notifications of the current user
         * @returns {Notification[]} The notifications of the current user
         */
        getNotifications: builder.query({
            query: () => ({
                url: `auth/notifications`,
                credentials: "include",
            }),
            /**
             * @returns {Notification[]} The notifications of the current user
             */
            keepUnusedDataFor: 0,
        }),
        /**
         * Accepts a friend request
         * @param {Object} data The data to send in the request
         * @param {string} data.requestId The id of the request to accept
         * @returns {void}
         */
        acceptFriendRequest: builder.mutation({
            query: (data) => ({
                url: "auth/acceptRequest",
                method: "PUT",
                credentials: "include",
                body: data,
            }),
            /**
             * @returns {Chat[]} The list of chats, including the one that was just created
             */
            invalidatesTags: ["Chat"],
        }),

        /**
         * Gets the details of a chat
         * @param {Object} chatId The id of the chat
         * @param {string} chatId.chatId The id of the chat
         * @param {boolean} [populate=false] Whether or not to populate the chat with users
         * @returns {Chat} The chat with the given id
         */
        chatDetails: builder.query({
            query: (chatId, populate = false) => {
                let url = `chat/${chatId.chatId}`;
                if (populate) url += "?populate=true";
                return {
                    url,
                    credentials: "include",
                };
            },
            /**
             * @returns {Chat} The chat with the given id
             */
            providesTags: ["Chat"],
        }),
        /**
         * Gets the messages of a chat
         * @param {Object} chatId The id of the chat
         * @param {string} chatId.chatId The id of the chat
         * @param {number} [page=1] The page number
         * @returns {Message[]} The messages of the chat
         */
        getMessages: builder.query({
            query: (chatId, page = false) => ({
                url: `chat/message/${chatId.chatId}?page=${page.page}`,
                credentials: "include",
            }),
            /**
             * @returns {Message[]} The messages of the chat
             */
            providesTags: ["Message"],
        }),
        /**
         * Sends messages to a chat
         * @param {Object} data The data to send in the request
         * @param {string} data.chatId The id of the chat to send the messages to
         * @param {File|Blob} data.attachments The attachments to send
         * @param {string} data.text The text of the message
         * @returns {void}
         */
        sendAttachements: builder.mutation({
            query: (data) => ({
                url: "chat/message",
                method: "POST",
                credentials: "include",
                body: data,
            }),
        }),
    }),
});

export default api;
export const {
    useMyChatQuery,
    useLazySearchUserQuery,
    useSendFriendRequestMutation,
    useGetNotificationsQuery,
    useAcceptFriendRequestMutation,
    useChatDetailsQuery,
    useGetMessagesQuery,
    useSendAttachementsMutation
} = api;
