import React, { useState } from "react";
import { Button, Typography, useMediaQuery } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import Info from "./Info";
import Reviews from "./Reviews";

const Descriptions = ({
  t,
  variant,
  details,
  color,
  size,
  setLoading,
  loading,
}) => {
  const [state, setState] = useState("info");

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down(768));

  return (
    <Box mt={4}>
      {!md && (
        <Typography variant="h6" mb={3} fontWeight="700">
          {t("description")}
        </Typography>
      )}
      <Box
        display="flex"
        columnGap="16px"
        sx={{
          "& button": {
            width: "fit-content",
          },
        }}
      >
        <Button
          size="medium"
          onClick={() => setState("info")}
          color={state === "info" ? "primary" : "inherit"}
          variant="contained"
        >
          {t("GeneralInformation")}
        </Button>
        <Button
          onClick={() => setState("reviews")}
          size="medium"
          color={state === "reviews" ? "primary" : "inherit"}
          variant="contained"
        >
          {t("reviewss")}
        </Button>
      </Box>
      {state === "info" ? (
        <Info
          variant={variant}
          color={color}
          t={t}
          size={size}
          details={details}
        />
      ) : (
        <Reviews
          details={details}
          t={t}
          setLoading={setLoading}
          loading={loading}
        />
      )}
    </Box>
  );
};

export default Descriptions;
