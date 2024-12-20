import React from "react";
import styled from "styled-components";
import Grid from "@mui/material/Grid2";
import RadarChart from "@/components/atoms/RadarChart";
import { List, ListItemText, Typography } from "@mui/material";
import useCalcWeeklyNutrition from "@/hooks/useCalcWeeklyNutrition";
import useEvaluateDiet from "@/hooks/useEvaluateDiet";
import useGenerateFeedback from "@/hooks/useGenerateFeedback";

const sampleFeedback = "カロリー管理が完璧ですね！全体的にバランスも良く、特に安定性が素晴らしいです。朝食を取る習慣をつけると、さらに体調が良くなるかもしれません。また、夕食の量を少し調整し、朝昼のカロリーを増やすことで、もっと効果的なバランスが取れますよ。引き続き、この調子で食事管理を進めてみましょう！"

const Feedback = () => {
    const personalData = JSON.parse(localStorage.getItem("userData"));
    const basicInfo = {
        "cal": personalData.cal,
        "P": personalData.protein,
        "F": personalData.fat,
        "C": personalData.carb
    }

    const weeklyData = useCalcWeeklyNutrition();

    const evaluation = useEvaluateDiet(weeklyData, basicInfo);
    const message = useGenerateFeedback(evaluation);

    const scores = [
        {
            label: "カロリー達成度",
            score: evaluation.カロリー達成度 || 0, // フックの結果に合わせる
        },
        {
            label: "PFCバランス",
            score: evaluation.PFCバランス || 0,
        },
        {
            label: "カロリーバランス",
            score: evaluation.食事バランス || 0,
        }
    ];
    const rank = evaluation.rank || null;

    return (
        <Container>
            <Grid
                container
                spacing={0.5}
                columns={12}
            >
                <Grid
                    size={{xs: 6, lg: 6}}
                >
                    <UpperPart>
                    <Typography variant={{sx: "h3", md: "h3", lg: "h2"}} fontWeight="bold">
                        総合評価: {rank}
                        <List style={{marginLeft: "8px"}}>
                        {scores.map((scoreData, index) => (
                            <ListItemText
                                key={index}
                                primary={`${scoreData.label}: ${scoreData.score}点`}
                            />
                        ))}
                        </List>
                    </Typography>
                    
                    </UpperPart>
                </Grid>
                <Grid
                    size={{xs: 6, lg: 6}}
                >
                        <RadarChartArea>
                            <RadarChart 
                                title=""
                                darkMode={false}
                                indicators={["カロリー", "PFC", "バランス"]}
                                seriesData={[
                                    { name: "", values: scores.map((s) => s.score), color: "rgba(255, 188, 52, 0.6)" },
                                ]}
                                maxValues={[5, 5, 5]}
                                chartHeight="135px"
                                unit=""
                            />
                        </RadarChartArea>
                </Grid>
                <Grid
                    size={{xs: 12}}
                    padding={"4px"}
                    boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
                    border="2px solid #ccc"
                    borderRadius="4px"
                    sx={{
                        height: "224px",
                        overflow: "auto"
                    }}
                >
                    <Typography variant="subtitle1" fontWeight="bold">
                        フィードバック
                    </Typography>
                    <Typography variant="body1">
                        {message}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Feedback;

const Container = styled.div`
    height: 380px;
    width:100%;
    justify-content: center;
    background-color: #f5f5f5;
`

const UpperPart = styled.div`
    height: 150px;
    width: 100%;
    background-color: #f5f5f5;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 2px solid #ccc;
    border-radius: 4px;
`

const RadarChartArea= styled.div`
    height: 150px;
    width: 100%;
    background-color: #f5f5f5;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 2px solid #ccc;
    border-radius: 4px;
    padding-top: 16px;
    margin-right: 16px;
`

const BottomPart = styled.div`
    height: 230px;
`