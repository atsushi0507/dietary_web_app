"use client";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import BasicTab from "@/components/atoms/Tab";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import BalanceIcon from '@mui/icons-material/Balance';
import MenuList from "./menuList";
import sampleData from "@/public/sampleMeals.json";
import CalorieRanking from "./calorieRanking";
import BalanceRanking from "./balanceRanking";
// import CustomProgressBar from "@/components/atoms/customProgressBar";
import styled from "styled-components";
import TopReport from "./topReport";
import useCalcNutrition from "@/hooks/useMealData";

const tabOptions = [
    { icon: <RestaurantIcon />, label: "食事" },
    { icon: <LocalFireDepartmentIcon />, label: "カロリー" },
    { icon: <BalanceIcon />, label: "バランス" }
];

const Main = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const sampleFromLS = useCalcNutrition();
    console.log("Menu List");
    console.log(sampleFromLS);

    const handleSelectedTab = (e, newValue) => {
        setSelectedTab(newValue);
    }

    return (
        <Grid container direction="column">
            <Grid size={12}>
                <TopReport />
            </Grid>
            <Grid size={12}>
                <BasicTab
                    items={tabOptions}
                    value={selectedTab}
                    onChange={handleSelectedTab}
                />
                {selectedTab === 0 && <MenuList mealData={sampleData}/>}
                {/* {selectedTab === 0 && <MenuList mealData={sampleFromLS} />} */}
                {selectedTab === 1 && <CalorieRanking mealData={sampleData} />}
                {selectedTab === 2 && <BalanceRanking mealData={sampleData} />}
            </Grid>
        </Grid>
    );
};

export default Main;

const TopContainer = styled.div`
    height: 300px;
    padding: 10px;
`;
