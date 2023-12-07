/* eslint-disable eqeqeq */
import {
  Backdrop,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  ThemeProvider,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Route, Routes, useLocation } from "react-router";
import Site from "./routers/Site";
import Stream from "./routers/Stream";
import { theme } from "./theme";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  fab,
  faOdnoklassniki,
  faTelegram,
  faTwitter,
  faVk,
} from "@fortawesome/free-brands-svg-icons";
import whatsapp from "./assets/images/whatsapp.png";
import instagram from "./assets/images/instagram.png";
import telegram from "./assets/images/telegram.png";
import {
  faGlobe,
  faCoffee,
  faAngleDown,
  faMagnifyingGlass,
  faBars,
  faEye,
  faStar,
  faShareFromSquare,
  faPaperPlane,
  faBasketShopping,
  faCreditCard,
  faEyeSlash,
  faPen,
  faPowerOff,
  faTrash,
  faCopy,
  faPhone,
  faUserNinja,
  faKey,
  faMapPin,
  faThumbsUp,
  faBell,
  faBox,
} from "@fortawesome/free-solid-svg-icons";
import "swiper/css";
import "@fancyapps/ui/dist/fancybox.css";
import ProtectedRoutes, { useAuth } from "./shared/ProtectedRoutes";
import Dashboard from "./routers/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DrawerSite from "./shared/Drawer";
import { getProfileData } from "./redux/reducers/profile";
import cookie from "cookie_js";
import Error from "./pages/Error";
import Auth from "./routers/Auth";
import { Link } from "react-router-dom";
import { setLoadingProduct } from "./redux/reducers/products";

library.add(
  faBell,
  fab,
  faThumbsUp,
  faPaperPlane,
  faGlobe,
  faCoffee,
  faAngleDown,
  faMagnifyingGlass,
  faBars,
  faEye,
  faStar,
  faShareFromSquare,
  faCreditCard,
  faBasketShopping,
  faEyeSlash,
  faPen,
  faPowerOff,
  faTrash,
  faCopy,
  faVk,
  faOdnoklassniki,
  faTelegram,
  faTwitter,
  faPhone,
  faUserNinja,
  faKey,
  faMapPin,
  faBox
);

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isAuth = useAuth();

  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cartSum, setCartSum] = useState(0);

  const [openSpeedDial, setOpenSpeedDial] = useState(false);
  const handleOpen = () => setOpenSpeedDial(true);
  const handleClose = () => setOpenSpeedDial(false);

  const { purchase_info } = useSelector(({ profile }) => profile);
  const { isLoading } = useSelector(({ products }) => products);

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
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path="/*"
          element={
            <Site
              cartSum={cartSum}
              setCartSum={setCartSum}
              setOpen={setOpen}
              setLoading={setLoading}
              loading={loading}
              open={open}
              t={t}
            />
          }
        />
        <Route
          path="/stream/*"
          element={
            <Stream
              cartSum={cartSum}
              setCartSum={setCartSum}
              setOpen={setOpen}
              setLoading={setLoading}
              loading={loading}
              open={open}
              t={t}
            />
          }
        />
        <Route
          path="auth/*"
          element={
            <Auth
              setCartSum={setCartSum}
              cartSum={cartSum}
              setOpen={setOpen}
              open={open}
              loading={loading}
              setLoading={setLoading}
              t={t}
            />
          }
        />
        <Route element={<ProtectedRoutes />}>
          <Route
            path="/dashboard/*"
            element={
              <Dashboard
                setCartSum={setCartSum}
                cartSum={cartSum}
                setOpen={setOpen}
                open={open}
                language={setLanguage}
                loading={loading}
                setLoading={setLoading}
                t={t}
              />
            }
          />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>

      <DrawerSite t={t} setOpen={setOpen} open={open} />
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{
          position: "fixed",
          bottom: { xs: 109, md: 130 },
          right: { xs: 10, md: 24 },

          "& button": {
            width: 60,
            height: 60,
          },
        }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={openSpeedDial}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            href={action.path}
            target="_blank"
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </ThemeProvider>
  );
}

export default App;

const actions = [
  {
    icon: <img src={whatsapp} width="40" height="40" alt="" />,
    name: "WhatsApp",
    path: "https://wa.me/996505919999",
  },
  {
    icon: <img src={instagram} width="40" height="40" alt="" />,
    name: "Instagram",
    path: "https://www.instagram.com/opop_odejda/",
  },
  {
    icon: <img src={telegram} width="40" height="40" alt="" />,
    name: "Telegram",
    path: "https://t.me/+996505919999",
  },
];
