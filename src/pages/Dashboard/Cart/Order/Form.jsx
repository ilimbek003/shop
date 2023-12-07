import React, { useRef } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import {
  ArrowDropDownIcon,
  BicycleIcon,
  // CardIcon,
  CourierIcon,
  PeopleIcon,
} from "../../../../assets/images/icons";
import RadioBtn from "../../../../components/RadioBtn";
// import o from "../../../../assets/images/o.svg";
// import pay24 from "../../../../assets/images/pay24.svg";
// import c from "../../../../assets/images/c.svg";
// import visa from "../../../../assets/images/visa.svg";
// import elkart from "../../../../assets/images/elkart.svg";
// import megapay from "../../../../assets/images/megapay.svg";
// import mbank from "../../../../assets/images/mbank.svg";
// import optima from "../../../../assets/images/optima.svg";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../../redux/reducers/order";
import { useState } from "react";
import { useLayoutEffect } from "react";
import { getCartList } from "../../../../redux/reducers/products";
import { useNavigate } from "react-router";

const Form = ({ setSuccess, t, setLoading, buyNow, setCartSum }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shippingMethod, setShippingMethod] = useState(false);

  const { cart_list } = useSelector(({ products }) => products);
  const { created_order } = useSelector(({ order }) => order);

  const formik = useFormik({
    initialValues: {
      paymentMethod: "",
      delivery_method: "",
      country: "",
      city: "",
      address: "",
      ordering_item: [],
    },
    onSubmit: (values) => {
      if (buyNow) {
        const data = {
          country: values.country,
          city: values.city,
          address: values.address,
          delivery_method: values.delivery_method,
          ordering_item: [
            {
              product_variations: buyNow.variant,
              product_count: buyNow.count,
            },
          ],
        };
        dispatch(createOrder(data));
        setLoading(true);
      } else {
        const data = {
          country: values.country,
          city: values.city,
          address: values.address,
          delivery_method: values.delivery_method,
          ordering_item: cart_list.results
            ?.filter((item) => !item.total_products_sum)
            ?.map((item) => ({
              product_variations: item?.product_variations?.id,
              product_count: item?.product_count,
            })),
        };

        dispatch(createOrder(data));
        setLoading(true);
      }
    },
  });

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    // hide linear progress
    setLoading(false);

    if (created_order.severity === 201) {
      setSuccess(true);
      localStorage.setItem("orderId", created_order.message.order_id);
      fetch("https://api.opop.asia/payments/result_url/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pg_order_id: 1, b: "Textual content" }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [created_order]);

  const shippingMethods = [
    {
      id: "COURIER",
      img: <CourierIcon />,
      txt: "Курьер",
      subtitle:
        "Оплата услуги курьера совершается в момент доставки товара. <br/> Стоимость услуг указаны <b>здесь</b>",
      link: true,
    },
    {
      id: "PICKUP",
      img: <PeopleIcon />,
      txt: t("pickUp"),
      subtitle:
        "Аламединский р-н, Алма-Атинская 1/1,  график работы пн-пт, с 09:00-18:00",
      link: false,
    },
  ];

  return (
    <Box
      component="form"
      sx={{
        "& .MuiFormControl-root": {
          boxShadow: "none!important",
          borderRadius: 8,

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#CECECE",
          },
        },
      }}
      onSubmit={formik.handleSubmit}
    >
      <Typography fontSize="12px" mb={1} textTransform="uppercase" color="#000">
        {t("country")}
      </Typography>
      <TextField
        required
        fullWidth
        name="country"
        value={formik.values.country}
        onChange={formik.handleChange}
      />
      <Typography
        fontSize="12px"
        mb={1}
        mt={2}
        textTransform="uppercase"
        color="#000"
      >
        {t("city")}
      </Typography>
      <TextField
        required
        fullWidth
        name="city"
        value={formik.values.city}
        onChange={formik.handleChange}
      />
      <Typography
        fontSize="12px"
        mb={1}
        mt={2}
        textTransform="uppercase"
        color="#000"
      >
        {t("address")}
      </Typography>
      <TextField
        required
        fullWidth
        name="address"
        value={formik.values.address}
        onChange={formik.handleChange}
      />
      {/* <Accordion>
        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
          <div className="d-flex">
            <CardIcon />
            <Typography ml={2} variant="body2" fontWeight="700">
              Способ оплаты:
            </Typography>
          </div>
          <Typography mr={2} variant="body2" fontWeight="400">
            Visa & Master Card
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {paymentMethods.map((item, idx) => (
              <ListItem
                component="label"
                button
                key={idx}
                sx={{
                  background: "#F1F1F1",
                  borderRadius: "8px",
                  p: 2,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className="d-flex">
                  <img src={item.img} alt="" />
                  <Typography variant="body2" ml={2}>
                    {item.txt}
                  </Typography>
                </div>
                <RadioBtn
                  name="paymentMethod"
                  id={item.id}
                  handleChange={formik.handleChange}
                  value={formik.values.paymentMethod}
                />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion> */}
      <Accordion
        expanded={shippingMethod}
        onChange={() => setShippingMethod(!shippingMethod)}
      >
        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
          <div className="d-flex">
            <BicycleIcon />
            <Typography ml={2} variant="body2" fontWeight="700">
              {t("shipping_method")}:{" "}
            </Typography>
          </div>
          <Typography mr={2} variant="body2" fontWeight="400">
            {formik.values.shippingMethod}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {shippingMethods.map((item, idx) => (
              <ListItem
                component="label"
                button
                key={idx}
                sx={{
                  background: "#F1F1F1",
                  borderRadius: "8px",
                  p: 2,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className="d-flex">
                  {item.img}
                  <div>
                    <Typography variant="body2" ml={2}>
                      {item.txt}
                    </Typography>

                    <Typography
                      dangerouslySetInnerHTML={{
                        __html: item.subtitle,
                      }}
                      mt={0.3}
                      lineHeight="1.2"
                      onClick={() => (item.link ? navigate("/shipping") : "")}
                      sx={{
                        "& b": {
                          color: "var(--primary)",
                        },
                      }}
                      variant="body2"
                      ml={2}
                      color="#777"
                    />
                  </div>
                </div>
                <RadioBtn
                  name="delivery_method"
                  id={item.id}
                  handleChange={formik.handleChange}
                  value={formik.values.delivery_method}
                />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
      <Button
        size="medium"
        color="primary"
        variant="contained"
        type="submit"
        onClick={() => {
          if (formik.values.address && !formik.values.shippingMethod) {
            setShippingMethod(true);
          }
        }}
        sx={{
          display: "block",
          m: "24px auto",
        }}
      >
        {t("makeOrder")}
      </Button>
    </Box>
  );
};

export default Form;

// const paymentMethods = [
//   {
//     img: o,
//     id: 1,
//     txt: "Oденьги",
//   },
//   {
//     img: megapay,
//     id: 2,
//     txt: "MegaPay",
//   },
//   {
//     img: pay24,
//     id: 3,
//     txt: "Pay24",
//   },
//   {
//     img: visa,
//     id: 4,
//     txt: "Visa & Master Card",
//   },
//   {
//     img: optima,
//     id: 5,
//     txt: "Optima24",
//   },
//   {
//     img: mbank,
//     id: 6,
//     txt: "Mbank",
//   },
//   {
//     img: elkart,
//     id: 7,
//     txt: "Элкарт",
//   },
//   {
//     img: c,
//     id: 8,
//     txt: "Balance",
//   },
// ];
