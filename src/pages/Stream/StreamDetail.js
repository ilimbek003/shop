import React from "react";
import {Box, Button, Grid, Typography} from "@mui/material";
import img from "../../assets/images/live-card.png";
import avatar from "../../assets/images/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Container} from "@mui/system";

const StreamDetail = ({ announce, profuct ,type}) => {
    return (
        <Container maxWidth="xl" >
            <Grid
                container
                className="scroll"
                flexWrap={{ xs: "nowrap", md: "wrap" }}
                sx={{
                    background: "#FFFFFF"
                }}
            >
                <Grid xs={6} md={4} lg={5}
                      sx={{
                          height:"350px",
                          overflow: "hidden",
                          width: "100%"
                      }}
                >
                    <img src={"https://media.cntraveler.com/photos/53dab084dcd5888e145c5ac7/master/w_1024,h_1279,c_limit/java-temple-complex-prambanan-remains-indonesia-0212.jpg"} style={{ width: "100%", height: "100%",objectFit:"cover" }} alt="" />
                </Grid>
                <Grid xs={6} md={4} lg={7}>
                    <Box
                        p="10px 20px 10px 0"
                        ml={3}
                        height={"100%"}
                        flexDirection="column"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="space-between"
                    >
                        <div>
                            <Box sx={{display:"flex",margin : "8px 0"}}>
                                <Box
                                    sx={{
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
                                <Box
                                    sx={{
                                        ml:"10px",
                                        p: "6px",
                                        left: "22px",
                                        top: "22px",
                                        background: "rgba(0, 0, 0, 0.59)",
                                        borderRadius: "9px",
                                    }}
                                >
                                    <Typography variant="body2"  color="white">
                                        13 июля в 23:00
                                    </Typography>
                                </Box>
                            </Box>
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
                                fontSize={announce ? "20px" : "28px"}
                                lineHeight={announce ? "29px" : "34px"}
                            >
                                Обзор новой поставки товаров в честь распродажи 20-26 июня, розыгрыш
                                промокодов на скидку 12%{" "}
                            </Typography>
                            <Typography variant="body2" mt={1} mb={2}>
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
                </Grid>


            </Grid>
            <Box
                position={"relative"}
                width={"100%"}
                marginY={"4%"}
            >
                <Typography
                    variant={"h1"}
                    fontWeight="700"
                    fontSize={"22px"}
                    lineHeight={announce ? "29px" : "34px"}
                >7 товаров на стриме</Typography>
                <Typography
                    fontWeight="300"
                    fontSize={"16px"}
                    lineHeight={announce ? "29px" : "34px"}
                >Специальное предложение на товары во время прямого эфира!</Typography>
            </Box>
        </Container>
    );
};

export default StreamDetail;
