import React, { useLayoutEffect, useRef, useState } from "react";
import {
  Button,
  Dialog,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { ForgotPasswordIcon } from "../../assets/images/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  forgotPassword,
  postLogin,
  setEditedPasswordData,
} from "../../redux/reducers/auth";
import cookie from "cookie_js";
import SnackBar from "../../components/SnackBar";
import { instance } from "../../api";
import { useNavigate } from "react-router";
import { getProfileData } from "../../redux/reducers/profile";

const Confirmation = ({ open, setOpen, setLoading, t }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  const { edited_password_data, login } = useSelector(({ auth }) => auth);

  const validate = Yup.object().shape({
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Пароли должны совпадать"
    ),
  });

  const formik = useFormik({
    validationSchema: validate,
    initialValues: {
      code: "",
      password: "",
      passwordConfirmation: "",
      phone: "",
    },
    onSubmit: (values, { resetForm }) => {
      const data = {
        code: values.code,
        password: values.password,
        phone: cookie.get("phone"),
      };
      dispatch(forgotPassword(data));
      cookie.set("password", values.password);
      resetForm();
    },
  });

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    // hide linear progress
    setLoading(false);

    if (edited_password_data.severity === 200 && open) {
      setTimeout(() => {
        dispatch(
          postLogin({
            password: cookie.get("password"),
            phone: cookie.get("phone"),
          })
        );

        if (login?.message.tokens.access) {
          instance.defaults.headers.Authorization = `Bearer ${login?.message.tokens.access}`;
          cookie.set("token_opop", login?.message.tokens.access, {
            expires: 7,
          });
        }

        setTimeout(() => {
          navigate("/dashboard/profile");
          dispatch(getProfileData());
        }, 2000);
      }, 1000);
      dispatch(setOpen(false));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edited_password_data]);

  return (
    <>
      <SnackBar
        state={edited_password_data}
        txt="Ваш пароль был успешно изменен"
        setState={setEditedPasswordData}
      />
      <Dialog
        sx={{
          "& .MuiDialog-container": {
            alignItems: { xs: "end", md: "center" },
          },
          "& .MuiDialog-paper": {
            minWidth: { xs: "100%", md: 522 },
            m: { xs: "0", md: 3 },
            p: 3,
            borderRadius: { xs: "16px 16px 0 0", md: 2 },
          },

          "& .MuiFormControl-root": {
            boxShadow: "none!important",
            borderRadius: 8,

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#CECECE",
            },
          },
        }}
        onClose={() => dispatch(setOpen(false))}
        open={open}
      >
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Box display="flex" justifyContent="center">
            <ForgotPasswordIcon />
          </Box>
          <Typography
            variant="h6"
            mt={3}
            mb={3}
            fontWeight="700"
            textAlign="center"
          >
            {t("newPassword")}
          </Typography>
          <Typography
            fontSize="12px"
            color="#000"
            textTransform="uppercase"
            mb={1}
            fontWeight="400"
          >
            Код
          </Typography>
          <TextField
            name="code"
            value={formik.values.code}
            onChange={formik.handleChange}
            required
            fullWidth
          />
          <Typography
            fontSize="12px"
            color="#000"
            textTransform="uppercase"
            mb={1}
            mt={3}
            fontWeight="400"
          >
            {t("password")}
          </Typography>
          <TextField
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            required
            fullWidth
            autoComplete="none"
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
          <Typography
            fontSize="12px"
            color="#000"
            textTransform="uppercase"
            mt={3}
            mb={1}
            fontWeight="400"
          >
            {t("repeatNewPassword")}
          </Typography>
          <TextField
            name="passwordConfirmation"
            required
            value={formik.values.passwordConfirmation}
            fullWidth
            type={visible ? "text" : "password"}
            error={formik.errors.passwordConfirmation}
            onChange={formik.handleChange}
            helperText={formik.errors.passwordConfirmation}
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
            columnGap={{ xs: 0, md: 2 }}
            rowGap={{ xs: 2, md: 0 }}
            flexDirection={{ xs: "column", md: "row" }}
            mt={{ xs: 3, md: 5 }}
            flexWrap="nowrap"
          >
            <Button
              size="medium"
              color="primary"
              fullWidth
              sx={{ mr: 2 }}
              onClick={() => dispatch(setOpen(false))}
              variant="outlined"
            >
              {t("cancel")}
            </Button>
            <Button
              size="medium"
              type="submit"
              color="primary"
              fullWidth
              variant="contained"
            >
              {t("login")}
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default Confirmation;
