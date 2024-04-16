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
const Chat = ({ chatId, user }) => {
  const containerRef = useRef(null);
  const socket = getSocket();
  const [page, setPage] = useState(1);
  const [messages, setMessage] = useState("");
  const [Messages, setMessages] = useState([]);
  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessageChunk = useGetMessagesQuery({ chatId, page });

  const { data: oldData, setData: setOldData } = useInfiniteScrollTop(
    containerRef,
    oldMessageChunk.data?.totalPages,
    page,
    setPage,
    oldMessageChunk.data?.message
  );
  const members = chatDetails?.data?.chat?.members;

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessageChunk.isError, error: oldMessageChunk.error },
  ];
  const submitHandler = (e) => {
    e.preventDefault();
    if (!messages.trim()) return;
    //Emitting the message to server
    socket.emit(NEW_MESSAGE, { chatId, members, messages });
    setMessage("");
  };
  const newMessageHandler = useCallback((data) => {
    setMessages((prev) => [...prev, data.message]);
  }, []);

  const eventHandler = { [NEW_MESSAGE]: newMessageHandler };

  useSocketEvents(socket, eventHandler);
  useError(errors);
  const allMessages = [...oldData, ...Messages];
  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{ overflowX: "hidden", overflowY: "auto" }}
      >
        {allMessages.map((i, index) => (
          <MessageComponent message={i} user={user} key={index} />
        ))}
      </Stack>
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
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
          >
            <AttachFileIcon />
          </IconButton>
          <InputBox
            placeholder="Type Message Here...."
            value={messages}
            onChange={(e) => setMessage(e.target.value)}
          />
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
      <FileMenu />
    </Fragment>
  );
};

export default AppLayOut()(Chat);
