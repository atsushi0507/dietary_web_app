import React from "react";
import styled from "styled-components";
import Grid from "@mui/material/Grid2";
import RadarChart from "@/components/atoms/RadarChart";
import { List, ListItemText, Typography } from "@mui/material";
import useCalcDailyTotalCalories from "@/hooks/useCalcDailyTotalCalories";
import useCalcWeeklyNutrition from "@/hooks/useCalcWeeklyNutrition";
import useEvaluateDiet from "@/hooks/useEvaluateDIet";

const scores = [
    {
        "label": "カロリー",
        "score": 5.0,
    },
    {
        "label": "PFCバランス",
        "score": 4.2,
    },
    {
        "label": "食事回数",
        "score": 3.5,
    },
    {
        "label": "カロリーバランス",
        "score": 3.2,
    },
    {
        "label": "安定性",
        "score": 4.8,
    }
];

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
    console.log(evaluation);

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
                        食事スコア: A
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
                            // indicators={["タンパク質", "脂質", "炭水化物"]}
                            indicators={["P", "F", "C", "S", "O"]}
                            seriesData={[
                                { name: "", values: [5.0, 4.2, 3.5, 3.2, 4.8], color: "rgba(255, 188, 52, 0.6)" },
                            ]}
                            maxValues={[5, 5, 5]}
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