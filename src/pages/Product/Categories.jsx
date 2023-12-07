import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Categories = ({ t }) => {
  return (
    <Box
      mt={4}
      sx={{
        padding: "24px",
        background: "#FFFFFF",
        width: "100%",
      }}
    >
      <Typography variant="h6" mb={3} fontWeight="700">
        {t("compilation")}
      </Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="center" columnGap={3} rowGap={3}>
        {Array.from(Array(12).keys()).map((item) => (
          <Box
            sx={{
							width: "22%",
              padding: "12px",
              background: "#F5F6F8",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body2" textAlign="center">Категория товаров</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Categories;
