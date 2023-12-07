import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { MinusIcon, PlusIcon } from "../../../assets/images/icons";
import { changeCart } from "../../../redux/reducers/products";

const Product = ({ item, setProduct, setOpen, setCartSum, cartSum }) => {
  const dispatch = useDispatch();

  const [changed, setChanged] = useState({});
  const [sale, setSale] = useState(0);
  const [openTooltip, setOpenTooltip] = useState(false);

  const variant = item?.product_variations;
  const newPrice = variant?.product_price;
  const price = !variant?.is_promotion
    ? variant?.product_price
    : variant?.promotion_price;

  useEffect(() => {
    setChanged({ count: item.product_count, product_sum: item.product_sum });
    if (variant?.is_promotion)
      setSale(
        (variant?.product_price - variant?.promotion_price) *
          item?.product_count
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const addOne = () => {
    if (changed.count < variant?.color_amount) {
      setCartSum(parseInt(cartSum) + price);
      setChanged({
        count: changed.count + 1,
        product_sum: changed.product_sum + price,
      });
      if (variant?.is_promotion)
        setSale(sale + (variant?.product_price - variant?.promotion_price));
      dispatch(changeCart(item.id, { product_count: changed.count + 1 }));
    }
    if (changed.count === variant.color_amount) setOpenTooltip(true);
  };
  const removeOne = () => {
    if (changed.count > 1 && changed.count > variant?.min_sale_amount) {
      setCartSum(cartSum - price);
      setChanged({
        count: changed.count - 1,
        product_sum: changed.product_sum - price,
      });
      if (variant?.is_promotion)
        setSale(sale - (variant?.product_price - variant?.promotion_price));
      dispatch(changeCart(item.id, { product_count: changed.count - 1 }));
    }
  };

  const handleTooltipClose = () => {
    setOpenTooltip(false);
  };

  return (
    <Box
      sx={{
        background: "#FFFFFF",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
        borderRadius: "8px",
        mb: { xs: 2, md: 8 },
        display: "flex",
        alignItems: "center",
        height: { xs: 152, md: 170 },
        overflow: "hidden",
      }}
      className="product"
      id={changed.product_sum}
      lang={sale}
    >
      <Box
        component="img"
        src={variant?.images[0]?.image}
        sx={{
          height: "100%",
          objectFit: "scale-down",
          width: { xs: 111, md: "285px" },
        }}
        alt=""
      />
      <Box p="0 16px" width={{ xs: "75%", md: "87%" }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography
            variant="body2"
            sx={{
              textDecoration: "underline",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              width: "70%",
            }}
          >
            {item?.product?.title}
          </Typography>
          <IconButton
            aria-label="delete"
            onClick={() => {
              setProduct({
                sum: changed.product_sum,
                id: item.id,
              });
              setOpen(true);
            }}
          >
            <FontAwesomeIcon
              icon="trash"
              color="var(--primary)"
              fontSize={16}
            />
          </IconButton>
        </Box>
        <Typography
          variant="body2"
          color="#00000050"
          sx={{
            textDecoration: "underline",
            textOverflow: "ellipsis",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            wordWrap: "break-word",
          }}
        >
          {item?.product?.description}{" "}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            // mb: 0.5,
            textDecoration: "underline",
            textOverflow: "ellipsis",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            wordWrap: "break-word",
          }}
        >
          Размер: <b>{variant?.color_size?.title}</b>
        </Typography>
        <Box display="flex" alignItems="center">
          <IconButton onClick={removeOne} aria-label="remove">
            <MinusIcon width={20} />
          </IconButton>
          <Typography variant="body2" ml={3} mr={3}>
            {changed.count}
          </Typography>
          <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            title="На складе больше нет товара."
            placement="top-start"
            onClose={handleTooltipClose}
            open={openTooltip}
          >
            <IconButton onClick={addOne} aria-label="add">
              <PlusIcon width={20} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box mt={1} mb={1} display="flex" alignItems="baseline">
          <Typography variant="body2" fontWeight="bold" mr={2}>
            Цена: {price} {variant?.currency_unit?.currency}
          </Typography>
          {variant?.is_promotion && (
            <Typography
              fontSize="12px"
              fontWeight="500"
              color="#1E1E1E50"
              whiteSpace="nowrap"
              sx={{
                textDecoration: "line-through",
              }}
            >
              {newPrice} {variant?.currency_unit?.currency}
            </Typography>
          )}
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" fontWeight="700">
            Итого цена:
          </Typography>
          <Typography variant="body2" fontWeight="700">
            {changed.product_sum} {variant?.currency_unit?.currency}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Product;
