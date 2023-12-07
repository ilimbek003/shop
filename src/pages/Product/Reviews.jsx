/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fancybox } from "@fancyapps/ui";
import { useDispatch } from "react-redux";
import { getProductReviewImages } from "../../redux/reducers/products";

const Reviews = ({ t, details, review_images }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductReviewImages(details.id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      mt={4}
      sx={{
        padding: "24px",
        background: "#FFFFFF",
        width: "100%",
      }}
    >
      <Typography variant="h6" fontWeight="700">
        {t("photoAndVideos")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          padding: "24px",
          columnGap: "24px",
        }}
      >
        {review_images?.results?.map((item, idx) => (
          <div
            width="100%"
            key={idx}
            data-fancybox="gallery-2"
            position="relative"
            data-src={item?.image}
          >
            <img src={item?.image} style={{ width: 162 }} alt="" />
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default Reviews;
