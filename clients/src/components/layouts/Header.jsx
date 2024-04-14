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
const Header = () => {
  const { isNotification } = useSelector((state) => state.misc);
  const navigate = useNavigate();
  const [isNewGroup, setIsGroup] = useState(false);
  const dispatch = useDispatch();
  const { isSearch } = useSelector((state) => state.misc);
  const handleMobile = () => dispatch(setIsMobileMenuFriend(true));
  const openSearch = () => {
    dispatch(setIsSearch(true));
  };
  const openNewGroup = () => {
    setIsGroup((prev) => !prev);
    console.log("Click on the group");
  };
  const navigateToGroup = () => navigate("/groups");
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

const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};
export default Header;
