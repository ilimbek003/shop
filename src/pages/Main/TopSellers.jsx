import React from "react";
import { Container, Grid, Typography, useMediaQuery } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import ProductCard from "../../components/ProductCard";
import PaginationTop from "../../components/PaginationTop";
import { useSelector } from "react-redux";
import usePagination from "../../hooks/usePagination";
import ProductSkeleton from "../../components/ProductSkeleton";
import { getProductsHotSellingNext } from "../../redux/reducers/products";
import { Link } from "react-router-dom";

const TopSellers = ({ t, setCartSum, cartSum }) => {
  const { products_hot_selling } = useSelector(({ products }) => products);

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
    func: getProductsHotSellingNext,
    next: products_hot_selling?.data?.next,
    count: products_hot_selling?.data?.count,
  });

  return (
    <Box component="section" pb="60px">
      <Container maxWidth="xl">
        <Box
          display="flex"
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h3" fontWeight="700">
            {t("Bestsellers")}
          </Typography>
          {md ? (
            <Link aria-label="read more" to={`/catalog/?top_sellers`}>
              <Typography variant="body2">Показать все</Typography>
            </Link>
          ) : (
            <PaginationTop
              prev={prevPage}
              next={nextPage}
              totalPages={totalPages}
              data={products_hot_selling.data}
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
          {products_hot_selling.isLoading
            ? Array.from(Array(md ? 2 : 4).keys()).map((item, idx) => (
                <Grid key={idx} item xs={6} md={4} lg={3}>
                  <ProductSkeleton />
                </Grid>
              ))
            : products_hot_selling?.data?.results
                ?.slice(firstContentIndex, lastContentIndex)
                ?.map((item, idx) => (
                  <Grid item xs={6} md={4} key={idx} lg={3}>
                    <ProductCard
                      setCartSum={setCartSum}
                      cartSum={cartSum}
                      item={item}
                      topSell
                      t={t}
                      key={idx}
                    />
                  </Grid>
                ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TopSellers;
