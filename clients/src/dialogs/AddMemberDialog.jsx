import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { SampleUser as Users } from "../constants/SampleData";
import UserItem from "../components/shared/UserItem";
/**
 * AddMemberDialog component
 *
 * Displays dialog for adding members to a chat
 * @param {function} addMember - function that adds members to the chat
 * @param {boolean} isLoadingAddMember - loading state of the add member request
 * @param {string} chatId - id of the chat the members are being added to
 */
const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
  /**
   * Array of users to display in the dialog
   * @type {Array<object>}
   */
  const [members, setMembers] = useState(Users);

  /**
   * Array of selected member ids
   * @type {Array<string>}
   */
  const [Selectedmembers, setSelectedMembers] = useState([]);

  /**
   * Handles selection of a member by adding or removing the selected member from the SelectedMembers array
   * @param {string} id - id of the member being selected
   */
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currentElement) => currentElement !== id)
        : [...prev, id]
    );
  };

  /**
   * Closes the dialog and clears out the members and selected members arrays
   */
  const closeHandler = () => {
    setMembers([]);
    setSelectedMembers([]);
  };

  /**
   * Handles submitting the add member request, closes the dialog, and calls the addMember function
   */
  const addMemberSubmitHandler = () => {
    closeHandler();
    addMember(chatId, Selectedmembers);
  };

  return (
    <Dialog
      // Controls whether the dialog is open or not
      open
      // Function to handle when the dialog is closed
      onClose={closeHandler}
    >
      <Stack
        // Padding around the dialog
        p={"2rem"}
        // Width of the dialog
        width={"20rem"}
        // Spacing between elements in the dialog
        spacing={"2rem"}
      >
        <DialogTitle
          // Text alignment of the dialog title
          textAlign={"center"}
        >
          Add Member
        </DialogTitle>
        <Stack
          // Spacing between elements in the stack
          spacing={"1rem"}
        >
          {members.length > 0 ? (
            members.map((user, index) => (
              <UserItem
                // User object to display in the user item
                user={user}
                // Handler function to call when the user is selected
                handler={selectMemberHandler}
                // Unique key for the user item
                key={index}
                // Whether the user is selected or not
                isAdded={Selectedmembers.includes(user._id)}
              />
            ))
          ) : (
            <Typography
              // Text alignment of the no friends message
              textAlign={"center"}
            >
              No Friends
            </Typography>
          )}
        </Stack>
      </Stack>
      <Stack
        // Direction of the stack
        direction={"row"}
        // Alignment of elements in the stack
        alignItems={"center"}
        // Justification of elements in the stack
        justifyContent={"space-evenly"}
        // Spacing between elements in the stack
        spacing={"2rem"}
        // Padding around the stack
        p={"2rem"}
      >
        {/* Cancel button, clears the dialog and resets members and selected members arrays */}
        <Button
          color="error"
          onClick={closeHandler}
        >
          Cancel
        </Button>

        {/* Add Member button, submits the add member request, closes the dialog, and calls the addMember function */}
        <Button
          sx={{ bgcolor: "green" }}
          variant="contained"
          disabled={isLoadingAddMember}
          onClick={addMemberSubmitHandler}
        >
          {/* eslint-disable-next-line max-len */}
          {/* Disabled if isLoadingAddMember is true, meaning a previous add member request is still pending */}
          Add Member
        </Button>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
