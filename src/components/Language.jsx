import React, { useRef, useState } from "react";
import {
  Button,
  ListItem,
  Paper,
  Slide,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@mui/system";

const languageMap = {
  // kg: { label: "Кыр", dir: "ltr", active: true },
  ru: { label: "Рус", dir: "ltr", active: false },
};

const Language = () => {
  const {  i18n } = useTranslation();

  const handleClose = (item) => {
    document.body.classList.remove("scrolled-body");
    i18n.changeLanguage(item);
    document.documentElement.lang = item;
    localStorage.setItem("i18nextLng", item);
    setOpen(false);
  };

  const list = (
    <Paper sx={{ position: "absolute" }}>
      {Object.keys(languageMap)?.map((item) => (
        <ListItem button key={item} onClick={() => handleClose(item)}>
          <Typography variant="body2">{languageMap[item].label}</Typography>
        </ListItem>
      ))}
    </Paper>
  );

  const [open, setOpen] = useState(false);

  const containerRef = useRef(null);

  return (
    <Box sx={{}} ref={containerRef}>
      <Button
        aria-label="change langauge"
        size="small"
        sx={{ color: "#3698D4" }}
        onClick={() => {
          document.body.classList.add("scrolled-body");
          setOpen(!open);
        }}
      >
        <FontAwesomeIcon icon="globe" color="#3698D4" />
        <Typography variant="body2" textTransform="none" p="0 4px">
          {i18n.resolvedLanguage === "ru" ? "Рус" : "Кыр"}
        </Typography>
        <FontAwesomeIcon icon="angle-down" color="#3698D4" />
      </Button>
      <Slide direction="down" in={open} container={containerRef.current}>
        {list}
      </Slide>
    </Box>
  );
};

export default Language;
