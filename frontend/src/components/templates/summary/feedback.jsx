import React from "react";
import styled from "styled-components";
import Grid from "@mui/material/Grid2";
import RadarChart from "@/components/atoms/RadarChart";
import { List, ListItemText, Typography } from "@mui/material";
import useCalcDailyTotalCalories from "@/hooks/useCalcDailyTotalCalories";
import useCalcWeeklyNutrition from "@/hooks/useCalcWeeklyNutrition";
import useEvaluateDiet from "@/hooks/useEvaluateDiet";


const sampleFeedback = "カロリー管理が完璧ですね！全体的にバランスも良く、特に安定性が素晴らしいです。朝食を取る習慣をつけると、さらに体調が良くなるかもしれません。また、夕食の量を少し調整し、朝昼のカロリーを増やすことで、もっと効果的なバランスが取れますよ。引き続き、この調子で食事管理を進めてみましょう！"

const samplePerson = {
    "cal": 2230.4,
    "P": 88.0,
    "F": 65.2,
    "C": 352.1
}

const Feedback = () => {
    const weeklyData = useCalcWeeklyNutrition();
    const dairyCalories = useCalcDailyTotalCalories(weeklyData);

    const evaluation = useEvaluateDiet(weeklyData, samplePerson);

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
            label: "食事回数",
            score: evaluation.食事回数 || 0,
        },
        {
            label: "カロリーバランス",
            score: evaluation.食事バランス || 0,
        },
        {
            label: "安定性",
            score: evaluation.安定性 || 0,
        },
    ];
    const rank = evaluation.rank || null;

    return (
        <Container>
            <Grid
                container
                spacing={1}
                columns={12}
            >
                <Grid
                    size={{xs: 6, md: 4, lg: 9}}
                >
                    <UpperPart>
                    <Typography variant={{sx: "h3", md: "h3", lg: "h2"}} fontWeight="bold">
                        食事スコア: {rank}
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
                    size={{xs: 6, lg: 3}}
                >
                    <UpperPart>
                        <Typography variant="subtitle1" sx={{display: "flex", justifyContent: "center"}} fontWeight="bold">
                            評価項目別得点
                        </Typography>
                        <RadarChart 
                            title=""
                            darkMode={false}
                            indicators={["カロリー", "PFC", "食事回数", "バランス", "安定性"]}
                            seriesData={[
                                { name: "", values: scores.map((s) => s.score), color: "rgba(255, 188, 52, 0.6)" },
                            ]}
                            maxValues={[5, 5, 5, 5, 5]}
                            chartHeight="150px"
                            unit=""
                        />
                    </UpperPart>
                </Grid>
                <Grid
                    size={{xs: 12}}
                >
                    <Typography variant="subtitle1" fontWeight="bold">
                        フィードバック
                    </Typography>
                    <Typography variant="body1">
                        {sampleFeedback}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Feedback;

const Container = styled.div`
    height: 380px;
    width: 100%;
    background-color: rgba(0, 0, 255, 0.3);
`

const UpperPart = styled.div`
    height: 180px;
    width: 100%;
    background-color: rgba(0, 255, 0, 0.3);
`

const BottomPart = styled.div`
    height: 200px;
    background-color: rgba(120, 0, 0, 0.3);
`