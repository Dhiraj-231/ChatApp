import React, { Fragment, useRef } from "react";
import AppLayOut from "../components/layouts/AppLayOut";
import { IconButton, Stack } from "@mui/material";
import { grayColor, orange } from "../constants/Color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/Styles/StyleComponents";
import FileMenu from "../dialogs/FileMenu";
import { SampleMessage } from "../constants/SampleData";
import MessageComponent from "../components/shared/MessageComponent";
const user = {
  _id: "assds",
  name: "Dhiraj",
};
const Chat = () => {
  const containerRef = useRef(null);
  return (
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
        {SampleMessage.map((i, index) => (
          <MessageComponent message={i} user={user} key={index} />
        ))}
      </Stack>
      <form
        style={{
          height: "10%",
        }}
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
          <InputBox placeholder="Type Message Here...." />
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
