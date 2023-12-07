import React from "react";
import { Box } from "@mui/system";
// eslint-disable-next-line no-unused-vars
import { Fancybox } from "@fancyapps/ui";
import { Typography } from "@mui/material";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";
import { makeStyles } from "@mui/styles";

const Image = ({ details, variant }) => {
  const classes = useStyles();
  return (
    <Box width={{ xs: "100%", md: "50%" }} mb={{ xs: 3, md: 0 }}>
      <Box
        width="100%"
        data-fancybox=""
        position="relative"
        data-src={variant?.images && variant?.images[0]?.image}
      >
        {variant?.is_promotion && (
          <Box
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              padding: "11px",
              background: "linear-gradient(90deg, #FE0E0E 0%, #FF8484 100%)",
              borderRadius: "8px",
              width: 59,
              height: 40,
            }}
          >
            <Typography
              variant="body2"
              whiteSpace="nowrap"
              fontWeight="700"
              color="#FFF"
            >
              -{variant?.percent_promotion}%
            </Typography>
          </Box>
        )}

        {!variant?.images?.length ? (
          <Box
            height={{ xs: 192, md: "687px" }}
            borderRadius="16px"
            width="100%"
            backgroundColor="#D9D9D9"
            alt=""
          />
        ) : (
          <InnerImageZoom
            zoomType="hover"
            zoomScale={1}
            src={variant?.images && variant?.images[0]?.image}
            style={{ borderRadius: "16px" }}
            width="100%"
            className={classes.img}
            height="auto"
            alt=""
          />
        )}
      </Box>
      <Box
        display="flex"
        alignItems="center"
        columnGap="16px"
        mt={2}
        height="50px"
        width="100%"
      >
        {variant?.images?.map((item, idx) => (
          <div
            key={idx}
            style={{
              width: "50px",
              height: "100%",
            }}
            data-fancybox="gallery"
            data-src={item?.image}
          >
            <img
              width="100%"
              style={{ borderRadius: 8 }}
              height="100%"
              alt=""
              src={item?.image}
            />
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default Image;

const useStyles = makeStyles((theme) => ({
  img: {
    objectFit: "contain",
    height: "663px",
    [theme.breakpoints.down(768)]: {
      height: "428px",
    },
  },
}));
