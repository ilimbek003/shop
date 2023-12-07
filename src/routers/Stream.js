import { LinearProgress, useMediaQuery } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React, {lazy, useEffect, useState} from "react";
import { Route, Routes, useLocation } from "react-router";
import Error from "../pages/Error";
import Footer from "../shared/Footer";
import Header from "../shared/Header";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useAuth} from "../shared/ProtectedRoutes";
import {getProfileData} from "../redux/reducers/profile";
import cookie from "cookie_js";
import {setLoadingProduct} from "../redux/reducers/products";

const StreamIndex = lazy(() => import("../pages/Stream"));
const StreamLive = lazy(() => import("../pages/Stream/Live"));
const StreamCreate = lazy(() => import("../pages/Stream/Create"));
const StreamDetail = lazy(() => import("../pages/Stream/StreamDetail"));

const Stream = ()=> {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [language, setLanguage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cartSum, setCartSum] = useState(0);
    const location = useLocation();
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down(768));
    const dispatch = useDispatch()
    const [search, setSearch] = useState("");

    const isAuth = useAuth();

    const [openSpeedDial, setOpenSpeedDial] = useState(false);
    const handleOpen = () => setOpenSpeedDial(true);
    const handleClose = () => setOpenSpeedDial(false);

    const { purchase_info } = useSelector(({ profile }) => profile);
    const { isLoading, catalog } = useSelector(({ products }) => products);

    useEffect(() => {
        if (isAuth) {
            dispatch(getProfileData());
            setCartSum(localStorage.getItem("amount"));
        }

        if (!localStorage.getItem("amount")) localStorage.setItem("amount", 0);

        if (purchase_info?.status === 401) {
            cookie.removeSpecific("token_opop", {
                path: "/",
                domain: "opop.asia",
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (open) setOpen(false);
        if (!isLoading) dispatch(setLoadingProduct(true));
    }, [location.pathname]);

    useEffect(() => {
        const script = document.createElement("script");

        script.src = "//code.tidio.co/tjbbwonwd8wcf2spasm0kssbswoi6uor.js";
        script.async = true;

        document.body.appendChild(script);
    }, []);

    useEffect(() => {
        localStorage.setItem("amount", cartSum);
    }, [cartSum]);

    return (
        <>
            <Header
                setSearch={setSearch}
                search={search}
                cartSum={cartSum}
                t={t}
                setOpen={setOpen}
                setLoading={setLoading}
                open={open}
            />
            <Box
                component="main"
                backgroundColor={location.pathname.includes("details") && "#FBFBFB"}
                pt={3}
            >
                <Routes>
                    <Route path="/" element={<StreamIndex
                        cartSum={cartSum}
                        setCartSum={setCartSum}
                        t={t}
                        setSearch={setSearch}
                        search={search}
                        setLoading={setLoading} />} />
                    <Route path="/live" element={<StreamLive t={t} />} />
                    <Route path="/details/:id" element={<StreamDetail t={t} />} />
                    <Route path="/create" element={<StreamCreate
                        cartSum={cartSum}
                        setCartSum={setCartSum}
                        setSearch={setSearch}
                        search={search}
                        setLoading={setLoading}
                        catalog={catalog}
                        t={t} />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </Box>
            <Footer t={t} />
        </>
    );
};

export default Stream;
