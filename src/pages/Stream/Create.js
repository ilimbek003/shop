import {Button, TextField, Typography, useMediaQuery} from "@mui/material";
import {Box, Container, useTheme} from "@mui/system";
import {useFormik} from "formik";
import React from "react";
import Stack from '@mui/material/Stack';
import "./CreateStyle.css"
import Search from "./Search";

const StreamCreate = ({
                          t,
                          open,
                          cartSum,
                          setOpen,
                          streamSearch,
                          setStreamSearch,
                          catalog,
                          setLoading,
                      }) => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down(768));
    const formik = useFormik({
        initialValues: {
            date: "",
            title: "",
            image: null,
        },
        onSubmit: (data) => {
            console.log(data)
        },
    });
    return (
        <Box component="section" backgroundColor="#F6F7F9">
            <Container maxWidth="xl" style={{
                marginTop: "-134px",
                paddingTop: "140px",
                marginBottom: "-25px",
                paddingBottom: "20px",
                zIndex : "1",
                position:"relative",
            }}>
                <Box
                    width={"100%"}
                    position={"relative"}
                    component={"form"}
                    onSubmit={formik.handleSubmit}>
                    <Box
                        width={"100%"}
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        component={"section"}
                    >
                        <Typography
                            fontSize={"32px"}
                            variant="h5"
                            fontWeight="700"
                            lineHeight="29px"
                            width={"60%"}
                        >
                            Создание эфира
                        </Typography>
                        <Button
                            sx={{p: "8px 16px!important", fontSize: 14, background: "#E32967 !important", color: "white"}}
                            color="primary"
                            variant="contained"
                            type="submit"
                            size="medium"
                        >
                            Создать прямой эфир
                        </Button>
                    </Box>
                    <Box
                        width={"100%"}
                        display={"flex"}
                        flexWrap={"wrap"}
                        justifyContent={"space-between"}
                    >
                        <Box
                            width={"100%"}
                            position={"relative"}
                            mt={6}
                            mb={4}
                        >
                            <Typography
                                fontSize="12px"
                                color="#000"
                                textTransform="uppercase"
                                mb={1}
                                sx={{opacity:"0.4"}}
                                fontWeight="400"
                            >
                                Название Эфира
                            </Typography>
                            <TextField
                                type={"text"}
                                name="title"
                                placeholder={"Название истории"}
                                onChange={formik.handleChange}
                                value={formik.values.title}
                                fullWidth
                            />
                        </Box>
                        <Box
                            width={"48%"}
                            position={"relative"}
                        >
                            <Typography
                                fontSize="12px"
                                color="#000"
                                textTransform="uppercase"
                                mb={1}
                                fontWeight="400"
                                sx={{opacity:"0.4"}}
                            >
                                Фото Анонса
                            </Typography>
                            <Box
                                required
                                sx={{
                                    background:"#FFFFFF",
                                    position:"relative",
                                    opacity:1,
                                    width:"100%",
                                    padding: "16.5px 12.5px  10px 12.5px",
                                    borderRadius:"8px",
                                }}
                            >
                                <TextField
                                    sx={{position:"absolute"}}
                                    type={"file"}
                                    hidden
                                    accept="image/*"
                                    multiple
                                    name="image"
                                    className={"input-file"}
                                    placeholder={"file.png"}
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                />
                                <Typography
                                    fontSize="14px"
                                    color="#000"
                                    mb={1}
                                    fontWeight="400"
                                    sx={{opacity:"1"}}
                                >
                                    file.png
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            width={"48%"}
                            position={"relative"}
                        >
                            <Typography
                                fontSize="12px"
                                color="#000"
                                textTransform="uppercase"
                                mb={1}
                                sx={{opacity:"0.4"}}
                                fontWeight="400"
                            >
                                Дата и время эфира
                            </Typography>
                            <Stack component="form" noValidate spacing={3}>
                                <TextField
                                    required
                                    name="date"
                                    type="datetime-local"
                                    defaultValue={!formik.values.date?"2023-01-01T10:30":formik.values.date}
                                    onChange={formik.handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth={true}
                                />
                            </Stack>
                        </Box>
                    </Box>
                </Box>
                <Box
                    width={"100%"}
                    position={"relative"}
                    component={"section"}
                >
                    <Search
                        catalog={catalog}
                        t={t}
                        streamSearch={streamSearch}
                        setStreamSearch={setStreamSearch}
                        setLoading={setLoading}
                    />
                </Box>
            </Container>
        </Box>
    );
};

export default StreamCreate;
