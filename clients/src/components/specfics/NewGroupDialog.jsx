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
const NewGroupDialog = () => {
  const NewGroup = useInputValidation("");
  const [members, setMembers] = useState(SampleUser);
  const [Selectedmembers, setSelectedMembers] = useState([]);
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currentElement) => currentElement !== id)
        : [...prev, id]
    );
  };

  const submitHandler = () => {
    console.log("hii");
  };
  const closeHandler = () => {};
  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
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
