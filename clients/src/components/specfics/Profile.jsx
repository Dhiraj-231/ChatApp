import {
  CalendarMonth as CalendarIcon,
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
} from "@mui/icons-material";
import { Avatar, Stack, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard heading={"bio"} text={"sadasse"} />
      <ProfileCard
        heading={"Username"}
        text={"@dhirajRay"}
        Icon={<UserNameIcon />}
      />
      <ProfileCard heading={"Name"} text={"Dhiraj"} Icon={<FaceIcon />} />
      <ProfileCard
        heading={"Joined"}
        text={moment("2024-03-19T11:25:36.074Z").fromNow()}
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
