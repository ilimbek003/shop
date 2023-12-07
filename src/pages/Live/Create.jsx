import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useFormik } from "formik";
import React from "react";
import Products from "../Filter/Products";

const CreateLive = ({ t, mobile }) => {
  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {},
  });
  return (
    <Box component="section" pt={5}>
      <Container maxWidth="xl">
        <Box
          display="flex"
          mb={5}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h3" fontWeight="700">
            Создание эфира
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#E32967" }}
            size="large"
          >
            Создать прямой эфир
          </Button>
        </Box>
        <Box
          component="form"
          width="100%"
          action=""
          onSubmit={formik.handleSubmit}
          sx={{
            "& .MuiFormControl-root": {
              boxShadow: "none!important",
              borderRadius: "8px",
            },
          }}
        >
          <Typography
            fontSize="12px"
            color="#000"
            textTransform="uppercase"
            mb={1}
            fontWeight="400"
          >
            Название Эфира
          </Typography>
          <TextField
            required
            fullWidth
            placeholder="Название истории"
            // name="phone"
            // onChange={formik.handleChange}
            // value={formik.values.phone}
          />
          <Box display="flex" columnGap="16px" mt={5}>
            <Box width="50%">
              <Typography
                fontSize="12px"
                color="#000"
                textTransform="uppercase"
                mb={1}
                fontWeight="400"
              >
                Фото Анонса{" "}
              </Typography>
              <TextField
                required
                sx={{ "& input": { opacity: "0!important" } }}
                type="file"
                fullWidth
                placeholder="file.png"
                // name="phone"
                // onChange={formik.handleChange}
                // value={formik.values.phone}
              />
            </Box>
            <Box width="50%">
              {" "}
              <Typography
                fontSize="12px"
                color="#000"
                textTransform="uppercase"
                mb={1}
                fontWeight="400"
              >
                Дата и время эфира
              </Typography>
              <TextField
                required
                fullWidth
                type="date"
                placeholder="15.08.2022 | 18:00"
                // name="phone"
                // onChange={formik.handleChange}
                // value={formik.values.phone}
              />
            </Box>
          </Box>

          <form>
            <TextField
              type="text"
              required
              fullWidth
              value={formik.values.search}
              onChange={formik.values.search}
              sx={{
                mt: 5,
                "&.MuiFormControl-root": {
                  boxShadow: "none!important",
                  background: "#F2F2F3",
                  borderRadius: "1000px",

                  "& .MuiInputBase-root": {
                    pr: 0,
                  },

                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "1000px",
                  },
                },

                "& button": {
                  border: "none",
                },
              }}
              variant="outlined"
              placeholder={t("whatToFind")}
              InputProps={{
                endAdornment: (
                  <button type="submit" aria-label="search">
                    <InputAdornment position="end">
                      <svg
                        style={{ zIndex: 1, marginRight: 1 }}
                        width="46"
                        height="46"
                        viewBox="0 0 46 46"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="46" height="46" rx="23" fill="#282B3D" />
                        <path
                          d="M29.6719 27.8906L26.3906 24.6094C27.1289 23.5156 27.5117 22.1484 27.3203 20.6719C26.9648 18.1562 24.9141 16.1328 22.4258 15.8047C18.707 15.3398 15.5625 18.4844 16.0273 22.2031C16.3555 24.6914 18.3789 26.7422 20.8945 27.0977C22.3711 27.2891 23.7383 26.9062 24.8594 26.168L28.1133 29.4492C28.5508 29.8594 29.2344 29.8594 29.6719 29.4492C30.082 29.0117 30.082 28.3281 29.6719 27.8906ZM18.1602 21.4375C18.1602 19.5234 19.7188 17.9375 21.6602 17.9375C23.5742 17.9375 25.1602 19.5234 25.1602 21.4375C25.1602 23.3789 23.5742 24.9375 21.6602 24.9375C19.7188 24.9375 18.1602 23.3789 18.1602 21.4375Z"
                          fill="white"
                        />
                      </svg>
                    </InputAdornment>
                  </button>
                ),
              }}
            />
          </form>
          <Products />
        </Box>
      </Container>
    </Box>
  );
};

export default CreateLive;
