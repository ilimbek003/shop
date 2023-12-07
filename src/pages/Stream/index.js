import React from "react";
import {Button, Container, Grid, Link} from "@mui/material";
import StreamCard from "./Card";
import { Box } from "@mui/system";
import StreamSlide, {SlideBlock} from "./StreamSlide";

const Index = () => {
    return (
        <Box component="section" backgroundColor="#F6F7F9">
            <Container maxWidth="xl" style={{
                marginTop: "-134px",
                paddingTop: "100px",
                zIndex : "1",
                position:"relative",
            }}>
                <Link
                    href={"/stream/create"}
                    style={{
                        display: "block",
                        textDecoration:"none",

                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            display: "table",
                            m: "59px auto",
                            backgroundColor: "var(--purple)",
                            boxShadow: `0px 150px 80px rgba(143, 39, 198, 0.18), 0px 62.6664px 33.4221px rgba(143, 39, 198, 0.129394), 0px 33.5045px 17.869px rgba(143, 39, 198, 0.107299), 0px 18.7823px 10.0172px rgba(143, 39, 198, 0.09), 0px 9.97515px 5.32008px rgba(143, 39, 198, 0.0727007), 0px 4.15088px 2.21381px rgba(143, 39, 198, 0.0506062);`,
                        }}
                        size="medium"
                    >
                        СОЗДАТЬ СВОЙ ПРЯМОЙ ЭФИР
                    </Button>
                </Link>
                <SlideBlock>
                    <StreamSlide />
                </SlideBlock>
                <Grid container spacing={2} mt={8}>
                    {Array.from(Array(8).keys()).map((item) => (
                        <Grid item xs={6}>
                            <StreamCard  profuct={item} announce Announce={true} type={true} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Index;
