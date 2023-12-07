import React from "react";
import { Box, Container, useTheme } from "@mui/system";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { makeStyles } from "@mui/styles";
import "swiper/css/pagination";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";

SwiperCore.use([Pagination, Autoplay]);

const Slides = () => {
  const classes = useStyles();

  const { banners } = useSelector(({ main }) => main);

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down(768));

  return (
    <Box component="section" pt={3}>
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
        }}
      >
        <Swiper
          className={classes.swiper}
          freeMode={true}
          slidesPerView={1}
          loop={true}
          spaceBetween={16}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 4000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
        >
          {banners?.results?.map((item) => (
            <SwiperSlide key={item.id}>
              <a
                aria-label="read more"
                href={item.link}
                target="_blank"
                rel="noreferrer"
              >
                <Box
                  component="img"
                  sx={{
                    height: { xs: 140, md: 396 },
                    objectFit: "cover",
                  }}
                  src={!md ? item.mobile : item.desktop}
                  width="100%"
                  alt=""
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
};

export default Slides;

const useStyles = makeStyles((theme) => ({
  swiper: {
    position: "static!important",
    "& .swiper-pagination-bullets": {
      bottom: "-36px",
      "& .swiper-pagination-bullet": {
        width: 97,
        height: 3,
        background: "#00000010",
        borderRadius: 16,
        opacity: 1,
        transition: "all 0.2s linear",
        [theme.breakpoints.down("768")]: {
          width: 8,
          height: 8,
        },
      },

      "& .swiper-pagination-bullet-active": {
        background: "var(--primary)",
        width: "17.5px!important",
      },
    },
  },
}));
