import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { IconButton, Skeleton, Stack } from "@mui/material";
import React, { Fragment, useCallback, useRef, useState } from "react";
import { InputBox } from "../components/Styles/StyleComponents";
import AppLayOut from "../components/layouts/AppLayOut";
import MessageComponent from "../components/shared/MessageComponent";
import { grayColor, orange } from "../constants/Color";
import { NEW_MESSAGE } from "../constants/event";
import FileMenu from "../dialogs/FileMenu";
import { useError, useSocketEvents } from "../hooks/hook";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { getSocket } from "../socket";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";
/**
 * Chat component
 * @param {string} chatId - Chat ID
 * @param {string} user - Current user
 */
const Chat = ({ chatId, user }) => {
  // Ref to messages container
  const containerRef = useRef(null);
  // Socket instance
  const socket = getSocket();
  // Redux store dispatch function
  const dispatch = useDispatch();
  // Current page (For infinite scrolling)
  const [page, setPage] = useState(1);
  // Input message text
  const [messages, setMessage] = useState("");
  // Array of messages
  const [Messages, setMessages] = useState([]);
  // Anchor element for file menu
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  // Chat details query
  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  // Messages query
  const oldMessageChunk = useGetMessagesQuery({ chatId, page });

  // Errors array
  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessageChunk.isError, error: oldMessageChunk.error },
  ];

  /**
   * Handle file open
   * @param {SyntheticEvent} e - Event
   */
  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  /**
   * Submit message handler
   * @param {SyntheticEvent} e - Event
   */
  const submitHandler = (e) => {
    e.preventDefault();
    // If no message return
    if (!messages.trim()) return;
    // Emitting the message to server
    socket.emit(NEW_MESSAGE, { chatId, members, messages });
    setMessage("");
  };

  /**
   * New message handler
   * @param {object} data - Message object
   */
  const newMessageHandler = useCallback((data) => {
    setMessages((prev) => [...prev, data.message]);
  }, []);

  // Event handler object
  const eventHandler = {
    [NEW_MESSAGE]: newMessageHandler,
  };

  // Using infinite scroll
  const { data: oldData, setData: setOldData } = useInfiniteScrollTop(
    containerRef,
    oldMessageChunk.data?.totalPages,
    page,
    setPage,
    oldMessageChunk.data?.message
  );

  // Extracting members and messages
  const members = chatDetails?.data?.chat?.members;
  const allMessages = [...oldData, ...Messages];

  // Using socket events
  useSocketEvents(socket, eventHandler);
  // Showing errors
  useError(errors);

  /**
   * Render chat component
   * @returns {ReactElement} - Rendered chat component
   */
  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <Fragment>
      {/* Message container */}
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{ overflowX: "hidden", overflowY: "auto" }}
      >
        {/* All messages */}
        {allMessages.map((i, index) => (
          <MessageComponent message={i} user={user} key={index} />
        ))}
      </Stack>
      {/* Form for submitting new messages */}
      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          {/* File upload button */}
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>
          {/* Message input */}
          <InputBox
            placeholder="Type Message Here...."
            value={messages}
            onChange={(e) => setMessage(e.target.value)}
          />
          {/* Submit button */}
          <IconButton
            type="submit"
            sx={{
              rotate: "-20deg",
              backgroundColor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                backgroundColor: "darkred",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      {/* File menu */}
      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </Fragment>
  );
};

export default AppLayOut()(Chat);
