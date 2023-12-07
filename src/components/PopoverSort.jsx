import { List, ListItem, Popover, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { t } from "i18next";
import React from "react";
import { CheckMarkIcon, CheckMarkIconFill } from "../assets/images/icons";

const array = [
  { txt: t("default"), id: 1 },
  { txt: t("newOnesFirst"), id: 2 },
  { txt: t("oldestFirst"), id: 3 },
  { txt: t("chepOnesFirst"), id: 4 },
  { txt: t("expensiveFirst"), id: 5 },
];

const PopoverSort = ({ open, setOpen, anchorEl, value, setValue }) => {
  return (
    <Popover
      open={open}
      onClose={() => setOpen(false)}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      sx={{ "& .MuiPaper-root": { p: 2, width: 416 } }}
    >
      <Box display="flex" mt={2} mb={2} justifyContent="space-between">
        <Typography variant="body2">Сортировка цены</Typography>
        <svg
          width="13"
          height="7"
          viewBox="0 0 13 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.2383 6.53516L12.0469 6.72656C11.9102 6.86328 11.7187 6.86328 11.582 6.72656L6.25 1.39453L0.890625 6.72656C0.753906 6.86328 0.5625 6.86328 0.425781 6.72656L0.234375 6.53516C0.0976562 6.39844 0.0976562 6.20703 0.234375 6.07031L6.00391 0.300782C6.14062 0.164063 6.33203 0.164063 6.46875 0.300782L12.2383 6.07031C12.375 6.20703 12.375 6.39844 12.2383 6.53516Z"
            fill="#1E1E1E"
          />
        </svg>
      </Box>

      <List>
        {array.map((item, idx) => (
          <ListItem
            button
            key={idx}
            onClick={() => setValue(item.id)}
            sx={{
              background: "#F1F1F1",
              borderRadius: "8px",
              p: 2,
              mb: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2">{item.txt}</Typography>
            {item.id == value ? <CheckMarkIconFill /> : <CheckMarkIcon />}
          </ListItem>
        ))}
      </List>
    </Popover>
  );
};

export default PopoverSort;
