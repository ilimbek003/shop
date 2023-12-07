/* eslint-disable eqeqeq */
import { Alert, Slide, Snackbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";

const SnackBar = ({ state, setState, txt, severity }) => {
  const dispatch = useDispatch();
  return (
    <Snackbar
      open={state.open}
      TransitionComponent={SlideTransition}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      onClose={() => dispatch(setState({ ...state, open: false }))}
    >
      <Alert
        severity={
          state.severity == severity
            ? "success"
            : state.severity === 200
            ? "success"
            : "error"
        }
        variant="filled"
      >
        {txt && state.severity == severity
            ? txt
            : state.severity === 200
            ? txt
            : state?.message && typeof state?.message == "string"
            ? state?.message
            : state?.message && Object.values(state?.message)[0]}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export const Alertt = ({ open, setOpen, fav, setFav }) => (
  <Snackbar
    open={open || fav?.open}
    TransitionComponent={SlideTransition}
    autoHideDuration={6000}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    onClose={() => {
      if (fav) {
        setFav({ ...fav, open: false });
      } else setOpen(false);
    }}
    sx={{
      width: "60%",
      justifyContent: "start",
    }}
  >
    <Box
      display="flex"
      sx={{
        backgroundColor: "#FFF",
        p: "12px",
        width: "100%",
        boxShadow:
          "0px 100px 80px rgba(0, 0, 0, 0.07), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802)",
        borderRadius: "8px",
      }}
    >
      {fav ? (
        <>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="32" height="32" rx="8" fill="#F7E200" />
            <path
              d="M15.3203 10.9219L13.7969 14.0391L10.3516 14.5312C9.74219 14.625 9.50781 15.375 9.95312 15.8203L12.4141 18.2344L11.8281 21.6328C11.7344 22.2422 12.3906 22.7109 12.9297 22.4297L16 20.8125L19.0469 22.4297C19.5859 22.7109 20.2422 22.2422 20.1484 21.6328L19.5625 18.2344L22.0234 15.8203C22.4688 15.375 22.2344 14.625 21.625 14.5312L18.2031 14.0391L16.6562 10.9219C16.3984 10.3828 15.6016 10.3594 15.3203 10.9219Z"
              fill="white"
            />
          </svg>
          <Box ml={1}>
            <Typography fontWeight="bold">В избранном</Typography>
            <Typography fontWeight="400">
              Нажмите, чтобы добавить в список
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="32" height="32" rx="8" fill="#8F27C6" />
            <path
              d="M14.9453 10.5703C15.2031 10.7109 15.3203 11.0625 15.1797 11.3438L13.2578 15H18.7188L16.7969 11.3438C16.6562 11.0625 16.7734 10.7109 17.0312 10.5703C17.3125 10.4297 17.6641 10.5469 17.8047 10.8047L19.9844 15H22C22.3984 15 22.75 15.3516 22.75 15.75C22.75 16.1719 22.3984 16.5 22 16.5L20.7812 21.375C20.5938 22.0312 20.0078 22.5 19.3281 22.5H12.6484C11.9688 22.5 11.3828 22.0312 11.1953 21.375L10 16.5C9.57812 16.5 9.25 16.1719 9.25 15.75C9.25 15.3516 9.57812 15 10 15H11.9922L14.1719 10.8047C14.3125 10.5469 14.6641 10.4297 14.9453 10.5703ZM12.625 17.4375C12.9297 17.4375 13.1875 17.2031 13.1875 16.875C13.1875 16.5703 12.9297 16.3125 12.625 16.3125C12.2969 16.3125 12.0625 16.5703 12.0625 16.875C12.0625 17.2031 12.2969 17.4375 12.625 17.4375ZM19.375 16.3125C19.0469 16.3125 18.8125 16.5703 18.8125 16.875C18.8125 17.2031 19.0469 17.4375 19.375 17.4375C19.6797 17.4375 19.9375 17.2031 19.9375 16.875C19.9375 16.5703 19.6797 16.3125 19.375 16.3125Z"
              fill="#FBFBFB"
            />
          </svg>
          <Box ml={1}>
            <Typography fontWeight="bold">В корзине</Typography>
            <Typography fontWeight="400">
              Нажмите, чтобы добавить в корзину
            </Typography>
          </Box>
        </>
      )}
    </Box>
  </Snackbar>
);
