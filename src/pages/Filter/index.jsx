import React, { useEffect, useState } from "react";
import { Container } from "@mui/system";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { getCities, getCurrencyList } from "../../redux/reducers/main";
import {
  getCategories,
  getProducts,
  // getProductsHotSellingCatalog,
  getProductsPromotionCatalog,
} from "../../redux/reducers/products";
import Form from "./Form";
import Products from "./Products";

const Filter = ({
  t,
  setLoading,
  search,
  setSearch,
  loading,
  setCartSum,
  cartSum,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [sortingBy, setSortingBy] = useState(1);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getCurrencyList());
    dispatch(getCities());

    if (location.search) {
      if (location.search === "?top_sellers")
        // dispatch(getProductsHotSellingCatalog());
        dispatch('')
      else if (location.search === "?promotitons")
        dispatch(getProductsPromotionCatalog());
      else dispatch(getProducts(location.search));
    } else dispatch(getProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section>
        <Container maxWidth="xl">
          <Form
            t={t}
            setSearch={setSearch}
            search={search}
            setLoading={setLoading}
            setSortingBy={setSortingBy}
            sortingBy={sortingBy}
          />
          <Products
            setCartSum={setCartSum}
            cartSum={cartSum}
            setLoading={setLoading}
            setSortingBy={setSortingBy}
            sortingBy={sortingBy}
            loading={loading}
            t={t}
          />
        </Container>
      </section>
    </>
  );
};

export default Filter;
