import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import o from "../../assets/images/o.jpg";
import c from "../../assets/images/balance.jpg";
import visa from "../../assets/images/visa.jpg";
import elkart from "../../assets/images/elkart.jpg";
import mbank from "../../assets/images/mbank.jpg";
import masterCard from "../../assets/images/mastercard.jpg";
import elsom from "../../assets/images/elsom.jpg";
import onoi from "../../assets/images/onoi.jpg";
import umai from "../../assets/images/umai.jpg";
import quickpay from "../../assets/images/quikcpay.jpg";
import xz from "../../assets/images/xz.jpg";
import { Link, NavLink } from "react-router-dom";
import { AppStore, PlayMarket } from "../../assets/images/icons";

const array = [
  o,
  visa,
  elsom,
  elkart,
  c,
  mbank,
  xz,
  masterCard,
  onoi,
  umai,
  quickpay,
];

const Footer = ({ t }) => {
  return (
    <Box
      component="footer"
      mt={{ xs: 2, md: 3 }}
      pb={5}
      pt={{ xs: 4, md: 8 }}
      backgroundColor="#282B3D"
    >
      <Container maxWidth="">
        <Grid
          container
          spacing={{ xs: 2, xl: 1 }}
          sx={{
            "& *": {
              color: "#B0B0B0",
              "& p": {
                fontWeight: 500,
              },

              "& a": {
                display: "block",
                mb: 2,

                "&:last-child": {
                  mb: 0,
                },
              },
            },
          }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "start" },
              justifyContent: { xs: "center", md: "start" },
            }}
            xl={2.5}
          >
            <Link aria-label="read more" to="/">
              <svg
                width="134"
                height="36"
                viewBox="0 0 134 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M65.2001 1.46965C66.1501 2.42558 66.6252 3.72876 66.6252 5.37919V35.1543C65.9682 35.3141 65.3017 35.4294 64.63 35.4996C63.7624 35.6154 62.8884 35.673 62.0135 35.6723C61.2297 35.6813 60.4472 35.6048 59.6792 35.444C59.0843 35.3487 58.5192 35.1123 58.0289 34.7534C57.5581 34.3877 57.2023 33.8881 57.0057 33.3166C56.753 32.5391 56.6372 31.7216 56.6637 30.9024V8.13577H45.7273V35.1543C45.09 35.3112 44.4436 35.4265 43.792 35.4996C42.9043 35.6141 42.0104 35.6718 41.1157 35.6723C40.3497 35.6836 39.5849 35.607 38.8355 35.444C38.2202 35.3561 37.6341 35.1194 37.1254 34.7534C36.6554 34.3869 36.2998 33.8875 36.1021 33.3166C35.8494 32.5391 35.7336 31.7216 35.7601 30.9024V5.37627C35.7601 3.72973 36.2352 2.42655 37.1852 1.46673C38.1353 0.5069 39.4265 0.0279623 41.0587 0.0299132H61.3209C62.9569 0.0299132 64.25 0.509826 65.2001 1.46965Z"
                  fill="#3698D4"
                />
                <path
                  d="M17.7267 36C12.7446 36 8.62789 34.3252 5.37673 30.9755C2.12558 27.6259 0.5 23.2696 0.5 17.9067C0.5 12.5184 2.11513 8.20987 5.34538 4.98118C8.57563 1.7525 12.7028 0.130353 17.7267 0.114746C22.7735 0.114746 26.9121 1.73689 30.1423 4.98118C33.3726 8.22548 34.9877 12.5379 34.9877 17.9184C34.9877 23.2696 33.3621 27.621 30.111 30.9726C26.8598 34.3242 22.7317 36 17.7267 36ZM11.2168 25.5033C12.9004 27.4913 15.0703 28.4852 17.7267 28.4852C20.3832 28.4852 22.5598 27.4913 24.2566 25.5033C25.9667 23.5173 26.8218 20.9812 26.8218 17.895C26.8218 14.8809 25.9667 12.3964 24.2566 10.4417C22.5465 8.48689 20.3699 7.51146 17.7267 7.51536C15.0665 7.51536 12.8966 8.49079 11.2168 10.4417C9.53711 12.3925 8.69439 14.8809 8.68869 17.9067C8.68869 20.9832 9.53141 23.5154 11.2168 25.5033Z"
                  fill="#F7E200"
                />
                <path
                  d="M34.9877 17.8569C35.019 20.3804 34.5788 22.8866 33.6909 25.24C32.882 27.3783 31.6572 29.3249 30.091 30.9609C28.5314 32.5643 26.6639 33.817 24.6072 34.6392C22.4227 35.5553 20.0772 35.9976 17.7182 35.9385V0.0620545C20.0761 -0.00573539 22.4228 0.419386 24.6158 1.31159C26.6759 2.0896 28.5513 3.30866 30.1174 4.88783C31.6836 6.46699 32.9046 8.37014 33.6994 10.4709C34.5904 12.8241 35.028 15.3325 34.9877 17.8569ZM26.8104 17.8569C26.8257 16.448 26.603 15.047 26.152 13.7162C25.7412 12.5054 25.1063 11.3875 24.2823 10.4241C23.489 9.50688 22.5183 8.76939 21.4321 8.25862C20.2686 7.71836 19.0036 7.44761 17.7268 7.4656C16.4619 7.44811 15.2091 7.71896 14.0585 8.25862C12.9762 8.77614 12.0067 9.51267 11.2083 10.4241C10.3723 11.3791 9.73506 12.4993 9.33571 13.7162C8.89539 15.0494 8.67667 16.4492 8.68871 17.8569C8.67484 19.3039 8.90136 20.7428 9.35851 22.1117C9.76607 23.3401 10.3966 24.478 11.2169 25.4653C12.0263 26.4162 13.0283 27.1741 14.1527 27.6861C15.2771 28.1981 16.4969 28.4519 17.7268 28.4296C18.9916 28.4471 20.2444 28.1762 21.395 27.6366C22.4802 27.1149 23.4502 26.3711 24.2452 25.4506C25.0882 24.4748 25.7361 23.3383 26.152 22.1059C26.606 20.7385 26.8287 19.3014 26.8104 17.8569Z"
                  fill="#F7E200"
                />
                <path
                  d="M84.5502 35.9005C79.568 35.9005 75.4523 34.2257 72.2031 30.876C68.9538 27.5264 67.3282 23.175 67.3263 17.8218C67.3263 12.4355 68.9415 8.12308 72.1717 4.88464C75.402 1.6462 79.5281 0.0279581 84.5502 0.029909C89.5913 0.029909 93.7298 1.64815 96.9658 4.88464C100.202 8.12113 101.817 12.4335 101.811 17.8218C101.811 23.173 100.186 27.5245 96.9344 30.876C93.6833 34.2276 89.5552 35.9025 84.5502 35.9005ZM78.0403 25.4185C79.7238 27.4006 81.8938 28.3916 84.5502 28.3916C87.2066 28.3916 89.3842 27.3977 91.0829 25.4097C92.7931 23.4218 93.6434 20.8857 93.6339 17.8013C93.6339 14.7872 92.7836 12.3028 91.0829 10.348C89.3823 8.39328 87.2047 7.41784 84.5502 7.42175C81.89 7.42175 79.72 8.39718 78.0403 10.348C76.3606 12.2989 75.5179 14.7833 75.5122 17.8013C75.5122 20.8915 76.3549 23.4306 78.0403 25.4185Z"
                  fill="#3698D4"
                />
                <path
                  d="M101.939 17.8043C101.968 20.3231 101.527 22.8243 100.64 25.1727C99.832 27.3124 98.607 29.2602 97.0399 30.8965C95.4808 32.4992 93.6143 33.7518 91.5589 34.5749C89.3738 35.492 87.027 35.9334 84.6671 35.8712V0.00649705C87.0229 -0.0586279 89.3673 0.366413 91.5589 1.25603C93.6194 2.03535 95.4948 3.25591 97.0604 4.83663C98.6261 6.41735 99.8462 8.32202 100.64 10.4241C101.534 12.7746 101.976 15.281 101.939 17.8043ZM93.7507 17.8043C93.7608 16.3967 93.5342 14.9979 93.0809 13.6694C92.6733 12.4587 92.0424 11.34 91.2226 10.3744C90.427 9.4512 89.451 8.71038 88.3581 8.20014C87.1992 7.66097 85.9393 7.38927 84.6671 7.40419C83.402 7.38762 82.1492 7.65947 80.9988 8.20014C79.9165 8.7163 78.9469 9.45189 78.1486 10.3627C77.3177 11.3201 76.6855 12.4412 76.2903 13.6577C75.8492 14.9888 75.6295 16.3866 75.6404 17.7926C75.6259 19.244 75.8544 20.6871 76.3159 22.0591C76.7217 23.2841 77.3515 24.4183 78.1714 25.4009C79.4266 26.8208 81.0868 27.797 82.9147 28.1901C84.7427 28.5832 86.6449 28.3731 88.3496 27.5898C89.4415 27.0713 90.4169 26.326 91.214 25.4009C92.0482 24.4242 92.6874 23.2888 93.0952 22.0591C93.5472 20.6893 93.7689 19.2505 93.7507 17.8043Z"
                  fill="#E32967"
                />
                <path
                  d="M132.075 1.69499C133.025 2.65091 133.5 3.95312 133.5 5.6016V35.3826C132.843 35.5409 132.176 35.6562 131.505 35.7279C130.637 35.8422 129.763 35.8999 128.888 35.9005C128.104 35.9102 127.322 35.8326 126.554 35.6693C125.959 35.5764 125.394 35.3408 124.904 34.9817C124.432 34.6155 124.076 34.1147 123.88 33.5419C123.627 32.7645 123.512 31.9469 123.538 31.1277V8.3611H112.611V35.3826C111.973 35.538 111.327 35.6533 110.675 35.7279C109.787 35.8409 108.894 35.8986 107.999 35.9005C107.233 35.9126 106.468 35.8351 105.719 35.6693C105.103 35.5837 104.517 35.3479 104.009 34.9817C103.538 34.6146 103.182 34.1141 102.985 33.5419C102.732 32.7645 102.617 31.9469 102.643 31.1277V5.6016C102.643 3.95507 103.118 2.65286 104.069 1.69499C105.019 0.737113 106.314 0.2572 107.953 0.255249H128.216C129.838 0.255249 131.125 0.735162 132.075 1.69499Z"
                  fill="#F7E200"
                />
              </svg>
            </Link>

            <a aria-label="read more" href="tel:+996 505 919 999">
              <Typography
                fontSize="24.2px!important"
                color="#B0B0B0"
                fontWeight="500"
                compontent="span"
              >
                +996 505 919 999
              </Typography>
            </a>
          </Grid>
          <Grid item xs={12} xl={2}>
            <NavLink activeclassname="active" to="/">
              <Typography variant="subtitle2">{t("main")}</Typography>
            </NavLink>
            <NavLink activeclassname="active" to="/about-us">
              <Typography variant="subtitle2">{t("aboutUs")}</Typography>
            </NavLink>
            <NavLink activeclassname="active" to="/terms-of-purchase">
              <Typography variant="subtitle2">
                {t("termsOfPurchase")}
              </Typography>
            </NavLink>
          </Grid>
          <Grid item xs={12} xl={2}>
            <NavLink activeclassname="active" to="/purchase">
              <Typography variant="subtitle2">{t("purchase")}</Typography>
            </NavLink>
            <NavLink activeclassname="active" to="/shipping">
              <Typography variant="subtitle2">{t("shipping")}</Typography>
            </NavLink>
            {/* <NavLink activeclassname="active" to="/guarantee">
              <Typography variant="subtitle2">{t("guarantee")}</Typography>
            </NavLink> */}
          </Grid>
          <Grid item xs={12} xl={2}>
            <NavLink activeclassname="active" to="/wholesalers">
              <Typography variant="subtitle2">{t("wholesalers")}</Typography>
            </NavLink>
            {/* <NavLink activeclassname="active" to="/news">
              <Typography variant="subtitle2">{t("news")}</Typography>
            </NavLink> */}
            <NavLink activeclassname="active" to="/contacts">
              <Typography variant="subtitle2">{t("contacts")}</Typography>
            </NavLink>
          </Grid>
          <Grid item sm={6} xl={3.5}>
            <Typography
              mt={{ xs: 2, md: 0 }}
              variant="subtitle2"
              textAlign={{ xs: "center", md: "left" }}
            >
              {t("paymentMethods")}
            </Typography>
            <Box
              display="flex"
              mt={2}
              columnGap="16px"
              rowGap="16px"
              flexWrap="wrap"
            >
              {array.map((item, idx) => (
                <img
                  src={item}
                  width="32px"
                  style={{ objectFit: "cover", borderRadius: 8 }}
                  height="32px"
                  key={idx}
                  alt=""
                />
              ))}
            </Box>
            <Typography
              mt={{ xs: 4, md: 2 }}
              variant="subtitle2"
              textAlign={{ xs: "center", md: "left" }}
            >
              {t("downloadMobileApp")}
            </Typography>
            <Box
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              columnGap="26px"
              mt={2}
              alignItems="center"
            >
              <AppStore />
              <PlayMarket />
            </Box>
          </Grid>
        </Grid>
        <Box
          display="flex"
          alignItems="center"
          pt={4}
          mt={4}
          borderTop="1px solid #F2F2F310"
          justifyContent="space-between"
          color="#FFFFFF50"
        >
          <Typography variant="body2">ОПОП 2022</Typography>
          <Typography variant="body2">
            {t("madeWithLove")}{" "}
            <a
              aria-label="read more"
              href="https://odigital.app/"
              style={{ color: "var(--secondary)" }}
              target="_blank"
              rel=" noreferrer"
            >
              Oracle Digital
            </a>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
