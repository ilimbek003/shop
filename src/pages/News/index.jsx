import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { t } from "i18next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getArticles } from "../../redux/reducers/main";
import NewsCard from "./NewsCard";

const News = () => {
  const dispatch = useDispatch();

  const { articles } = useSelector(({ main }) => main);

  useEffect(() => {
    dispatch(getArticles());
    // eslint-disable-next-line
  }, []);

  return (
    <section>
      <Container maxWidth="xl">
        <Typography
          fontSize={{ xs: 24, md: 32 }}
          mt={{ xs: 4, md: 8 }}
          textAlign="center"
          mb={{ xs: 4, md: 8 }}
          fontWeight="700"
        >
          {t("news")}
        </Typography>
        <Grid container spacing={{ xs: 4, md: 5 }}>
          {articles?.results?.map((item, idx) => (
            <Grid item lg={6} key={idx}>
              <Link aria-label="read more" to={`/news/${item.id}`}>
                <NewsCard item={item} t={t} key={idx} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default News;
