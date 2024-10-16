import React from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";

const CalorieRanking = ({ mealData }) => {
    const allMeals = Object.entries(mealData.mealRecords).flatMap(([mealType, items]) =>
     items ? items.map(item => ({ ...item, type: mealType })) : []
    );
    const sortedMeals = allMeals.sort((a, b) => b.calories - a.calories).slice(0, 10);

    return (
        <div>
            {sortedMeals.length > 0 ? (
                sortedMeals.map((item, index) => (
                    <MealContainer key={index}>
                        <Typography variant="subtitle1">
                            {`${index+1}. ${item.name}:`}
                        </Typography>
                        <Typography variant="body1" sx={{marginLeft: "8px"}}>
                            {`${item.calories} kcal`}
                        </Typography>
                    </MealContainer>
                ))
            ) : (
                <Typography variant="body1" color="textSecondary">
                    データがありません
                </Typography>
            )}
        </div>
    );
};

export default CalorieRanking;

const MealContainer = styled.div`
    display: flex;
`