import { createSlice } from "@reduxjs/toolkit";

/**
 * Auth reducer. Handles user authentication and authorization
 * @module reducers/auth
 */
const authSlice = createSlice({
    name: "auth",
    /**
     * Initial state of auth reducer
     * @property {Object} initialState
     * @property {Object|null} initialState.user - Current user
     * @property {boolean} initialState.isAdmin - Is current user an admin
     * @property {boolean} initialState.loader - Is loader active
     */
    initialState: {
        user: null,
        isAdmin: false,
        loader: true,
    },
    /**
     * Available actions
     * @property {Object} reducers
     * @property {function} reducers.userExist - Set current user and disable loader
     * @property {function} reducers.userNotExist - Clear current user and disable loader
     */
    reducers: {
        userExist: (state, action) => {
            /**
             * Set current user
             * @function userExist
             * @param {Object} state - Redux state
             * @param {Object} action - Redux action
             * @param {Object} action.payload - New user
             */
            state.user = action.payload;
            /**
             * Disable loader
             */
            state.loader = false;
        },
        userNotExist: (state) => {
            /**
             * Clear current user
             * @function userNotExist
             * @param {Object} state - Redux state
             */
            state.user = null;
            /**
             * Disable loader
             */
            state.loader = false;
        },
    }
});



export default authSlice;

export const { userExist, userNotExist } = authSlice.actions;