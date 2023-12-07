import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const NewsCard = ({ item, t }) => {
  return (
    <Box
      sx={{
        padding: "16px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
        borderRadius: "8px",
      }}
    >
      <Box
        component="img"
        height={{
          xs: 114,
          md: 245,
        }}
        sx={{ objectFit: "cover" }}
        src={item.images[0].image}
        width="100%"
        alt=""
      />
      <Typography variant="h5" mt={2} fontWeight="700">
        {item.title}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          wordWrap: "break-word",
        }}
        lineHeight="19px"
        mt={2}
        mb={2}
      >
        {item.content}
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1">{item.created_at}</Typography>
        <Typography variant="body1">{item.views} просмотров</Typography>
      </Box>
    </Box>
  );
};

export default NewsCard;
