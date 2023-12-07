import React from "react";
import { Container, Grid, Typography, useMediaQuery } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import PaginationTop from "../../../components/PaginationTop";
import { useSelector } from "react-redux";
import usePagination from "../../../hooks/usePagination";
import ProductSkeleton from "../../../components/ProductSkeleton";
import { getNewProductsNext } from "../../../redux/reducers/products";
import { Link } from "react-router-dom";
import SearchProduct from "./SearchProduct";

const NewProducts = ({ catalog ,t, setCartSum, cartSum }) => {
    const { new_products } = useSelector(({ products }) => products);

    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down("768"));

    const {
        firstContentIndex,
        lastContentIndex,
        nextPage,
        prevPage,
        page,
        totalPages,
    } = usePagination({
        contentPerPage: md ? 50 : 4,
        func: getNewProductsNext,
        next: new_products.data?.next,
        count: new_products?.data?.count,
    });

    return (
        <Box component="section">
            <Box>
                <Box
                    display="flex"
                    mb={4}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography
                        fontSize={"22px"}
                        variant="h1"
                        marginBottom={"15px"}
                        fontWeight="400"
                        lineHeight="30px"
                        sx={{"& span": {fontWeight:"700"}}}
                        width={"60%"}
                    >
                        Результат поиска: <span>1 200 000 объявлений \ “Текст поиска”</span>
                    </Typography>
                    {md ? (
                        <Link aria-label="read more" to={`/catalog/?is_new=${true}`}>
                            <Typography variant="body2">Показать все</Typography>
                        </Link>
                    ) : (
                        <PaginationTop
                            prev={prevPage}
                            next={nextPage}
                            totalPages={totalPages}
                            data={new_products.data}
                            page={page}
                        />
                    )}
                </Box>
                <Grid
                    container
                    sx={{
                        overflow: "auto",
                        pb: 2,
                    }}
                    className="scroll"
                    flexWrap={{ xs: "nowrap", md: "wrap" }}
                    spacing={{ xs: 2, md: 3 }}
                >
                    {catalog.isLoading
                        ? Array.from(Array(md ? 2 : 4).keys()).map((item, idx) => (
                            <Grid key={idx} item xs={6} md={4} lg={3}>
                                <ProductSkeleton />
                            </Grid>
                        ))
                        : catalog?.data?.results
                            ?.slice(firstContentIndex, 12)
                            .map((item, idx) => (
                                <Grid item xs={6} md={4} key={idx} lg={3}>
                                    <SearchProduct
                                        item={item}
                                        setCartSum={setCartSum}
                                        cartSum={cartSum}
                                        newItems
                                        t={t}
                                        key={idx}
                                    />
                                </Grid>
                            ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default NewProducts;
