/* eslint-disable eqeqeq */
import React, { useEffect, useRef, useState } from "react";
import { Button, Collapse, Slide, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { TransitionGroup } from "react-transition-group";
import noneRes from "../../../assets/images/none-res.png";
import Order from "./Order";
import {
  deleteProductFromCart,
  getCartList,
  setCartList,
  setDeletedProductFromCart,
} from "../../../redux/reducers/products";
import { useDispatch, useSelector } from "react-redux";
import SnackBar from "../../../components/SnackBar";
// import { setCartSum } from "../../../redux/reducers/main";
import { Link } from "react-router-dom";
import Product from "./Product";
import Dialogs from "../../../components/Dialog";
import { t } from "i18next";
import { getOrderDetails } from "../../../redux/reducers/profile";

export const noneResults = (
  <Box display="flex" flexDirection="column" alignItems="center">
    <img src={noneRes} alt="" />
    <Typography variant="body1" fontWeight="700" mt={2} mb={2}>
      {t("nothingInCart")}
    </Typography>
    <Typography
      variant="body2"
      fontWeight="300"
      mb={2}
      maxWidth="254px"
      textAlign="center"
    >
      {t("watchInCalalog")}
    </Typography>
    <Link to="/catalog" aria-label="read more">
      <Button size="medium" color="primary" variant="outlined">
        {t("fintInCatalog")}{" "}
      </Button>
    </Link>
  </Box>
);

const Cart = ({ t, setLoading, setCartSum, cartSum }) => {
  const dispatch = useDispatch();

  const containerRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [sum, setSum] = useState("");
  const [saleSum, setSaleSum] = useState("");
  const [products, setProducts] = useState("");
  const [product, setProduct] = useState("");

  const { cart_list, updated_cart, deleted_product_from_cart } = useSelector(
    ({ products }) => products
  );
  const { order_details } = useSelector(({ profile }) => profile);

  useEffect(() => {
    dispatch(getCartList());
  }, []);

  useEffect(() => {
    setProducts(Array.from(document.getElementsByClassName("product")));
  }, [updated_cart, cart_list, deleted_product_from_cart.id]);

  useEffect(() => {
    if (Array.isArray(products)) {
      const total = products.reduce(
        (total, amount) => total + parseInt(amount.id),
        0
      );
      setSum(total);
      const totalSale = products.reduce(
        (total, amount) => total + parseInt(amount?.lang),
        0
      );
      setSaleSum(totalSale);
    }
  }, [products]);

  const handleRemoveProduct = (id, summ) => {
    dispatch(
      setCartList({
        ...cart_list,
        count: cart_list?.count - 1,
        results: [
          ...cart_list?.results?.filter((item) => item.id !== id),
          {
            total_products_sum:
              cart_list?.results[cart_list?.results?.length - 1]
                ?.total_products_sum - summ,
          },
        ],
      })
    );
    dispatch(deleteProductFromCart(id));
    setCartSum(cartSum - summ);

    setTimeout(() => {
      setSum(sum - summ);
    }, 1000);
  };

  useEffect(() => {
    if (localStorage.getItem("orderId"))
      dispatch(getOrderDetails(localStorage.getItem("orderId")));
  }, []);

  useEffect(() => {
    if (order_details.ordering_payment_status === "Успешно") {
      setCartSum(0);
      localStorage.removeItem("orderId");
    }
  }, [order_details]);

  return (
    <>
      <Dialogs
        open={openDelete}
        item={product}
        product={product}
        title={t("deleteProduct")}
        subtitle={t("deleteProductTxt")}
        setOpen={setOpenDelete}
        handleRemoveProduct={handleRemoveProduct}
      />
      <Order
        t={t}
        setSum={setSum}
        sum={sum}
        setCartSum={setCartSum}
        setOpen={setOpen}
        cartSum={cartSum}
        open={open}
        count={cart_list?.count}
        orderSum={sum}
        sale={saleSum}
        setLoading={setLoading}
      />
      <SnackBar
        txt="Успешно удалено"
        state={deleted_product_from_cart}
        severity="204"
        setState={setDeletedProductFromCart}
      />
      <section>
        <Container maxWidth="xl" ref={containerRef}>
          <Typography
            variant="h3"
            fontWeight="700"
            textAlign={{ xs: "start", md: "center" }}
            mt={{ xs: 3, md: 8 }}
            mb={{ xs: 3, md: 8 }}
          >
            {t("cart")}
          </Typography>
          {cart_list.count == 0 ? (
            <Slide
              direction="right"
              in={cart_list?.count == 0}
              container={containerRef.current}
            >
              {noneResults}
            </Slide>
          ) : (
            <>
              <TransitionGroup>
                {cart_list?.results
                  ?.filter((item) => !item.total_products_sum)
                  .map((item) => (
                    <Collapse key={item.id}>
                      <Product
                        item={item}
                        setCartSum={setCartSum}
                        cartSum={cartSum}
                        setOpen={setOpenDelete}
                        setProduct={setProduct}
                      />
                    </Collapse>
                  ))}
              </TransitionGroup>
              <Box
                width="100%"
                sx={{
                  "& table": {
                    width: "100%",

                    "& p": {
                      p: "4px 0",
                    },

                    "& td": { "&:last-child": { textAlign: "end" } },
                  },
                }}
              >
                <Typography
                  variant="body2"
                  mt={{ xs: 3, md: 0 }}
                  mb={{ xs: 1, md: 2 }}
                  fontWeight="700"
                >
                  {t("choosenProducts")}
                </Typography>
                <table>
                  <tr>
                    <td>
                      <Typography variant="body2" fontWeight="400">
                        {t("products")}:
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="body2">
                        {cart_list?.count}
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Typography variant="body2" fontWeight="400">
                        {t("sale")}:
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="body2">{saleSum}</Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Typography variant="body2" fontWeight="700">
                        {t("total")} {t("price")}:
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="body2" fontWeight="700">
                        {sum}
                      </Typography>
                    </td>
                  </tr>
                </table>
                <Button
                  size="medium"
                  sx={{
                    display: "table",
                    m: { xs: "16px 0 0", md: "24px auto 0" },
                    width: { xs: "100%", md: "fit-content" },
                  }}
                  onClick={() => setOpen(true)}
                  color="primary"
                  variant="contained"
                >
                  {t("makeOrder")}
                </Button>
              </Box>
            </>
          )}
        </Container>
      </section>
    </>
  );
};

export default Cart;
