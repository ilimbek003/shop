import React from "react";
import { Box, Container, useTheme } from "@mui/system";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { makeStyles } from "@mui/styles";
import "swiper/css/pagination";
import { useSelector } from "react-redux";
import {useMediaQuery} from "@mui/material";
import StreamCard from "./Card";
import styled from "@emotion/styled"
import {NavLink} from "react-router-dom";
SwiperCore.use([Pagination, Autoplay]);

const SlideStream = styled.div`
  position: relative;
  margin: 0 auto;
  width: 70%;
`
export const SlideBlock = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  padding: 9px 0 ;
  &:before{
    position: absolute;
    content : "";
    background: linear-gradient(90deg, rgba(245, 246, 248, 0) 0%, #F5F6F8 60.97%, #F5F6F8 100%);
    transform: matrix(-1, 0, 0, 1, 0, 0);
    height: 100%;
    width: 50%;
    top: 0;
    left: -25%;
    z-index: 14;
  }
  &:after{
    position: absolute;
    content : "";
    background: linear-gradient(270deg, rgba(245, 246, 248, 0) 0%, #F5F6F8 60.97%, #F5F6F8 100%);
    transform: matrix(-1, 0, 0, 1, 0, 0);
    height: 100%;
    width: 50%;
    top: 0;
    right: -25%;
    z-index: 14;
  }
`

const StreamSlide = () => {
    const classes = useStyles();

    const { banners } = useSelector(({ main }) => main);

    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down(768));

    return (
        <Box component="section">
            <SlideStream>
                <Swiper
                    className={classes.swiper}
                    freeMode={true}
                    slidesPerView={1}
                    loop={true}
                    spaceBetween={36}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 4000,
                        pauseOnMouseEnter: true,
                        disableOnInteraction: false,
                    }}
                >
                        {Array.from(Array(3).keys()).map((item) => (
                            <SwiperSlide key={2}>
                                <StreamCard profuct={item} Announce={false} announce type={false} />
                            </SwiperSlide>
                        ))}
                </Swiper>
            </SlideStream>
        </Box>
    );
};

export default StreamSlide;

const useStyles = makeStyles((theme) => ({
    swiper: {
        position: "static!important",
        overflow: "revert!important",
        "& .swiper-pagination-bullets": {
            bottom: "-36px",
            "& .swiper-pagination-bullet": {
                width: 20,
                height: 8,
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
                width: "80.5px!important",
            },
        },
    },
}));

