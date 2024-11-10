import React from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";


const BalanceRanking = ({ mealData, person }) => {
    const allMeals = mealData.flatMap(({meal_type, nutrition}) => 
        nutrition.map(({menu, protein, fat, carb}) => ({menu, protein, fat, carb, meal_type}))
    );
    const sortedProtein = [...allMeals].sort((a, b) => b.protein - a.protein).slice(0, 5);
    const sortedFat = [...allMeals].sort((a, b) => b.fat - a.fat).slice(0, 5);
    const sortedCarbo = [...allMeals].sort((a, b) => b.carb - a.carb).slice(0, 5);

    const totalP = allMeals.reduce((total, meal) => total + parseFloat(meal.protein || 0), 0);
    const totalF = allMeals.reduce((total, meal) => total + parseFloat(meal.fat || 0), 0);
    const totalC = allMeals.reduce((total, meal) => total + parseFloat(meal.carb || 0), 0);
    return (
        <Container>
            <Typography variant="h6">タンパク質: {Math.round(totalP / person.P * 10 * 100) / 10}%</Typography>
            {sortedProtein.length > 0 ? (
                sortedProtein.map((item, index) => (
                    <MealContainer key={index}>
                        <Typography variant="body1">
                            {`${index+1}. ${item.menu}: `}
                        </Typography>
                        <Typography variant="body1" sx={{marginLeft: "8px"}}>
                            {`${item.protein} g (${item.meal_type})`}
                        </Typography>
                    </MealContainer>
                ))
            ) : (
                <Typography variant="body1" color="textSecondary">
                    データがありません
                </Typography>
            )}
            <Typography variant="h6">
                脂質: {Math.round((totalF / person.F) * 1000) / 10}%
            </Typography>
            {sortedFat.length > 0 ? (
                sortedFat.map((item, index) => (
                    <MealContainer key={index}>
                        <Typography variant="body1">
                            {`${index+1}. ${item.menu}: `}
                        </Typography>
                        <Typography variant="body1" sx={{marginLeft: "8px"}}>
                            {`${item.fat} g (${item.meal_type})`}
                        </Typography>
                    </MealContainer>
                ))
            ) : (
                <Typography variant="body1" color="textSecondary">
                    データがありません
                </Typography>
            )}
            <Typography variant="h6">炭水化物: {Math.round(totalC / person.C * 10 * 100) / 10}%</Typography>
            {sortedCarbo.length > 0 ? (
                sortedCarbo.map((item, index) => (
                    <MealContainer key={index}>
                        <Typography variant="body1">
                            {`${index+1}. ${item.menu}: `}
                        </Typography>
                        <Typography variant="body1" sx={{marginLeft: "8px"}}>
                            {`${item.carb} g (${item.meal_type})`}
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