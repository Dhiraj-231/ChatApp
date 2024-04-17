import { Drawer, Grid, Skeleton } from "@mui/material";
import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useError, useSocketEvents } from "../../hooks/hook.jsx";
import { useMyChatQuery } from "../../redux/api/api.js";
import {
  setIsDeleteMenu,
  setIsMobileMenuFriend,
} from "../../redux/reducers/misc.js";
import Title from "../shared/Tittle";
import ChatList from "../specfics/ChatList";
import Profile from "../specfics/Profile";
import Header from "./Header";
import { getSocket } from "../../socket.jsx";
import {
  NEW_FRIEND_REQUEST,
  NEW_MESSAGE_ALERT,
} from "../../constants/event.js";
import { incrementNotification } from "../../redux/reducers/chat.js";
/**
 * Higher order component for app layout
 * @param {React.Component} WrappedComponent The component to wrap
 * @returns {React.Component} The wrapped component with app layout
 */
const AppLayOut = (WrappedComponent) => {
  /**
   * The component with app layout
   * @param {Object} props The component props
   * @returns {React.Component} The component JSX
   */
  return (props) => {
    // Get the URL params
    const params = useParams();
    const chatId = params.chatId;
    // The ref for the delete chat menu
    const deleteMenuAnchor = useRef(null);
    // Redux dispatch
    const dispatch = useDispatch();
    // Socket
    const socket = getSocket();
    // Get the mobile menu friend state
    const { isMobileMenuFriend } = useSelector((state) => state.misc);
    // Get the user
    const { user } = useSelector((state) => state.auth);
    // Query the chats
    const { isLoading, data, isError, error, refetch } = useMyChatQuery("");
    // Handle error
    useError({ isError, error });
    // Handle delete chat
    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      // Show the delete menu
      dispatch(setIsDeleteMenu(true));
      // Set the ref
      deleteMenuAnchor.current = e.currentTarget;
    };
    // Handle mobile menu close
    const handleMobileClose = () => dispatch(setIsMobileMenuFriend(false));
    // New message alert handler
    const newMessageAlertHandler = useCallback(() => {}, []);
    // New friend request handler
    const newFriendRequestHandler = useCallback(() => {
      // Increment the notification count
      dispatch(incrementNotification());
    }, [dispatch]);
    // Socket event handlers
    const eventHandler = {
      [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
      [NEW_FRIEND_REQUEST]: newFriendRequestHandler,
    };
    // Connect to the socket
    useSocketEvents(socket, eventHandler);
    return (
      <>
        {/* Title */}
        <Title />
        {/* Header */}
        <Header />
        {/* Mobile menu */}
        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobileMenuFriend} onClose={handleMobileClose}>
            <ChatList
              w="70Vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
            />
          </Drawer>
        )}
        {/* The main content */}
        <Grid container height={"calc(100vh - 4rem)"}>
          {/* Chat list */}
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
            height={"100%"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
              />
            )}
          </Grid>
          {/* Chat content */}
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            {/* The wrapped component */}
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>
          {/* Profile */}
          <Grid
            item
            md={4}
            lg={3}
            height={"100%"}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.85)",
            }}
          >
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };
};


export default AppLayOut;
