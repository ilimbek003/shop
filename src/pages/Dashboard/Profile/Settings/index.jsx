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
import { useFormik } from "formik";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloseIcon } from "../../../../assets/images/icons";
import SnackBar from "../../../../components/SnackBar";
import {
  getProfileData,
  setUpdatedProfileData,
  updateProfile,
} from "../../../../redux/reducers/profile";

const Settings = ({ open, setOpen, t, setChangeNumber, setLoading }) => {
  const dispatch = useDispatch();

  const { profile, updated_profile_data } = useSelector(
    ({ profile }) => profile
  );

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
    },
    onSubmit: (values) => {
      // show linear progress
      setLoading(true);
      dispatch(updateProfile(values));
    },
  });

  useEffect(() => {
    // formik.setFieldValue("phone_number", profile?.phone_number);
    formik.setFieldValue("first_name", profile?.first_name);
    formik.setFieldValue("last_name", profile?.last_name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    // hide linear progress
    setLoading(false);

    if (updated_profile_data.severity === 200) {
      setOpen(false);
      dispatch(getProfileData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated_profile_data]);

  return (
    <>
      <SnackBar
        state={updated_profile_data}
        txt="Ваши данные успешно изменены"
        setState={setUpdatedProfileData}
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
            {t("settings")}{" "}
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
              mb={1}
              textTransform="uppercase"
              color="#000"
            >
              Фамилия
            </Typography>
            <TextField
              fullWidth
              name="last_name"
              onChange={formik.handleChange}
              value={formik.values.last_name}
              required
            />
            <Typography
              fontSize="12px"
              mt={3}
              mb={1}
              textTransform="uppercase"
              color="#000"
            >
              {t("name")}
            </Typography>
            <TextField
              fullWidth
              name="first_name"
              onChange={formik.handleChange}
              value={formik.values.first_name}
              required
            />
            <Typography
              fontSize="12px"
              mt={3}
              mb={1}
              textTransform="uppercase"
              color="#000"
            >
              {t("phoneNumber")}
            </Typography>
            <TextField
              value={profile.phone_number}
              required
              fullWidth
              disabled
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={() => {
                      setOpen(false);
                      setChangeNumber(true);
                    }}
                  >
                    <FontAwesomeIcon icon="pen" color="var(--primary)" />
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
              {t("password")}
            </Typography>
            <TextField fullWidth value="*******************************" />
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

export default Settings;
