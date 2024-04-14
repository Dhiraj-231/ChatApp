import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { server } from "../../constants/config.js"

const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
    tagTypes: ["Chat", "User"],
    endpoints: (builder) => ({
        myChat: builder.query({
            query: () => ({
                url: "chat/my",
                credentials: 'include'
            }),
            providesTags: ['Chat']
        }),

        searchUser: builder.query({
            query: (name) => ({
                url: `auth/search?name=${name}`,
                credentials: 'include'
            }),
            providesTags: ["User"]
        }),
        sendFriendRequest: builder.mutation({
            query: (data) => ({
                url: "auth/sendrequest",
                method: "PUT",
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ["User"]
        }),
        getNotifications: builder.query({
            query: () => ({
                url: `auth/notifications`,
                credentials: 'include'
            }),
            keepUnusedDataFor: 0
        }),
        acceptFriendRequest: builder.mutation({
            query: (data) => ({
                url: "auth/acceptRequest",
                method: "PUT",
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ["Chat"]
        }),
    })
});

export default api;
export const { useMyChatQuery, useLazySearchUserQuery, useSendFriendRequestMutation, useGetNotificationsQuery, useAcceptFriendRequestMutation } = api;