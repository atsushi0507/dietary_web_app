import { Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

const mealTypes = [
    "朝食",
    "昼食",
    "夕食",
    "間食"
]

const MenuList = ({ mealData }) => {
    return (
        <Container>
            {mealTypes.map((mealType) => (
                <div key={mealType}>
                    {/* 食事タイプを subtitle2 で表示 */}
                    <Typography variant="h6">
                        {mealType}
                    </Typography>
                    
                    {/* 食事データが存在するか確認 */}
                    {mealData.length > 0 ? (
                        mealData.map((item, index) => (
                            <MenuContainer key={index}>
                                <Typography variant="body1">
                                    {item.menus.key}
                                </Typography>
                            </MenuContainer>
                        ))
                    ) : (
                        <Typography variant="body1" color="textSecondary">
                            記録なし
                        </Typography>
                    )}
                    {/* {mealData.mealRecords[mealType] ? (
                        mealData.mealRecords[mealType].map((item, index) => (
                            <MenuContainer key={index}>
                                <Typography variant="body1">
                                    {item.name}:
                                </Typography>
                                
                                <Typography variant="body1" color="textSecondary" sx={{marginLeft: "8px"}}>
                                    {`${item.calories} kcal`}
                                </Typography>
                            </MenuContainer>
                        ))
                    ) : (
                        <Typography variant="body1" color="textSecondary">
                            記録なし
                        </Typography>
                    )} */}
                </div>
            ))}
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