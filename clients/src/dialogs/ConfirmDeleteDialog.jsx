import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

/**
 * A confirmation dialog for deleting a group.
 *
 * @param {boolean} open Whether the dialog is open or not.
 * @param {function} handleClose A function to call when the dialog is closed.
 * @param {function} deleteHandler A function to call when the user confirms
 *                                 the deletion of the group.
 */
const ConfirmDeleteDialog = ({ open, handleClose, deleteHandler }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {/* Confirm deletion of the group */}
          Are you sure you want to delete this group ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{/* No */ "No"}</Button>
        <Button
          color="error"
          onClick={deleteHandler}
        >
          {/* Yes */ "Yes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};


export default ConfirmDeleteDialog;
