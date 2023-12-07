import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { Mbox } from "./Motion";

const Preloader = () => {
  return (
    <Mbox
      sx={{
        position: "fixed",
        left: "0",
        top: "0",
        zIndex: "1000000",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff!important",
      }}
    >
      <CircularProgress style={{ color: "var(--primary)" }} />
    </Mbox>
  );
};

export default Preloader;
