import { Container, Paper, Typography } from "@mui/material";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { matBlack } from "../../constants/Color";
/**
 * Table component
 *
 * @param {object} props component props
 * @param {array} props.rows data rows
 * @param {array} props.columns data columns
 * @param {string} props.heading table heading
 * @param {number} [props.rowHeight=52] table row height
 *
 * @returns {JSX.Element} Table component
 */
const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
  return (
    <Container
      // Make container take up the full height of the viewport
      sx={{
        height: "100vh",
      }}
    >
      <Paper
        // Give the paper a shadow effect
        elevation={3}
        // Add padding to the paper
        sx={{
          padding: "1rem 4rem",
          // Make the border of the paper rounded
          borderRadius: "1rem",
          // Center the paper inside the container
          margin: "auto",
          // Make the paper take up the full width of the container
          width: "100%",
          // Allow the table to overflow and be scrollable
          overflow: "hidden",
          // Make the paper take up the full height of the container
          height: "100%",
          // Remove the default shadow effect from the paper
          boxShadow: "none",
        }}
      >
        <Typography
          // Center the heading text
          textAlign={"center"}
          // Set the heading text variant
          variant="h4"
          // Add some styles to the heading
          sx={{
            // Add some margin to the heading
            margin: "2rem",
            // Capitalize the heading text
            textTransform: "uppercase",
          }}
        >
          {/* Render the heading */}
          {heading}
        </Typography>
        <DataGrid
          // Set the data rows
          rows={rows}
          // Set the data columns
          columns={columns}
          // Set the row height
          rowHeight={rowHeight}
          // Set the table's height to take up 80% of the container
          style={{ height: "80%" }}
          // Add some styles to the table
          sx={{
            // Remove the default border from the table
            border: "none",
            // Style the header row of the table
            ".table-header": {
              // Set the header row's background color
              bgcolor: matBlack,
              // Set the header row's text color
              color: "whitesmoke",
            },
          }}
        />
      </Paper>
    </Container>
  );
};

export default Table;
