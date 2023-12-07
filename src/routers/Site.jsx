import { LinearProgress, useMediaQuery } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React, { lazy, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router";
// import { Login } from "../pages/Auth/Login";
import Error from "../pages/Error";
import Footer from "../shared/Footer";
import Header from "../shared/Header";
const Company = lazy(() => import("../pages/Company"));
const Contacts = lazy(() => import("../pages/Contacts"));
const Filter = lazy(() => import("../pages/Filter"));
const Main = lazy(() => import("../pages/Main"));
const Product = lazy(() => import("../pages/Product"));
const Purchase = lazy(() => import("../pages/Purchase"));
const Shipping = lazy(() => import("../pages/Shipping"));
const TermsOfPurchase = lazy(() => import("../pages/TermsOfPurchase"));
const TermsOfUse = lazy(() => import("../pages/TermsOfUse"));
const Wholesalers = lazy(() => import("../pages/Wholesalers"));
const Live = lazy(() => import("../pages/Live"));
const LiveDetails = lazy(() => import("../pages/Live/Details"));

const Site = ({
  t,
  open,
  cartSum,
  setCartSum,
  setOpen,
  loading,
  setLoading,
  loginDialog,
}) => {
  const location = useLocation();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down(768));

  const [search, setSearch] = useState("");

  return (
    <>
      <Header
        setSearch={setSearch}
        search={search}
        cartSum={cartSum}
        t={t}
        setOpen={setOpen}
        setLoading={setLoading}
        open={open}
      />
      {loading && (
        <LinearProgress
          color="primary"
          sx={{
            position: "fixed",
            zIndex: 1400,
            top: 0,
            left: 0,
            width: "100%",
          }}
        />
      )}
      <Box
        component="main"
        backgroundColor={location.pathname.includes("details") && "#FBFBFB"}
        pt={3}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Main
                cartSum={cartSum}
                setCartSum={setCartSum}
                t={t}
                setSearch={setSearch}
                search={search}
                setLoading={setLoading}
              />
            }
          />
          <Route path="/live" element={<Live t={t} />} />
          <Route path="/live/details" element={<LiveDetails t={t} />} />
          <Route
            path="/catalog"
            element={
              <Filter
                setSearch={setSearch}
                search={search}
                setCartSum={setCartSum}
                cartSum={cartSum}
                setLoading={setLoading}
                loading={loading}
                t={t}
              />
            }
          />
          <Route path="/terms-of-use" element={<TermsOfUse t={t} />} />
          <Route path="/about-us" element={<Company t={t} />} />
          <Route
            path="/details/:id"
            element={
              <Product
                setCartSum={setCartSum}
                cartSum={cartSum}
                t={t}
                setLoading={setLoading}
                loading={loading}
              />
            }
          />
          <Route path="/purchase" element={<Purchase t={t} />} />
          <Route path="/shipping" element={<Shipping t={t} />} />
          <Route path="/wholesalers" element={<Wholesalers t={t} />} />
          <Route
            path="/terms-of-purchase"
            element={<TermsOfPurchase t={t} />}
          />
          <Route path="/contacts" element={<Contacts t={t} />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Box>
      {location.pathname === "/catalog" && md ? null : <Footer t={t} />}
    </>
  );
};

export default Site;
