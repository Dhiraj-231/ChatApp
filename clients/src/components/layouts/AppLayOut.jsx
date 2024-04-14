import { Drawer, Grid, Skeleton } from "@mui/material";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useError } from "../../hooks/hook.jsx";
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
const AppLayOut = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;
    const deleteMenuAnchor = useRef(null);
    const socket = getSocket();
    const dispatch = useDispatch();
    const { isMobileMenuFriend } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { isLoading, data, isError, error, refetch } = useMyChatQuery("");

    useError[{ isError, error }];

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      dispatch(setIsDeleteMenu(true));
      deleteMenuAnchor.current = e.currentTarget;
    };
    const handleMobileClose = () => dispatch(setIsMobileMenuFriend(false));
    return (
      <>
        <Title />
        <Header />
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
        <Grid container height={"calc(100vh - 4rem)"}>
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
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} />
          </Grid>
          <Grid
            item
            md={5}
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
