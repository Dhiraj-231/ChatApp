import React from "react";
import { TransformImage } from "../../lib/feather";
import { FileOpen as FileOpenIcon } from "@mui/icons-material";

/**
 * Component for rendering different types of attachments
 * @param {string} file - type of file
 * @param {string} url - link to file
 * @returns {JSX.Element} Rendered attachment
 */
const ReanderAttach = (file, url) => {
  switch (file) {
    case "Video":
      // Render video with controls
      return (
        <video src={url} preload="none" width={"200px"} controls />
      );
    case "image":
      // Render image with width and height limit and object-fit: contain
      return (
        <img
          src={TransformImage(url, 200)}
          alt="Attachement"
          width={"200px"}
          height={"150px"}
          style={{
            objectFit: "contain",
          }}
        />
      );
    case "Audio":
      // Render audio with controls
      return <audio src={url} preload="none" width={"200px"} controls />;
    default:
      // Render file open icon
      return <FileOpenIcon />;
  }
};


export default ReanderAttach;
