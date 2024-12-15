import React from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CustomProgressBar from "@/components/atoms/customProgressBar";
import RadarChart from "@/components/atoms/RadarChart";
import useCalcWeeklyNutrition from "@/hooks/useCalcWeeklyNutrition";
import useEvaluateDiet from "@/hooks/useEvaluateDiet";
import useGenerateFeedback from "@/hooks/useGenerateFeedback";
import { useRouter } from "next/navigation";

const TopReport = ({mealData, person}) => {
    const MAX_LENGTH = 78;
    const router = useRouter();

    const allMeals = mealData.flatMap(({meal_type, nutrition}) => 
        nutrition.map(({menu, calories, protein, fat, carb}) => ({menu, calories, protein, fat, carb, meal_type}))
    );

    const totalCalories = allMeals.reduce((total, meal) => total + parseFloat(meal.calories || 0), 0);
    const totalProtein = allMeals.reduce((total, meal) => total + parseFloat(meal.protein || 0), 0);
    const totalFat = allMeals.reduce((total, meal) => total + parseFloat(meal.fat || 0), 0);
    const totalCarb = allMeals.reduce((total, meal) => total + parseFloat(meal.carb || 0), 0);

    const calScore = totalCalories / person.cal * 100;
    const proteinScore = totalProtein / person.P * 100;
    const fatScore = totalFat / person.F * 100;
    const carbScore = totalCarb / person.C * 100;

    // 総合評価
    const weeklyData = useCalcWeeklyNutrition();
    const evaluate = useEvaluateDiet(weeklyData, person);
    const message = useGenerateFeedback(evaluate)
    const truncatedMessage = message.length > MAX_LENGTH ? `${message.slice(0, MAX_LENGTH)}...` : message;

    const handleSummaryRedirect = () => {
        router.push('/summary');
    };

    return (
        <TopContainer>
            <Grid container direction="row" spacing={0.5}>
                <Grid size={6}>
                    <ProgressArea>
                        <ProgressBarArea>
                            <Typography variant="body1" marginBottom="4px">
                                あと{Math.round((person.cal - totalCalories) * 10) / 10} kcal
                            </Typography>
                            <CustomProgressBar
                                value={calScore}
                                maxValue={150}
                                showGuidelines={true}
                                guidelineValues={[90, 100, 110]}
                                ranges={[
                                    {start: 90, end: 110, fillColor: "rgba(0, 255, 0, 0.8)"}
                                ]}
                            />
                        </ProgressBarArea>
                        <ScoreArea>
                            <Typography variant="body2" sx={{marginBottom: "4px"}}>
                                タンパク質: あと {Math.round((person.P - totalProtein) * 10) / 10} g
                            </Typography>
                            <Typography variant="body2" sx={{marginBottom: "4px"}}>
                                脂質: あと {Math.round(((person.F - totalFat) * 10) / 10)} g
                            </Typography>
                            <Typography variant="body2" sx={{marginBottom: "4px"}}>
                                炭水化物: あと {Math.round((person.C - totalCarb) * 10) / 10} g
                            </Typography>
                            <Typography variant="subtitle1">
                                食事評価: <strong>{evaluate.rank}</strong>
                            </Typography>
                        </ScoreArea>
                    </ProgressArea>
                </Grid>
                <Grid size={6}>
                    <RadarChartAreat>
                        <RadarChart 
                            title="PFCバランス"
                            darkMode={false}
                            indicators={["P", "F", "C"]}
                            seriesData={[
                                { name: "", values: [proteinScore, fatScore, carbScore], color: "rgba(255, 188, 52, 0.6)" },
                            ]}
                            maxValues={[100, 100, 100]}
                            chartHeight="180px"
                        />
                    </RadarChartAreat>
                </Grid>
                <div style={{height: "120px"}}>
                        <FeedbackArea>
                            <Typography variant="body1">
                                {truncatedMessage}
                                {message.length > MAX_LENGTH && (
                                    <span>
                                        {' '}
                                        <span onClick={handleSummaryRedirect} style={{ color: 'blue', cursor: 'pointer' }}>
                                            サマリーへ
                                        </span>
                                    </span>
                                )}
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

const ProgressArea = styled.div`
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 2px solid #ccc;
    background-color: #f5f5f5;
    border-radius: 4px;
    height: 180px;
    padding-top: 8px;
`

const ProgressBarArea = styled.div`
    height: 60px;
    padding: 4px;
    display: flex;
    flex-direction: column;
`

const ScoreArea = styled.div`
    height: 120px;
    padding: 8px;
`

const FeedbackArea = styled.div`
    height: 120px;
    padding: 10px;
    background-color: #f5f5f5;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 2px solid #ccc;
    border-radius: 4px;
`

const RadarChartAreat = styled.div`
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 2px solid #ccc;
    background-color: #f5f5f5;
    border-radius: 4px;
    height: 180px;
    padding-top: 16px;
`