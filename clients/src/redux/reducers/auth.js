import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAdmin: false,
        loader: true,
    },
    reducers: {
        userExist: (state, action) => {
            state.user = action.payload;
            state.loader = false;
        },
        userNotExist: (state) => {
            state.user = null;
            state.loader = false;
        },
    }
});



export default authSlice;

export const { userExist, userNotExist } = authSlice.actions;