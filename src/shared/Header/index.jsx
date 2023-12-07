import React, {useState} from "react";
import {Box, Container} from "@mui/system";
import Language from "../../components/Language";
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import {Button, IconButton, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useTranslation} from "react-i18next";
import logo from "../../assets/images/Frame 514.png";
import {
    Avatar,
    CartIcon,
    FilterIcon,
    LoginIcon,
} from "../../assets/images/icons";
import {useDispatch, useSelector} from "react-redux";
import {useAuth} from "../ProtectedRoutes";
import Search from "../../components/Search";
import {setOpenLogin} from "../../redux/reducers/auth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PopoverCategories from "./PopoverCategories";

const Header = ({
                    t,
                    cartSum,
                    search,
                    setSearch,
                    setLoading,
                }) => {
    const {i18n} = useTranslation();
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const isAuth = useAuth();

    const lg = useMediaQuery(theme.breakpoints.down(1200));
    const md = useMediaQuery(theme.breakpoints.down("768"));


    // const { cartSum } = useSelector(({ main }) => main);

    const {profile} = useSelector(({profile}) => profile);
    const handleClick = (event) => {
        setOpen(true);
        setAnchorEl(event.currentTarget);
    };
    return (
        <Box
            component="header"
            backgroundColor={
                (location.pathname.includes("details") ||
                    location.pathname.includes("create")) &&
                "#FBFBFB" &&
                location.pathname.includes("stream") ? "#FBFBFB" : "#FBFBFB"
            }
            pt={3}
        >
            <Container
                sx={{
                    position: "relative",
                    backgroundColor: location.pathname.includes("details")
                        ? "#FFF"
                        : "#FBFBFB" && location.pathname.includes("stream") ? "#FFFFFF" : "#FBFBFB",

                }}
                maxWidth="xl"
            >
                <Box
                    component="nav"
                    backgroundColor={
                        location.pathname.includes("details") ? "#FFF" : "#FBFBFB" &&
                        location.pathname.includes("stream") ? "#FFFFFF" : "#FBFBFB"
                    }
                    justifyContent="space-between"
                    alignItems="center"
                    display="flex"
                    p="11px 0"
                >
                    {/*{md ? (*/}
                    {/*  <Link aria-label="read more" to="/">*/}
                    {/*    <img src={logo} width="99px" height="39.52px" alt="" />*/}
                    {/*  </Link>*/}
                    {/*) : (*/}
                    {/*  <Language />*/}
                    {/*)}*/}
                    <Link aria-label="read more" to="/">
                        <img src={logo} width="120px" alt=""/>
                    </Link>
                    {!lg && (
                        <Box
                            ml={2}
                            alignItems="start"
                            width="70%"
                            display="flex"
                            // justifyContent="space-between"
                            sx={{
                                "& a": {
                                    color: "#151515",
                                    textDecoration: "none",
                                    marginRight: "32px",
                                    whiteSpace: "nowrap",
                                    "&.active": {
                                        color: "var(--primary)",
                                    },
                                },
                            }}
                        >
                            <NavLink activeclassname="active" to="/">
                                <Typography variant="body2">{t("main")}</Typography>
                            </NavLink>
                            <NavLink activeclassname="active" to="/about-us">
                                <Typography variant="body2">{t("aboutUs")}</Typography>
                            </NavLink>

                            {i18n.resolvedLanguage === "ru" && (
                                <>
                                    <NavLink activeclassname="active" to="/terms-of-purchase">
                                        <Typography variant="body2">
                                            {t("termsOfPurchase")}
                                        </Typography>
                                    </NavLink>
                                </>
                            )}
                            <NavLink activeclassname="active" to="/purchase">
                                <Typography variant="body2">{t("purchase")}</Typography>
                            </NavLink>
                            <NavLink activeclassname="active" to="/shipping">
                                <Typography variant="body2">{t("shipping")}</Typography>
                            </NavLink>
                            <NavLink activeclassname="active" to="/guarantee">
                                <Typography variant="body2">{t("guarantee")}</Typography>
                            </NavLink>
                            <NavLink activeclassname="active" to="/wholesalers">
                                <Typography variant="body2">{t("wholesalers")}</Typography>
                            </NavLink>
                            <NavLink activeclassname="active" to="/news">
                                <Typography variant="body2">{t("news")}</Typography>
                            </NavLink>
                            <NavLink activeclassname="active" to="/contacts">
                                <Typography variant="body2">{t("contacts")}</Typography>
                            </NavLink>
                        </Box>
                    )}

                    <Box display="flex" alignItems="center">
                        <a aria-label="read more" href="tel:+996 505 919 999">
                            <Typography
                                fontSize={{xs: 16, md: 18}}
                                fontWeight="500"
                                compontent="span"
                            >
                                +996 505 919 999
                            </Typography>
                            <p style={{fontSize: "12px", fontWeight: "300"}}>Бесплатный звонок по Кыргызстану</p>
                        </a>
                        {lg && (
                            <IconButton
                                onClick={() => setOpen(!open)}
                                aria-label="read more"
                                style={{marginLeft: 32}}
                            >
                                {" "}
                                <div id="navMenu" className={open ? "active" : ""}>
                                    <div></div>
                                    <div></div>
                                    <div style={{marginBottom: 0}}></div>
                                </div>
                            </IconButton>
                        )}
                    </Box>
                </Box>
                {!md && (
                    <Box
                        backgroundColor={
                            location.pathname.includes("stream") ? "#FFFFFF" : "#FBFBFB"
                        }
                        zIndex={"3"}
                        mt={3}
                        pt={3}
                        pb={3}
                        position={"relative"}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        borderTop="1px solid #00000010"
                        borderBottom="1px solid #00000010"

                    >
                        <Button
                            onClick={handleClick}
                            variant="oval1"
                            sx={{
                                minWidth: {xs: "unset", lg: 143},
                                p: {xs: "12px 16px!important"},
                                fontSize: {xs: "14px!important", md: 22},

                                "& svg": {
                                    fontSize: {xs: "14px!important", md: 22},
                                },
                            }}
                        >
                            <FontAwesomeIcon
                                icon="bars"
                                style={{marginRight: 4}}
                                color="#fff"
                            />
                            Каталог
                            <FontAwesomeIcon
                                icon="angle-down"
                                style={{marginLeft: 4}}
                                color="#fff"
                            />
                        </Button>
                        {!md && (
                            <PopoverCategories
                                anchorEl={anchorEl}
                                open={open}
                                setOpen={setOpen}
                            />
                        )}
                        <Search
                            t={t}
                            setSearch={setSearch}
                            search={search}
                            setLoading={setLoading}
                        />
                        <Box
                            mr={4}
                            display="flex"
                            onClick={() => navigate("/catalog")}
                            className="text-btn"
                            alignItems="center"
                        >
                            <IconButton aria-label="filter">
                                <FilterIcon/>
                            </IconButton>
                            <Typography
                                variant="body2"
                                component="h6"
                                fontWeight="500"
                                color="#282B3D"
                            >
                                Фильтр
                            </Typography>
                        </Box>
                        {isAuth ? (
                            <>
                                <Box
                                    width="fit-content"
                                    mr={1}
                                    display="flex"
                                    onClick={() => navigate("/dashboard/profile")}
                                    className="text-btn"
                                    alignItems="center"
                                >
                                    {!profile?.avatar ? (
                                        <Avatar/>
                                    ) : (
                                        <img
                                            src={profile?.avatar}
                                            width="46px"
                                            style={{
                                                borderRadius: "100%",
                                                objectFit: "cover",
                                                objectPosition: "center",
                                            }}
                                            height="46px"
                                            alt=""
                                        />
                                    )}

                                    <Typography
                                        ml={0.5}
                                        variant="body2"
                                        component="h6"
                                        fontWeight="500"
                                        color="#282B3D"
                                        whiteSpace="nowrap"
                                        overflow="hidden"
                                        textOverflow="ellipsis"
                                        // maxWidth="50%"
                                    >
                                        {profile?.first_name} {profile?.last_name}
                                    </Typography>
                                </Box>
                            </>
                        ) : (
                            <Box
                                mr={1}
                                display="flex"
                                onClick={() => navigate("/auth")}
                                className="text-btn"
                                alignItems="center"
                            >
                                <IconButton aria-label="login button">
                                    <LoginIcon/>
                                </IconButton>
                                <Typography
                                    variant="body2"
                                    component="h6"
                                    fontWeight="500"
                                    color="#282B3D"
                                >
                                    {t("enter")}
                                </Typography>
                            </Box>
                        )}

                        <Link
                            aria-label="read more"
                            to="/dashboard/cart"
                            style={{
                                display: "block",
                            }}
                        >
                            <Box display="flex" alignItems="center">
                                <IconButton aria-label="cart">
                                    <CartIcon/>
                                </IconButton>
                                <div>
                                    <Typography variant="body2" fontWeight="500" color="#282B3D">
                                        {t("cart")}
                                    </Typography>
                                    <Typography
                                        fontSize="12px"
                                        mt={1}
                                        fontWeight="500"
                                        color="#282B3D"
                                    >
                                        {cartSum} с
                                    </Typography>
                                </div>
                            </Box>
                        </Link>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default Header;
