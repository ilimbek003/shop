import { useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBanners } from "../../redux/reducers/main";
import {
  getCategories,
  getNewProducts,
  getProductsHotSelling,
  getProductsPromotion,
  setNewProducts,
  setProductsHotSelling,
  setProductsPromotion,
} from "../../redux/reducers/products";
import Categories from "./Storis/Categories";
import Cta from "./Cta";
import Live from "./Live";
// import NewProducts from "./NewProducts";
import Promotions from "./Promotions";
import Slides from "./Slides";
import TopSellers from "./TopSellers";

const Main = ({ t, setLoading, cartSum, setCartSum, search, setSearch }) => {
  const dispatch = useDispatch();

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down(768));

  useEffect(() => {
    dispatch(getProductsPromotion());
    dispatch(setProductsPromotion({ isLoading: true }));
    dispatch(getProductsHotSelling());
    dispatch(setProductsHotSelling({ isLoading: true }));
    dispatch(getNewProducts());
    dispatch(setNewProducts({ isLoading: true }));
    dispatch(getCategories());
    dispatch(getBanners());
  }, []);

  return (
    <>
      <Categories
        setSearch={setSearch}
        search={search}
        t={t}
        cartSum={cartSum}
        setLoading={setLoading}
      />
      <Slides />
      <Live />
      <Promotions cartSum={cartSum} setCartSum={setCartSum} t={t} />
      {!md && <Cta t={t} setLoading={setLoading} />}
      <TopSellers t={t} setCartSum={setCartSum} cartSum={cartSum} />
      {/*<NewProducts t={t} setCartSum={setCartSum} cartSum={cartSum} />*/}
    </>
  );
};

export default Main;
