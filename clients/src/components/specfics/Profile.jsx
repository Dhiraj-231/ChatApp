import {
  CalendarMonth as CalendarIcon,
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
} from "@mui/icons-material";
import { Avatar, Stack, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { TransformImage } from "../../lib/feather";
/**
 * Component for rendering the user's profile information
 * 
 * @param {Object} user - the user object from the server
 * 
 * @returns {JSX.Element} The profile component
 */
const Profile = ({ user }) => {

  return (
    <Stack
      // Add a space between each card
      spacing={"2rem"}
      // Stack the cards vertically
      direction={"column"}
      // Center the cards horizontally
      alignItems={"center"}
    >
      <Avatar
        // Set the URL of the avatar image
        src={TransformImage(user?.avatar?.url)}
        // Set the size of the avatar
        sx={{
          width: 200,
          height: 200,
          // Set how to display the image inside the avatar
          objectFit: "contain",
          // Add some space between the avatar and the rest of the cards
          marginBottom: "1rem",
          // Add a border to the avatar
          border: "5px solid white",
        }}
      />
      <ProfileCard 
        // The heading for the card
        heading={"bio"} 
        // The text to display in the card
        text={user?.bio} 
      />
      <ProfileCard
        // The heading for the card
        heading={"Username"}
        // The text to display in the card
        text={user?.username}
        // The icon to display in the card
        Icon={<UserNameIcon />}
      />
      <ProfileCard
        // The heading for the card
        heading={"Name"}
        // The text to display in the card
        text={user?.name}
        // The icon to display in the card
        Icon={<FaceIcon />}
      />
      <ProfileCard
        // The heading for the card
        heading={"Joined"}
        // The text to display in the card
        text={moment(user?.createdAt).fromNow()}
        // The icon to display in the card
        Icon={<CalendarIcon />}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
  >
    {Icon && Icon}
    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography color={"grey"} variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
