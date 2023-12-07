import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Container, Box } from "@mui/system";
import { Swiper, SwiperSlide } from "swiper/react";
import { makeStyles } from "@mui/styles";
import SwiperCore, { Navigation } from "swiper";
import arrow from "../assets/images/arrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { getArticleDetails } from "../redux/reducers/main";
import { useParams } from "react-router";
// eslint-disable-next-line
import { Fancybox } from "@fancyapps/ui";
import Error from "./Error";

SwiperCore.use([Navigation]);

const Article = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { id } = useParams();

  const { article_details } = useSelector(({ main }) => main);

  useEffect(() => {
    dispatch(getArticleDetails(id));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {article_details.status === 404 ? (
        <Error />
      ) : (
        <section>
          <Container maxWidth="xl">
            <Box maxWidth="947px" m="0 auto">
              <Typography
                variant="h2"
                m={{ xs: "32px 0", md: "60px auto 54px" }}
                textAlign="center"
                fontWeight={{ xs: 400, md: "700" }}
              >
                {article_details?.title}{" "}
              </Typography>
              <img
                width="100%"
                data-fancybox=""
                data-src={
                  article_details?.images && article_details?.images[0]?.image
                }
                src={
                  article_details?.images && article_details?.images[0]?.image
                }
                height="400px"
                style={{ objectFit: "cover" }}
                alt=""
              />
              <Typography
                variant="subtitle2"
                lineHeight="27px"
                fontWeight="400"
                mt={6}
                mb={6}
                whiteSpace="pre-wrap"
              >
                {article_details?.content}
              </Typography>
            </Box>
            <Box position="relative">
              <Swiper
                className={classes.swiper}
                freeMode={true}
                navigation={article_details?.images?.length > 4 && true}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 0,
                  },

                  768: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 16,
                  },
                }}
              >
                {article_details?.images
                  // ?.filter((item) => item[0])
                  ?.map((item) => (
                    <SwiperSlide>
                      <img
                        data-fancybox="gallery"
                        data-src={item.image}
                        src={item.image}
                        width="100%"
                        style={{ objectFit: "cover" }}
                        height="260px"
                        alt=""
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </Box>

            <Box
              maxWidth="947px"
              m="54px auto 0"
              pt={6}
              borderTop="1px solid #1F1F1F"
            >
              <Typography variant="subtitle1" mb={2} fontWeight="700">
                Сссылки на проект
              </Typography>
              <div className="d-flex">
                <Typography variant="body1">Веб сайт</Typography>
                <a aria-label="read more" href={article_details.website}>
                  <Typography
                    variant="body1"
                    sx={{ textDecoration: "underline" }}
                    ml={2}
                  >
                    {article_details.website}
                  </Typography>
                </a>
              </div>
              <div className="d-flex mt-2">
                <Typography variant="body1">Instagram</Typography>
                <a aria-label="read more" href={article_details.website}>
                  <Typography
                    variant="body1"
                    sx={{ textDecoration: "underline" }}
                    ml={2}
                  >
                    {article_details.instagram}
                  </Typography>
                </a>
              </div>
              <div className="d-flex mt-2">
                <Typography variant="body1">Веб сайт</Typography>
                <a aria-label="read more" href={article_details.website}>
                  <Typography
                    variant="body1"
                    sx={{ textDecoration: "underline" }}
                    ml={2}
                  >
                    {article_details.website}
                  </Typography>
                </a>
              </div>
            </Box>
          </Container>
        </section>
      )}
    </>
  );
};

export default Article;

const useStyles = makeStyles((theme) => ({
  swiper: {
    position: "static!important",
    "& .swiper-button-next, .swiper-button-prev": {
      width: 54,
      height: 54,
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 2,
      cursor: "pointer",

      "&:before": {
        content: `''!important`,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: `no-repeat url('${arrow}') center/cover`,
      },
    },

    "& .swiper-button-next": {
      right: 0,
      transform: "translateY(-50%) rotate(180deg)",
    },

    "& .swiper-button-prev": {
      left: 0,
      transform: "translateY(-50%) ",
    },
  },
}));
