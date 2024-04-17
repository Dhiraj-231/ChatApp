import { createSlice } from "@reduxjs/toolkit";

/**
 * Initial state of the chat slice.
 * @type {Object}
 */
const initialState = {
    /**
     * Number of unread chat notifications.
     * @type {number}
     */
    notificationCount: 0,
};

/**
 * The chat slice manages the number of unread chat notifications.
 * @type {Slice}
 */
const chatSlice = createSlice({
    name: "chat",
    initialState,
    /**
     * Available actions for this slice.
     * @type {Object}
     */
    reducers: {
        /**
         * Increase the number of unread chat notifications.
         * @function
         * @param {Object} state The current state of the slice.
         * @returns {void}
         */
        incrementNotification: (state) => {
            state.notificationCount += 1;
        },
        /**
         * Reset the number of unread chat notifications to 0.
         * @function
         * @param {Object} state The current state of the slice.
         * @returns {void}
         */
        resetNotification: (state) => {
            state.notificationCount = 0;
        },
    },
});


export default chatSlice;

/**
 * Available actions for the chat slice.
 * @type {Object}
 */
export const {
    incrementNotification,
    resetNotification,
} = chatSlice.actions;
