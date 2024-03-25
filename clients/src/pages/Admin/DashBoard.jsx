import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import {
  Box,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import {
  CurveButton,
  SearchField,
} from "../../components/Styles/StyleComponents";
import AdminLayOut from "../../components/layouts/AdminLayOut";
import { DoughnutChat, LineChart } from "../../components/specfics/Chart";

const DashBoard = () => {
  const Appbar = (
    <Paper
      elevation={3}
      sx={{ padding: "2rem", margin: "2rem 0", borderRadius: "1rem" }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon
          sx={{
            fontSize: "3rem",
          }}
        />
        <SearchField placeholder="Search...." />
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1} />
        <Typography
          display={{ xs: "none", lg: "block" }}
          color={"rgba(0,0,0,0.7)"}
          textAlign={"center"}
        >
          {moment().format("dddd, D MMMM YYYY")}
        </Typography>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
      </Stack>
    </Paper>
  );

  const Widgets = () => (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={"2rem"}
      justifyContent={"space-between"}
      alignItems={"center"}
      margin={"2rem 0"}
    >
      <Widget tittle={"User"} value={34} icon={<PersonIcon />} />
      <Widget tittle={"Chat"} value={3} icon={<GroupIcon />} />
      <Widget tittle={"Message"} value={453} icon={<MessageIcon />} />
    </Stack>
  );

  return (
    <AdminLayOut>
      <Container component={"main"}>
        {Appbar}
        <Stack
          direction={{
            xs: "column",
            lg: "row",
          }}
          flexWrap={"wrap"}
          justifyContent={"center"}
          justifyItems={{ xs: "center", lg: "stretch" }}
          sx={{ gap: "2rem" }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "45rem",
            }}
          >
            <Typography variant="body1" margin={"2rem 0"}>
              Last Messages
            </Typography>
            <LineChart value={[23, 10, 34, 5]} />
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%" },
              position: "relative",
              maxWidth: "25rem",
            }}
          >
            <DoughnutChat
              labels={["Single chats", "Group Chats"]}
              value={[53, 47]}
            />

            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
            >
              <GroupIcon /> <Typography>VS</Typography>
              <PersonIcon />
            </Stack>
          </Paper>
        </Stack>
        <Widgets />
      </Container>
    </AdminLayOut>
  );
};
const Widget = ({ tittle, value, icon }) => (
  <Paper
    elevation={3}
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1.5rem",
      width: "20rem",
    }}
  >
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        sx={{
          color: "rgba(0,0,0,0.7)",
          borderRadius: "50%",
          border: "5px solid rgba(0,0,0,0.9)",
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value}
      </Typography>
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        {icon}
        <Typography>{tittle}</Typography>
      </Stack>
    </Stack>
  </Paper>
);
export default DashBoard;
