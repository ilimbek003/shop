import {
  Popover,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const Dropdown = ({ title, children, value, anchorEl, setAnchorEl }) => {

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down(768));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "33%" },
        mb: { xs: 2, md: 0 },
        border: "1px solid #E0E0E0",
        borderRadius: 1,
        cursor: "pointer",
        userSelect: "none",
        height: 49,
        display: "flex",
        alignItems: "center",
        "&:hover": {
          borderColor: "var(--primary)",
        },
      }}
    >
      <Box
        onClick={handleClick}
        ml={2}
        mr={2}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" fontWeight="700">
          {value ? value : title}
        </Typography>
        <svg
          width="13"
          height="7"
          viewBox="0 0 13 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.2383 0.464844L12.0469 0.273437C11.9102 0.136719 11.7187 0.136719 11.582 0.273437L6.25 5.60547L0.890625 0.273437C0.753906 0.136718 0.5625 0.136718 0.425781 0.273437L0.234375 0.464843C0.0976562 0.601562 0.0976562 0.792968 0.234375 0.929687L6.00391 6.69922C6.14062 6.83594 6.33203 6.83594 6.46875 6.69922L12.2383 0.929687C12.375 0.792969 12.375 0.601562 12.2383 0.464844Z"
            fill="#1E1E1E"
          />
        </svg>
      </Box>
      {!sm ? (
        <Popover
          sx={{ "& .MuiPaper-root": { width: "416px" } }}
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          {children}
        </Popover>
      ) : (
        <SwipeableDrawer
          SwipeableDrawer
          anchor="bottom"
          sx={{
            "& .MuiPaper-root": {
              width: "100%",
              p: 2,
              maxHeight: "calc(100% - 100px)",
              background: "#FFFFFF",
              borderRadius: "8px 8px 0 0",
            },
          }}
          open={open}
          onClose={handleClose}
        >
          {children}
        </SwipeableDrawer>
      )}
    </Box>
  );
};

export default Dropdown;
