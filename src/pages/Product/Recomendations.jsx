import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { t } from "i18next";
import { Link } from "react-router-dom";

const Recomendations = ({ details, products }) => {
  return (
    <Box mt={4}>
      <Typography color="#00000050" mb={2} fontWeight="300" variant="body2">
        {t("recomendations")}
      </Typography>
      <Box display="flex" columnGap="16px">
        {products?.map((item, idx) => (
          <Link aria-label="read more" to={`/details/${item.id}`}>
            <Box
              component="img"
              src={item?.product_variation?.images[0]?.image}
              sx={{
                height: { xs: 70, md: 148 },
                width: { xs: 70, md: 148 },
                borderRadius: 1,
                objectFit: "cover",
              }}
              key={idx}
              alt=""
            />
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Recomendations;
