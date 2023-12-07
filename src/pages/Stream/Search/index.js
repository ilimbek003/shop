import React, {useEffect} from 'react';
import StreamSearch from "./StreamSearch";
import {useDispatch, useSelector} from "react-redux";
import StreamSearchCard from "./StreamSearchCard";
import {Typography, useMediaQuery} from "@mui/material";
import {Box, useTheme} from "@mui/system";
import usePagination from "../../../hooks/usePagination";
import {
    getCategories,
    getNewProducts,
    getNewProductsNext, getProducts,
    // getProductsHotSelling,
    // getProductsPromotion,
    setNewProducts, setProductsHotSelling,
    setProductsPromotion
} from "../../../redux/reducers/products";
// import NewProducts from "../../Main/NewProducts";
import {getBanners} from "../../../redux/reducers/main";

const Index = ({
                   t,
                   search,
                   setSearch,
                   loading,
                   setLoading,
                   mobile,
                   setCartSum,
                   cartSum,
                   catalog
               }) => {

    const dispatch = useDispatch()
    const { new_products } = useSelector(({ products }) => products);
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down("768"));
    useEffect(() => {
        // dispatch(getProductsPromotion());
        dispatch(setProductsPromotion({ isLoading: true }));
        // dispatch(getProductsHotSelling());
        dispatch(setProductsHotSelling({ isLoading: true }));
        dispatch(getNewProducts());
        dispatch(setNewProducts({ isLoading: true }));
        dispatch(getCategories());
        dispatch(getBanners());
        dispatch(getProducts(""));
        /**
         * eslint-disable-next-line react-hooks/exhaustive-deps
         */
    }, []);
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
        <div>
            <StreamSearch
                t={t}
                setSearch={setSearch}
                search={search}
                setLoading={setLoading}
                mobile={mobile}
                catalog={catalog}
            />
            <Box component={"section"}>
                <StreamSearchCard t={t} catalog={catalog} setCartSum={setCartSum} cartSum={cartSum} />
            </Box>
        </div>
    );
};

export default Index;