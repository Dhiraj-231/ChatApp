import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import React from "react";
import { TransformImage } from "../../lib/feather";
/**
 * A component that renders a card with avatars.
 * @param {object} props The props
 * @param {string[]} [props.avatar] The array of avatar urls
 * @param {number} [props.max] The maximum number of avatars to display
 * @returns {JSX.Element} The element
 */
const AvatarCard = ({ avatar = [], max = 4 }) => {
  /**
   * Render each avatar.
   * @param {string} image The image url
   * @param {number} index The index of the image
   * @returns {JSX.Element} The element
   */
  const renderAvatar = (image, index) => (
    <Avatar
      key={Math.random() * 100}
      src={TransformImage(image)}
      alt={`Avatar ${index}`}
      sx={{
        width: "3rem",
        height: "3rem",
        position: "absolute",
        left: {
          xs: `${0.5 + index}rem`,
          sm: `${index}rem`,
        },
      }}
    />
  );

  return (
    <Stack direction={"row"} spacing={0.5}>
      <AvatarGroup max={max} sx={{ position: "relative" }}>
        <Box width={"5rem"} height={"3rem"}>
          {avatar.map(renderAvatar)}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCard;
