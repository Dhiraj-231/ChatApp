import { Stack } from "@mui/material";
import React from "react";
import Chatitem from "../shared/Chatitem";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUser = [],
  newMessage = [{ chatId: "", count: 0 }],
  handleDeleteChat,
}) => {
  return (
    <Stack width={w} direction={"column"}>
      {chats?.map((data, index) => {
        const { _id, name, groupChat, avatar, members } = data;
        const [{ ChatId, count }] = newMessage;
        const newMessageAlert = newMessage.find(
          (ChatId) => ChatId.chatId === _id
        );
        const isOnline = members?.some((members) => onlineUser.includes(_id));
        return (
          <Chatitem
            index={index}
            newMessage={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            _id={_id}
            key={_id}
            groupChat={groupChat}
            sameSender={chatId === _id}
            handleDeleteChat={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;
