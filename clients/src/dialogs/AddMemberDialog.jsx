import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { SampleUser as Users } from "../constants/SampleData";
import UserItem from "../components/shared/UserItem";
const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
  const [members, setMembers] = useState(Users);
  const [Selectedmembers, setSelectedMembers] = useState([]);
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currentElement) => currentElement !== id)
        : [...prev, id]
    );
  };
  const closeHandler = () => {
    setMembers([]);
    setSelectedMembers([]);
  };
  const addMemberSubmitHandler = () => {
    closeHandler();
  };
  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          {members.length > 0 ? (
            members.map((user, index) => (
              <UserItem
                user={user}
                handler={selectMemberHandler}
                key={index}
                isAdded={Selectedmembers.includes(user._id)}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          )}
        </Stack>
      </Stack>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
        spacing={"2rem"}
        p={"2rem"}
      >
        <Button color="error" onClick={closeHandler}>
          Cancel
        </Button>
        <Button
          sx={{ bgcolor: "green" }}
          variant="contained"
          disabled={isLoadingAddMember}
          onClick={addMemberSubmitHandler}
        >
          Add Member
        </Button>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
