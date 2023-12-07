import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Info from "./Info";
import Orders from "./Orders";
import Navigation from "./Navigation";
import Operations from "./Operations";
import Favorites from "./Favorites";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchaseInfo } from "../../../redux/reducers/profile";
import { useTheme } from "@mui/styles";
import { useMediaQuery } from "@mui/material";
import { getCartList } from "../../../redux/reducers/products";

const Profile = ({
  t,
  settings,
  setOpen,
  language,
  setChangePassword,
  setLoading,
  loading,
  setCartSum,
  cartSum,
}) => {
  const dispatch = useDispatch();

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down(768));

  const { cart_list } = useSelector(({ products }) => products);

  useEffect(() => {
    dispatch(getPurchaseInfo());
    dispatch(getCartList());
  }, []);

  useEffect(() => {
    if (cart_list?.results) {
      const sum =
        cart_list?.results[cart_list?.results?.length - 1]?.total_products_sum;
      setCartSum(sum);
    }
  }, [cart_list]);

  return (
    <>
      <Info
        t={t}
        setOpen={setOpen}
        setLoading={setLoading}
        setChangePassword={setChangePassword}
        loading={loading}
      />
      <Navigation
        language={language}
        settings={settings}
        setChangePassword={setChangePassword}
      />
      {!md && (
        <Routes>
          {!md && (
            <Route
              path="/"
              element={<Navigate to="/dashboard/profile/orders" />}
            />
          )}
          <Route path="/orders" element={<Orders t={t} />} />
          <Route path="/operations" element={<Operations t={t} />} />
          <Route
            path="/favorites"
            element={
              <Favorites setCartSum={setCartSum} cartSum={cartSum} t={t} />
            }
          />
        </Routes>
      )}
    </>
  );
};

export default Profile;
