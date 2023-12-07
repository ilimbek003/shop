import React, { useEffect, useRef, useState } from "react";
import {
  CircularProgress,
  Grid,
  Pagination,
  Slide,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box, Container, Stack, useTheme } from "@mui/system";
import ProductCard from "../../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getFavoriteList,
  setFavoriteList,
} from "../../../redux/reducers/profile";
import { noneResults } from "./Orders";
import DropdownSort from "../../../components/DropdownSort";
import PopoverSort from "../../../components/PopoverSort";
import useSort from "../../../hooks/useSort";

const Favorites = ({ t, setCartSum, cartSum }) => {
  const dispatch = useDispatch();

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down(768));

  const containerRef = useRef(null);

  const [openPopover, setOpenPopover] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [products, setProducts] = useState([]);
  const [sortingBy, setSortingBy] = useState(1);
  const [page, setPage] = useState(1);

  const { favorites, isLoading } = useSelector(({ profile }) => profile);

  useEffect(() => {
    dispatch(getFavoriteList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setProducts(favorites?.data?.results);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites]);

  const { sortBy } = useSort({
    array: products,
    copyArray: favorites?.data?.results,
    setArray: setProducts,
    sortingBy: sortingBy,
  });

  useEffect(() => {
    sortBy();
  }, [sortingBy]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(getFavoriteList(`?page=${page}`));
  }, [page]);

  const count = Math.ceil(favorites?.data?.count / 15);

  const delet = (id) => {
    dispatch(
      setFavoriteList({
        ...favorites,
        data: {
          ...favorites.data,
          results: favorites.data.results.filter((item) => item.id !== id),
        },
      })
    );
  };

  return (
    <section>
      <PopoverSort
        anchorEl={anchorEl}
        open={openPopover}
        setOpen={setOpenPopover}
        value={sortingBy}
        setValue={setSortingBy}
      />
      <Container maxWidth="xl">
        {md && (
          <Typography variant="subtitle2" fontWeight="700" mt={3}>
            Избранные товары
          </Typography>
        )}
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="70vh"
          >
            <CircularProgress color="primary" />
          </Box>
        ) : !favorites?.data?.count ? (
          <Slide
            mt={2}
            direction="right"
            in={!favorites?.data?.count}
            container={containerRef.current}
          >
            {noneResults}
          </Slide>
        ) : (
          <>
            <DropdownSort
              value={sortingBy}
              setAnchorEl={setAnchorEl}
              setOpen={setOpenPopover}
            />
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {products?.map((item, idx) => (
                <Grid item xs={6} md={3} onClick={() => delet(item.id)}>
                  <ProductCard
                    setCartSum={setCartSum}
                    cartSum={cartSum}
                    t={t}
                    item={item}
                    key={idx}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
        <Stack spacing={2} mt={4}>
          <Pagination
            hideNextButton
            hidePrevButton
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
            count={count}
            shape="rounded"
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </Container>
    </section>
  );
};

export default Favorites;
