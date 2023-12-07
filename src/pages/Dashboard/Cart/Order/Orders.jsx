import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { TransitionGroup } from "react-transition-group";
import Dialogs from "../../../../components/Dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductFromCart,
  getCartList,
  setCartList,
} from "../../../../redux/reducers/products";

const Orders = ({ title, t, setCartSum, cartSum, setSum, sum }) => {
  const dispatch = useDispatch();

  const [product, setProduct] = useState("");
  const [open, setOpen] = useState(false);

  const { cart_list } = useSelector(({ products }) => products);

  const handleRemoveProduct = (state) => {
    dispatch(
      setCartList({
        ...cart_list,
        count: cart_list?.count - 1,
        results: [
          ...cart_list?.results?.filter((item) => item.id !== state.id),
          {
            total_products_sum:
              cart_list?.results[cart_list?.results?.length - 1]
                ?.total_products_sum - state.summ,
          },
        ],
      })
    );
    dispatch(deleteProductFromCart(state.id));
    setCartSum(cartSum - state.summ);

    setTimeout(() => {
      setSum(sum - state.summ);
    }, 1000);
  };

  useEffect(() => {
    dispatch(getCartList());
  }, []);

  return (
    <>
      <Dialogs
        open={open}
        item={product}
        title={t("deleteProduct")}
        subtitle={t("deleteProductTxt")}
        setOpen={setOpen}
        handleRemoveProduct={handleRemoveProduct}
      />
      <Box pt={{ xs: 1, md: 3 }} borderTop="1px solid #00000010">
        {title && (
          <Typography
            variant="subtitle2"
            mb={3}
            fontWeight="700"
            textAlign="center"
          >
            {t("choosenProducts")}
          </Typography>
        )}
        <TransitionGroup>
          {cart_list?.results
            ?.filter((item) => !item.total_products_sum)
            ?.map((item) => (
              <Collapse key={item.id}>
                <Product
                  t={t}
                  handleRemoveProduct={handleRemoveProduct}
                  setOpen={setOpen}
                  setProduct={setProduct}
                  item={item}
                />
              </Collapse>
            ))}
        </TransitionGroup>
      </Box>
    </>
  );
};

export default Orders;

const Product = ({ item, t, setOpen, setProduct }) => (
  <Box
    sx={{
      background: "#FFFFFF",
      overflow: "hidden",
      width: "100%",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
      borderRadius: "8px",
      mb: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <img
      src={item?.product_variations?.images[0]?.image}
      style={{ height: "100%", width: "111px", objectFit: "scale-down" }}
      alt=""
    />
    <Box p={2} width={{ xs: "75%", md: "87%" }}>
      <Box
        display="flex"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography
          variant="body2"
          sx={{
            textDecoration: "underline",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            maxWidth: "90%",
            mb: 1,
          }}
        >
          {item?.product?.title}
        </Typography>
        {/* <IconButton
          onClick={() => {
            setProduct({ id: item.id, summ: item.product_sum });
            setOpen(true);
          }}
        >
          <FontAwesomeIcon icon="trash" color="var(--primary)" fontSize={16} />
        </IconButton> */}
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
        {item?.product?.description}
        {/* Описание товара... */}
      </Typography>

      <Box display="flex" mt={1} mb={1} justifyContent="space-between">
        <Typography variant="body2">
          {t("price")}: {item?.product_variations?.promotion_price}{" "}
          {item?.product_variations?.currency_unit?.currency}
        </Typography>
        <Typography variant="body2">
          {t("amount")}: {item?.product_count}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Typography variant="body2" fontWeight="700">
          {t("total")} {t("price")}:
        </Typography>
        <Typography variant="body2" fontWeight="700">
          {item.product_sum} {item?.product_variations?.currency_unit?.currency}
        </Typography>
      </Box>
    </Box>
  </Box>
);
