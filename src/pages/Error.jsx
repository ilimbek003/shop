import { Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { NothingFound } from "../assets/images/icons";

const Error = () => {
  return (
    <Box component="section" sx={{ height: "70vh" }}>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              className="error-blink"
              fontWeight="700"
              color="red"
            >
              ОШИБКА 404
            </Typography>
            <Typography variant="h3" mt={2} fontWeight="600">
              СТРАНИЦА, КОТОРУЮ ВЫ ИЩЕТЕ, БЫЛА ПЕРЕМЕЩЕНА, УДАЛЕНА,
              ПЕРЕИМЕНОВАНА ИЛИ МОЖЕТ НИКОГДА НЕ СУЩЕСТВОВАЛА. ВЫ МОЖЕТЕ ПЕРЕЙТИ
              НА{" "}
              <Link
                to="/"
                aria-label="go to the main page"
                style={{
                  color: "var(--primary)",
                }}
              >
                ГЛАВНУЮ СТРАНИЦУ
              </Link>
              , ЧТОБЫ НАЙТИ НУЖНУЮ ВАМ ИНФОРМАЦИЮ
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <NothingFound />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Error;
