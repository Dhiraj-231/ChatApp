import React from "react";
import { TransformImage } from "../../lib/feather";
import { FileOpen as FileOpenIcon } from "@mui/icons-material";

const ReanderAttach = (file, url) => {
  switch (file) {
    case "Video":
      return <video src={url} preload="none" width={"200px"} controls />;
    case "image":
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
      return <audio src={url} preload="none" width={"200px"} controls />;
    default:
      return <FileOpenIcon />;
  }
};

export default ReanderAttach;
