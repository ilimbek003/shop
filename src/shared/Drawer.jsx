import React from "react";
import { List, ListItem, SwipeableDrawer, Typography } from "@mui/material";
import logo from "../assets/images/logo.svg";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const DrawerSite = ({ open, setOpen, t }) => {
  const navigate = useNavigate();
  const array = [
    {
      txt: t("main"),
      path: "/",
    },
    {
      txt: t("aboutUs"),
      path: "/about-us",
    },
    {
      txt: t("termsOfPurchase"),
      path: "/terms-of-purchase",
    },
    {
      txt: t("purchase"),
      path: "/purchase",
    },
    {
      txt: t("shipping"),
      path: "/shipping",
    },

    {
      txt: t("wholesalers"),
      path: "/wholesalers",
    },


    {
      txt: t("contacts"),
      path: "/contacts",
    },
  ];

  return (
    <SwipeableDrawer
      anchor="right"
      sx={{
        "&.MuiDrawer-root": {
          zIndex: 1199,
        },
        "& .MuiPaper-root": {
          width: "70%",
          p: "32px 0",
          backgroundColor: "#282B3D",
          borderRadius: "16px 0 0 16px",
        },
      }}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Link aria-label="read more" to="/">
        <Box component="img" ml={4} src={logo} width="108px" alt="" />
      </Link>

      <Box display="flex" justifyContent="end">
        <List
          sx={{
            width: { xs: "100%", md: "40%" },
            pt: 2,
            mt: 2,
            borderTop: "1px solid #FFFFFF15",
            pb: 2,
            mb: 2,
            borderBottom: "1px solid #FFFFFF15",
            "& div": {
              color: "var(--secondary)",
              p: "16px 32px",
              "& p": {
                width: "100%",
                textAlign: "end",
              },
            },
          }}
        >
          {array.map((item, idx) => (
            <ListItem button key={idx} onClick={() => navigate(item.path)}>
              <Typography variant="body1" color="#FFF">
                {item.txt}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </SwipeableDrawer>
  );
};

export default DrawerSite;
