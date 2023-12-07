import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Button,
  Dialog,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { CheckMarkIcon, CheckMarkIconFill } from "../../assets/images/icons";
import {
  postLogin,
  setForgotPasswordDialog,
  setLogin,
  setOpenLogin,
  setRegDialog,
  setVerifyDialog,
} from "../../redux/reducers/auth";
import { useLocation, useNavigate } from "react-router";
import { useFormik } from "formik";
import SnackBar from "../../components/SnackBar";
import { instance } from "../../api";
import cookie from "cookie_js";
import { getProfileData } from "../../redux/reducers/profile";
import { CustomMask } from "../../components/Mask";
// import Main from "../Main";
import { getCartList } from "../../redux/reducers/products";

const Login = ({ setLoading, t }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [visible, setVisible] = useState(false);

  const [rememberMe, setRememberMe] = useState(true);

  const { login, loginDialog } = useSelector(({ auth }) => auth);

  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    onSubmit: (values) => {
      // show linear progress
      setLoading(true);

      //remove different characters from phone
      values.phone = values.phone.replace(/[\s+().,-]/g, "");

      cookie.set("phone", values.phone);

      dispatch(postLogin(values));
    },
  });

  const firstUpdate = useRef(true);

  useEffect(() => {
    dispatch(setOpenLogin(true));
  }, []);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    // hide linear progress
    setLoading(false);

    if (login?.severity == 200) {
      setTimeout(() => {
        dispatch(setOpenLogin(false));
        !location.search
          ? navigate("/dashboard/profile")
          : navigate(`${location.search.split("=")[1]}`);
        instance.defaults.headers.Authorization = `Bearer ${login?.message.tokens.access}`;
        cookie.set("token_opop", login?.message.tokens.access, {
          expires: 7,
        });
        dispatch(getProfileData());
        dispatch(getCartList());
      }, 1000);
    } else if (
      login?.message.detail === "Пользователь не подтвержден" &&
      loginDialog
    ) {
      localStorage.setItem("activation", true);
      dispatch(setVerifyDialog(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  return (
    <>
      <SnackBar
        txt="Успешный вход в систему"
        state={login}
        setState={setLogin}
      />
      <Dialog
        sx={{
          "& .MuiDialog-container": {
            alignItems: { xs: "end", md: "center" },
          },
          "& .MuiDialog-paper": {
            minWidth: { xs: "100%", md: 420 },
            m: { xs: "0", md: 3 },
            p: 3,
            borderRadius: { xs: "16px 16px 0 0", md: 2 },
            position: "relative",
          },

          "& .MuiFormControl-root": {
            boxShadow: "none!important",
            borderRadius: 8,

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#CECECE",
            },
          },
        }}
        open={loginDialog}
        onClose={() => {
          dispatch(setOpenLogin(false));
          !location.search
            ? navigate("/")
            : navigate(`${location.search.split("=")[1]}`);
        }}
      >
        <Box
          component="form"
          width="100%"
          action=""
          onSubmit={formik.handleSubmit}
        >
          <Typography variant="h6" mb={3} fontWeight="700" textAlign="center">
            Авторизация
          </Typography>
          <Typography
            fontSize="12px"
            color="#000"
            textTransform="uppercase"
            mb={1}
            fontWeight="400"
          >
            {t("phoneNumber")}{" "}
          </Typography>
          <TextField
            required
            id="+996 (000) 00 00 00"
            InputProps={{ inputComponent: CustomMask }}
            autoComplete="phone"
            fullWidth
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          <Typography
            fontSize="12px"
            color="#000"
            textTransform="uppercase"
            mt={3}
            mb={1}
            fontWeight="400"
          >
            {t("password")}
          </Typography>
          <TextField
            required
            autoComplete="current-password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            fullWidth
            type={visible ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? (
                    <FontAwesomeIcon icon="eye" color="var(--primary)" />
                  ) : (
                    <FontAwesomeIcon icon="eye-slash" color="var(--primary)" />
                  )}
                </InputAdornment>
              ),
            }}
          />
          <Box
            display="flex"
            mt={5}
            alignItems="center"
            justifyContent="space-between"
          >
            <div className="text-btn">
              <Typography
                variant="subtitle2"
                onClick={() => {
                  dispatch(setForgotPasswordDialog(true));
                }}
                color="primary"
                component="h6"
                fontWeight="400"
              >
                {t("forgotPassword")}
              </Typography>
            </div>
            <div
              className="d-flex"
              style={{ userSelect: "none", cursor: "pointer" }}
              onClick={() => setRememberMe(!rememberMe)}
            >
              <Typography
                variant="subtitle2"
                component="p"
                mr={1}
                fontWeight="400"
              >
                {t("savee")}
              </Typography>
              <IconButton>
                {rememberMe ? <CheckMarkIconFill /> : <CheckMarkIcon />}
              </IconButton>
            </div>
          </Box>
          <Box display="flex" mb={2} mt={3} flexWrap="nowrap">
            <Button
              type="submit"
              size="medium"
              color="primary"
              fullWidth
              variant="contained"
            >
              {t("enter")}
            </Button>
          </Box>
          <Button
            size="medium"
            onClick={() => {
              dispatch(setRegDialog(true));
            }}
            color="inherit"
            variant="contained"
            fullWidth
          >
            {t("reg")}
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export default Login;
