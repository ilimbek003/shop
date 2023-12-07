import React from "react";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import { Box, Container, useTheme } from "@mui/system";
import img from "../assets/images/manWithGirl.png";
import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/img3.png";
import img4 from "../assets/images/img4.png";

const Company = () => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("768"));
  return (
    <section>
      <Container maxWidth="xl">
        <Typography
          variant="h2"
          m={{ xs: "32px 0 90px", md: "60px 0 108px" }}
          fontWeight="400"
        >
          О компании
        </Typography>
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              mt: { xs: 0, md: 14 },
            }}
          >
            <Typography variant="h2" fontWeight={300} mb={5}>
              Компания{" "}
              <span className="bold">
                Электронная коммерция “Один пояс – Один путь”
              </span>{" "}
              начала свою торговую деятельность на территории Кыргызстана с 13
              июля 2022 года. Она занимамается только оптовой торговлей на всей
              террирории СНГ.
            </Typography>
            <Typography
              variant="h5"
              fontWeight={300}
              sx={{
                position: "relative",
                ml: "100px",
                "&:before": {
                  content: `''`,
                  position: "absolute",
                  width: 70,
                  height: 2,
                  background: "#000",
                  top: "50%",
                  left: -100,
                  transform: "translateY(-50%)",
                },
              }}
            >
              Молодая и динамично развивающая компания, работает в пользу для
              всех стран СНГ, сделать товары народного потребления, одежды,
              текстиля и многое другое доступным, качественным и самое главное
              по приемлемым ценам.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <img src={img} width="100%" alt="" />
          </Grid>
        </Grid>
        <Grid container mt={5} spacing={2}>
          <Grid item xs={6} md={3}>
            <Typography variant="h1" fontWeight={200} mb={2}>
              2 000
            </Typography>
            <Typography variant="body1" fontWeight={300}>
              Ut enim ad minima
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h1" fontWeight={200} mb={2}>
              547
            </Typography>
            <Typography variant="body1" fontWeight={300}>
              Smodi tempora incidunt
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h1" fontWeight={200} mb={2}>
              1 474
            </Typography>
            <Typography variant="body1" fontWeight={300}>
              Qia non numquam eius
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h1" fontWeight={200} mb={2}>
              1
            </Typography>
            <Typography variant="body1" fontWeight={300}>
              Abore et dolore agnam
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={4} mt={10}>
          <Grid item xs={12} md={4}>
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25 0C38.8075 0 50 11.1925 50 25C50 38.8075 38.8075 50 25 50C11.1925 50 0 38.8075 0 25C0 11.1925 11.1925 0 25 0ZM25 5C19.6957 5 14.6086 7.10714 10.8579 10.8579C7.10714 14.6086 5 19.6957 5 25C5 30.3043 7.10714 35.3914 10.8579 39.1421C14.6086 42.8929 19.6957 45 25 45C30.3043 45 35.3914 42.8929 39.1421 39.1421C42.8929 35.3914 45 30.3043 45 25C45 19.6957 42.8929 14.6086 39.1421 10.8579C35.3914 7.10714 30.3043 5 25 5ZM25 22.5C30 22.5 34.1675 23.3325 37.5 25C37.5 28.3152 36.183 31.4946 33.8388 33.8388C31.4946 36.183 28.3152 37.5 25 37.5C21.6848 37.5 18.5054 36.183 16.1612 33.8388C13.817 31.4946 12.5 28.3152 12.5 25C15.8325 23.3325 20 22.5 25 22.5ZM16.25 12.5C17.6908 12.4997 19.0875 12.9972 20.2036 13.9084C21.3198 14.8195 22.0868 16.0883 22.375 17.5H10.125C10.4132 16.0883 11.1802 14.8195 12.2964 13.9084C13.4125 12.9972 14.8092 12.4997 16.25 12.5ZM33.75 12.5C35.1908 12.4997 36.5875 12.9972 37.7036 13.9084C38.8198 14.8195 39.5868 16.0883 39.875 17.5H27.625C27.9132 16.0883 28.6802 14.8195 29.7964 13.9084C30.9125 12.9972 32.3092 12.4997 33.75 12.5Z"
                fill="black"
              />
            </svg>
            <Typography variant="subtitle1" fontWeight="500" mt={2} mb={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
            <Typography variant="subtitle1" fontWeight="300">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M52.5001 16.8925L47.5001 21.8925V10H25.0001V22.5H12.5001V50H47.5001V43.1075L52.5001 38.1075V52.52C52.4994 53.178 52.2376 53.8088 51.7721 54.2738C51.3066 54.7388 50.6755 55 50.0176 55H9.98256C9.65425 54.9977 9.32961 54.9308 9.02718 54.803C8.72474 54.6753 8.45043 54.4892 8.2199 54.2554C7.98938 54.0216 7.80716 53.7447 7.68365 53.4406C7.56014 53.1364 7.49776 52.8108 7.50006 52.4825V20L22.5076 5H49.9951C51.3751 5 52.5001 6.1375 52.5001 7.48V16.8925ZM54.4451 22.0175L57.9801 25.555L38.5351 45L34.9951 44.995L35.0001 41.465L54.4451 22.02V22.0175Z"
                fill="black"
              />
            </svg>

            <Typography variant="subtitle1" fontWeight="500" mt={2} mb={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
            <Typography variant="subtitle1" fontWeight="300">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M41.25 7.5C48.845 7.5 55 13.75 55 22.5C55 40 36.25 50 30 53.75C23.75 50 5 40 5 22.5C5 13.75 11.25 7.5 18.75 7.5C23.4 7.5 27.5 10 30 12.5C32.5 10 36.6 7.5 41.25 7.5ZM32.335 46.51C34.5375 45.12 36.525 43.7375 38.385 42.2575C45.8375 36.3325 50 29.8575 50 22.5C50 16.6 46.1575 12.5 41.25 12.5C38.56 12.5 35.65 13.925 33.535 16.035L30 19.57L26.465 16.035C24.35 13.925 21.44 12.5 18.75 12.5C13.9 12.5 10 16.64 10 22.5C10 29.86 14.165 36.3325 21.6125 42.2575C23.475 43.7375 25.4625 45.12 27.665 46.5075C28.4125 46.98 29.1525 47.4325 30 47.9375C30.8475 47.4325 31.5875 46.98 32.335 46.51Z"
                fill="black"
              />
            </svg>

            <Typography variant="subtitle1" fontWeight="500" mt={2} mb={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
            <Typography variant="subtitle1" fontWeight="300">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </Grid>
        </Grid>
        {!md && (
          <>
            <Grid container mt={10} spacing={4}>
              <Grid item xs={3}>
                <Typography
                  variant="h2"
                  sx={{
                    position: "relative",
                    "&:before": {
                      content: `''`,
                      position: "absolute",
                      width: "100%",
                      height: 2,
                      background: "#000",
                      bottom: -20,
                      left: 0,
                    },
                  }}
                  fontWeight="300"
                >
                  Lorem ipsum <span className="bold">dolor sit adipiscing</span>{" "}
                  elitaa dwet
                </Typography>{" "}
              </Grid>
              <Grid item xs={3}>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1"
                    y="1"
                    width="38"
                    height="38"
                    fill="white"
                    stroke="black"
                    strokeWidth="2"
                  />
                  <g clip-path="url(#clip0_278_18786)">
                    <path
                      d="M18.1249 23.7064L28.4158 13L30 14.6468L18.1249 27L11 19.5883L12.5831 17.9415L18.1249 23.7064Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_278_18786">
                      <rect
                        width="30"
                        height="30"
                        fill="white"
                        transform="translate(5 5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <Typography variant="body1" mt={2} fontWeight="400">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore
                </Typography>
                <Box mt={2}>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="1"
                      y="1"
                      width="38"
                      height="38"
                      fill="white"
                      stroke="black"
                      strokeWidth="2"
                    />
                    <g clip-path="url(#clip0_278_18786)">
                      <path
                        d="M18.1249 23.7064L28.4158 13L30 14.6468L18.1249 27L11 19.5883L12.5831 17.9415L18.1249 23.7064Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_278_18786">
                        <rect
                          width="30"
                          height="30"
                          fill="white"
                          transform="translate(5 5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <Typography variant="body1" mt={2} fontWeight="400">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1"
                    y="1"
                    width="38"
                    height="38"
                    fill="white"
                    stroke="black"
                    strokeWidth="2"
                  />
                  <g clip-path="url(#clip0_278_18786)">
                    <path
                      d="M18.1249 23.7064L28.4158 13L30 14.6468L18.1249 27L11 19.5883L12.5831 17.9415L18.1249 23.7064Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_278_18786">
                      <rect
                        width="30"
                        height="30"
                        fill="white"
                        transform="translate(5 5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <Typography variant="body1" mt={2} fontWeight="400">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore
                </Typography>
                <Box mt={2}>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="1"
                      y="1"
                      width="38"
                      height="38"
                      fill="white"
                      stroke="black"
                      strokeWidth="2"
                    />
                    <g clip-path="url(#clip0_278_18786)">
                      <path
                        d="M18.1249 23.7064L28.4158 13L30 14.6468L18.1249 27L11 19.5883L12.5831 17.9415L18.1249 23.7064Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_278_18786">
                        <rect
                          width="30"
                          height="30"
                          fill="white"
                          transform="translate(5 5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <Typography variant="body1" mt={2} fontWeight="400">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1"
                    y="1"
                    width="38"
                    height="38"
                    fill="white"
                    stroke="black"
                    strokeWidth="2"
                  />
                  <g clip-path="url(#clip0_278_18786)">
                    <path
                      d="M18.1249 23.7064L28.4158 13L30 14.6468L18.1249 27L11 19.5883L12.5831 17.9415L18.1249 23.7064Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_278_18786">
                      <rect
                        width="30"
                        height="30"
                        fill="white"
                        transform="translate(5 5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <Typography variant="body1" mt={2} fontWeight="400">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore
                </Typography>
                <Box mt={2}>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="1"
                      y="1"
                      width="38"
                      height="38"
                      fill="white"
                      stroke="black"
                      strokeWidth="2"
                    />
                    <g clip-path="url(#clip0_278_18786)">
                      <path
                        d="M18.1249 23.7064L28.4158 13L30 14.6468L18.1249 27L11 19.5883L12.5831 17.9415L18.1249 23.7064Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_278_18786">
                        <rect
                          width="30"
                          height="30"
                          fill="white"
                          transform="translate(5 5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <Typography variant="body1" mt={2} fontWeight="400">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Typography variant="h2" mt={10} mb={5}>
              Наши услуги
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={3}>
                <img src={img1} alt="" />
                <Typography variant="body2" mt={5}>
                  Разработка сайтов
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <img src={img2} alt="" />
                <Typography variant="body2" mt={5}>
                  Продвижение в соц сетях
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <img src={img3} alt="" />
                <Typography variant="body2" mt={5}>
                  Маркетинговый план
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <img src={img4} alt="" />
                <Typography variant="body2" mt={5}>
                  Дизайн
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </section>
  );
};

export default Company;
