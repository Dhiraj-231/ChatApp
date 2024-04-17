import {
  AudioFile as AudioFileIcon,
  Image as ImageIcon,
  UploadFile as UploadFileIcon,
  VideoFile as VideoFileIcon,
} from "@mui/icons-material";
import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useSendAttachementsMutation } from "../redux/api/api";
import { setIsFileMenu, setUploadingLoader } from "../redux/reducers/misc";

/**
 * FileMenu component renders a Material-UI Menu that allows users to send attachments.
 *
 * The component takes two props:
 *
 * - `anchorE1`: The anchor element for the Menu.
 * - `chatId`: The id of the chat where the attachments will be sent.
 *
 */
const FileMenu = ({ anchorE1, chatId }) => {
  const { isFileMenu } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const fileRef = useRef(null);
  const [sendAttachements] = useSendAttachementsMutation();

  /**
   * Closes the FileMenu by dispatching an action to redux store
   */
  const closeFileMenu = () => dispatch(setIsFileMenu(false));

  /**
   * Selects the input file element that is passed as a ref
   * @param {Object} ref - A React ref object
   */
  const selectRef = (ref) => {
    ref.current.click();
  };

  /**
   * Handles file change event for each input type and sends attachments to the server
   * @param {Object} e - event object
   * @param {String} key - The type of file being sent (image, audio, video or file)
   */
  const fileChangeHandler = async (e, key) => {
    const files = Array.from(e.target.files);
    if (files.length <= 0) return;
    if (files.length > 5) return toast.error(`You can send 5 ${key} at a time`);
    dispatch(setUploadingLoader(true));
    const toastId = toast.loading(`Sending ${key}....`);
    closeFileMenu();

    try {
      const myForm = new FormData();

      myForm.append("chatId", chatId);
      files.forEach((file) => myForm.append("files", file));

      const res = await sendAttachements(myForm);
      if (res.data)
        toast.success(`${key} sent successfully..`, { id: toastId });
      else toast.error(`Failed to send ${key}`, { id: toastId });
    } catch (error) {
      toast.error(error, { id: toastId });
    } finally {
      dispatch(setUploadingLoader(false));
    }
  };

  return (
    <Menu anchorEl={anchorE1} open={isFileMenu} onClose={closeFileMenu}>
      <div style={{ width: "10rem" }}>
        <MenuList>
          <MenuItem onClick={() => selectRef(imageRef)}>
            <Tooltip title="Image">
              <ImageIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Image</ListItemText>
            <input
              type="file"
              multiple
              accept="image/png,image/jpeg,image/gif,"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Image")}
              ref={imageRef}
            />
          </MenuItem>

          <MenuItem onClick={() => selectRef(audioRef)}>
            <Tooltip title="Audio">
              <AudioFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Audio</ListItemText>
            <input
              type="file"
              multiple
              accept="audio/mpeg,audio/wav,audio/ogg"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Audios")}
              ref={audioRef}
            />
          </MenuItem>

          <MenuItem onClick={() => selectRef(videoRef)}>
            <Tooltip title="Video">
              <VideoFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Video</ListItemText>
            <input
              type="file"
              multiple
              accept="video/mp4,video/webm,video/ogg,"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Videos")}
              ref={videoRef}
            />
          </MenuItem>

          <MenuItem onClick={() => selectRef(fileRef)}>
            <Tooltip title="File">
              <UploadFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>File</ListItemText>
            <input
              type="file"
              multiple
              accept="*"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Files")}
              ref={fileRef}
            />
          </MenuItem>
        </MenuList>
      </div>
    </Menu>
  );
};

export default FileMenu;
