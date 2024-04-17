import { Stack } from "@mui/material";
import React from "react";
import Chatitem from "../shared/Chatitem";
import { bgGridents } from "../../constants/Color";

/**
 * ChatList Component
 *
 * This component will render the list of chat items
 * It will receive the following props
 *
 * @param {string} w - width of the component
 * @param {Array} chats - list of chats
 * @param {string} chatId - id of the current chat
 * @param {Array} onlineUser - list of online users
 * @param {Array} newMessage - list of new messages
 * @param {Function} handleDeleteChat - function to handle delete chat
 *
 */
const ChatList = ({ w = "100%", chats = [], chatId, onlineUser = [], newMessage = [{ chatId: "", count: 0 }], handleDeleteChat }) => {
  return (
    <Stack
      width={w}
      direction={"column"}
      overflow={"auto"}
      height={"100%"}
      sx={{
        backgroundImage: bgGridents,
      }}
    >
      {/* Iterate over the list of chats and render the chat item */}
      {chats?.map((data, index) => {
        const { _id, name, groupChat, avatar, members } = data;
        const [{ ChatId, count }] = newMessage;
        const newMessageAlert = newMessage.find(
          (ChatId) => ChatId.chatId === _id
        );
        const isOnline = members?.some((members) => onlineUser.includes(_id));
        return (
          <Chatitem
            /* Index of the chat */
            index={index}
            /* If there are new messages, display the alert */
            newMessage={newMessageAlert}
            /* If the user is online, display green dot */
            isOnline={isOnline}
            /* Avatar of the user */
            avatar={avatar}
            /* Name of the user */
            name={name}
            /* Id of the chat */
            _id={_id}
            /* Unique key for each chat */
            key={_id}
            /* If the chat is a group or not */
            groupChat={groupChat}
            /* If the chat is the same as the currently open chat */
            sameSender={chatId === _id}
            /* Function to handle delete chat */
            handleDeleteChat={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;
