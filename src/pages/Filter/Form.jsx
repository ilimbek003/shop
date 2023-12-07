import {
  Button,
  InputAdornment,
  List,
  ListItem,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { CheckMarkIconFill } from "../../assets/images/icons";
import Dropdown from "../../components/Dropdown";
import { useQuery } from "../../hooks/useQuery";
import { getProducts, getProductsCount } from "../../redux/reducers/products";
import PopoverSort from "../../components/PopoverSort";
import Search from "../../components/Search";

const Form = ({
  setLoading,
  sortingBy,
  setSortingBy,
  search,
  setSearch,
  t,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let query = useQuery();

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("768"));

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [city, setCity] = useState(null);
  const [category, setCategory] = useState(null);
  const [currency, setCurrency] = useState(null);

  const { categories, products_count } = useSelector(
    ({ products }) => products
  );
  const { currency_list, cities } = useSelector(({ main }) => main);
  const { catalog } = useSelector(({ products }) => products);
  const formik = useFormik({
    initialValues: location.search
      ? {
          search: query.get("search") ? query.get("search") : "",
          category: {
            parent: query.get("category_id") ? query.get("category_id") : "",
            child: query.get("name") ? query.get("name") : "",
            title: query.get("category_title")
              ? query.get("category_title")
              : "",
          },
          min_price: query.get("min_price") ? query.get("min_price") : "",
          max_price: query.get("max_price") ? query.get("max_price") : "",
          currency_unit_id: query.get("currency_unit_id")
            ? query.get("currency_unit_id")
            : "",
          currency: query.get("currency") ? query.get("currency") : "",
          city_id: query.get("city_id") ? query.get("city_id") : "",
        }
      : {
          search: "",
          category: "",
          min_price: "",
          max_price: "",
          currency_unit_id: "",
          currency: "",
          city_id: "",
        },
    onSubmit: (values) => {
      setLoading(true);
      navigate(
        `?search=${search}&category_id=${
          !values.category.child && !values.category.parent
            ? ""
            : !values.category.child
            ? values.category.parent
            : values.category.child
        }&min_price=${values.min_price}&max_price=${
          values.max_price
        }&currency_unit_id=${values.currency_unit_id}&category_title=${
          values.category.title ? values.category.title : ""
        }&currency=${values.currency}&${
          values.city_id && `city_id=${values.city_id}`
        }`
      );
      dispatch(
        getProducts(
          `?search=${search}&category_id=${
            !values.category.child && !values.category.parent
              ? ""
              : !values.category.child
              ? values.category.parent
              : values.category.child
          }&min_price=${values.min_price}&max_price=${
            values.max_price
          }&currency_unit_id=${values.currency_unit_id}&${
            values.city_id && `city_id=${values.city_id}`
          }`
        )
      );
    },
  });

  const handleClick = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    dispatch(
      getProductsCount(
        `?search=${search}&category_id=${
          !formik.values.category.child && !formik.values.category.parent
            ? ""
            : !formik.values.category.child
            ? formik.values.category.parent
            : formik.values.category.child
        }&min_price=${formik.values.min_price}&max_price=${
          formik.values.max_price
        }&currency_unit_id=${formik.values.currency_unit_id}&${
          formik.values.city_id && `city_id=${formik.values.city_id}`
        }`
      )
    );
  }, [formik.values]);

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      {md && (
        <Box mb={2} display="flex" alignItems="start">
          <Search
            setSearch={setSearch}
            search={search}
            t={t}
            mobile
            setLoading={setLoading}
          />
        </Box>
      )}
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        columnGap="16px"
      >
        <Dropdown
          title={t("selectCategory")}
          value={formik.values.category?.title}
          anchorEl={category}
          setAnchorEl={setCategory}
        >
          <List
            sx={{
              width: "100%",
              backgroundColor: "#FFF",
              p: "16px 16px 0 16px",
              borderRadius: "0 0 8px 8px",
              boxShadow:
                "0px 100px 80px rgba(0, 0, 0, 0.07), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802)",
            }}
          >
            {Array.isArray(categories) &&
              categories.map((item, idx) => (
                <div key={idx}>
                  <ListItem
                    component="label"
                    button
                    onClick={() => {
                      if (item.id === formik.values.category) {
                        formik.setFieldValue("category", "");
                      } else
                        formik.setFieldValue("category", {
                          ...formik.values.category,
                          parent: item.id,
                          child: "",
                          title: item.title,
                        });
                    }}
                    sx={{
                      background: "#F1F1F1",
                      borderRadius: "8px",
                      p: 2,
                      mb: 2,
                      height: "48px",
                    }}
                  >
                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        <svg
                          width="11"
                          height="7"
                          viewBox="0 0 11 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.5 6.75C5.25391 6.75 5.03516 6.66797 4.87109 6.50391L0.496094 2.12891C0.140625 1.80078 0.140625 1.22656 0.496094 0.898438C0.824219 0.542969 1.39844 0.542969 1.72656 0.898438L5.5 4.64453L9.24609 0.898438C9.57422 0.542969 10.1484 0.542969 10.4766 0.898438C10.832 1.22656 10.832 1.80078 10.4766 2.12891L6.10156 6.50391C5.9375 6.66797 5.71875 6.75 5.5 6.75Z"
                            fill="#1E1E1E"
                          />
                        </svg>

                        <Typography variant="body2" ml={1}>
                          {item.title}
                        </Typography>
                      </div>
                      {item.id === formik.values.category?.parent && (
                        <svg
                          width="16"
                          height="17"
                          viewBox="0 0 16 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 0.75C3.71875 0.75 0.25 4.25 0.25 8.5C0.25 12.7812 3.71875 16.25 8 16.25C12.25 16.25 15.75 12.7812 15.75 8.5C15.75 4.25 12.25 0.75 8 0.75ZM8 15.25C4.28125 15.25 1.25 12.25 1.25 8.5C1.25 4.8125 4.25 1.75 8 1.75C11.6875 1.75 14.75 4.78125 14.75 8.5C14.75 12.2188 11.7188 15.25 8 15.25ZM12.4062 6.6875C12.5625 6.53125 12.5625 6.28125 12.4062 6.15625L12.1562 5.875C12 5.71875 11.75 5.71875 11.625 5.875L6.5 10.9375L4.34375 8.78125C4.21875 8.625 3.96875 8.625 3.8125 8.78125L3.5625 9.03125C3.40625 9.1875 3.40625 9.40625 3.5625 9.5625L6.25 12.2812C6.375 12.4062 6.625 12.4062 6.78125 12.2812L12.4062 6.6875Z"
                            fill="#8F27C6"
                          />
                        </svg>
                      )}
                    </div>
                  </ListItem>
                  {item.id === formik.values.category?.parent && (
                    <List>
                      {Array.isArray(categories) &&
                        categories
                          ?.find(
                            (item) => item.id === formik.values.category?.parent
                          )
                          ?.children.map((item, idx) => (
                            <>
                              <ListItem
                                key={idx}
                                onClick={() => {
                                  formik.setFieldValue("category", {
                                    ...formik.values.category,
                                    child: item.id,
                                    title: item.title,
                                  });
                                  setAnchorEl(null);
                                }}
                                component="label"
                                button
                                sx={{
                                  background: "#F1F1F1",
                                  borderRadius: "8px",
                                  p: 2,
                                  mb: 2,
                                  ml: 3,
                                  width: "calc(100% - 24px)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  height: "48px",
                                }}
                              >
                                <Typography variant="body2">
                                  {item.title}
                                </Typography>
                                {item.id === formik.values.category.child && (
                                  <CheckMarkIconFill />
                                )}
                              </ListItem>
                            </>
                          ))}
                    </List>
                  )}
                </div>
              ))}
          </List>
        </Dropdown>
        <Dropdown
          anchorEl={city}
          setAnchorEl={setCity}
          title={t("selectCity")}
          value={formik.values.city}
        >
          <List
            sx={{
              width: "100%",
              p: "16px 16px 0 16px",
            }}
          >
            {cities?.results?.map((item, idx) => (
              <ListItem
                key={idx}
                onClick={() => {
                  formik.setFieldValue("city_id", item.id);
                  formik.setFieldValue("city", item.name);
                  setCity(null);
                }}
                component="label"
                button
                sx={{
                  background: "#F1F1F1",
                  borderRadius: "8px",
                  p: 2,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: "48px",
                }}
              >
                <Typography variant="body2">{item.name}</Typography>
                {item.id === formik.values.city_id && <CheckMarkIconFill />}
              </ListItem>
            ))}
          </List>
        </Dropdown>
        <Dropdown
          anchorEl={currency}
          setAnchorEl={setCurrency}
          title="Валюта"
          value={formik.values.currency}
        >
          <List
            sx={{
              width: "100%",
              p: "16px 16px 0 16px",
            }}
          >
            {currency_list?.results?.map((item, idx) => (
              <ListItem
                key={idx}
                onClick={() => {
                  formik.setFieldValue("currency_unit_id", item.id);
                  formik.setFieldValue("currency", item.currency);
                  setCurrency(null);
                }}
                component="label"
                button
                sx={{
                  background: "#F1F1F1",
                  borderRadius: "8px",
                  p: 2,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: "48px",
                }}
              >
                <Typography variant="body2">{item.currency}</Typography>
                {item.id === formik.values.currency_unit_id && (
                  <CheckMarkIconFill />
                )}
              </ListItem>
            ))}
          </List>
        </Dropdown>
      </Box>
      <Box
        width="100%"
        mt={{ xs: 0, md: 2 }}
        flexDirection={{ xs: "column", md: "row" }}
        display="flex"
        sx={{
          "& .MuiFormControl-root": {
            boxShadow: "none!important",
            borderRadius: 8,

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E0E0E0",
            },
          },
        }}
        columnGap="16px"
      >
        <Box display="flex" columnGap="16px" minWidth="70%">
          <TextField
            sx={{ width: { xs: "50%", md: "100%" } }}
            value={formik.values.min_price}
            onChange={formik.handleChange}
            type="number"
            name="min_price"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {t("priceFrom")}:
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {formik.values.currency}
                </InputAdornment>
              ),
            }}
          />
          <TextField
            sx={{ width: { xs: "50%", md: "100%" } }}
            value={formik.values.max_price}
            onChange={formik.handleChange}
            type="number"
            name="max_price"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">{t("priceTo")}</InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {formik.values.currency}
                </InputAdornment>
              ),
            }}
          />
        </Box>
        {!md && (
          <Box
            width="50px"
            height="50px"
            sx={{
              cursor: "pointer",
            }}
            onClick={handleClick}
          >
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="49"
                height="49"
                rx="7.5"
                fill="white"
              />
              <path
                d="M33.3125 27.75C33.9434 27.75 34.5 28.3066 34.5 28.9375C34.5 29.6055 33.9434 30.125 33.3125 30.125H22.4023C21.9199 31.5352 20.584 32.5 19.0625 32.5C17.0586 32.5 15.5 30.9043 15.5 28.9375C15.5 26.9707 17.0586 25.375 19.0625 25.375C20.584 25.375 21.9199 26.377 22.4023 27.75H33.3125ZM17.875 28.9375C17.875 29.6055 18.3945 30.125 19.0625 30.125C19.6934 30.125 20.25 29.6055 20.25 28.9375C20.25 28.3066 19.6934 27.75 19.0625 27.75C18.3945 27.75 17.875 28.3066 17.875 28.9375ZM27.5605 20.625C28.043 19.252 29.3789 18.25 30.9375 18.25C32.9043 18.25 34.5 19.8457 34.5 21.8125C34.5 23.7793 32.9043 25.375 30.9375 25.375C29.3789 25.375 28.043 24.4102 27.5605 23H16.6875C16.0195 23 15.5 22.4805 15.5 21.8125C15.5 21.1816 16.0195 20.625 16.6875 20.625H27.5605ZM30.9375 23C31.5684 23 32.125 22.4805 32.125 21.8125C32.125 21.1816 31.5684 20.625 30.9375 20.625C30.2695 20.625 29.75 21.1816 29.75 21.8125C29.75 22.4805 30.2695 23 30.9375 23Z"
                fill="#8F27C6"
              />
              <rect
                x="0.5"
                y="0.5"
                width="49"
                height="49"
                rx="7.5"
                stroke="#8F27C6"
              />
            </svg>
          </Box>
        )}
        <PopoverSort
          anchorEl={anchorEl}
          open={open}
          value={sortingBy}
          setValue={setSortingBy}
          setOpen={setOpen}
        />
        <Box
          display="flex"
          mt={{ xs: 2, md: 0 }}
          sx={{ "& button": { width: { xs: "50%", md: "fit-content" } } }}
          columnGap="16px"
          minWidth="23.5%"
        >
          {md && (
            <Button
              size="medium"
              type="submit"
              color="primary"
              variant="outlined"
            >
              {t("cancel")}
            </Button>
          )}
          <Button
            size="medium"
            sx={{
              width: "100%!important",
            }}
            type="submit"
            color="primary"
            variant="contained"
          >
            {t("show")} : {products_count}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Form;
