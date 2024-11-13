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
import styled from "styled-components";
import TopReport from "./topReport";
import useCalcTodaysNutrition from "@/hooks/useMealData";

const tabOptions = [
    { icon: <RestaurantIcon />, label: "食事" },
    { icon: <LocalFireDepartmentIcon />, label: "カロリー" },
    { icon: <BalanceIcon />, label: "バランス" }
];

const samplePerson = {
    "cal": 2230.4,
    "P": 88.0,
    "F": 65.2,
    "C": 352.1
}

const Main = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const sampleFromLS = useCalcTodaysNutrition();

    const handleSelectedTab = (e, newValue) => {
        setSelectedTab(newValue);
    }

    return (
        <Grid container direction="column">
            <Grid size={12}>
                <TopReport mealData={sampleFromLS} person={samplePerson}/>
            </Grid>
            <Grid size={12}>
                <BasicTab
                    items={tabOptions}
                    value={selectedTab}
                    onChange={handleSelectedTab}
                />
                {selectedTab === 0 && <MenuList mealData={sampleFromLS} />}
                {selectedTab === 1 && <CalorieRanking mealData={sampleFromLS} />}
                {selectedTab === 2 && <BalanceRanking mealData={sampleFromLS} person={samplePerson}/>}
            </Grid>
        </Grid>
    );
};

export default Main;

const TopContainer = styled.div`
    height: 300px;
    padding: 10px;
`;
