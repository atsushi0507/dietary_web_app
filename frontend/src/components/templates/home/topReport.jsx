import React from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CustomProgressBar from "@/components/atoms/customProgressBar";
import RadarChart from "@/components/atoms/RadarChart";

const TopReport = ({mealData, person}) => {
    const allMeals = mealData.flatMap(({meal_type, nutrition}) => 
        nutrition.map(({menu, calories, protein, fat, carb}) => ({menu, calories, protein, fat, carb, meal_type}))
    );

    const totalCalories = allMeals.reduce((total, meal) => total + parseFloat(meal.calories || 0), 0);
    const totalProtein = allMeals.reduce((total, meal) => total + parseFloat(meal.protein || 0), 0);
    const totalFat = allMeals.reduce((total, meal) => total + parseFloat(meal.fat || 0), 0);
    const totalCarb = allMeals.reduce((total, meal) => total + parseFloat(meal.carb || 0), 0);

    const proteinScore = totalProtein / person.P * 100;
    const fatScore = totalFat / person.F * 100;
    const carbScore = totalCarb / person.C * 100;

    return (
        <TopContainer>
            <Grid container direction="row">
                <Grid size={6}>
                    <div style={{backgroundColor: "rgba(0, 0, 255, 0.3)", height: "180px"}}>
                        <ProgressBarArea>
                            <Typography variant="body1">
                                あと{Math.round((person.cal - totalCalories) * 10) / 10} kcal
                            </Typography>
                            <CustomProgressBar
                                value={80}
                                maxValue={150}
                                showGuidelines={true}
                                guidelineValues={[90, 100, 110]}
                                ranges={[
                                    {start: 90, end: 110, fillColor: "rgba(0, 255, 0, 0.8)"}
                                ]}
                            />
                            <Typography variant="body2">
                                タンパク質: あと {Math.round((person.P - totalProtein) * 10) / 10} g
                            </Typography>
                            <Typography variant="body2">
                                脂質: あと {Math.round(((person.F - totalFat) * 10) / 10)} g
                            </Typography>
                            <Typography variant="body2">
                                炭水化物: あと {Math.round((person.C - totalCarb) * 10) / 10} g
                            </Typography>
                        </ProgressBarArea>
                        <ScoreArea>
                            <Typography variant="body1">
                                最近の食事スコア: <strong>B</strong>
                            </Typography>
                        </ScoreArea>
                    </div>
                </Grid>
                <Grid size={6}>
                    <div style={{backgroundColor: "rgba(0, 255, 0, 0.3)", height: "180px"}}>
                    <Typography variant="subtitle1" sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        PFCバランス
                    </Typography>
                    <RadarChart 
                        title="PFCバランス"
                        darkMode={false}
                        // indicators={["タンパク質", "脂質", "炭水化物"]}
                        indicators={["P", "F", "C"]}
                        seriesData={[
                            { name: "", values: [proteinScore, fatScore, carbScore], color: "rgba(255, 188, 52, 0.6)" },
                        ]}
                        maxValues={[100, 100, 100]}
                        chartHeight="180px"
                    />

                    </div>
                </Grid>
                <div style={{height: "120px"}}>
                        <FeedbackArea>
                            <Typography variant="body1">
                                脂質が多かったので、次の食事では低脂質な食事を心がけましょう。xxx などがおすすめです。
                                必要なマテリアルは揃ったが、並べ方は工夫の余地あり。
                                Progress bar and score area need more information.
                            </Typography>
                        </FeedbackArea>
                    </div>
            </Grid>
        </TopContainer>
    );
};

export default TopReport;

const TopContainer = styled.div`
    height: 300px;
    padding: 10px;
`

const ProgressBarArea = styled.div`
    height: 120px;
    padding: 10px;
    background-color: rgba(255, 0, 255, 0.3);
    display: flex;
    flex-direction: column;
`

const ScoreArea = styled.div`
    height: 60px;
    padding: 10px;
    background-color: rgba(144, 60, 80, 0.3);
`

const FeedbackArea = styled.div`
    height: 120px;
    padding: 10px;
    background-color: rgba(30, 30, 140, 0.3);
`