import {
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Notifications as NotificationIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { Suspense, lazy, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { orange } from "../../constants/Color";
import { server } from "../../constants/config.js";
import { userNotExist } from "../../redux/reducers/auth.js";
import {
  setIsMobileMenuFriend,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducers/misc.js";
const SearchDialog = lazy(() => import("../specfics/Search"));
const NotificationDialog = lazy(() => import("../specfics/Notification"));
const NewGroupDialog = lazy(() => import("../specfics/NewGroupDialog.jsx"));
/**
 * The header component that contains the main navigation bar
 * It contains the title, icons for search, new group, manage group, notification and logout.
 * Also it manages the opening and closing of search, notification and new group dialog.
 */
const Header = () => {
  const { isNotification } = useSelector((state) => state.misc);
  const { notificationCount } = useSelector((state) => state.chat);
  const navigate = useNavigate();
  const [isNewGroup, setIsGroup] = useState(false);
  const dispatch = useDispatch();
  const { isSearch } = useSelector((state) => state.misc);

  /**
   * Handles the click on the menu icon which opens the mobile menu.
   */
  const handleMobile = () => dispatch(setIsMobileMenuFriend(true));

  /**
   * Handles the click on the search icon which opens the search dialog.
   */
  const openSearch = () => {
    dispatch(setIsSearch(true));
  };

  /**
   * Handles the click on the new group icon which opens the new group dialog.
   */
  const openNewGroup = () => {
    setIsGroup((prev) => !prev);
    console.log("Click on the group");
  };

  /**
   * Navigates to the group page
   */
  const navigateToGroup = () => navigate("/groups");

  /**
   * Handles the logout functionality.
   * It makes a GET request to the logout API and then dispatches the userNotExist action.
   */
  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/auth/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExist());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong..");
    }
  };

  /**
   * Handles the click on the notification icon which opens the notification dialog.
   */
  const openNotification = () => dispatch(setIsNotification(true));

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: orange,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              ChatApp
            </Typography>
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
              }}
            />
            <Box>
              <IconBtn
                title={"Search"}
                icon={<SearchIcon />}
                onClick={openSearch}
              />

              <IconBtn
                title={"New Group"}
                icon={<AddIcon />}
                onClick={openNewGroup}
              />

              <IconBtn
                title={"Manage Group"}
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />
              <IconBtn
                title={"Notification"}
                icon={<NotificationIcon />}
                onClick={openNotification}
                value={notificationCount}
              />
              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon />}
                onClick={logoutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationDialog />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};
export default Header;
