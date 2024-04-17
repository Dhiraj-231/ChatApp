import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { useError } from "../../hooks/hook";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../redux/reducers/misc";
import toast from "react-hot-toast";

/**
 * Notification Component
 *
 * This component displays the notifications to the user.
 * It uses the custom hook `useGetNotificationsQuery` from the `api` folder to get
 * the notifications from the server.
 * The `useAcceptFriendRequestMutation` is also used to accept/reject friend requests.
 */
const Notification = () => {
  /**
   * `isNotification` is a boolean value that determines if
   * the notification dialog should be displayed or not.
   */
  const { isNotification } = useSelector((state) => state.misc);

  /**
   * `useGetNotificationsQuery` is a custom hook that returns the
   * `isLoading`, `data`, `isError` and `error` from the query
   */
  const { isLoading, data, isError, error } = useGetNotificationsQuery();

  /**
   * The redux `dispatch` function is used to dispatch actions
   */
  const dispatch = useDispatch();

  /**
   * `acceptRequest` is a function that is used to accept or reject
   * friend requests.
   */
  const [acceptRequest] = useAcceptFriendRequestMutation();

  /**
   * `friendRequestHandler` is a function that handles the friend request
   * accept or reject action.
   * @param {{_id: string, accept: boolean}} param0
   */
  const friendRequestHandler = async ({ _id, accept }) => {
    /**
     * Setting the notification to false so that the notification dialog is closed
     */
    dispatch(setIsNotification(false));

    try {
      /**
       * The `acceptRequest` function is called with the `requestId` and `accept` parameters
       * to either accept or reject the friend request.
       */
      const res = await acceptRequest({ requestId: _id, accept });

      /**
       * If the request is successful, a toast is displayed to the user
       */
      if (res.data?.success) {
        //We have to use socket here
        toast.success(res?.data?.message);
      } else {
        /**
         * If the request is not successful, an error toast is displayed
         */
        toast.error(res.data?.error || "Something Went Wrong..");
      }
    } catch (error) {
      /**
       * If there is any error, log it and display a generic error toast
       */
      console.log(error);
      toast.error("Something Went Wrong.");
    }
  };

  /**
   * `closeHandler` is a function that is called when the notification dialog
   * is closed. It sets the `isNotification` to false.
   */
  const closeHandler = () => dispatch(setIsNotification(false));

  /**
   * `useError` is a custom hook that displays an error toast if there is any error
   */
  useError([{ error, isError }]);

  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notification</DialogTitle>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.allRequests?.length > 0 ? (
              data?.allRequests.map((i) => (
                <NotificationItems
                  sender={i.sender}
                  _id={i._id}
                  handler={friendRequestHandler}
                  key={i._id}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>0 notifications</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItems = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
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
          {`${name} sent you a friend request.`}
        </Typography>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});
export default Notification;
