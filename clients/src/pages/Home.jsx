import React from "react";
import AppLayOut from "../components/layouts/AppLayOut";
import { Box, Typography } from "@mui/material";
import { grayColor } from "../constants/Color";

/**
 * Home Page Component
 * 
 * This is the default page that is rendered
 * when the app is loaded. It simply displays
 * a message that prompts the user to select a friend
 * to chat with.
 */
const Home = () => {
  return (
    <Box
      /* Height of the component */
      height={"100%"}
      /* Background color of the component */
      bgcolor={grayColor}
    >
      <Typography
        /* Padding of the component */
        p={"2rem"}
        /* Heading text variant */
        variant="h5"
        /* Text alignment */
        textAlign={"center"}
      >
        {/* The message to be displayed */}
        Select a friend to chat
      </Typography>
    </Box>
  );
};


export default AppLayOut()(Home);
