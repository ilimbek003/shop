import React, { useLayoutEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  IconButton,
  InputAdornment,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { CloseIcon } from "../../../../assets/images/icons";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  setChangedPasswordData,
} from "../../../../redux/reducers/profile";
import SnackBar from "../../../../components/SnackBar";
import { useRef } from "react";

const ChangePassword = ({ open, setOpen, t, setLoading }) => {
  const dispatch = useDispatch();

  const { changed_password_data } = useSelector(({ profile }) => profile);

  const [visible, setVisible] = useState(false);

  const validationPassword = Yup.object().shape({
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("new_password"), null],
      "Пароли должны совпадать"
    ),
  });

  const formik = useFormik({
    validationSchema: validationPassword,
    initialValues: {
      passwordConfirmation: "",
      old_password: "",
      new_password: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      dispatch(changePassword(values));
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

    if (changed_password_data.severity === 200) {
      setOpen(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changed_password_data]);

  return (
    <>
      <SnackBar
        txt="Ваш пароль был успешно изменен"
        state={changed_password_data}
        setState={setChangedPasswordData}
      />
      <SwipeableDrawer
        anchor="right"
        sx={{
          "& .MuiPaper-root": {
            width: { xs: "100%", lg: "30%" },
            p: 2,
          },
        }}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Box display="flex" mb={3} justifyContent="space-between">
          <Typography variant="h6" fontWeight="700">
            {t("changePassword")}
          </Typography>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          display="flex"
          flexDirection="column"
          alignItems="space-between"
          justifyContent="space-between"
          height="100%"
        >
          <Box
            sx={{
              "& .MuiFormControl-root": {
                boxShadow: "none!important",
                borderRadius: 8,

                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#CECECE",
                },
              },
            }}
          >
            <Typography
              fontSize="12px"
              mt={3}
              mb={1}
              textTransform="uppercase"
              color="#000"
            >
              {t("password")}
            </Typography>
            <TextField
              name="old_password"
              onChange={formik.handleChange}
              value={formik.values.old_password}
              type={visible ? "text" : "password"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={() => setVisible(!visible)}
                  >
                    {visible ? (
                      <FontAwesomeIcon icon="eye" color="var(--primary)" />
                    ) : (
                      <FontAwesomeIcon
                        icon="eye-slash"
                        color="var(--primary)"
                      />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <Typography
              fontSize="12px"
              mt={3}
              mb={1}
              textTransform="uppercase"
              color="#000"
            >
              {t("enterNewPassword")}
            </Typography>
            <TextField
              helperText="Минимум 8 символов"
              name="new_password"
              onChange={formik.handleChange}
              value={formik.values.new_password}
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
                      <FontAwesomeIcon
                        icon="eye-slash"
                        color="var(--primary)"
                      />
                    )}
                  </InputAdornment>
                ),
                inputProps: {
                  pattern: ".{8,}",
                },
              }}
              fullWidth
            />
            <Typography
              fontSize="12px"
              mt={3}
              mb={1}
              textTransform="uppercase"
              color="#000"
            >
              {t("repeatNewPassword")}{" "}
            </Typography>
            <TextField
              name="passwordConfirmation"
              onChange={formik.handleChange}
              value={formik.values.passwordConfirmation}
              type={visible ? "text" : "password"}
              fullWidth
              error={formik.errors.passwordConfirmation}
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
                      <FontAwesomeIcon
                        icon="eye-slash"
                        color="var(--primary)"
                      />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Button
            size="medium"
            type="submit"
            color="primary"
            fullWidth
            variant="contained"
          >
            {t("save")}
          </Button>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default ChangePassword;
