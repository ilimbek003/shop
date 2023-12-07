import { Box } from "@mui/system";
import React from "react";
import { CheckMarkIcon, CheckMarkIconFill } from "../assets/images/icons";

const RadioBtn = ({ id, value, handleChange, name }) => {
  return (
    <Box
      sx={{
        "& input": {
          position: "absolute",
          top: "35%",
          right: 16,
          opacity: 0,
        },
      }}
    >
      <input
        type="radio"
        required
        name={name}
        onChange={handleChange}
        value={id}
      />
      {id == value ? <CheckMarkIconFill /> : <CheckMarkIcon />}
    </Box>
  );
};

export default RadioBtn;
