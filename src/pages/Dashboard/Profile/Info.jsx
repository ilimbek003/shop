import {
  CircularProgress,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Alert,
  Snackbar,
  Slide,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AvatarIcon,
  ChangeAvatarIcon,
  ChangePasswordIcon,
  EditIcon,
} from "../../../assets/images/icons";
import Dialogs from "../../../components/Dialog";
import {
  setUpdatedProfileData,
  updateProfile,
} from "../../../redux/reducers/profile";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const Info = ({ t, setOpen, setChangePassword, setLoading }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down(768));

  const [exit, setExit] = useState(false);
  const [error, setError] = useState(false);

  const input = useRef(null);

  const { profile, purchase_info, updated_profile_data } = useSelector(
    ({ profile }) => profile
  );

  const handleChange = (event) => {
    var data = new FormData();
    if (event.target.files[0].size > 1000000) setError(true);
    else {
      data.append("avatar", event.target.files[0]);
      dispatch(
        setUpdatedProfileData({ ...updated_profile_data, loading: true })
      );
      dispatch(updateProfile(data));
      setLoading(true);
    }
  };

  return (
    <>
      <Dialogs
        open={exit}
        title={t("exit")}
        subtitle="Выйти из учётной записи"
        setOpen={setExit}
        exit
      />
      <Snackbar
        TransitionComponent={SlideTransition}
        open={error}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={() => setError(false)}
      >
        <Alert severity="error" variant="filled">
          Слишком большой размер файла
        </Alert>
      </Snackbar>
      <input
        type="file"
        id="upload"
        ref={input}
        onChange={handleChange}
        accept="image/*"
        style={{ display: "none" }}
      />
      <Box component="section">
        <Container
          maxWidth="xl"
          sx={{
            pb: { xs: 0, md: 8 },
            mb: { xs: 5, md: 8 },
            borderBottom: { xs: "none", md: "1px solid #00000022" },
          }}
        >
          {!md && (
            <Typography
              variant="h3"
              mt={8}
              mb={8}
              opacity={{ xs: 0, md: 1 }}
              textAlign="center"
              fontWeight="700"
            >
              {t("profile")}
            </Typography>
          )}

          <Grid container spacing={0}>
            <Grid
              item
              xs={12}
              md={4}
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              alignItems="center"
            >
              <Box position="relative">
                {updated_profile_data.loading ? (
                  <Box
                    sx={{
                      width: 152,
                      height: 152,
                    }}
                    mb={{ xs: 4, md: 0 }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <CircularProgress color="primary" />
                  </Box>
                ) : profile?.avatar ? (
                  <>
                    <Box
                      component="img"
                      src={profile?.avatar}
                      sx={{
                        objectFit: "cover",
                        width: 152,
                        height: 152,
                        objectPosition: "center",
                        border: "1px solid #000000",
                        borderRadius: "100%",
                      }}
                      alt=""
                    />
                  </>
                ) : (
                  <AvatarIcon />
                )}
                {md && (
                  <>
                    <IconButton
                      aria-label="edit"
                      onClick={() => setOpen(true)}
                      sx={{
                        position: "absolute",
                        transform: "translateY(-50%)",
                        top: "50%",
                        right: -25,
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="change"
                      sx={{
                        position: "absolute",
                        transform: "translateY(-50%)",
                        top: "50%",
                        left: -25,
                      }}
                      onClick={() => input.current.click()}
                    >
                      <ChangeAvatarIcon />
                    </IconButton>
                  </>
                )}
              </Box>

              <Box ml={{ xs: 0, md: 3 }}>
                <Typography
                  mt={{ xs: 4, md: 0 }}
                  textAlign={{ xs: "center", md: "start" }}
                  fontWeight="700"
                  variant="subtitle2"
                >
                  {profile?.first_name} {profile?.last_name}
                </Typography>
                <Box
                  display="flex"
                  mt={3}
                  mb={3}
                  flexDirection={{ xs: "row", md: "column" }}
                >
                  <Typography
                    mb={{ xs: 0, md: 3 }}
                    mr={{ xs: 3, md: 0 }}
                    textAlign={{ xs: "center", md: "start" }}
                    variant="body2"
                  >
                    +
                    {profile?.phone_number?.replace(
                      /(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g,
                      "$1" + " "
                    )}
                  </Typography>
                  <Typography
                    textAlign={{ xs: "center", md: "start" }}
                    variant="body2"
                  >
                    {profile?.user_id?.email}
                  </Typography>
                </Box>
                {!md && (
                  <div className="text-btn">
                    <Typography
                      fontWeight="400"
                      onClick={() => setExit(true)}
                      color="var(--primary)"
                      sx={{
                        whiteSpace: "nowrap",
                      }}
                      mt={3}
                      variant="subtitle2"
                      component="h6"
                    >
                      {t("exit")}
                    </Typography>
                  </div>
                )}
              </Box>
            </Grid>
            <Grid
              xs={12}
              display="flex"
              flexDirection={{ xs: "row", md: "column" }}
              alignItems="center"
              justifyContent="center"
              item
              md={4}
              columnGap={{ xs: 2, md: 0 }}
              sx={{
                "& div": {
                  border: { xs: "1px solid var(--primary)", md: "none" },
                  p: { xs: "16px 0", md: "0" },
                  width: { xs: "50%", md: "fit-content" },
                  borderRadius: { xs: 1, md: "0" },
                  display: { xs: "flex", md: "" },
                  justifyContent: { xs: "center", md: "" },
                },
              }}
            >
              <Box display="flex" mb={{ xs: 0, md: 5 }} alignItems="center">
                <Typography
                  variant="h6"
                  fontWeight="700"
                  color="var(--primary)"
                >
                  {purchase_info.order_count}
                </Typography>
                <Typography variant="body2" ml={1}>
                  {t("allOrders")}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography
                  variant="h6"
                  whiteSpace="nowrap"
                  fontWeight="700"
                  color="var(--primary)"
                >
                  {!purchase_info.order_sum ? 0 : purchase_info.order_sum}{" "}
                  <span className="som">С</span>
                </Typography>
                <Typography variant="body2" ml={1}>
                  {t("allOrders")}
                </Typography>
              </Box>
            </Grid>
            {!md && (
              <Grid item xs={12} md={4}>
                <Box
                  display="flex"
                  className="text-btn"
                  onClick={() => setOpen(true)}
                  alignItems="center"
                >
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <Typography ml={1} variant="subtitle2" fontWeight="400">
                    {t("changeProfileData")}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  className="text-btn"
                  alignItems="center"
                  component="label"
                  htmlFor="upload"
                  mt={2}
                  mb={2}
                >
                  <IconButton
                    aria-label="change"
                    onClick={() => input.current.click()}
                  >
                    <ChangeAvatarIcon />
                  </IconButton>
                  <Typography ml={1} variant="subtitle2" fontWeight="400">
                    {t("changeAvatar")}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  onClick={() => setChangePassword(true)}
                  className="text-btn"
                  alignItems="center"
                >
                  <IconButton aria-label="change">
                    <ChangePasswordIcon />
                  </IconButton>
                  <Typography ml={1} variant="subtitle2" fontWeight="400">
                    {t("changePassword")}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Info;
