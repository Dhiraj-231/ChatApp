/**
 * The reducer for miscellaneous state in the store.
 */
import { createSlice } from "@reduxjs/toolkit";

/**
 * The initial state for the miscellaneous reducer.
 */
const initialState = {
    /**
     * Whether the new group modal is open.
     */
    isNewGroup: false,

    /**
     * Whether the add member modal is open.
     */
    isAddMember: false,

    /**
     * Whether the notification modal is open.
     */
    isNotification: false,

    /**
     * Whether the mobile menu is open for a friend.
     */
    isMobileMenuFriend: false,

    /**
     * Whether the search bar is open.
     */
    isSearch: false,

    /**
     * Whether the file menu is open.
     */
    isFileMenu: false,

    /**
     * Whether the delete chat menu is open.
     */
    isDeleteMenu: false,

    /**
     * Whether the uploading loader is visible.
     */
    uploadingLoader: false,

    /**
     * The chat that is currently selected to be deleted, if applicable.
     */
    selectedDeleteChat: {
        /**
         * The ID of the chat that is currently selected.
         */
        chatId: "",

        /**
         * Whether the selected chat is a group chat.
         */
        groupChat: false,
    }
};

/**
 * The miscellaneous reducer.
 */
const miscSlice = createSlice({
    name: "misc",
    initialState,
    reducers: {
        /**
         * Sets whether the new group modal is open.
         */
        setIsNewGroup: (state, action) => {
            state.isNewGroup = action.payload;
        },

        /**
         * Sets whether the add member modal is open.
         */
        setIsAddMember: (state, action) => {
            state.isAddMember = action.payload;
        },

        /**
         * Sets whether the notification modal is open.
         */
        setIsNotification: (state, action) => {
            state.isNotification = action.payload;
        },

        /**
         * Sets whether the mobile menu is open for a friend.
         */
        setIsMobileMenuFriend: (state, action) => {
            state.isMobileMenuFriend = action.payload;
        },

        /**
         * Sets whether the search bar is open.
         */
        setIsSearch: (state, action) => {
            state.isSearch = action.payload;
        },

        /**
         * Sets whether the file menu is open.
         */
        setIsFileMenu: (state, action) => {
            state.isFileMenu = action.payload;
        },

        /**
         * Sets whether the delete chat menu is open.
         */
        setIsDeleteMenu: (state, action) => {
            state.isDeleteMenu = action.payload;
        },

        /**
         * Sets whether the uploading loader is visible.
         */
        setUploadingLoader: (state, action) => {
            state.uploadingLoader = action.payload;
        },

        /**
         * Sets the currently selected chat to delete, if applicable.
         */
        setSelectedDeleteChat: (state, action) => {
            state.selectedDeleteChat = action.payload;
        }
    }
});


export default miscSlice;

/**
 * The actions that can be dispatched for the miscellaneous reducer.
 */
export const {
    setIsNewGroup,
    setIsAddMember,
    setIsNotification,
    setIsMobileMenuFriend,
    setIsSearch,
    setIsFileMenu,
    setIsDeleteMenu,
    setUploadingLoader,
    setSelectedDeleteChat
} = miscSlice.actions;
