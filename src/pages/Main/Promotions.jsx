import React from "react";
import { Container, Grid, Typography, useMediaQuery } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import PaginationTop from "../../components/PaginationTop";
import { useSelector } from "react-redux";
import usePagination from "../../hooks/usePagination";
import ProductSkeleton from "../../components/ProductSkeleton";
import { getProductsPromotionNext } from "../../redux/reducers/products";
import PromotionCard from "./PromotionCard";
import { Link } from "react-router-dom";

const Promotions = ({ t, setCartSum, cartSum }) => {
  const { products_promotion } = useSelector(({ products }) => products);

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("768"));

  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    totalPages,
  } = usePagination({
    contentPerPage: md ? 50 : 4,
    func: getProductsPromotionNext,
    next: products_promotion?.data?.next,
    count: products_promotion?.data?.count,
  });

  return (
    <Box component="section" pt="60px" pb="110px">
      <Container maxWidth="xl">
        <Box
          display="flex"
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h3" fontWeight="700">
            {t("sale")}
          </Typography>
          {md ? (
            <Link aria-label="read more" to={`/catalog/?promotitons`}>
              <Typography variant="body2">Показать все</Typography>
            </Link>
          ) : (
            <PaginationTop
              prev={prevPage}
              next={nextPage}
              totalPages={totalPages}
              data={products_promotion.data}
              page={page}
            />
          )}
        </Box>
        <Grid
          container
          sx={{
            overflow: "auto",
            pb: 2,
          }}
          className="scroll"
          flexWrap={{ xs: "nowrap", md: "wrap" }}
          spacing={{ xs: 2, md: 3 }}
        >
          {products_promotion.isLoading
            ? Array.from(Array(md ? 2 : 4).keys()).map((item, idx) => (
                <Grid key={idx} item xs={6} md={4} lg={3}>
                  <ProductSkeleton />
                </Grid>
              ))
            : Array.isArray(products_promotion?.data?.results) &&
              products_promotion.data.results
                .slice(firstContentIndex, lastContentIndex)
                .map((item, idx) => (
                  <Grid key={idx} item xs={6} md={4} lg={3}>
                    <PromotionCard
                      setCartSum={setCartSum}
                      promotion
                      cartSum={cartSum}
                      item={item}
                      t={t}
                    />
                  </Grid>
                ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Promotions;
