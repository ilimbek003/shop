import { LinearProgress, useMediaQuery } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React, { lazy, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router";
import CreateLive from "../pages/Live/Create";
import Footer from "../shared/Footer";
import Header from "../shared/Header";

const Cart = lazy(() => import("../pages/Dashboard/Cart"));
const Profile = lazy(() => import("../pages/Dashboard/Profile"));
const ChangeNumber = lazy(() =>
  import("../pages/Dashboard/Profile/ChangeNumber")
);
const ChangePassword = lazy(() =>
  import("../pages/Dashboard/Profile/ChangePassword")
);
const Favorites = lazy(() => import("../pages/Dashboard/Profile/Favorites"));
const Operations = lazy(() => import("../pages/Dashboard/Profile/Operations"));
const Orders = lazy(() => import("../pages/Dashboard/Profile/Orders"));
const Settings = lazy(() => import("../pages/Dashboard/Profile/Settings"));

const Dashboard = ({
  t,
  setLoading,
  loading,
  cartSum,
  setCartSum,
  language,
  setOpen,
  open,
}) => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down(768));

  const location = useLocation();

  const { order_details } = useSelector(({ profile }) => profile);

  const [settings, setSettings] = useState(false);
  const [changeNumber, setChangeNumber] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  return (
    <>
      <Header cartSum={cartSum} t={t} setOpen={setOpen} open={open} />
      {loading || order_details.loading ? (
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
      ) : null}
      <Box
        component="main"
        pb={{ xs: 2, md: 0 }}
        backgroundColor={location.pathname.includes("create") && "#FBFBFB"}
      >
        <Routes>
          <Route
            path="/profile/*"
            element={
              <Profile
                settings={setSettings}
                language={language}
                loading={loading}
                setCartSum={setCartSum}
                cartSum={cartSum}
                setLoading={setLoading}
                setOpen={setSettings}
                setChangePassword={setChangePassword}
                t={t}
              />
            }
          />
          {md && (
            <>
              <Route path="/profile/orders" element={<Orders t={t} />} />
              <Route
                path="/profile/operations"
                element={<Operations t={t} />}
              />
              <Route
                path="/profile/favorites"
                element={
                  <Favorites setCartSum={setCartSum} cartSum={cartSum} t={t} />
                }
              />
            </>
          )}
          <Route
            path="/cart/*"
            element={
              <Cart
                cartSum={cartSum}
                setCartSum={setCartSum}
                setLoading={setLoading}
                t={t}
              />
            }
          />
          <Route
            path="/live/create/"
            element={<CreateLive setLoading={setLoading} t={t} />}
          />
        </Routes>
        <Settings
          t={t}
          setLoading={setLoading}
          open={settings}
          setOpen={setSettings}
          setChangeNumber={setChangeNumber}
        />
        <ChangeNumber
          t={t}
          open={changeNumber}
          setLoading={setLoading}
          setOpen={setChangeNumber}
        />
        <ChangePassword
          t={t}
          open={changePassword}
          setLoading={setLoading}
          setOpen={setChangePassword}
        />
      </Box>
      {!md && <Footer t={t} />}
    </>
  );
};

export default Dashboard;
