import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectRoute from "./components/Auth/ProtectRoute";
import { LayoutLoader } from "./components/layouts/Loaders";
import axios from "axios";
import { server } from "./constants/config";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reducers/auth";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "./socket";

/**
 * The root component of the application.
 * This component checks if a user is already logged in and
 * renders the corresponding component based on the user's state.
 */
const App = () => {
  const dispatch = useDispatch();
  const { user, loader } = useSelector((state) => state.auth);

  /**
   * When the component mounts, check if a user is already logged in.
   * If a user is logged in, fetch the user's details from the server
   * and update the user's state in redux.
   * If a user is not logged in, dispatch an action to update the user's state
   * to indicate that the user is not logged in.
   */
  useEffect(() => {
    axios
      .get(`${server}/api/v1/auth/getMyDetail`, { withCredentials: true })
      .then(({ data }) => dispatch(userExist(data.user)))
      .catch((err) => dispatch(userNotExist()));
  }, [dispatch]);

  /**
   * If a user is not logged in, render the Login component,
   * otherwise, render the ProtectedRoute component which
   * renders the Home component.
   */
  return loader ? (
    // If the app is still loading, show a loader
    <LayoutLoader />
  ) : (
    // If the app is not loading, render a BrowserRouter component
    <BrowserRouter>
      {/* Use Suspense to lazy load components */}
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route
            // Render the ProtectRoute component which renders the Home component.
            // The ProtectRoute component redirects to the login page if the user
            // is not logged in.
            element={
              <SocketProvider>
                <ProtectRoute user={user} />
              </SocketProvider>
            }
          >
            <Route
              // Render the Home component when the path is /
              path="/"
              element={<Home />}
            />
            <Route
              // Render the Chat component when the path is /chat/:chatId
              path="/chat/:chatId"
              element={<Chat />}
            />
            <Route
              // Render the Group component when the path is /groups
              path="/groups"
              element={<Group />}
            />
          </Route>
          <Route
            // Render the Login component when the path is /login
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                {/* If the user is already logged in, redirect to the home page */}
                <Login />
              </ProtectRoute>
            }
          />
          <Route
            // Render the AdminLogin component when the path is /admin
            path="/admin"
            element={<AdminLogin />}
          />
          <Route
            // Render the UserManagement component when the path is /admin/user-management
            path="/admin/user-management"
            element={<UserManagement />}
          />
          <Route
            // Render the DashBoard component when the path is /admin/dashboard
            path="/admin/dashboard"
            element={<DashBoard />}
          />
          <Route
            // Render the GroupManagement component when the path is /admin/group-management
            path="/admin/group-management"
            element={<GroupManagement />}
          />
          <Route
            // Render the MessageManagement component when the path is /admin/message-management
            path="/admin/message-management"
            element={<MessageManagement />}
          />
          <Route
            // Render the NotFound component for any other path
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </Suspense>
      {/* Render the toast messages at the bottom of the page */}
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
};


export default App;

