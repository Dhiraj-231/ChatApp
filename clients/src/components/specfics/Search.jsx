import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hook";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";
/**
 * Search component for finding and adding friends
 */
const Search = () => {
  // Redux store dispatch function
  const dispatch = useDispatch();
  // Search input state and change handler
  const search = useInputValidation("");
  // Whether search modal is open or not
  const { isSearch } = useSelector((state) => state.misc);
  // Lazy query for searching users
  const [searchUser] = useLazySearchUserQuery();
  // Mutation for sending friend request
  const [sendFriendRequest, isLoading] = useAsyncMutation(
    useSendFriendRequestMutation
  );
  // State for holding search results
  const [users, setUsers] = useState([]);

  /**
   * Add friend handler
   * @param {string} id User ID of friend to add
   */
  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending friend Request...", { userId: id });
  };

  /**
   * Close search modal handler
   */
  const searchCloseHandler = () => dispatch(setIsSearch(false));

  /**
   * Search effect,
   * sets search results state after 1 second
   */
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log(e));
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {users.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoading}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
