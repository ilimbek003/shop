import { Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const ProductSkeleton = () => {
  return (
    <Box
      borderRadius={1}
      height={{ xs: 422, md: "500px" }}
      border="1px solid #CECECE"
      overflow="hidden"
    >
      <Skeleton
        variant="rounded"
        width="100%"
        sx={{
          height: { xs: "164px", md: "302px" },
        }}
      />
      <Box p={2}>
        <Skeleton variant="text" width="60%" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" width="40%" sx={{ fontSize: "0.8rem" }} />
        <Skeleton variant="text" width="90%" sx={{ fontSize: "0.8rem" }} />
      </Box>
    </Box>
  );
};

export default ProductSkeleton;
