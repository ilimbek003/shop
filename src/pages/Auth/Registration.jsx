import React, { useLayoutEffect, useRef, useState } from "react";
import {
  Button,
  Dialog,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { CheckMarkIcon, CheckMarkIconFill } from "../../assets/images/icons";
import { useFormik } from "formik";
import {
  sendRegData,
  setReg,
  setVerifyDialog,
} from "../../redux/reducers/auth";
import { CustomMask } from "../../components/Mask";
import cookie from "cookie_js";
import SnackBar from "../../components/SnackBar";
import { Link } from "react-router-dom";

const Registration = ({ setOpen, open, setLoading, t }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const { reg } = useSelector(({ auth }) => auth);

  const validationSearch = Yup.object().shape({
    password: Yup.string().min(8),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Пароли должны совпадать"
    ),
    phone_number: Yup.string().min(19, "Это обязательное поле").max(19),
  });

  const formik = useFormik({
    validationSchema: validationSearch,
    initialValues: {
      passwordConfirmation: "",
      password: "",
      phone_number: "",
      email: "",
      first_name: "",
      last_name: "",
      confirm: "",
    },
    onSubmit: (values) => {
      // show linear progress
      setLoading(true);

      //remove different characters from phone
      values.phone = values.phone_number.replace(/[\s+().,-]/g, "");

      // send reg data
      dispatch(sendRegData(values));

      // set to cookie user data
      cookie.set("phone", values.phone);
      cookie.set("password", values.password);
      cookie.set("email", values.email);
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

    if (reg.severity === 200 && open) {
      dispatch(setOpen(false));
      formik.resetForm();
      dispatch(setVerifyDialog(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reg]);

  return (
    <>
      <SnackBar
        txt="Регистрация прошла успешно. На указанный номер телефона было отправлено СМС для активации аккаунта"
        state={reg}
        setState={setReg}
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

            // "& input": {
            //   color: "#15151533",
            // },

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#CECECE",
            },
          },
        }}
        onClose={() => dispatch(setOpen(false))}
        open={open}
      >
        <form action="" onSubmit={formik.handleSubmit}>
          <Typography variant="h6" mb={3} fontWeight="700" textAlign="center">
            {t("reg")}
          </Typography>
          <Typography
            fontSize="12px"
            color="#000"
            textTransform="uppercase"
            mb={1}
            fontWeight="400"
          >
            Фамилия
          </Typography>
          <TextField
            fullWidth
            name="last_name"
            onChange={formik.handleChange}
            required
            value={formik.values.last_name}
          />
          <Typography
            fontSize="12px"
            color="#000"
            textTransform="uppercase"
            mb={1}
            mt={3}
            fontWeight="400"
          >
            {t("name")}
          </Typography>
          <TextField
            fullWidth
            name="first_name"
            onChange={formik.handleChange}
            required
            value={formik.values.first_name}
          />
          <Typography
            fontSize="12px"
            color="#000"
            textTransform="uppercase"
            mb={1}
            mt={3}
            fontWeight="400"
          >
            E-mail
          </Typography>
          <TextField
            fullWidth
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <Typography
            fontSize="12px"
            color="#000"
            textTransform="uppercase"
            mb={1}
            mt={3}
            fontWeight="400"
          >
            {t("phoneNumber")}
          </Typography>
          <TextField
            fullWidth
            id="+996 (000) 00 00 00"
            name="phone_number"
            onChange={formik.handleChange}
            required
            helperText={formik.errors.phone_number}
            value={formik.values.phone_number}
            error={formik.errors.phone_number}
            InputProps={{
              inputComponent: CustomMask,
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
            {t("password")}
          </Typography>
          <TextField
            helperText="Минимум 8 символов"
            name="password"
            error={formik.errors.password}
            onChange={formik.handleChange}
            required
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

              inputProps: {
                pattern: ".{8,}",
              },
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
            mt={5}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle2" fontWeight="400">
              {t("termsFirst")}{" "}
              <Link
                aria-label="read terms-of-use"
                to="/terms-of-use"
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  dispatch(setOpen(false));
                }}
                className="primary"
              >
                {" "}
                {t("termsSecond")}
              </Link>
            </Typography>
            <IconButton
              component="label"
              sx={{
                position: "relative",
                "& input": {
                  position: "absolute",
                  top: 0,
                  right: 0,
                  opacity: 0,
                  userSelect: "none",
                },
              }}
            >
              <input
                type="checkbox"
                required
                name="confirm"
                onChange={formik.handleChange}
                value={1}
              />
              {formik.values.confirm.length ? (
                <CheckMarkIconFill />
              ) : (
                <CheckMarkIcon />
              )}
            </IconButton>
          </Box>
          <Box
            display="flex"
            columnGap={{ xs: 0, md: 2 }}
            rowGap={{ xs: 2, md: 0 }}
            flexDirection={{ xs: "column", md: "row" }}
            mt={5}
            flexWrap="nowrap"
          >
            <Button
              size="medium"
              color="primary"
              fullWidth
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
              {t("regg")}
            </Button>
          </Box>
        </form>
      </Dialog>
    </>
  );
};

export default Registration;
