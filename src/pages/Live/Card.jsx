import React from "react";
import { Box, Button, Typography } from "@mui/material";
import img from "../../assets/images/live-card.png";
import plant1 from "../../assets/images/plant1.png";
import plant2 from "../../assets/images/plant2.png";
import plant3 from "../../assets/images/plant3.png";
import avatar from "../../assets/images/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = ({ announce }) => {
  return (
    <Box
      sx={{
        width: announce ? "100%" : 900,
        background: "#FFFFFF",
        borderRadius: "24px",
        p: 2,
        display: "flex",
      }}
    >
      <Box position="relative">
        <Box
          sx={{
            position: "absolute",
            p: "6px",
            left: "22px",
            top: "22px",
            background: "rgba(0, 0, 0, 0.59)",
            borderRadius: "9px",
          }}
        >
          <Typography variant="body2" color="white">
            18:00
          </Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            p: "6px",
            right: "22px",
            top: "22px",
            background: "#31AA2E",
            borderRadius: "9px",
          }}
        >
          <Typography variant="body2" textTransform="uppercase" color="white">
            Анонс
          </Typography>
        </Box>
        <img src={img} style={{ width: 247 }} alt="" />
        <Box
          display="flex"
          sx={{
            position: "absolute",
            bottom: 16,
            left: 16,
            "& img": {
              width: 47,
              height: 47,
              borderRadius: 1,
            },
          }}
          columnGap="9px"
        >
          <img src={plant1} alt="" />
          <img src={plant2} alt="" />
          <img src={plant3} alt="" />
          <Box
            sx={{
              width: "47px",
              height: "47px",
              background:
                "linear-gradient(0deg, #FFFFFF, #FFFFFF), url(.jpg), #D9D9D9",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2" color="#7D7159">
              +2
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        p="16px 0"
        ml={3}
        flexDirection="column"
        display="flex"
        justifyContent="space-between"
        alignItems="space-between"
      >
        <div>
          <img
            src={avatar}
            style={{ width: "47px", height: "47px", borderRadius: "100%" }}
            alt=""
          />
          <Typography variant="body2" m="8px 0">
            Имя Пользователя
          </Typography>
          <Typography
            variant={announce ? "h5" : "h3"}
            fontWeight="700"
            lineHeight={announce ? "29px" : "39px"}
          >
            Обзор новой поставки товаров в честь распродажи 20-26 июня, розыгрыш
            промокодов на скидку 12%{" "}
          </Typography>
          <Typography variant="body2" mt={1}>
            Покажем картины, которые мы подготовили для МЕГА распродажи
          </Typography>
        </div>
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{
            "& .box": {
              padding: "6px",
              background: "rgba(195, 195, 195, 0.59)",
              borderRadius: "9px",
              display: "flex",
              alignItems: "center",
              columnGap: "8px",
            },
          }}
        >
          <Button size="small" color="primary" variant="contained">
            <FontAwesomeIcon
              icon="share-from-square"
              style={{ marginRight: 8 }}
            />
            ПОДЕЛИТЬСЯ
          </Button>
          {announce ? (
            // <Button size="small" color="primary" variant="contained">
            //   <FontAwesomeIcon
            //     icon="bell"
            //     style={{ marginRight: 8 }}
            //   />
            //   Напомнить
            // </Button>
            <></>
          ) : (
            <div className="d-flex">
              <Box className="box">
                <Typography variant="body2" fontWeight="400">
                  14,2 к
                </Typography>
                <FontAwesomeIcon icon="eye" />
              </Box>
              <Box className="box" ml={2}>
                <Typography variant="body2" fontWeight="400">
                  14,2 к
                </Typography>
                <FontAwesomeIcon icon="thumbs-up" />
              </Box>
            </div>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
