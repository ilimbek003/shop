import React from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const BreadCrumbs = ({ details }) => {
  const { breadcrumbs } = useSelector(({ products }) => products);

  return (
    <Breadcrumbs
      separator="›"
      sx={{
        "& *": {
          color: "var(--primary)",
        },
      }}
    >
      <Link aria-label="go to the main page" to="/">
        <Typography variant="body2">Главная</Typography>
      </Link>
      <Link aria-label="read more" to="/catalog">
        <Typography variant="body2">Каталог</Typography>
      </Link>
      {breadcrumbs?.results?.map((item) => (
        <Link
          aria-label="read more"
          to={`/catalog/?category_id=${item.id}&min_price=&max_price=&currency_unit_id=&category_title=${item.title}&currency=`}
        >
          <Typography variant="body2">{item.title}</Typography>
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
