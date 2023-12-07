import React from "react";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import whatsapp from "../../../assets/images/whatsapp.png";

const Info = ({ variant, details, t, color, size }) => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down(768));

  return (
    <>
      {!md && (
        <Box
          mt={4}
          sx={{
            padding: "24px",
            background: "#FFFFFF",
          }}
        >
          <Typography variant="h6" fontWeight="700" mb={3}>
            {t("character")}
          </Typography>

          <Box
            component="table"
            borderBottom="1px solid #00000010"
            pb={2}
            mb={2}
            sx={{
              width: "100%",
              "& p": {
                p: 1,
              },
            }}
          >
            <tr>
              <td>
                <Typography variant="body2" fontWeight="300">
                  {t("article")}:
                </Typography>
              </td>
              <td>
                <Typography variant="body2" fontWeight="700">
                  9379992
                </Typography>
              </td>
              <td>
                <Typography variant="body2" fontWeight="300">
                  {t("color")}:
                </Typography>
              </td>
              <td>
                <Typography variant="body2" fontWeight="700">
                  {color}
                </Typography>
              </td>
              <td>
                <Typography variant="body2" fontWeight="300">
                  Материал:
                </Typography>
              </td>
              <td>
                <Typography variant="body2" fontWeight="700">
                  {variant?.composition}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant="body2" fontWeight="300">
                  {t("size")}:
                </Typography>
              </td>
              <td>
                <Typography variant="body2" fontWeight="700">
                  {size}
                </Typography>
              </td>
              <td>
                <Typography variant="body2" fontWeight="300">
                  {t("stock")}:
                </Typography>
              </td>
              <td>
                <Typography variant="body2" fontWeight="700">
                  {variant?.color_amount > 0
                    ? "Есть в наличии"
                    : "Нет в наличии"}
                </Typography>
              </td>
              <td>
                <Typography variant="body2" fontWeight="300">
                  {t("madeIn")}:
                </Typography>
              </td>
              <td>
                <Typography variant="body2" fontWeight="700">
                  {variant?.made_in?.name}
                </Typography>
              </td>
            </tr>
          </Box>
          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center" }}
            lineHeight="17px"
            color="#00000050"
            mt={1}
          >
            <div>
              {t("questions")}{" "}
              <a href="https://wa.me/996505919999" className="primary">
                +996 505 91 99 99
              </a>
            </div>
            <a
              aria-label="read more"
              href="https://wa.me/996505919999"
              target="_blank"
              style={{ marginLeft: 8 }}
              rel="noreferrer"
            >
              <img src={whatsapp} width="40" height="40" alt="" />
            </a>
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          mt: 4,
          mb: 4,
          padding: { xs: 0, md: "24px" },
          background: "#FFFFFF",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={variant?.images && variant?.images[0]?.image}
          height={{ xs: 396, md: "311px" }}
          width={{ xs: "100%", md: "60%" }}
          sx={{
            objectFit: "scale-down",
          }}
          alt={variant?.images && variant?.images[0]?.image}
        />
        {!md && (
          <>
            <Box width="40%" ml={5}>
              <Typography variant="h6" fontWeight="700" mb={2}>
                {t("descr")}
              </Typography>
              <Typography variant="body2" lineHeight="17px">
                {details?.description}
              </Typography>
            </Box>
          </>
        )}
      </Box>
      <Grid container spacing={1}>
        {variant?.images?.map((item, idx) => (
          <Grid item xs={6}>
            {" "}
            <img
              height="auto"
              src={item.image}
              style={{ objectFit: "contain", maxHeight: 500 }}
              width="100%"
              alt=""
            />{" "}
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Info;
