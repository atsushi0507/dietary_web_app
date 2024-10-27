"use client";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import Calendar from "@/components/atoms/Calendar";
import dayjs from "dayjs";
import BasicTab from "@/components/atoms/Tab";
import MealRecord from "./mealRecord";
import WeightRecord from "./weightRecord";

const tabOptions = [
    {label: "食事", icon: null},
    {label: "体重", icon: null}
]

const RecordTop = () => {
    const [date, setDate] = useState(dayjs());
    const [selectedTab, setSelectedTab] = useState(0);
    console.log(date);
    console.log(selectedTab);

    const handleDateChange = (newDate) => {
        setDate(newDate)
    };

    const handleSelectedTab = (e, newValue) => {
        setSelectedTab(newValue);
    }

    return (
        <Grid container direction="column">
            <Grid size={12}>
                <Calendar 
                    value={date}
                    onDateChange={handleDateChange}
                />
            </Grid>
            <Grid size={12}>
                <BasicTab
                    items={tabOptions}
                    value={selectedTab}
                    onChange={handleSelectedTab}
                />
                {selectedTab === 0 && <MealRecord />}
                {selectedTab === 1 && <WeightRecord date={date}/>}
            </Grid>
        </Grid>
    );
};

export default RecordTop;