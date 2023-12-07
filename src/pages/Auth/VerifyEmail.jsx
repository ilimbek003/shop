/* eslint-disable eqeqeq */
import {
  Button,
  Dialog,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SnackBar from "../../components/SnackBar";
import {
  postLogin,
  sendCode,
  sendVerifyData,
  setVerifyRes,
} from "../../redux/reducers/auth";
import cookie from "cookie_js";
import { useNavigate } from "react-router";
import { instance } from "../../api";
import { CloseIcon } from "../../assets/images/icons";

const VerifyEmail = ({ setOpen, open, setLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { verify, login } = useSelector(({ auth }) => auth);

  const [count, setCount] = useState(300);

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: (values) => {
      // show progress bar
      setLoading(true);
      parseInt(values.code);

      const data = {
        phone: cookie.get("phone"),
        code: values.code,
      };

      // send data
      dispatch(sendVerifyData(data));
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

    if (verify.severity === 200 && open) {
      dispatch(
        postLogin({
          password: cookie.get("password"),
          phone: cookie.get("phone"),
        })
      );

      if (login?.message?.tokens?.access) {
        instance.defaults.headers.Authorization = `Bearer ${login?.message.tokens.access}`;
        cookie.set("token_opop", login?.message.tokens.access, {
          expires: 7,
        });
        cookie.remove("password");
        cookie.remove("phone");
        cookie.remove("email");
        dispatch(setOpen(false));
        dispatch(setVerifyRes({ ...verify, severity: null }));
      }

      setTimeout(() => {
        navigate("/dashboard/profile");
      }, 2000);

      dispatch(setOpen(false));
      if (localStorage.getItem("activation")) {
        localStorage.removeItem("activation");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verify]);

  useEffect(() => {
    if (count > 0 && open)
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
  });

  useEffect(() => {
    if (open) {
      if (localStorage.getItem("activation")) {
        dispatch(sendCode({ phone: cookie.get("phone") }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const submitHandler = () => {
    if (count === 0) {
      dispatch(
        sendCode({
          phone: cookie.get("phone"),
        })
      );
      setCount(300);
    }
  };

  return (
    <>
      <SnackBar
        state={verify}
        txt="Сообщение отправлено"
        setState={setVerifyRes}
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
        open={open}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
          }}
          onClick={() => dispatch(setOpen(false))}
        >
          <CloseIcon />
        </IconButton>
        <Box
          component="form"
          width="100%"
          action=""
          onSubmit={formik.handleSubmit}
        >
          <Typography variant="h6" mb={3} fontWeight="700" textAlign="center">
            Подтверждение
          </Typography>
          <Typography
            variant="body2"
            lineHeight="17px"
            textAlign="center"
            mb={3}
          >
            Мы вышлем вам на номер телефона код подтверждения и ссылку для того
            чтобы вы могли пройдя по ссылке восстановить свой пароль.
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
            fullWidth
            required
            name="code"
            onChange={formik.handleChange}
            value={formik.values.code}
          />

          <Typography variant="body2" mt={2} onClick={submitHandler}>
            Не пришло сообщение? Можно{" "}
            <span className={count == 0 ? "link primary" : "link disabled"}>
              прислать ещё
            </span>{" "}
            через {count} секунд
          </Typography>

          <Box display="flex" mt={5} flexWrap="nowrap">
            <Button
              size="medium"
              color="primary"
              fullWidth
              sx={{ mr: 2 }}
              onClick={() => dispatch(setOpen(false))}
              variant="outlined"
            >
              Отмена
            </Button>
            <Button
              type="submit"
              size="medium"
              color="primary"
              fullWidth
              variant="contained"
            >
              Войти
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default VerifyEmail;
