import { CircularProgress, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { NothingFound } from "../../assets/images/icons";
import ProductCard from "../../components/ProductCard";
import ProductSkeleton from "../../components/ProductSkeleton";
import useSort from "../../hooks/useSort";
import { getProductsByURL } from "../../redux/reducers/products";
import PromotionCard from "../Main/PromotionCard";

const Products = ({
  setLoading,
  loading,
  t,
  sortingBy,
  setSortingBy,
  setCartSum,
  cartSum,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { catalog } = useSelector(({ products }) => products);

  const [fetching, setFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  // const [footerHeight, setFooterHeight] = useState(0);

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    // hide linear progress
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalog]);

  useEffect(() => {
    if (catalog?.data?.results) setProducts([...catalog?.data?.results]);
    // setFooterHeight(document.getElementsByTagName("footer")[0]?.clientHeight);
  }, [catalog]);

  useEffect(() => {
    if (fetching) {
      if (catalog.data?.next) {
        setTimeout(() => setIsLoading(false), 3000);
        setFetching(false);
        dispatch(getProductsByURL(catalog.data?.next));
      }
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandle);
    return function () {
      document.removeEventListener("scroll", scrollHandle);
    };
  });

  const scrollHandle = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      1
    ) {
      setIsLoading(true);
      setFetching(true);
    }
  };

  const { sortBy } = useSort({
    array: products,
    copyArray: catalog?.data?.results,
    setArray: setProducts,
    sortingBy: sortingBy,
  });

  useEffect(() => {
    sortBy();
  }, [sortingBy]);

  return (
    <>
      {!catalog?.data?.results?.length ? (
        <Box
          display="flex"
          mt={3}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <NothingFound />
          <Typography variant="h5" fontWeight="700" mb={2} mt={2}>
            {t("nothingFound")}
          </Typography>
          <Typography
            variant="subtitle2"
            maxWidth="400px"
            textAlign="center"
            fontWeight="400"
          >
            {t("nothingFoundTxt")}
          </Typography>
        </Box>
      ) : (
        <>
          {" "}
          <Typography variant="h5" mb={2} mt={2}>
            {t("find")}:{" "}
            <span
              style={{
                fontWeight: 700,
              }}
            >
              {catalog.data?.count}
            </span>
          </Typography>
          <Grid container spacing={3}>
            {loading
              ? Array.from(Array(12).keys()).map((item, idx) => (
                  <Grid key={idx} item xs={6} md={4} lg={3}>
                    <ProductSkeleton />
                  </Grid>
                ))
              : Array.isArray(products) &&
                products
                  // .filter((item) => !item.title.includes("Дом"))
                  ?.map((item, idx) => (
                    <Grid key={idx} item xs={6} md={4} lg={3}>
                      {location.search === "?promotitons" ? (
                        <PromotionCard
                          setCartSum={setCartSum}
                          promotion
                          cartSum={cartSum}
                          item={item}
                          t={t}
                        />
                      ) : (
                        <ProductCard
                          setCartSum={setCartSum}
                          cartSum={cartSum}
                          item={item}
                          t={t}
                        />
                      )}
                    </Grid>
                  ))}
          </Grid>
        </>
      )}
      <Box m="32px auto 0" width="fit-content">
        {isLoading && catalog.data?.next && (
          <CircularProgress color="primary" />
        )}
      </Box>
    </>
  );
};

export default Products;
