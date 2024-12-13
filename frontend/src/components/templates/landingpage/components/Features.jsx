import { Container, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import styled from "styled-components";
// import CardArea from "./Card";

const Features = () => {
    return (
        <Container
            id="features"
            sx={{py: {xs: 8, sm: 16}}}
        >
            <Box sx={{width: { sm: "100%", md: "60%"}}}>
                <Typography
                    variant="h2"
                    sx={{
                        display: "flex",
                        flexDirection: {sx: "column", sm: "row"},
                        alignItems: "center"
                    }}
                >
                    食事習慣をスコア化します
                </Typography>
                <Typography
                    sx={{
                        textAlign: "center",
                        color: "text.secondary",
                        width: { sm: "100%", md: "80%"}
                    }}
                >
                    食生活の改善を促進します
                </Typography>
            </Box>

            {/* サービス説明エリア */}
            <Grid container spacing={2} alignItems="center">
                <Grid size={6}>
                <CardArea
                    // backgroundImage="url(https://unsplash.it/120/120)"
                >
                    {/* <CardImage 
                        src="https://unsplash.it/120/120"
                        alt="hoge"
                    /> */}
                </CardArea>
                </Grid>
                <Grid size={6}>
                    <Typography variant="h4">
                        簡単にスコア化
                    </Typography>
                    <Typography >
                    食事スコアは、あなたの食事習慣を迅速かつ簡単にスコア化します。視覚的なフィードバックで、すぐに改善点を見つけることができます。
                    </Typography>
                </Grid>
            </Grid>

        </Container>
    );
};

export default Features;

const CardArea = styled.div`
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
    padding: 16px;
    border: 2px solid #ccc;
    width: 95%;
    height: 150px;
    display: flex;
    flex-direction: row;
    background-color: #f5f5f5;
    border-radius: 4px;
    /* background-image: ${(props) => `url(${props.backgroundImage})`}; */
    background-size: cover;
    background-position: center;
`

const CardImage = styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
`