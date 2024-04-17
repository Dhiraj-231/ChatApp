import {
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  ExitToApp as ExitToAppIcon,
  Groups as GroupIcon,
  ManageAccounts as ManageAccountsIcon,
  Menu as MenuIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, Link as LinkComponent, Navigate } from "react-router-dom";

const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`;

const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/admin/user-management",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Groups",
    path: "/admin/group-management",
    icon: <GroupIcon />,
  },
  {
    name: "Messages",
    path: "/admin/message-management",
    icon: <MessageIcon />,
  },
];
/**
 * SideBar component renders the admin sidebar
 * 
 * @param {object} props
 * @param {string} [props.w] The width of the sidebar
 * 
 * @returns {React.Component}
 */
const SideBar = ({ w = "100%" }) => {
  const location = useLocation(); // Get the current location

  /**
   * Handles the logout request by logging a message to the console
   */
  const logOutHandler = () => {
    console.log("Logout Successfully..");
  };

  return (
    <Stack
      width={w}
      direction={"column"}
      p={"3rem"} // Padding
      spacing={"3rem"} // Spacing between items
    >
      <Typography variant="h5" textTransform={"uppercase"}>
        chatApp
      </Typography>
      <Stack spacing={"1rem"}>
        {adminTabs.map((tab, index) => (
          <Link
            key={index}
            to={tab.path}
            sx={
              location.pathname === tab.path && {
                bgcolor: "black", // Background color of the link
                color: "white", // Text color of the link
                ":hover": {
                  color: "whitesmoke", // Text color of the link on hover
                },
              }
            }
          >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {tab.icon} {/* Tab icon */}
              <Typography fontSize={"1.2rem"}>{tab.name}</Typography> {/* Tab name */}
            </Stack>
          </Link>
        ))}

        <Link onClick={logOutHandler}>
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <ExitToAppIcon /> {/* Logout icon */}
            <Typography fontSize={"1.2rem"}>Logout</Typography> {/* Logout text */}
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};
const isAdmin = true;
const AdminLayOut = ({ children }) => {
  /**
   * Whether the sidebar is displayed on mobile view
   */
  const [isMobile, setIsMobile] = useState(false);

  /**
   * Toggles the sidebar on mobile view
   */
  const handleMobile = () => {
    setIsMobile(!isMobile);
  };

  /**
   * Closes the sidebar on mobile view
   */
  const handleClose = () => {
    setIsMobile(false);
  };

  /**
   * Redirects to home page if not admin
   */
  if (!isAdmin) return <Navigate to={"/admin"} />;

  return (
    <Grid
      container
      minHeight={"100vh"}
      // Comments below are from https://mui.com/components/grid/
      // The number of 12 available columns on a row
      // Use the theme breakpoints to ensure responsiveness
    >
      <Box
        sx={{
          // Display sidebar icon only on mobile view
          display: { xs: "block", md: "none" },
          // Fixed position
          position: "fixed",
          // 1rem from the right and top edges of the viewport
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {/* Displays close icon on mobile view */}
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid
        item
        md={4}
        lg={3}
        // Hide sidebar on desktop view
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <SideBar />
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
        lg={9}
        // Background color of main content area
        sx={{ bgcolor: "#f5f5f5" }}
      >
        {/* Main content */}
        {children}
      </Grid>
      <Drawer open={isMobile} onClose={handleClose}>
        <SideBar w="50vw" />
      </Drawer>
    </Grid>
  );
}

export default AdminLayOut;
