import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { server } from "../../constants/config.js"

const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
    tagTypes: ["Chat"],
    endpoints: (builder) => ({
        myChat: builder.query({
            query: () => ({
                url: "chat/my",
                credentials: 'include'
            }),
            providesTags: ['Chat']
        }),
    })
});

export default api;
export const { useMyChatQuery } = api;