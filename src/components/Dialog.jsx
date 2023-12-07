import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dialog, Typography } from "@mui/material";
import { Box } from "@mui/system";
import cookie from "cookie_js";
import { useNavigate } from "react-router";
import { t } from "i18next";

const Dialogs = ({
  setOpen,
  open,
  title,
  subtitle,
  product,
  handleRemoveProduct,
  item,
  exit,
}) => {
  const navigate = useNavigate();
  return (
    <Dialog
      sx={{
        "& .MuiPaper-root": {
          p: 2,
        },
      }}
      onClose={() => setOpen(false)}
      open={open}
    >
      <FontAwesomeIcon icon="power-off" fontSize={32} color="#E32967" />

      <Typography
        variant="subtitle2"
        fontWeight="700"
        textAlign="center"
        mt={2}
        mb={1}
      >
        {title}
      </Typography>
      <Typography variant="body1" color="#15151570" textAlign="center">
        {subtitle}
      </Typography>

      <Box
        mt={2}
        borderTop="1px solid #00000010"
        display="flex"
        pt={2}
        justifyContent="space-between"
      >
        <Button fullWidth color="success" onClick={() => setOpen(false)}>
          <Typography variant="body2" color="#151515">
            {t("no")}
          </Typography>
        </Button>
        <Button
          fullWidth
          onClick={() => {
            if (exit) {
              localStorage.clear();
              cookie.removeSpecific("token_opop", {
                path: "/",
              });
              navigate("/");
              setTimeout(() => {
                window.location.reload();
              }, 200);
            } else {
              if (product) {
                handleRemoveProduct(product.id, product.sum);
                setOpen(false);
              } else {
                setOpen(false);
                handleRemoveProduct(item);
              }
            }
          }}
        >
          <Typography variant="body2" color="#E32967">
            {t("yes")}
          </Typography>
        </Button>
      </Box>
    </Dialog>
  );
};

export default Dialogs;
