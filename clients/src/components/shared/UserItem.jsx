import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import React, { memo } from "react";

/**
 * UserItem component renders a single user item in the user list.
 * @param {Object} props
 * @param {Object} props.user - user data from the server
 * @param {Function} props.handler - function to handle user item click
 * @param {Boolean} props.handlerIsLoading - whether handler function is loading
 * @param {Boolean} [props.isAdded=false] - whether user is added to the app (default: false)
 * @param {Object} [props.styling={}] - additional styles for the user item
 */
const UserItem = ({
  user, 
  handler, 
  handlerIsLoading, 
  isAdded = false, 
  styling = {},
}) => {
  const { name, _id, avatar } = user;

  return (
    <ListItem>
      <Stack
        direction="row"
        alignItems="center"
        spacing={"1rem"}
        width="100%"
        {...styling}
      >
        <Avatar src={avatar} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </Typography>
        <IconButton
          size="small"
          sx={{
            bgcolor: isAdded ? "red" : "blue",
            color: "white",
            "&:hover": { bgcolor: isAdded ? "red" : "darkblue" },
          }}
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
        >
          {isAdded ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
