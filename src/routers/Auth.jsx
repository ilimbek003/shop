import { LinearProgress, useMediaQuery } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React, { lazy, useState } from "react";
import { Route, Routes, useLocation } from "react-router";
import Confirmation from "../pages/Auth/Confirmation";
import ForgotPassord from "../pages/Auth/ForgotPassord";
import VerifyEmail from "../pages/Auth/VerifyEmail";
import Footer from "../shared/Footer";
import Header from "../shared/Header";
import {
  setConfirmDialog,
  setForgotPasswordDialog,
  setRegDialog,
  setVerifyDialog,
} from "../redux/reducers/auth";
import Registration from "../pages/Auth/Registration";
import { useSelector } from "react-redux";
import Main from "../pages/Main";

const Login = lazy(() => import("../pages/Auth/Login"));

const Auth = ({
  t,
  setLoading,
  loading,
  setCartSum,
  cartSum,
  setOpen,
  open,
}) => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down(768));
  const location = useLocation();

  const { regDialog, verifyDialog, confirmDialog, forgotPasswordDialog } =
    useSelector(({ auth }) => auth);

  const [search, setSearch] = useState("");

  return (
    <>
      <Header cartSum={cartSum} t={t} setOpen={setOpen} open={open} />
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
        pb={{ xs: 2, md: 0 }}
        backgroundColor={location.pathname.includes("create") && "#FBFBFB"}
      >
        <Main
          cartSum={cartSum}
          setCartSum={setCartSum}
          t={t}
          setSearch={setSearch}
          search={search}
          setLoading={setLoading}
        />
        {/* <Routes>
          <Route
            path="/"
            element={
              
            }
          />
        </Routes> */}
        <Login t={t} setLoading={setLoading} />
        <Registration
          t={t}
          open={regDialog}
          setLoading={setLoading}
          setOpen={setRegDialog}
        />
        <VerifyEmail
          t={t}
          open={verifyDialog}
          setLoading={setLoading}
          setOpen={setVerifyDialog}
        />
        <ForgotPassord
          t={t}
          setLoading={setLoading}
          open={forgotPasswordDialog}
          setOpen={setForgotPasswordDialog}
        />
        <Confirmation
          t={t}
          open={confirmDialog}
          setLoading={setLoading}
          setOpen={setConfirmDialog}
        />
      </Box>
      {!md && <Footer t={t} />}
    </>
  );
};

export default Auth;
