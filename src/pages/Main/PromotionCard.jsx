/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/system";
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { makeStyles } from "@mui/styles";
import { Button, IconButton, Typography, useMediaQuery } from "@mui/material";
import {
  FavIcon1,
  FavIcon2,
  PromotIcon,
  PromotIconMobile,
  StarIcon,
} from "../../assets/images/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addOrDeleteToFavorites } from "../../redux/reducers/profile";
import { addToCart } from "../../redux/reducers/products";
import { useAuth } from "../../shared/ProtectedRoutes";
import { useRef } from "react";
import { Alertt } from "../../components/SnackBar";
import { setOpenLogin } from "../../redux/reducers/auth";

SwiperCore.use([Pagination]);

const PromotionCard = ({ item, t, promotion, setCartSum, cartSum }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const isAuth = useAuth();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down(768));

  const swiperSlide = useRef(null);

  const [fav, setFav] = useState({ open: false, fav: false });
  const [open, setOpen] = useState(false);
  const [cart, setToCart] = useState(false);
  const [variant, setVariant] = useState(1);

  useEffect(() => {
    setFav({ ...fav, fav: item.is_favorite });
    setVariant(item?.product_variation[0]);
  }, [item]);

  const addtoCart = () => {
    if (isAuth) {
      setOpen(true);
      setToCart(true);

      setCartSum(parseInt(cartSum) + parseInt(variant?.promotion_price));

      console.log(variant?.promotion_price);

      dispatch(
        addToCart({
          product_count: 1,
          product_variations: variant.id,
        })
      );
    } else navigate("/auth");
  };
  console.log(item.product_variation);
  return (
    <>
      <Alertt open={open} setOpen={setOpen} />
      <Alertt setFav={setFav} fav={fav} />
      <Box borderRadius={1} border="1px solid #CECECE" overflow="hidden">
        <Box position="relative">
          <Link
            aria-label="read more"
            to={`/details/${item.id}`}
            style={{
              display: "block",
            }}
          >
            <Swiper
              className={classes.swiper}
              freeMode={true}
              slidesPerView={1}
              spaceBetween={16}
              pagination={{
                clickable: true,
              }}
            >
              {!item.product_variation?.length ? (
                <Box
                  height={{ xs: 192, md: "302px" }}
                  width="100%"
                  backgroundColor="#D9D9D9"
                  alt=""
                />
              ) : (
                item.product_variation?.map((item) => (
                  <SwiperSlide
                    ref={swiperSlide}
                    className="swiper-slide"
                    id={item?.id}
                    key={item?.id}
                  >
                    <Box
                      component="img"
                      src={item.main_image?.image}
                      sx={{
                        objectFit: "cover",
                      }}
                      height={{ xs: 192, md: "302px" }}
                      width="100%"
                      alt=""
                    />
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </Link>
          <Box
            sx={{
              position: "absolute",
              top: { xs: 8, md: 16 },
              left: { xs: 8, md: 16 },
              zIndex: 1,
              display: "flex",
              columnGap: 2,
            }}
          >
            {md ? <PromotIconMobile /> : <PromotIcon />}
          </Box>

          <IconButton
            aria-label="add to favorite"
            sx={{
              position: "absolute!important",
              top: { xs: 1, md: 8 },
              right: { xs: 1, md: 8 },
              zIndex: 1,
            }}
            onClick={() => {
              if (isAuth) {
                if (!fav.fav) {
                  setFav({ open: true, fav: !fav.fav });
                } else setFav({ open: false, fav: !fav.fav });

                dispatch(addOrDeleteToFavorites({ product_id: item.id }));
              } else navigate("/auth");
            }}
          >
            {fav.fav ? <FavIcon1 /> : <FavIcon2 />}
          </IconButton>
        </Box>
        <Box p={"0 16px 16px 16px "}>
          <Link aria-label="read more" to={`/details/${item.id}`}>
            <Typography
              variant="body2"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              fontWeight="600"
            >
              {item.title}
            </Typography>
          </Link>
          <Box className="d-flex" m="20px 0">
            <svg
              width="8"
              height="9"
              viewBox="0 0 8 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="4"
                cy="4.5"
                r="4"
                fill={variant?.color_amount == 0 ? "red" : "#51BD47"}
              />
            </svg>
            <Typography fontSize="12px" ml={0.5} color="#1E1E1E50">
              {variant?.color_amount <= 0 ? "Нет в наличии" : "В наличии"}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            {Array.from(Array(item.mark_avg).keys()).map((item, idx) => (
              <StarIcon key={idx} />
            ))}

            <Typography fontSize="12px" ml={1}>
              {!item.mark_avg ? "0" : item.mark_avg}
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            mt={2}
            alignItems={{ xs: "start", md: "center" }}
            justifyContent="space-between"
          >
            <Box mr={1} mb={{ xs: 2, md: 0 }}>
              <Typography variant="body2" whiteSpace="nowrap" fontWeight="700">
                {variant?.promotion_price} {variant?.currency_unit}
              </Typography>

              <Typography
                fontSize="12px"
                color="#1E1E1E50"
                whiteSpace="nowrap"
                sx={{
                  textDecoration: "line-through",
                }}
              >
                {variant?.product_price} {variant?.currency_unit}
              </Typography>
            </Box>
            {cart ? (
              <Button
                aria-label="add to cart"
                variant="oval2-outlined"
                sx={{ position: "relative" }}
              >
                {t("inCart")}
                <Box
                  sx={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    width: "20px",
                    height: "20px",
                  }}
                  component="svg"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="20" height="20" rx="10" fill="#F7E200" />
                  <path
                    d="M13.3438 7.65625C13.5469 7.84375 13.5469 8.17188 13.3438 8.35938L9.34375 12.3594C9.15625 12.5625 8.82812 12.5625 8.64062 12.3594L6.64062 10.3594C6.4375 10.1719 6.4375 9.84375 6.64062 9.65625C6.82812 9.45312 7.15625 9.45312 7.34375 9.65625L8.98438 11.2969L12.6406 7.65625C12.8281 7.45312 13.1562 7.45312 13.3438 7.65625Z"
                    fill="#1E1E1E"
                  />
                </Box>
              </Button>
            ) : (
              <Button
                aria-label="add to cart"
                disabled={variant?.color_amount <= 0}
                variant="oval2"
                onClick={addtoCart}
              >
                {t("addToCart")}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PromotionCard;

const useStyles = makeStyles((theme) => ({
  swiper: {
    position: "static!important",
    marginBottom: 40,
    "& .swiper-pagination-bullets": {
      bottom: "-27px",
      "& .swiper-pagination-bullet": {
        width: 8,
        height: 8,
        background: "#D9D9D9",
        borderRadius: "100%",
      },

      "& .swiper-pagination-bullet-active": {
        background: "#6D6D6D",
      },
    },
  },
}));
