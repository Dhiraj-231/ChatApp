import { Grid, Skeleton, Stack } from "@mui/material";
import React from "react";

/**
 * Renders a responsive layout with a sidebar and a main content area.
 * The sidebar is only visible on larger screens.
 * The main content area has a header and a list of skeletons.
 */
export const LayoutLoader = () => {
  return (
    <Grid
      container
      height={"calc(100vh - 4rem)"} // subtract the height of the navbar
      spacing={"1rem"}
    >
      <Grid
        item
        sm={4} // hide the sidebar on smaller screens
        md={3} // show the sidebar on larger screens
        sx={{
          display: { xs: "none", sm: "block" },
        }}
        height={"100%"}
      >
        <Skeleton variant="rectangular" height={"100vh"} />
      </Grid>
      <Grid
        item
        xs={12} // take up the full width on smaller screens
        sm={8} // take up 8/12 of the available width on larger screens
        md={5} // take up 5/12 of the available width on larger screens
        lg={6} // take up 6/12 of the available width on largest screens
        height={"100%"}
      >
        <Stack spacing={"1rem"}>
          {/* Render a list of skeletons to create a header-like layout */}
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} variant="rounded" height={"5rem"} />
          ))}
        </Stack>
      </Grid>
      <Grid
        item
        md={5} // hide the sidebar on smaller screens
        lg={3} // show the sidebar on larger screens
        height={"100%"}
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <Skeleton variant="rectangular" height={"100vh"} />
      </Grid>
    </Grid>
  );
};
