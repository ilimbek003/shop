import React, { useEffect, useState } from "react";
import { Box, Container, useTheme } from "@mui/system";
import { NewItemIcon } from "../../assets/images/icons";
import BreadCrumbs from "./BreadCrumbs";
import Buttons from "./Buttons";
import Descriptions from "./Description";
import Image from "./Image";
import Info from "./Info";
import Recomendations from "./Recomendations";
import Reviews from "./Reviews";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getBreadcrumbs,
  getProductDetails,
  getProductReviews,
  getProducts,
  setLoadingProduct,
} from "../../redux/reducers/products";
import { useMediaQuery } from "@mui/material";
import BuyDialog from "./BuyDialog";
import Error from "../Error";
import Preloader from "../../components/Preloader";

const Product = ({ t, setLoading, setCartSum, cartSum, loading }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down(768));
  const { id } = useParams();

  const [variant, setVariant] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("#5C6B51");
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(1);

  const { details, reviews, review_images, isLoading, products } = useSelector(
    ({ products }) => products
  );

  const product = details?.data;
  const recomendations = products?.data?.results?.filter(
    // eslint-disable-next-line eqeqeq
    (item) => item.id == details?.id
  );

  useEffect(() => {
    dispatch(getProductDetails(id));
    dispatch(getProductReviews(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (product?.id) {
      dispatch(getProducts(`?category_id=${product?.category_id}`));
      dispatch(setLoadingProduct(false));
      dispatch(getBreadcrumbs(product?.category_id));
      // setVariant(product?.product_variation[0]);
    }

    const colors = product?.product_variation?.map((data) => data.color);
    setColor(colors && colors[0].title);

    setSizes(
      product?.product_variation?.map((item) => {
        return {
          size: item?.color_size?.title,
          color: item.color,
        };
      })
    );

    const removeDuplicates = (array, key) => {
      return array?.reduce((arr, item) => {
        const removed = arr.filter((i) => i[key] !== item[key]);
        return [...removed, item];
      }, []);
    };

    setColors(removeDuplicates(colors, "title"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);

  return (
    <>
      <BuyDialog
        t={t}
        setOpen={setOpen}
        amount={amount}
        variant={variant}
        setLoading={setLoading}
        open={open}
      />
      {details?.status === 404 ? (
        <Error />
      ) : isLoading ? (
        <Preloader />
      ) : (
        <Box component="section">
          <Container maxWidth="xl">
            <BreadCrumbs details={product} />
            {!md && product?.is_new && (
              <Box mt={4}>
                <NewItemIcon />
              </Box>
            )}
            <Buttons reviews={reviews} details={product} t={t} />
            <Box
              display="flex"
              mt={3}
              flexDirection={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems="start"
              columnGap="40px"
            >
              <Image details={product} variant={variant} />
              <Info
                sizes={sizes}
                setLoading={setLoading}
                setSize={setSize}
                colors={colors}
                setOpen={setOpen}
                setColor={setColor}
                color={color}
                size={size}
                setCartSum={setCartSum}
                cartSum={cartSum}
                t={t}
                details={product}
                setVariant={setVariant}
                variant={variant}
                amount={amount}
                setAmount={setAmount}
              />
            </Box>
            {!md && (
              <>
                {review_images.count && (
                  <Reviews
                    t={t}
                    details={product}
                    review_images={review_images}
                  />
                )}
                {/* <Categories t={t} /> */}
              </>
            )}
            {!recomendations?.length ? null : (
              <Recomendations t={t} products={recomendations} />
            )}
            <Descriptions
              t={t}
              details={product}
              setLoading={setLoading}
              color={color}
              size={size}
              loading={loading}
              variant={variant}
            />
          </Container>
        </Box>
      )}
    </>
  );
};

export default Product;
