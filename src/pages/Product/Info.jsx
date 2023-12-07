import {
  Button,
  Chip,
  IconButton,
  Slide,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useLayoutEffect, useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { MinusIcon, PlusIcon } from "../../assets/images/icons";
import SnackBar from "../../components/SnackBar";
import { setOpenLogin } from "../../redux/reducers/auth";
import { setCreatedOrderData } from "../../redux/reducers/order";
import {
  addToCart,
  setAddedToCartProduct,
} from "../../redux/reducers/products";
import whatsapp from "../../assets/images/whatsapp.png";
import { useAuth } from "../../shared/ProtectedRoutes";

const addedToCart = (
  <Box
    pt="32px"
    pb="30px"
    display="flex"
    flexDirection="column"
    alignItems="center"
  >
    <svg
      width="55"
      height="56"
      viewBox="0 0 55 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M54.625 28C54.625 13.125 42.375 0.875 27.5 0.875C12.5156 0.875 0.375 13.125 0.375 28C0.375 42.9844 12.5156 55.125 27.5 55.125C42.375 55.125 54.625 42.9844 54.625 28ZM24.3281 42.4375C23.6719 43.0938 22.4688 43.0938 21.8125 42.4375L10.4375 31.0625C9.78125 30.4062 9.78125 29.2031 10.4375 28.5469L12.9531 26.1406C13.6094 25.375 14.7031 25.375 15.3594 26.1406L23.125 33.7969L39.5312 17.3906C40.1875 16.625 41.2812 16.625 41.9375 17.3906L44.4531 19.7969C45.1094 20.4531 45.1094 21.6562 44.4531 22.3125L24.3281 42.4375Z"
        fill="#8F27C6"
      />
    </svg>
    <Typography variant="body2" color="var(--primary)" fontWeight="700" mt={1}>
      Добавлено
    </Typography>
  </Box>
);

const Info = ({
  setCartSum,
  cartSum,
  t,
  sizes,
  amount,
  setAmount,
  colors,
  details,
  variant,
  setLoading,
  setVariant,
  setOpen,
  size,
  color,
  setSize,
  setColor,
}) => {
  const [added, setAdded] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);

  const { added_product_to_cart } = useSelector(({ products }) => products);
  const { created_order } = useSelector(({ order }) => order);

  const containerRef = useRef(null);
  const firstUpdate = useRef(null);

  const dispatch = useDispatch();
  const isAuth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setAmount(variant?.min_sale_amount);
  }, [variant]);

  useEffect(() => {
    setVariant(
      details?.product_variation?.find((item) => item.color.title === color)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  useEffect(() => {
    if (size && color)
      setVariant(
        details?.product_variation?.find(
          (item) =>
            item?.color_size?.title === size && item.color.title === color
        )
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    // hide linear progress
    setLoading(false);

    if (
      added_product_to_cart.severity === 200 ||
      (added_product_to_cart.severity === 201 && added)
    ) {
      setCartSum(
        parseInt(cartSum) +
          parseInt(
            variant?.is_promotion
              ? variant?.promotion_price
              : variant?.product_price
          ) *
            parseInt(amount)
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [added_product_to_cart]);

  const addtocart = () => {
    if (isAuth) {
      setLoading(true);
      setAdded(true);

      dispatch(
        addToCart({
          product_count: amount,
          product_variations: variant?.id,
        })
      );
    } else navigate(`/auth?return_to=/details/${details?.id}`);
  };

  const buyNow = () => {
    if (isAuth) setOpen(true);
    else navigate(`/auth?return_to=/details/${details?.id}`);
  };

  const handleTooltipClose = () => {
    setOpenTooltip(false);
  };

  return (
    <>
      <SnackBar state={created_order} setState={setCreatedOrderData} />
      <SnackBar
        state={added_product_to_cart}
        setState={setAddedToCartProduct}
      />
      <Box width={{ xs: "100%", md: "50%" }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box width="80%" mr={2}>
            <Typography variant="subtitle1" fontWeight="700">
              {details?.title}
            </Typography>
          </Box>
          <Box display="flex" alignItems="flex-end" flexDirection="column">
            <div className="d-flex">
              <Typography
                variant="body1"
                whiteSpace="nowrap"
                fontWeight="700"
                color="var(--primary)"
              >
                {variant?.is_promotion
                  ? variant?.promotion_price
                  : variant?.product_price}{" "}
                {variant?.currency_unit?.currency}
              </Typography>
              {variant?.is_promotion && (
                <Typography
                  fontSize="12px"
                  ml={1}
                  whiteSpace="nowrap"
                  sx={{
                    textDecoration: "line-through",
                  }}
                  fontWeight="700"
                  color="#1E1E1E50"
                >
                  {variant?.product_price} {variant?.currency_unit?.currency}
                </Typography>
              )}
            </div>
            {/* <Typography fontSize="12px" mt={0.5} mb={0.5} fontWeight="400">
              {variant?.converted_price?.KZT
                ? variant?.converted_price?.KZT
                : variant?.converted_price?.KGS}{" "}
              {variant?.converted_price?.KZT ? "₸" : "C"}
            </Typography> */}
            {/* <Typography fontSize="12px" fontWeight="400">
              $ {variant?.converted_price?.USD.toFixed(2)}
            </Typography> */}
          </Box>
        </Box>
        <Typography variant="body2" fontWeight="400" lineHeight="17px" mt={2}>
          {details?.description}
        </Typography>
        <Box display="flex" overflow="auto" columnGap="16px" mt={2}>
          {sizes
            ?.filter((item) => item.color.title === color)
            ?.map((item) => (
              <Chip
                label={item.size}
                sx={{
                  display: !item.size && "none",
                  background: "#FFF",
                  // eslint-disable-next-line eqeqeq
                  color: item.size == size ? "var(--primary)" : "#000",
                  fontWeight: item.size == size ? "700" : "500",
                  padding: "25px 12px",
                }}
                aria-label="choose color"
                onClick={() => {
                  setSize(item.size);
                }}
              />
            ))}
        </Box>
        <Box display="flex" overflow="auto" columnGap="16px" mt={2}>
          {Array.isArray(colors) &&
            colors?.map((item) => (
              <Tooltip title={item.title} placement="top-start">
                <Chip
                  sx={{
                    position: "relative",
                    backgroundColor: item.color_code,
                    border: item.color_code === "#FFFFFF" && "1px solid black",
                    maxWidth: 20,
                    maxHeight: 20,
                    "&:before": {
                      content: `''`,
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: 8,
                      height: 8,
                      borderRadius: 8,
                      transform: "translate(-50%, -50%)",
                      backgroundColor:
                        item.title === color && item.color_code === "#FFFFFF"
                          ? "#000"
                          : item.title === color
                          ? "#FFF"
                          : "transparent",
                    },
                  }}
                  onClick={() => setColor(item.title)}
                />
              </Tooltip>
            ))}
        </Box>
        <Box
          component="table"
          width="100%"
          borderTop="1px solid #00000010"
          pt={2}
          mt={2}
          borderBottom="1px solid #00000010"
          pb={2}
          mb={2}
          sx={{
            "& tr": {
              width: "100%",
              "& td": {
                width: "50%",
                "& p": {
                  p: "8px 0",
                },
                "&:last-child": { textAlign: "end" },
              },
            },
          }}
        >
          <tr>
            <td>
              <Typography variant="body2" fontWeight="300">
                {t("article")}:
              </Typography>
            </td>
            <td>
              <Typography variant="body2" fontWeight="700">
                {variant?.vendor_code}
              </Typography>
            </td>
          </tr>
          <tr>
            <td>
              <Typography variant="body2" fontWeight="300">
                {t("color")}:
              </Typography>
            </td>
            <td>
              <Typography variant="body2" fontWeight="700">
                {color}
              </Typography>
            </td>
          </tr>
          <tr>
            <td>
              <Typography variant="body2" fontWeight="300">
                {t("size")}:
              </Typography>
            </td>
            <td>
              <Typography variant="body2" fontWeight="700">
                {size}
              </Typography>
            </td>
          </tr>
          <tr>
            <td>
              <Typography variant="body2" fontWeight="300">
                {t("stock")}:
              </Typography>
            </td>
            <td>
              <Typography variant="body2" fontWeight="700">
                {variant?.color_amount > 0 ? "Есть в наличии" : "Нет в наличии"}
              </Typography>
            </td>
          </tr>
          <tr>
            <td>
              <Typography variant="body2" fontWeight="300">
                {t("minimalCount")}:
              </Typography>
            </td>
            <td>
              <Typography variant="body2" fontWeight="700">
                {variant?.min_sale_amount}
              </Typography>
            </td>
          </tr>
        </Box>
        {/* <Box display="flex">
        <Typography variant="body2" fontWeight="700">
          Комплектация:
        </Typography>
        <Typography variant="body2" ml={1} fontWeight="400">
          Описание комплектации товара
        </Typography>
      </Box> */}
        <Box
          // borderTop="1px solid #00000010"
          pt={2}
          mt={2}
          // borderBottom="1px solid #00000010"
          // pb={2}
          // mb={2}
          display="flex"
          alignItems="center"
          flexDirection="column"
          overflow="hidden"
          ref={containerRef}
        >
          {added_product_to_cart.severity === 200 ||
          (added_product_to_cart.severity === 201 && added) ? (
            <Slide
              direction="right"
              in={added}
              container={containerRef.current}
            >
              {addedToCart}
            </Slide>
          ) : (
            <>
              <Typography
                variant="body2"
                lineHeight="17px"
                mb={2}
                textAlign="center"
              >
                {t("infoTxt")}
              </Typography>
              <Box
                display="flex"
                sx={{
                  "& .Mui-disabled": {
                    opacity: 0.5,
                  },
                }}
              >
                <IconButton
                  aria-label="remove one"
                  disabled={variant?.color_amount < 1}
                  onClick={() =>
                    amount > variant?.min_sale_amount && setAmount(amount - 1)
                  }
                >
                  <MinusIcon width={40} />
                </IconButton>

                <Box ml={4} mr={4}>
                  <Typography variant="body2">{t("amount")}</Typography>
                  <Typography variant="h6" textAlign="center" fontWeight="700">
                    {amount}
                  </Typography>
                </Box>
                <Tooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  title={t("noneProducts")}
                  placement="top-start"
                  onClose={handleTooltipClose}
                  open={openTooltip}
                >
                  <IconButton
                    disabled={variant?.color_amount < 1}
                    onClick={() => {
                      if (amount < variant?.color_amount) setAmount(amount + 1);
                      if (
                        amount === variant.color_amount ||
                        amount > variant.color_amount
                      )
                        setOpenTooltip(true);
                    }}
                  >
                    <PlusIcon width={40} />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box
                borderTop="1px solid #00000010"
                pt={2}
                mt={2}
                width="100%"
                display="flex"
                columnGap="16px"
                borderBottom="1px solid #00000010"
                pb={2}
                mb={2}
              >
                <Button
                  variant="contained"
                  onClick={addtocart}
                  fullWidth
                  color="primary"
                  size="medium"
                  disabled={variant?.color_amount < 1}
                >
                  {added_product_to_cart.severity === 200 ||
                  (added_product_to_cart.severity === 201 && added)
                    ? "Добавлено"
                    : t("addToCart")}
                </Button>
                <Button
                  variant="contained"
                  disabled={variant?.color_amount < 1}
                  fullWidth
                  onClick={buyNow}
                  color="primary"
                  size="medium"
                >
                  {t("buyNow")}
                </Button>
              </Box>
            </>
          )}
        </Box>

        {/* <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="body1" width="80%" fontWeight="700">
          {details?.title}
        </Typography>
        <Typography variant="body1" fontWeight="700" color="var(--primary)">
          {variant?.product_price} {variant?.currency_unit?.currency}
        </Typography>
      </Box> */}
        <Typography
          variant="body2"
          color="#00000050"
          sx={{ display: "flex", alignItems: "center" }}
          lineHeight="17px"
          mt={1}
        >
          <div>
            {t("questions")}{" "}
            <a href="https://wa.me/996505919999" className="primary">
              +996 505 91 99 99
            </a>
          </div>
          <a
            aria-label="read more"
            href="https://wa.me/996505919999"
            target="_blank"
            style={{ marginLeft: 8 }}
            rel="noreferrer"
          >
            <img src={whatsapp} width="40" height="40" alt="" />
          </a>
        </Typography>
      </Box>
    </>
  );
};

export default Info;
