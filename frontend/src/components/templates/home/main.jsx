"use client";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import BasicTab from "@/components/atoms/Tab";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import BalanceIcon from '@mui/icons-material/Balance';
import { Typography } from "@mui/material";
import MenuList from "./menuList";
import sampleData from "@/public/sampleMeals.json";
import CalorieRanking from "./calorieRanking";
import BalanceRanking from "./balanceRanking";
import CustomProgressBar from "@/components/atoms/customProgressBar";

const tabOptions = [
    { icon: <RestaurantIcon />, label: "食事" },
    { icon: <LocalFireDepartmentIcon />, label: "カロリー" },
    { icon: <BalanceIcon />, label: "バランス" }
];

const Main = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleSelectedTab = (e, newValue) => {
        setSelectedTab(newValue);
    }

    return (
        <Grid container direction="column">
            <Grid size={12}>
            <CustomProgressBar
                value={90}
                maxValue={150}
                showGuidelines={true}
                guidelineValues={[90, 110, 100]} // 150% と 120% に基準線
                ranges={[
                { start: 80, end: 140, fillColor: 'rgba(0, 255, 0, 0.8)' },
                ]}
            />
            </Grid>
            <Grid size={12}>
                <BasicTab
                    items={tabOptions}
                    value={selectedTab}

                    onChange={handleSelectedTab}
                />
                {selectedTab === 0 && <MenuList mealData={sampleData}/>}
                {selectedTab === 1 && <CalorieRanking mealData={sampleData} />}
                {selectedTab === 2 && <BalanceRanking mealData={sampleData} />}
            </Grid>
        </Grid>
    );
};

export default Main;