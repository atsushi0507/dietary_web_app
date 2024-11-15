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

    const convertToDate =(dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        
        const dateStr =  `${year}-${month}-${day}`;
        return new Date(dateStr).toISOString().split("T")[0];
    };

    const handleDateChange = (newDate) => {
        setDate(newDate);
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
                {selectedTab === 0 && <MealRecord date={convertToDate(date)}/>}
                {selectedTab === 1 && <WeightRecord date={convertToDate(date)}/>}
            </Grid>
        </Grid>
    );
};

export default RecordTop;