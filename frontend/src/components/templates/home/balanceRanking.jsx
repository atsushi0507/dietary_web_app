import React from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";

const samplePerson = {
    "P": 88.0,
    "F": 65.2,
    "C": 352.1
}

const BalanceRanking = ({ mealData }) => {
    const allMeals = Object.entries(mealData.mealRecords).flatMap(([mealType, items]) => 
        items ? items.map(item => ({...item, type: mealType})) : []
    );
    const sortedProtein = allMeals.sort((a, b) => b.P - a.P).slice(0, 5);
    const sortedFat = allMeals.sort((a, b) => b.F - a.F).slice(0, 5);
    const sortedCarbo = allMeals.sort((a, b) => b.C - a.C).slice(0, 5);

    const totalP = allMeals.reduce((total, meal) => total + (meal.P || 0), 0);
    const totalF = allMeals.reduce((total, meal) => total + (meal.F || 0), 0);
    const totalC = allMeals.reduce((total, meal) => total + (meal.C || 0), 0);
    return (
        <Container>
            <Typography variant="h6">タンパク質: {Math.round(totalP / samplePerson.P * 10 * 100) / 10}%</Typography>
            {sortedProtein.length > 0 ? (
                sortedProtein.map((item, index) => (
                    <MealContainer key={index}>
                        <Typography variant="body1">
                            {`${index+1}. ${item.name}`}
                        </Typography>
                        <Typography variant="body1" sx={{marginLeft: "8px"}}>
                            {`${item.P} g`}
                        </Typography>
                    </MealContainer>
                ))
            ) : (
                <Typography variant="body1" color="textSecondary">
                    データがありません
                </Typography>
            )}
            <Typography variant="h6">脂質: {Math.round(totalF / samplePerson.F * 10 * 100) / 10}%</Typography>
            {sortedFat.length > 0 ? (
                sortedFat.map((item, index) => (
                    <MealContainer key={index}>
                        <Typography variant="body1">
                            {`${index+1}. ${item.name}`}
                        </Typography>
                        <Typography variant="body1" sx={{marginLeft: "8px"}}>
                            {`${item.F} g`}
                        </Typography>
                    </MealContainer>
                ))
            ) : (
                <Typography variant="body1" color="textSecondary">
                    データがありません
                </Typography>
            )}
            <Typography variant="h6">炭水化物: {Math.round(totalC / samplePerson.C * 10 * 100) / 10}%</Typography>
            {sortedCarbo.length > 0 ? (
                sortedCarbo.map((item, index) => (
                    <MealContainer key={index}>
                        <Typography variant="body1">
                            {`${index+1}. ${item.name}`}
                        </Typography>
                        <Typography variant="body1" sx={{marginLeft: "8px"}}>
                            {`${item.C} g`}
                        </Typography>
                    </MealContainer>
                ))
            ) : (
                <Typography variant="body1" color="textSecondary">
                    データがありません
                </Typography>
            )}
        </Container>
    );
};

export default BalanceRanking;

const Container = styled.div`
    height: 300px;
    overflow: auto;
    padding: 10px;
`

const MealContainer = styled.div`
    display: flex;
`