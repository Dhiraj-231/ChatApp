import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./redux/store.js";

/**
 * The entry point of the application.
 *
 * This is the top-level component that renders the entire application.
 * It wraps the entire application in a Redux Provider, which allows
 * access to the Redux store from any component within the application.
 * It also wraps the entire application in a HelmetProvider, which allows
 * access to the document head from any component within the application.
 *
 * Finally, it disables the context menu (right-click menu) by default.
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <CssBaseline />
        <div
          onContextMenu={(e) => {
            // Disable the context menu by default
            e.preventDefault();
          }}
        >
          <App />
        </div>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
