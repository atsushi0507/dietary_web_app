import { Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

const mealTypes = [
    {label: "朝食", type: "朝食"},
    {label: "昼食", type: "昼食"},
    {label: "夕食", type: "夕食"},
    {label: "間食", type: "間食"},
]

const MenuList = ({ mealData }) => {
    return (
        <Container>
            {mealTypes.map(({ label, type }) => {
                const meal = mealData.find((data) => data.meal_type === type);

                return (
                    <div key={type}>
                        {/* 食事タイプを表示 */}
                        <Typography variant="h6">{label}</Typography>
                        
                        {/* 食事データの有無を確認 */}
                        {meal && meal.nutrition.length > 0 ? (
                            meal.nutrition.map((item, index) => (
                                <MenuContainer key={index}>
                                    <Typography variant="body1">
                                        {item.menu}:
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" sx={{ marginLeft: "8px" }}>
                                        {`${item.calories} kcal`}
                                    </Typography>
                                </MenuContainer>
                            ))
                        ) : (
                            <Typography variant="body1" color="textSecondary">
                                記録なし
                            </Typography>
                        )}
                    </div>
                );
            })}
        </Container>
    );
};

export default MenuList;

const Container = styled.div`
    height: 300px;
    overflow: auto;
    padding: 10px;
`

const MenuContainer = styled.div`
    display: flex;
`