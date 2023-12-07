import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const PaginationTop = ({ data, page, prev, next, totalPages }) => {
  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={prev} aria-label="prev" >
        <svg
          width="46"
          height="46"
          viewBox="0 0 46 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="46"
            height="46"
            rx="23"
            transform="matrix(-1 0 0 1 46 0)"
            fill="#F1F1F1"
          />
          <path
            d="M24.75 28.875C24.9961 28.875 25.2148 28.793 25.3789 28.6289C25.7344 28.3008 25.7344 27.7266 25.3789 27.3984L20.7578 22.75L25.3789 18.1289C25.7344 17.8008 25.7344 17.2266 25.3789 16.8984C25.0508 16.543 24.4766 16.543 24.1484 16.8984L18.8984 22.1484C18.543 22.4766 18.543 23.0508 18.8984 23.3789L24.1484 28.6289C24.3125 28.793 24.5312 28.875 24.75 28.875Z"
            fill="#1E1E1E"
          />
        </svg>
      </IconButton>
      <Typography variant="body1" m="0 16px">
        {page} / {!totalPages ? 1 : totalPages}
      </Typography>
      <IconButton aria-label="next"  onClick={next}>
        <svg
          style={{
            transform: "rotate(180deg)",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
            borderRadius: "100%",
          }}
          width="46"
          height="46"
          viewBox="0 0 46 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="46"
            height="46"
            rx="23"
            transform="matrix(-1 0 0 1 46 0)"
            fill="#FFFFFF"
          />
          <path
            d="M24.75 28.875C24.9961 28.875 25.2148 28.793 25.3789 28.6289C25.7344 28.3008 25.7344 27.7266 25.3789 27.3984L20.7578 22.75L25.3789 18.1289C25.7344 17.8008 25.7344 17.2266 25.3789 16.8984C25.0508 16.543 24.4766 16.543 24.1484 16.8984L18.8984 22.1484C18.543 22.4766 18.543 23.0508 18.8984 23.3789L24.1484 28.6289C24.3125 28.793 24.5312 28.875 24.75 28.875Z"
            fill="#1E1E1E"
          />
        </svg>
      </IconButton>
    </Box>
  );
};

export default PaginationTop;
