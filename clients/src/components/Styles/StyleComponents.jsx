import { styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";
import { grayColor } from "../../constants/Color";

/**
 * A visually hidden input.
 *
 * This component is used to provide a label for other components
 * that don't have a label, like radio buttons and checkboxes.
 */
export const VisuallyHiddenInput = styled("input")(
  {
    /**
     * Hide the input from screen readers and browsers
     */
    border: 0,
    clip: "rect(0, 0, 0, 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1,
  },
  /**
   * Use CSS to style the component.
   */
  {
    /* stylelint-disable-next-line */
    "@global": {
      /**
       * Remove the default focus outline
       */
      "input:focus": {
        outline: "none",
      },
    },
  }
);

/**
 * A styled Link component.
 */
export const Link = styled(LinkComponent)`
  /**
   * Remove the underline from the link
   */
  text-decoration: none;

  /**
   * Set the link color
   */
  color: black;

  /**
   * Add some padding to the link
   */
  padding: 1rem;

  /**
   * Add a hover effect
   */
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

/**
 * A styled input box.
 */
export const InputBox = styled("input")({
  /**
   * Make the input take up the full width of its container
   */
  width: "100%",

  /**
   * Make the input take up the full height of its container
   */
  height: "100%",

  /**
   * Remove the border
   */
  border: 0,

  /**
   * Remove the outline
   */
  outline: 0,

  /**
   * Add some padding
   */
  padding: "0 3rem",

  /**
   * Add a rounded border
   */
  borderRadius: "1.5rem",

  /**
   * Set the background color
   */
  backgroundColor: grayColor,

  /**
   * Set the font size
   */
  fontSize: "1rem",

  /**
   * Add some letter spacing
   */
  letterSpacing: "2px",
});

/**
 * A styled search field.
 */
export const SearchField = styled("input")`
  /**
   * Add some padding
   */
  padding: 1rem 2rem;

  /**
   * Remove the border
   */
  border: none;

  /**
   * Remove the outline
   */
  outline: none;

  /**
   * Add a rounded border
   */
  borderradius: "1.5rem";

  /**
   * Set the background color
   */
  background-color: #dddddd;

  /**
   * Set the font size
   */
  font-size: 1rem;
`;

/**
 * A styled button with a curved edge.
 */
export const CurveButton = styled("button")`
  /**
   * Add a rounded border
   */
  border-radius: 1.5rem;

  /**
   * Add some padding
   */
  padding: 1rem 2rem;

  /**
   * Remove the border
   */
  border: none;

  /**
   * Remove the outline
   */
  outline: none;

  /**
   * Set the cursor to a pointer
   */
  cursor: pointer;

  /**
   * Set the background color
   */
  background-color: black;

  /**
   * Set the text color
   */
  color: white;

  /**
   * Set the font size
   */
  font-size: 1rem;

  /**
   * Add a hover effect
   */
  &: hover {
    /**
     * Add a hover effect
     */
    background-color: rgba(0, 0, 0, 0.8);
  }
`;
