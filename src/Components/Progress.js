import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularIndeterminate() {
  return (
    <Box
      sx={{
        position: "fixed",
        display: "flex",
        alignItems: "center",
        zIndex: "3",
        minHeight: "100vh",
        left: "50%",
        transform: "translate(-50%, 0)",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
