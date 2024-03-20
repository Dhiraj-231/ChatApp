import { styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";
import { grayColor } from "../../constants/Color";
export const VisuallyHiddenInput = styled("input")({
  border: 0,
  clip: "rect(0,0,0,0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

export const Link = styled(LinkComponent)`
  text-decoration: none;
  color: black;
  padding: 1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export const InputBox = styled("input")({
  width: "100%",
  height: "100%",
  border: 0,
  outline: 0,
  padding: "0 3rem",
  borderRadius: "1.5rem",
  backgroundColor: grayColor,
  fontSize: "1rem",
  letterSpacing: "2px",
});
