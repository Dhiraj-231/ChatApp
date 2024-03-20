import React from "react";
import AppLayOut from "../components/layouts/AppLayOut";
import { Box, Typography } from "@mui/material";
import { grayColor } from "../constants/Color";

const Home = () => {
  return (
    <Box height={"100%"} bgcolor={grayColor}>
      <Typography p={"2rem"} variant="h5" textAlign={"center"}>
        Select a friend to chat
      </Typography>
    </Box>
  );
};

export default AppLayOut()(Home);
