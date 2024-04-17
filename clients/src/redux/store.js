import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import api from "./api/api";
import miscSlice from "./reducers/misc";
import chatSlice from "./reducers/chat";

/**
 * The root Redux store for the app.
 *
 * It uses the Redux Toolkit's `configureStore` function to set up the store.
 */
const store = configureStore({
    /**
     * The root reducer for the store.
     *
     * It combines the reducers for authentication (`authSlice`) and miscellaneous
     * data (`miscSlice`) with the API's reducer (`api.reducer`) under their
     * respective names.
     */
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [miscSlice.name]: miscSlice.reducer,
        [chatSlice.name]: chatSlice.reducer,
        [api.reducerPath]: api.reducer,
    },
    /**
     * The middleware for the store.
     *
     * It includes the API's middleware (`api.middleware`) and the default
     * middleware provided by Redux Toolkit.
     */
    middleware: (middle) => [...middle(), api.middleware],
});

export default store;
