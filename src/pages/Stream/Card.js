import React from "react";
import { Box, Button, Typography } from "@mui/material";
import img from "../../assets/images/live-card.png";
import plant1 from "../../assets/images/plant1.png";
import plant2 from "../../assets/images/plant2.png";
import plant3 from "../../assets/images/plant3.png";
import avatar from "../../assets/images/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {NavLink} from "react-router-dom";

const StreamCard = ({ announce, profuct ,type, Announce=false}) => {
  return (
    <Box
      sx={{
        width: announce ? "100%" : 900,
          margin:"0 auto",
        background: "#FFFFFF",
        borderRadius: "24px",
        p: 2,
        display: "flex",
      }}
    >
        <NavLink to={"/stream/details/1"}>
            <Box position="relative"
                 width={"100%"}
                 height={"100%"}
            >
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
                    <Typography variant="body2"  color="white">
                        18:00
                    </Typography>
                </Box>
                {
                    !type ? <Box
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
                    </Box> : <Box
                        sx={{
                            position: "absolute",
                            p: "6px",
                            right: "22px",
                            top: "22px",
                            background: "#E32967",
                            borderRadius: "9px",
                        }}
                    >
                        <Typography variant="body2" textTransform="uppercase" color="white">
                            В ЭФИРЕ
                        </Typography>
                    </Box>
                }
                <Box
                    position={"relative"}
                    width={"247px"}
                    height={"100%"}
                    borderRadius={"9px"}
                    overflow={"hidden"}
                >
                    <img src={img} style={{ width: '100%',height: '100%' ,objectFit:"cover" }} alt="" />

                </Box>
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
        </NavLink>

      <Box
        p="16px 0"
        ml={3}
        flexDirection="column"
        display="flex"
        justifyContent="space-between"
        alignItems="space-between"
      >
        <NavLink to={"/stream/details/1"}>
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
        </NavLink>
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection={!Announce ? "" : "column-reverse"}
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
            <Box>
                <Button size="small" color="primary" variant="contained">
                    <FontAwesomeIcon
                        icon="bell"
                        style={{ marginRight: 8 }}
                    />
                    Напомнить
                </Button>
                <Button sx={{marginLeft:"10px"}} size="small" color="primary" variant="contained">
                    <FontAwesomeIcon
                        icon="share-from-square"
                        style={{ marginRight: 8 }}
                    />
                    ПОДЕЛИТЬСЯ
                </Button>
            </Box>
            <Box display={"flex"} marginY={!Announce ? "" : "8px"}>
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
            </Box>
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

export default StreamCard;
