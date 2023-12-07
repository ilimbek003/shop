import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  IconButton,
  Pagination,
  Slide,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box, Container, Stack, useTheme } from "@mui/system";
import { CloseIcon } from "../../../assets/images/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails,
  getOrderHistory,
  setOrderDetails,
} from "../../../redux/reducers/profile";
import noneRes from "../../../assets/images/none-res.png";
import PopoverSort from "../../../components/PopoverSort";
import DropdownSort from "../../../components/DropdownSort";
import useSort from "../../../hooks/useSort";

export const noneResults = (
  <Box display="flex" flexDirection="column" alignItems="center">
    <img src={noneRes} width="auto" height="auto" alt="" />
    <Typography variant="body1" fontWeight="700" mt={2} mb={2}>
      Ничего не найдено
    </Typography>
  </Box>
);

const Orders = ({ t, setCartSum, cartSum }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down(768));

  const containerRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [sortingBy, setSortingBy] = useState(1);
  const [openPopover, setOpenPopover] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(1);

  const { order_history, order_details } = useSelector(
    ({ profile }) => profile
  );

  useEffect(() => {
    dispatch(getOrderHistory());
    setOrders(order_history.results);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setOrders(order_history.results);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order_history]);

  const { sortBy } = useSort({
    array: orders,
    copyArray: order_history?.results,
    setArray: setOrders,
    sortingBy: sortingBy,
    profile: true,
  });

  useEffect(() => {
    sortBy();
  }, [sortingBy]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(getOrderHistory(`?page=${page}`));
  }, [page]);

  const count = order_history?.count && Math.ceil(order_history?.count / 15);

  return (
    <>
      <PopoverSort
        anchorEl={anchorEl}
        open={openPopover}
        setOpen={setOpenPopover}
        setValue={setSortingBy}
        value={sortingBy}
      />
      <Details open={open} setOpen={setOpen} order_details={order_details} />
      <section>
        <Container maxWidth="xl">
          {md && (
            <Typography variant="subtitle2" fontWeight="700" mt={3}>
              История заказов
            </Typography>
          )}
          {!order_history.count ? (
            <Slide
              mt={2}
              direction="right"
              in={!order_history.count}
              container={containerRef.current}
            >
              {noneResults}
            </Slide>
          ) : (
            <>
              <DropdownSort
                value={sortingBy}
                setAnchorEl={setAnchorEl}
                setOpen={setOpenPopover}
              />
              <Grid container spacing={{ xs: 2, md: 3 }}>
                {orders?.map((item, idx) => (
                  <Grid
                    item
                    key={idx}
                    xs={12}
                    lg={6}
                    onClick={() => {
                      if (!order_details.loading) {
                        dispatch(
                          setOrderDetails({ ...order_details, loading: true })
                        );
                        dispatch(getOrderDetails(item?.id));
                        setOpen(true);
                      }
                    }}
                  >
                    <ProductCard
                      setCartSum={setCartSum}
                      cartSum={cartSum}
                      item={item}
                      t={t}
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
          <Stack spacing={2} mt={4}>
            <Pagination
              hideNextButton
              hidePrevButton
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
              count={count}
              shape="rounded"
              page={page}
              onChange={handleChange}
            />
          </Stack>
        </Container>
      </section>
    </>
  );
};

export default Orders;

const ProductCard = ({ item, t }) => (
  <Box
    sx={{
      background: "#FFFFFF",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
      borderRadius: "8px",
      overflow: "hidden",
      display: "flex",

      "& img": {
        minHeight: 174,
        objectFit: "cover",
      },

      "& table": {
        width: "100%",
        p: 2,

        "& td": { "&:last-child": { textAlign: "end" } },
      },
    }}
  >
    <img
      src={item?.image}
      style={{
        objectFit: "scale-down",
      }}
      width="94px"
      height="100%"
      alt=""
    />
    <table>
      <tbody>
        <tr>
          <td>
            <Typography variant="body2" fontWeight="400">
              {t("orderDate")}:
            </Typography>
          </td>
          <td>
            <Typography variant="body2" fontWeight="700">
              {new Intl.DateTimeFormat("en-GB", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date(item?.ordering_date))}
            </Typography>
          </td>
        </tr>
        <tr>
          <td>
            <Typography variant="body2" fontWeight="400">
              {t("shippingDate")}:
            </Typography>
          </td>
          <td>
            <Typography variant="body2" fontWeight="700">
              {new Intl.DateTimeFormat("en-GB", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date(item?.delivery_date))}
            </Typography>
          </td>
        </tr>
        <tr>
          <td>
            <Typography variant="body2" fontWeight="400">
              {t("paymentMethod")}:
            </Typography>
          </td>
          <td>
            <Typography variant="body2" fontWeight="700">
              {item?.payment_method}
            </Typography>
          </td>
        </tr>
        <tr>
          <td>
            <Typography variant="body2" fontWeight="400">
              {t("shippingMethod")}:
            </Typography>
          </td>
          <td>
            <Typography variant="body2" fontWeight="700">
              {item?.delivery_method}
            </Typography>
          </td>
        </tr>
        <tr>
          <td>
            <Typography variant="body2" fontWeight="400">
              {t("productss")}:
            </Typography>
          </td>
          <td>
            <Typography variant="body2" fontWeight="700">
              {item?.total_amount}
            </Typography>
          </td>
        </tr>
        <tr>
          <td>
            <Typography variant="body2" fontWeight="400">
              {t("onSum")}:
            </Typography>
          </td>
          <td>
            <Typography variant="body2" fontWeight="700">
              {item?.total_price} c
            </Typography>
          </td>
        </tr>
      </tbody>
    </table>
  </Box>
);

const Details = ({ open, setOpen, order_details }) => {
  const item = order_details?.response;
  return (
    <SwipeableDrawer
      anchor="right"
      sx={{
        "& .MuiPaper-root": {
          width: { xs: "100%", lg: "30%" },
          p: 2,
        },

        "& table": {
          width: "100%",
          mb: 3,

          "& td": { "&:last-child": { textAlign: "end" } },
        },
      }}
      open={open && !order_details.loading}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      <Box display="flex" mb={3} justifyContent="space-between">
        <Typography variant="h6" fontWeight="700">
          Заказ
        </Typography>
        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        component="table"
        sx={{
          "& p": {
            p: "8px 0",
          },
        }}
      >
        <tr>
          <td>
            <Typography variant="body2" fontWeight="400">
              Дата заказа:
            </Typography>
          </td>
          <td>
            <Typography variant="body2" fontWeight="700">
              {item?.ordering_date &&
                new Intl.DateTimeFormat("en-GB", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(new Date(item?.ordering_date))}
            </Typography>
          </td>
        </tr>
        <tr>
          <td>
            <Typography variant="body2" fontWeight="400">
              Дата доставки:
            </Typography>
          </td>
          <td>
            <Typography variant="body2" fontWeight="700">
              {item?.delivery_date &&
                new Intl.DateTimeFormat("en-GB", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(new Date(item?.delivery_date))}
            </Typography>
          </td>
        </tr>
        <tr>
          <td>
            <Typography variant="body2" fontWeight="400">
              Способ оплаты:
            </Typography>
          </td>
          <td>
            <Typography variant="body2" fontWeight="700">
              {item?.payment_method}
            </Typography>
          </td>
        </tr>
        <tr>
          <td>
            <Typography variant="body2" fontWeight="400">
              Способ доставки:
            </Typography>
          </td>
          <td>
            <Typography variant="body2" fontWeight="700">
              {item?.delivery_method}
            </Typography>
          </td>
        </tr>
        <tr>
          <td>
            <Typography variant="body2" fontWeight="400">
              Товаров:
            </Typography>
          </td>
          <td>
            <Typography variant="body2" fontWeight="700">
              {item?.total_amount}
            </Typography>
          </td>
        </tr>
        <tr>
          <td>
            <Typography variant="body2" fontWeight="400">
              На сумму:
            </Typography>
          </td>
          <td>
            <Typography variant="body2" fontWeight="700">
              {item?.total_price} c
            </Typography>
          </td>
        </tr>
      </Box>
      {item?.ordering_item?.map((item, idx) => (
        <Box
          key={idx}
          sx={{
            background: "#FFFFFF",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
            borderRadius: "8px",
            overflow: "hidden",
            display: "flex",
            mb: 2,

            "& img": {
              minHeight: 124,
              objectFit: "cover",
            },

            "& table": {
              mb: 1,
            },
          }}
        >
          <img
            src={item?.product_images}
            width="111px"
            height="124px"
            style={{ objectFit: "cover" }}
            alt=""
          />
          <Box
            sx={{
              width: "100%",
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              {item?.product_name}
            </Typography>

            <Typography
              variant="body2"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              mt={1}
              mb={1}
              fontWeight="400"
            >
              Размер: <b>{item.product_size}</b>
            </Typography>
            <table>
              <tr>
                <td>
                  <Typography variant="body2" fontWeight="400">
                    Цена:
                  </Typography>
                </td>
                <td>
                  <Typography variant="body2" fontWeight="700">
                    {item?.product_price}
                  </Typography>
                </td>
                <td>
                  <Typography variant="body2" fontWeight="400">
                    Кол.во:
                  </Typography>
                </td>
                <td>
                  <Typography variant="body2" fontWeight="700">
                    {item?.product_count}
                  </Typography>
                </td>
              </tr>
            </table>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" fontWeight="400">
                Итого цена:
              </Typography>
              <Typography variant="body2" fontWeight="700">
                {item?.product_total_sum} c
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </SwipeableDrawer>
  );
};
