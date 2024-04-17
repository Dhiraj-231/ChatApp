import { Box, Typography } from "@mui/material";
import moment from "moment";
import React, { memo } from "react";
import { lightBlue } from "../../constants/Color";
import { fileFormat } from "../../lib/feather";
import ReanderAttach from "./ReanderAttach";

/**
 * This is a message component.
 *
 * @param {Object} message The message object
 * @param {Object} user The current logged in user
 * @returns The message component
 */
const MessageComponent = ({ message, user }) => {
  // destructure message object
  const { sender, content, attachments = [], createdAt } = message;
  // check if the sender is the same as the current user
  const sameSender = sender?._id === user?._id;
  // calculate time ago from createdAt timestamp
  const timeAgo = moment(createdAt).fromNow();

  return (
    // styled div for the message
    <div
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        color: "black",
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content",
      }}
    >
      {/* if the sender is not the same as the current user, display the sender name */}
      {!sameSender && (
        <Typography color={lightBlue} fontWeight={600} variant="caption">
          {sender.name}
        </Typography>
      )}
      {/* display the message content */}
      {content && <Typography>{content}</Typography>}
      {/* if there are attachments, map over them and display them */}
      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);

          return (
            <Box key={index}>
              {/* render an <a> tag with a download attribute and a href pointing to the attachment url */}
              <a href={url} target="_blank" download style={{ color: "black" }}>
                {/* pass the file and url to ReanderAttach component to render the attachment */}
                {ReanderAttach(file, url)}
              </a>
            </Box>
          );
        })}

      {/* display the time ago in a smaller font */}
      <Typography variant="caption" color={"text.secondary"} fontSize={"10px"}>
        {timeAgo}
      </Typography>
    </div>
  );
};

export default memo(MessageComponent);
