import React, { memo } from "react";
import { Link } from "../Styles/StyleComponents";
import { Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";

/**
 * Chatitem component
 *
 * Component for a single chat item in the chat list
 */
const Chatitem = ({
  // The user avatar for this chat
  avatar = [],
  // The name of the user or group chat
  name,
  // The id of the chat
  _id,
  // Whether or not this is a group chat
  groupChat = false,
  // Whether or not the last message is from the same sender
  sameSender,
  // Whether or not the user is online
  isOnline,
  // The most recent message in this chat
  newMessage,
  // The index of this chat in the chat list
  index = 0,
  // Function to handle deleting the chat
  handleDeleteChat,
}) => {
  return (
    <Link
      // Styling for the link to the chat
      sx={{
        padding: "0rem",
      }}
      // Link to the chat
      to={`/chat/${_id}`}
      // Handle the right click context menu for deleting the chat
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <div
        // Styling for the chat item
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "1rem",
          backgroundColor: sameSender ? "black" : "unset",
          color: sameSender ? "white" : "black",
          borderBottom: "1px solid #f0f0f0",
          position: "relative",
        }}
      >
        {/* Chat avatar */}
        <AvatarCard avatar={avatar} />
        {/* Chat information */}
        <Stack>
          <Typography>{name}</Typography>
          {/* New message count */}
          {newMessage && (
            <Typography>{newMessage.count} New Message</Typography>
          )}
        </Stack>
        {/* Online indicator */}
        {isOnline && (
          <Box
            // Styling for the online indicator
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "green",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </div>
    </Link>
  );
};

export default memo(Chatitem);
