import React, { useLayoutEffect, useRef } from "react";
import { Button, Dialog, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { ForgotPasswordIcon } from "../../assets/images/icons";
import {
  sendCode,
  setCodeRes,
  setConfirmDialog,
} from "../../redux/reducers/auth";
import { CustomMask } from "../../components/Mask";
import { useFormik } from "formik";
import SnackBar from "../../components/SnackBar";
import cookie from "cookie_js";

const ForgotPassord = ({ open, setOpen, setLoading, t }) => {
  const dispatch = useDispatch();

  const { code } = useSelector(({ auth }) => auth);

  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    onSubmit: (values, { resetForm }) => {
      //remove different characters from phone
      values.phone = values.phone.replace(/[\s+().,-]/g, "");
      cookie.set("phone", values.phone);
      setLoading(true);
      dispatch(sendCode(values));
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

    if (code.severity === 200 && open) {
      dispatch(setOpen(false));
      dispatch(setConfirmDialog(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <>
      <SnackBar
        state={code}
        txt="Сообщение было отправлено на ваш номер телефона"
        setState={setCodeRes}
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
        <form onSubmit={formik.handleSubmit}>
          <Box display="flex" justifyContent="center">
            <ForgotPasswordIcon />
          </Box>
          <Typography
            variant="h6"
            mb={3}
            mt={3}
            fontWeight="700"
            textAlign="center"
          >
            {t("forgotPassword")}{" "}
          </Typography>
          <Typography
            variant="body2"
            lineHeight="17px"
            textAlign="center"
            mb={3}
          >
            {t("newPassword2")}
          </Typography>
          <Typography
            fontSize="12px"
            color="#000"
            textTransform="uppercase"
            mb={1}
            fontWeight="400"
          >
            {t("phoneNumber")}
          </Typography>
          <TextField
            id="+996 (000) 00 00 00"
            InputProps={{ inputComponent: CustomMask }}
            autoComplete="phone"
            fullWidth
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          <Box
            display="flex"
            columnGap={{ xs: 0, md: 2 }}
            rowGap={{ xs: 2, md: 0 }}
            flexDirection={{ xs: "column", md: "row" }}
            mt={3}
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
              {t("resetPassword")}
            </Button>
          </Box>
        </form>
      </Dialog>
    </>
  );
};

export default ForgotPassord;
