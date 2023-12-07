import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { ArrowDropDownIcon } from "../assets/images/icons";

const DropdownSort = ({ setOpen, setAnchorEl, value }) => {
  const handleClick = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };
  return (
    <Box
      onClick={handleClick}
      sx={{
        mt: 3,
        mb: 3,
        width: { xs: "100%", md: 200 },
        padding: "16px",
        background: "#FFFFFF",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="body2">По умолчанию</Typography>
      <ArrowDropDownIcon />
    </Box>
  );
};

export default DropdownSort;
