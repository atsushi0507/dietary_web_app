import { Container, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import styled from "styled-components";

const Features = () => {
    return (
        <Container
            id="features"
            sx={{py: {xs: 8, sm: 16}}}
        >
            <Box marginBottom="20px" sx={{width: { sm: "100%", md: "60%"}}}>
                <Typography
                    variant="h2"
                    align="center"
                    sx={{
                        alignItems: "center"
                    }}
                >
                    食事習慣を<br/>スコア化します
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
            <Grid container spacing={2} alignItems="center" marginBottom="40px">
                <Grid size={6}>
                    <CardArea
                        bgimage="/coffee.jpg"
                    />
                </Grid>
                <Grid size={6}>
                    <Typography variant="h4" align="center">
                        簡単にスコア化
                    </Typography>
                    <Typography >
                        食事スコアは、あなたの食事習慣を迅速かつ簡単にスコア化します。視覚的なフィードバックで、すぐに改善点を見つけることができます。
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={2} alignItems="center" marginBottom="40px">
                <Grid size={6}>
                    <Typography variant="h4" align="center">
                        詳細な分析
                    </Typography>
                    <Typography >
                        食事スコアは、詳細なビジュアル分析を提供し、あなたの食事習慣の強みと弱みを明確にします。
                    </Typography>
                </Grid>
                <Grid size={6}>
                    <CardArea
                        bgimage="/analysis.jpg"
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2} alignItems="center" marginBottom="40px">
                <Grid size={6}>
                    <CardArea
                        bgimage="/kitchen.jpg"
                    />
                </Grid>
                <Grid size={6}>
                    <Typography variant="h4" align="center" sx={{alignItems: "center"}}>
                        明確な<br/>フィードバック
                    </Typography>
                    <Typography >
                        具体的なフィードバックを提供し、あなたの食生活を向上させる手助けをします。
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={2} alignItems="center" marginBottom="40px">
                <Grid size={6}>
                    <Typography variant="h4" align="center">
                        使いやすさ
                    </Typography>
                    <Typography >
                        食事スコアは、直感的なインターフェースで簡単に使用できます。他のサービスと比べて、迅速かつ効果的に食事習慣を改善することができます。
                    </Typography>
                </Grid>
                <Grid size={6}>
                    <CardArea
                        bgimage="/meat.jpg"
                    />
                </Grid>
            </Grid>

        </Container>
    );
};

export default Features;

const CardArea = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  border: 2px solid #ccc;
  width: 95%;
  height: 150px;
  display: flex;
  flex-direction: row;
  background-color: #f5f5f5;
  border-radius: 4px;
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.bgimage});
`;
