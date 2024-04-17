import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy, memo, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/Styles/StyleComponents";
import AvatarCard from "../components/shared/AvatarCard";
import { sampleChats, SampleUser as User } from "../constants/SampleData.js";
import UserItem from "../components/shared/UserItem.jsx";
import { bgGridents } from "../constants/Color.js";
/**
 * Lazy loaded confirm delete dialog
 */
const ConfirmDeleteDialog = lazy(() =>
  import("../dialogs/ConfirmDeleteDialog.jsx")
);

/**
 * Lazy loaded add member dialog
 */
const AddMemberDialog = lazy(() => import("../dialogs/AddMemberDialog.jsx"));

/**
 * Flag to determine if the user is a member of the group
 */
const isMember = false;

/**
 * Group page component
 * @function Group
 * @returns {JSX.Element} Group component
 */
const Group = () => {
  // Open/close mobile menu state
  const [isMobileMenuOpen, setIsMobileOpen] = useState(false);
  // Edit group name state
  const [isEdit, setIsEdit] = useState(false);
  // Group name state
  const [groupName, setGroupName] = useState("");
  // Group name updated value state
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  // Confirm delete dialog state
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  // Navigate function
  const navigate = useNavigate();

  /**
   * Navigate back function
   */
  const navigateBack = () => {
    navigate("/");
  };

  /**
   * Get the current chat id
   */
  const chatId = useSearchParams()[0].get("group");

  /**
   * Toggle the mobile menu
   */
  const handleMobile = () => {
    setIsMobileOpen((prev) => !prev);
  };

  /**
   * Update the group name
   */
  const updateGroupName = () => {
    setIsEdit(false);
    console.log(groupNameUpdatedValue);
  };

  /**
   * Close the mobile menu
   */
  const handleMobileClose = () => setIsMobileOpen(false);

  /**
   * Use effect to set the initial group name and
   * clean up on unmount
   */
  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }
    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);

  /**
   * Open the confirm delete dialog
   */
  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };

  /**
   * Close the confirm delete dialog
   */
  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };

  /**
   * Handle the delete action
   */
  const deleteHandler = () => {
    console.log("Delete Handler");
    closeConfirmDeleteHandler();
  };

  /**
   * Open the add member dialog
   */
  const openAddMemberHandler = () => {};

  /**
   * Handle the remove member action
   * @param {string} id - The id of the member to remove
   */
  const removeMemberHandler = (id) => {
    console.log("Remove Member", id);
  };

  /**
   * Icon buttons component
   */
  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <Tooltip title="menu">
          <IconButton onClick={handleMobile}>
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: "#1c1c1c",
            color: "white",
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.7)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  /**
   * Group name component
   */
  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"}
    >
      {isEdit ? (
        <>
          <TextField
            label="New Group Name"
            variant="outlined"
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName}>
            <DoneIcon sx={{ color: "green" }} />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(true)}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  /**
   * Button group component
   */
  const ButtonGroup = (
    <Stack
      direction={{
        sm: "row",
        xs: "column-reverse",
      }}
      spacing={"3rem"}
      p={{
        sm: "1rem",
        xs: "0",
        md: "1rem 4rem",
      }}
    >
      <Button
        size="large"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={openConfirmDeleteHandler}
      >
        Delete Group
      </Button>
      <Button
        size="large"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openAddMemberHandler}
      >
        Add Member
      </Button>
    </Stack>
  );
  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sm={4}
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
      >
        <GroupsList myGroups={sampleChats} chatId={chatId} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtns}
        {groupName && (
          <>
            {GroupName}
            <Typography margin={"2rem"} alignSelf={"center"} variant="body1">
              Members
            </Typography>
            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{ sm: "1rem", xs: "0", md: "1rem 4rem" }}
              spacing={"2rem"}
              height={"50vh"}
              overflow={"auto"}
            >
              {/* Members */}

              {User.map((user) => (
                <UserItem
                  user={user}
                  isAdded
                  styling={{
                    boxShadow: "0 0 0.5rem 0.3rem rgba(0,0,0,0.2)",
                    padding: "1rem 2rem",
                    borderRadius: "1rem",
                  }}
                  key={user._id}
                  handler={removeMemberHandler}
                />
              ))}
            </Stack>
            {ButtonGroup}
          </>
        )}
      </Grid>
      {isMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog />
        </Suspense>
      )}
      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}
      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        <GroupsList w={"50vw"} myGroups={sampleChats} chatId={chatId} />
      </Drawer>
    </Grid>
  );
};

/**
 * Component for the group list in mobile view
 * @component
 * @param {string} w - The width of the component
 * @param {array} myGroups - The groups the user is a member of
 * @param {string} chatId - The current chat id
 * @returns The GroupList component
 */
const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  // The component for the group list in mobile view
  <Stack
    // The width of the component
    width={w}
    // Set the background image and the height of the component
    sx={{
      backgroundImage: bgGridents,
      height: "100vh",
      // Allow the component to scroll
      overflow: "auto",
    }}
  >
    {/* If the user is a member of any groups render them, otherwise show a message */}
    {myGroups.length > 0 ? (
      // Map over the groups and render each one
      myGroups.map((group) => (
        <GroupListItem
          // The group to render
          group={group}
          // The current chat id
          chatId={chatId}
          // Assign a key based on the group id
          key={group._id}
        />
      ))
    ) : (
      // Show a message if the user is not a member of any groups
      <Typography
        // Center the text
        textAlign={"center"}
        // Add some padding to the text
        padding={"1rem"}
      >
        No Group
      </Typography>
    )}
  </Stack>
);
/**
 * Component for a group list item in mobile view
 * @component
 * @param {object} props
 * @param {object} props.group - The group to render
 * @param {string} props.chatId - The current chat id
 * @returns The GroupListItem component
 */
const GroupListItem = memo(({ group, chatId }) => {
  // Destructure the group object
  const { name, avatar, _id } = group;

  // Return a link to the group page
  return (
    <Link
      // Add a route to the group page
      to={`?group=${_id}`}
      // If the link is for the current chat prevent the navigation
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack
        // Render a row with the avatar and group name
        direction={"row"}
        // Add some space between the elements
        spacing={"1rem"}
        // Align the elements to the center
        alignItems={"center"}
      >
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});
export default Group;
