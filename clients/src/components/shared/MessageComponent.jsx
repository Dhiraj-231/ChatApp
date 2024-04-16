import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { lightBlue } from "../../constants/Color";
import moment from "moment";
import { TransformImage, fileFormat } from "../../lib/feather";
import ReanderAttach from "./ReanderAttach";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;
  const sameSender = sender?._id === user?._id;
  const timeAgo = moment(createdAt).fromNow();
  return (
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
      {!sameSender && (
        <Typography color={lightBlue} fontWeight={600} variant="caption">
          {sender.name}
        </Typography>
      )}
      {content && <Typography>{content}</Typography>}
      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = TransformImage(attachment.url);
          const file = fileFormat(url);

          return (
            <Box key={index}>
              <a href={url} target="_blank" download style={{ color: "black" }}>
                {ReanderAttach(file, url)}
              </a>
            </Box>
          );
        })}

      <Typography variant="caption" color={"text.secondary"} fontSize={"10px"}>
        {timeAgo}
      </Typography>
    </div>
  );
};

export default memo(MessageComponent);
