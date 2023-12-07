import {
  Button,
  IconButton,
  InputAdornment,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React, { useRef } from "react";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloseIcon } from "../../../../assets/images/icons";
import { CustomMask } from "../../../../components/Mask";
import SnackBar from "../../../../components/SnackBar";
import { sendCode } from "../../../../redux/reducers/auth";
import {
  changePhone,
  setChangedPhoneData,
} from "../../../../redux/reducers/profile";

const ChangeNumber = ({ open, setOpen, setLoading, t }) => {
  const dispatch = useDispatch();

  const { profile, changed_phone_data } = useSelector(({ profile }) => profile);
  const { code } = useSelector(({ auth }) => auth);

  const formik = useFormik({
    initialValues: {
      phone: "",
      new_phone: "",
      code: "",
    },
    onSubmit: (values) => {
      // show linear progress
      setLoading(true);

      //remove different characters from phone
      values.phone = values.phone.replace(/[\s+().,-]/g, "");
      values.new_phone = values.new_phone.replace(/[\s+().,-]/g, "");
      dispatch(changePhone(values));
    },
  });

  const getCode = () => {
    dispatch(
      sendCode({ phone: formik.values.phone.replace(/[\s+().,-]/g, "") })
    );
  };

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    // hide linear progress
    setLoading(false);

    if (changed_phone_data.severity === 200 && open) {
      setOpen(false);
      // dispatch(setVerifyDialog(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changed_phone_data]);

  return (
    <>
      <SnackBar
        txt="Ваш номер телефона был успешно изменен"
        state={changed_phone_data}
        setState={setChangedPhoneData}
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
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <Box display="flex" mb={3} justifyContent="space-between">
          <Typography variant="h6" fontWeight="700">
            {t("changePhone")}{" "}
          </Typography>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="space-between"
          justifyContent="space-between"
          height="100%"
          component="form"
          onSubmit={formik.handleSubmit}
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
            <TextField
              required
              disabled
              fullWidth
              name="phone"
              onChange={formik.handleChange}
              value={profile.phone_number}
              id="+996 (000) 00 00 00"
              InputProps={{
                inputComponent: CustomMask,
                startAdornment: (
                  <InputAdornment position="start">
                    {t("fromNumber")}:
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              required
              sx={{ mt: 3, mb: 2 }}
              fullWidth
              name="new_phone"
              value={formik.values.new_phone}
              onChange={formik.handleChange}
              id="+996 (000) 00 00 00"
              InputProps={{
                inputComponent: CustomMask,
                startAdornment: (
                  <InputAdornment position="start">
                    {t("toNumber")}:
                  </InputAdornment>
                ),
              }}
            />

            {code?.severity === 200 && (
              <>
                <Typography
                  fontSize="12px"
                  mt={3}
                  mb={1}
                  textTransform="uppercase"
                  color="#000"
                >
                  Код подтверждения
                </Typography>
                <TextField
                  required
                  sx={{ display: "flex", justifyContent: "center" }}
                  fullWidth
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  name="code"
                />
              </>
            )}
          </Box>
          {code?.severity === 200 ? (
            <Button
              size="medium"
              type="submit"
              color="primary"
              fullWidth
              variant="contained"
            >
              {t("save")}
            </Button>
          ) : (
            <Button
              size="medium"
              onClick={getCode}
              color="primary"
              fullWidth
              variant="contained"
            >
              {t("change")}
            </Button>
          )}
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default ChangeNumber;
