import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { SampleUser } from "../../constants/SampleData";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";
/**
 * Component for creating new group dialog
 * @returns {ReactElement} The NewGroupDialog component
 */
const NewGroupDialog = () => {
  /**
   * Hook for input validation of group name
   * @type {Object} NewGroup
   * @property {string} value - The group name input value
   * @property {function} changeHandler - The change handler for group name input
   */
  const NewGroup = useInputValidation("");

  /**
   * State for storing sample user data
   * @type {Array<Object>} members
   */
  const [members, setMembers] = useState(SampleUser);

  /**
   * State for storing selected members of the group
   * @type {Array<string>} Selectedmembers
   */
  const [Selectedmembers, setSelectedMembers] = useState([]);

  /**
   * Selects a member to add to the group
   * @function selectMemberHandler
   * @param {string} id - The id of the user to be selected
   */
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currentElement) => currentElement !== id)
        : [...prev, id]
    );
  };

  /**
   * Handles the submit button click event
   * @function submitHandler
   */
  const submitHandler = () => {
    console.log("hii");
  };

  /**
   * Handles the dialog close button click event
   * @function closeHandler
   */
  const closeHandler = () => {};

  return (
    <Dialog open onClose={closeHandler}>
      <Stack
        p={{ xs: "1rem", sm: "3rem" }}
        width={"25rem"}
        spacing={"2rem"}
      >
        <DialogTitle textAlign={"center"} variant="h4">
          New Groups
        </DialogTitle>
        <TextField
          label="Group Name"
          value={NewGroup.value}
          onChange={NewGroup.changeHandler}
        />
        <Typography variant="body1">Members</Typography>
        <Stack>
          {members.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={selectMemberHandler}
              isAdded={Selectedmembers.includes(user._id)}
            />
          ))}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button variant="text" color="error">
            Cancel
          </Button>
          <Button variant="contained" onClick={submitHandler}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroupDialog;
