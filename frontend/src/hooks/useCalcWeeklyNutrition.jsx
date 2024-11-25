"use client";
import React, { useEffect, useState } from "react";
import sampleDB from "@/public/sampleDB.json";

const useCalcWeeklyNutrition = () => {
    const [weeklyData, setWeeklyData] = useState([]);

    const getPastSevenDays = () => {
        const dates = [];
        for (let i = 1; i <= 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            dates.push(date.toISOString().split("T")[0]);
        }
        return dates;
    };

    const calculateWeeklyNutrition = () => {
        if (typeof window !== "undefined") {
            const storedData = JSON.parse(localStorage.getItem("mealRecord"));
            if (!storedData) {
                console.log("No data available!");
                return [];
            }

            const pastSevenDays = getPastSevenDays();

            const weeklyNutrition = pastSevenDays.map((date) => {
                const dayRecord = storedData[date];
                if (!dayRecord) return { date, totalCalories: 0, pfc: { protein: 0, fat: 0, carb: 0 }, meals: 0 };

                let totalCalories = 0;
                const pfc = { protein: 0, fat: 0, carb: 0 };
                let mealCount = 0;

                Object.values(dayRecord).forEach((menus) => {
                    mealCount += 1; // 各食事タイプ
                    Object.entries(menus).forEach(([menuName, volume]) => {
                        const itemData = sampleDB.find((item) => item.menu === menuName);
                        if (!itemData) return;

                        totalCalories += itemData.cal * volume * (itemData.volume / 100);
                        pfc.protein += itemData.protein * volume * (itemData.volume / 100);
                        pfc.fat += itemData.fat * volume * (itemData.volume / 100);
                        pfc.carb += itemData.carb * volume * (itemData.volume / 100);
                    });
                });

                return {
                    date,
                    totalCalories: totalCalories.toFixed(1),
                    pfc: {
                        protein: pfc.protein.toFixed(1),
                        fat: pfc.fat.toFixed(1),
                        carb: pfc.carb.toFixed(1),
                    },
                    meals: mealCount,
                };
            });

            return weeklyNutrition;
        }
        return [];
    };

    useEffect(() => {
        setWeeklyData(calculateWeeklyNutrition());
    }, []);

    return weeklyData;
};

export default useCalcWeeklyNutrition;
