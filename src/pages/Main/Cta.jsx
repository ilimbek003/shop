import React, { useLayoutEffect, useRef } from "react";
import { Box, Container } from "@mui/system";
import girl from "../../assets/images/girl.webp";
import { Button, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Mbox } from "../../components/Motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMailRes, subscribeMail } from "../../redux/reducers/main";
import SnackBar from "../../components/SnackBar";

const Cta = ({ t, setLoading }) => {
  const dispatch = useDispatch();
  const icon = {
    hidden: {
      pathLength: 0,
      stroke: "#fff",
      d: "",
    },
    visible: {
      pathLength: 1,
      stroke: "#F2F2F310",
      d: "M0.5 125.5C38.6667 65.8333 160.4 -39.2 342 18C569 89.5 567 202.5 811 150.5",
    },
  };

  const [value, setValue] = useState("");

  const { mail_res } = useSelector(({ main }) => main);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(subscribeMail({ email: value }));
    setValue("");
  };

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    // hide linear progress
    setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mail_res]);

  return (
    <>
      <SnackBar
        txt="Успешно отправлено"
        state={mail_res}
        severity={201}
        setState={setMailRes}
      />
      <Mbox component="section" pb={5} initial="hidden" whileInView="visible">
        <Container maxWidth="xl">
          <Box
            sx={{
              height: 191,
              bgcolor: "#8F27C6",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              p: "0 47px",
              position: "relative",
            }}
            component="form"
            onSubmit={handleSubmit}
          >
            <Box
              component="img"
              width="330px"
              height="248px"
              sx={{ position: "relative", zIndex: 2, top: -28.5, height: 248 }}
              src={girl}
              alt=""
            />

            <Box
              component="svg"
              sx={{ position: "absolute", top: 20, left: 32, width: "60%" }}
              width="812"
              height="165"
              viewBox="0 0 812 165"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                variants={icon}
                transition={{
                  default: { duration: 2, ease: "easeInOut" },
                  fill: { duration: 2, ease: [1, 0, 0.8, 1] },
                }}
                initial="hidden"
                animate="visible"
              />
            </Box>

            <Box
              component="svg"
              sx={{
                position: "absolute",
                bottom: 28,
                right: "34.5%",
                width: 45,
              }}
              width="52"
              height="36"
              viewBox="0 0 52 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0789 28.5735L12.9563 18.7516L49.9013 9.93216L17.9135 23.4312L12.0789 28.5735Z"
                fill="#DFDFDF"
                stroke="#DFDFDF"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M28.6205 30.7636L49.7249 9.89246L18.501 23.3578L28.6205 30.7636Z"
                fill="white"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M49.9013 9.93214C34.562 10.4834 3.75619 11.5572 3.24764 11.4426L13.2845 19.2708L49.9013 9.93214Z"
                fill="white"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Box>

            <Box mr={4}>
              <Typography
                variant="h6"
                fontWeight="700"
                mb={1}
                color="var(--secondary)"
              >
                {t("followТewsletter")}
              </Typography>
              <Typography
                variant="body1"
                maxWidth="207px"
                fontWeight="500"
                color="#FFF"
              >
                {t("knowFirst")}
              </Typography>
            </Box>
            <TextField
              required
              type="email"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              sx={{
                "&.MuiFormControl-root": {
                  boxShadow: "none!important",
                  background: "#F2F2F3",
                  borderRadius: "1000px",

                  "& .MuiInputBase-root": {
                    pr: 0,
                  },

                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "1000px",
                    borderColor: "transparent!important",
                  },
                  width: "300px",
                  mr: 3,
                },
              }}
              variant="outlined"
              placeholder={t("yourEmail")}
            />
            <Button variant="oval3" type="submit">
              {t("follow")}
            </Button>
          </Box>
        </Container>
      </Mbox>
    </>
  );
};

export default Cta;
